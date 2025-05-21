# EchoCast

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

Ứng dụng phát âm thanh đồng bộ trên nhiều thiết bị, biến các thiết bị nhỏ thành một hệ thống loa.

---

## 📌 Mục lục

1. [Tính năng](#tính-năng)
2. [Công nghệ](#công-nghệ)
3. [Cài đặt](#cài-đặt)
4. [Cách sử dụng](#cách-sử-dụng)
5. [Phát triển](#phát-triển)
6. [Đóng góp](#đóng-góp)
7. [Giấy phép](#giấy-phép)
8. [Liên hệ](#liên-hệ)

---

## 🔊 Tính năng

* **Đồng bộ thời gian thực**: Phát nhạc đồng bộ trên nhiều client.
* **Điều khiển âm lượng**: Tùy chỉnh âm lượng cho từng thiết bị để mô phỏng cài đặt stereo hoặc dàn loa.
* **Giao diện web**: UI thân thiện cho trang điều khiển (server) và trang client.
* **Quản lý playlist**: Tải lên và quản lý file âm thanh trên server.
* **Cơ chế tái đồng bộ**: Tự động tái đồng bộ định kỳ để giảm thiểu sai lệch.

---

## 💻 Công nghệ

* **Back-end**: Python, [Flask](https://palletsprojects.com/p/flask/), [Flask-SocketIO](https://flask-socketio.readthedocs.io/)
* **Front-end**: HTML5, JavaScript, Socket.IO client
* **Âm thanh**: Thẻ HTML5 `<audio>`

---

## ⚙️ Cài đặt

1. **Clone kho mã nguồn**

   ```bash
   git clone https://github.com/nguyenhhoa03/EchoCast.git
   cd EchoCast
   ```
2. **Tạo môi trường ảo**

   ```bash
   python3 -m venv venv
   source venv/bin/activate  # Trên Windows: venv\Scripts\activate
   ```
3. **Cài đặt phụ thuộc**

   ```bash
   pip install -r requirements.txt
   ```

---

## 🚀 Cách sử dụng

1. **Khởi động Flask server**

   ```bash
   flask run --host=0.0.0.0 --port=5000
   ```

2. **Giao diện điều khiển (Control Interface)**

   * Mở `http://<ĐỊA_CHỈ_SERVER>:5000/control` trên trình duyệt.
   * Tải file âm thanh, chọn bài và bấm **Phát** hoặc **Tạm dừng**.
   * Điều chỉnh âm lượng chung hoặc từng client.

3. **Giao diện client (Client Interface)**

   * Trên mỗi thiết bị, mở `http://<ĐỊA_CHỈ_SERVER>:5000/client`.
   * Client sẽ tự kết nối và chờ lệnh phát.

---

## 🛠️ Phát triển

* **Cấu trúc mã nguồn**:

  * `/app.py` – Thiết lập Flask và định nghĩa route
  * `/static/` – JS và CSS
  * `/templates/` – Template Jinja2 cho HTML
  * `/uploads/` – Thư mục lưu file âm thanh tải lên

* **Chạy ở chế độ phát triển**:

  ```bash
  export FLASK_ENV=development
  flask run
  ```

---

## 🤝 Đóng góp

Rất hoan nghênh mọi đóng góp, báo lỗi và đề xuất tính năng!

1. Fork dự án
2. Tạo nhánh cho tính năng mới: `git checkout -b feature/my-feature`
3. Commit thay đổi: `git commit -m 'Thêm tính năng ...'`
4. Đẩy lên nhánh: `git push origin feature/my-feature`
5. Tạo Pull Request

Vui lòng tuân thủ [Contributor Covenant](https://www.contributor-covenant.org/).

---

## 📝 Giấy phép

Dự án được cấp phép theo **GNU General Public License v3.0**. Xem file [LICENSE](LICENSE) để biết chi tiết.

---

## 📬 Liên hệ

* GitHub: [nguyenhhoa03/EchoCast](https://github.com/nguyenhhoa03/EchoCast)
* Tác giả: Nguyễn Hòa

---

*Chúc bạn xây dựng thành công hệ thống loa phân tán với EchoCast!*
