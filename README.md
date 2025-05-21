# EchoCast

EchoCast là một ứng dụng phát nhạc đa thiết bị qua mạng LAN. Server điều khiển bài hát, thời gian phát và âm lượng. Các client sẽ tự phát lại bài hát đồng bộ để mô phỏng hệ thống loa lớn từ nhiều thiết bị nhỏ.

## Tính năng

* Phát nhạc từ server đến nhiều client qua LAN
* Trang admin điều khiển play, pause, chuyển bài
* Client tự phát bài hát sau khi tải về thông tin
* Giao tiếp real-time bằng Flask-SocketIO
* Giao diện gradient pink–blue, responsive phù hợp mọi độ phân giải

## Cài đặt & sử dụng

1. Clone repository:

   ```bash
   git clone https://github.com/nguyenhhoa03/EchoCast.git
   cd EchoCast
   ```
2. Cài Python và pip, sau đó cài thư viện:

   ```bash
   pip install -r requirements.txt
   ```
3. Đặt các file `.mp3` vào thư mục `static/music/` hoặc `songs/` tùy cấu trúc dự án.
4. Chạy ứng dụng:

   ```bash
   python app.py
   ```
5. Mở trình duyệt:

   * `http://<device-ip>:5000` — Client
   * `http://localhost:5000/admin` — Admin


## License

Phát hành theo giấy phép [GNU GPL v3](https://www.gnu.org/licenses/gpl-3.0.html).

GitHub: [nguyenhhoa03/EchoCast](https://github.com/nguyenhhoa03/EchoCast)
