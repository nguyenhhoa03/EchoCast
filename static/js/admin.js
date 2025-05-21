const socket = io();

document.addEventListener('DOMContentLoaded', () => {
  const btnPlay   = document.getElementById('btnPlay');
  const btnPause  = document.getElementById('btnPause');
  const btnResume = document.getElementById('btnResume');
  const selSong   = document.getElementById('song');
  const volRange  = document.getElementById('vol');

  btnPlay.addEventListener('click', () => {
    socket.emit('play_song', { song: selSong.value });
  });
  btnPause.addEventListener('click', () => {
    socket.emit('pause_song');
  });
  btnResume.addEventListener('click', () => {
    socket.emit('resume_song');
  });
  volRange.addEventListener('input', e => {
    socket.emit('change_volume', { volume: parseFloat(e.target.value) });
  });
});
