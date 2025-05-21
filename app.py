import os
import socket
import time
import webbrowser
from flask import Flask, render_template, send_from_directory
from flask_socketio import SocketIO, emit


def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # kết nối tới một IP công cộng, không gửi data
        s.connect(("8.8.8.8", 80))
        return s.getsockname()[0]
    finally:
        s.close()

# --- Configuration ---
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
SONG_FOLDER = os.path.join(BASE_DIR, 'songs')
PORT = 5000

# --- App Initialization ---
app = Flask(__name__, static_folder='static', template_folder='templates')
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key')
socketio = SocketIO(app, cors_allowed_origins='*')

# --- State for synchronization ---
state = {
    'current': None,      # current track filename
    'start_at': None,     # UNIX timestamp when playback started
    'paused': False,
    'pause_at': None,     # UNIX timestamp when paused
    'volume': 1.0
}

# --- Utility: list all MP3 files ---
def list_songs():
    return [f for f in os.listdir(SONG_FOLDER)
            if os.path.isfile(os.path.join(SONG_FOLDER, f)) and f.lower().endswith('.mp3')]

# --- Routes ---
@app.route('/')
def client_page():
    """Render the client view"""
    return render_template('index.html', songs=list_songs())

@app.route('/admin')
def admin_page():
    local_ip = get_local_ip()
    client_url = f"http://{local_ip}:{PORT}/"
    return render_template('admin.html',
                           songs=list_songs(),
                           client_url=client_url)

@app.route('/songs/<path:filename>')
def serve_song(filename):
    """Serve static MP3 files to clients"""
    return send_from_directory(SONG_FOLDER, filename)

# --- WebSocket Handlers ---
@socketio.on('play_song')
def handle_play(data):
    song = data.get('song')
    if song in list_songs():
        state['current'] = song
        state['start_at'] = time.time()
        state['paused'] = False
        emit('play_song', {
            'song': song,
            'start_at': state['start_at'],
            'volume': state['volume']
        }, broadcast=True)

@socketio.on('pause_song')
def handle_pause():
    if state['current'] and not state['paused']:
        state['paused'] = True
        state['pause_at'] = time.time()
        emit('pause_song', broadcast=True)

@socketio.on('resume_song')
def handle_resume():
    if state['current'] and state['paused']:
        paused_duration = time.time() - state['pause_at']
        state['start_at'] += paused_duration
        state['paused'] = False
        emit('resume_song', {'start_at': state['start_at']}, broadcast=True)

@socketio.on('change_volume')
def handle_volume(data):
    vol = data.get('volume')
    try:
        vol = float(vol)
        if 0.0 <= vol <= 1.0:
            state['volume'] = vol
            emit('change_volume', {'volume': state['volume']}, broadcast=True)
    except (TypeError, ValueError):
        pass

@socketio.on('ping_sync')
def handle_ping():
    """Respond with server time and start timestamp for client recalibration"""
    emit('pong_sync', {'server_time': time.time(), 'start_at': state['start_at']})

# --- Entry Point ---
if __name__ == '__main__':
    # Ensure song directory exists
    os.makedirs(SONG_FOLDER, exist_ok=True)
    # Auto-open admin dashboard in default browser
    try:
        webbrowser.open_new_tab(f"http://127.0.0.1:{PORT}/admin")
    except Exception:
        pass
    socketio.run(app, host='0.0.0.0', port=PORT)
