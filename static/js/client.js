const socket    = io();
const audio     = document.getElementById('player');
const lblT      = document.getElementById('track');
const lblTime   = document.getElementById('time');
const btnEnable = document.getElementById('btnEnable');

let isReady = false;
let serverOffset = 0; // sai lệch giữa đồng hồ client và server
let startAt = null;   // thời điểm server bắt đầu phát
let lastSyncTime = 0;

// Unlock autoplay
btnEnable.addEventListener('click', () => {
  audio.src = '';
  audio.play().catch(() => {});
  audio.pause();
  isReady = true;
  btnEnable.style.display = 'none';
});

// Server bảo play
socket.on('play_song', data => {
  const { song, start_at, volume } = data;
  startAt = start_at;
  lblT.textContent = song;
  audio.src = '/songs/' + encodeURIComponent(song);
  audio.volume = volume;

  // Tính thời gian chênh lệch
  const clientNow = Date.now() / 1000 + serverOffset;
  const offset = clientNow - start_at;
  audio.currentTime = offset;

  if (isReady) {
    audio.play().catch(err => console.warn('Autoplay bị chặn:', err));
  }
});

// Server pause/resume/volume
socket.on('pause_song', () => audio.pause());

socket.on('resume_song', data => {
  startAt = data.start_at;
  const clientNow = Date.now() / 1000 + serverOffset;
  const offset = clientNow - startAt;
  audio.currentTime = offset;
  if (isReady) audio.play();
});

socket.on('change_volume', data => {
  audio.volume = data.volume;
});

// Ping sync liên tục để đo sai lệch giờ
function pingSync() {
  const pingSentAt = performance.now();
  socket.emit('ping_sync');
  socket.once('pong_sync', data => {
    const rtt = performance.now() - pingSentAt;  // ms
    const latency = rtt / 2000;                  // một nửa rtt, đổi sang giây
    const clientNow = Date.now() / 1000;
    serverOffset = (data.server_time + latency) - clientNow;
    startAt = data.start_at;

    // Nếu đang phát mà lệch hơn 0.5s thì chỉnh lại
    if (!audio.paused && startAt) {
      const expectedTime = clientNow + serverOffset - startAt;
      const actualTime = audio.currentTime;
      const drift = Math.abs(actualTime - expectedTime);
      if (drift > 0.02) {
        audio.currentTime = expectedTime;
      }
    }
  });
}

// Hiển thị thời gian
setInterval(() => {
  if (!audio.paused) {
    const m = Math.floor(audio.currentTime / 60);
    const s = String(Math.floor(audio.currentTime % 60)).padStart(2, '0');
    lblTime.textContent = `${m}:${s}`;
  }

  // Ping mỗi 5 giây
  if (Date.now() - lastSyncTime > 5000) {
    lastSyncTime = Date.now();
    pingSync();
  }
}, 1000);
