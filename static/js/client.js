const socket = io();
const audio  = document.getElementById('player');
const lblT   = document.getElementById('track');
const lblTime= document.getElementById('time');
const btnEnable = document.getElementById('btnEnable');
let isReady = false;

// Unlock autoplay on first interaction
btnEnable.addEventListener('click', () => {
  audio.src = '';            
  audio.play().catch(() => {});
  audio.pause();
  isReady = true;
  btnEnable.style.display = 'none';
});

// Play from server
socket.on('play_song', data => {
  const { song, start_at, volume } = data;
  lblT.textContent = song;
  audio.src = '/songs/' + song;
  audio.volume = volume;
  const now = Date.now() / 1000;
  const offset = now - start_at;
  audio.currentTime = offset;
  if (isReady) {
    audio.play().catch(err => console.warn('Autoplay bị chặn:', err));
  }
});

// Pause/Resume/Volume
socket.on('pause_song', () => audio.pause());
socket.on('resume_song', data => {
  const now = Date.now() / 1000;
  const offset = now - data.start_at;
  audio.currentTime = offset;
  if (isReady) audio.play();
});
socket.on('change_volume', data => { audio.volume = data.volume; });

// Update timer & ping server
setInterval(() => {
  if (!audio.paused) {
    const m = Math.floor(audio.currentTime / 60);
    const s = String(Math.floor(audio.currentTime % 60)).padStart(2, '0');
    lblTime.textContent = `${m}:${s}`;
  }
  socket.emit('ping_sync');
}, 1000);

// Optional advanced sync
socket.on('pong_sync', data => {
  // You can recalibrate here if needed
});
