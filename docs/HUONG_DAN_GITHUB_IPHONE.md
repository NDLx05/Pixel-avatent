# Đưa PixelWorld lên GitHub và mở trên iPhone

## 1. Giải nén

Giải nén `PixelWorld_iPhone_Source.zip`. Mở thư mục `pixelworld`. Ở đây cần thấy `index.html`, `src`, `assets`, `package.json` và `.github`.

## 2. Chạy thử trên máy

1. Cài Node.js bản LTS từ https://nodejs.org/ nếu chưa có.
2. Mở Terminal/PowerShell tại thư mục `pixelworld`.
3. Chạy `npm start`.
4. Mở http://localhost:8080 trên máy tính.

Không chạy file HTML bằng cách nhấp đúp. Không tải nguyên file ZIP lên repository rồi mong game tự chạy; GitHub cần các file đã giải nén.

## 3. Đưa mã nguồn lên GitHub

### Cách dễ: GitHub Desktop

1. Tạo repository mới trên GitHub hoặc GitHub Desktop, đặt tên `pixelworld`.
2. Ban đầu có thể để private để kiểm tra tài nguyên và mã nguồn.
3. Copy **nội dung bên trong** thư mục `pixelworld` vào thư mục repository; `index.html` phải ở thư mục gốc repository.
4. Bảo đảm có cả `.github/workflows/pages.yml` (thư mục bắt đầu bằng dấu chấm).
5. Trong GitHub Desktop: nhập mô tả commit → Commit → Publish repository hoặc Push origin.
6. Nhánh dùng trong workflow là `main`. Nếu repository dùng tên khác, sửa `branches: [main]` tương ứng.

### Hoặc dùng Git

Tạo một repository trống trên GitHub trước. Sau đó, trong thư mục mã nguồn:

```sh
git init
git add .
git commit -m "Initial PixelWorld game"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/pixelworld.git
git push -u origin main
```

Thay `YOUR_USERNAME` bằng tài khoản của bạn. Không đưa mật khẩu hoặc token vào mã nguồn. Đăng nhập qua cơ chế của GitHub Desktop/Git Credential Manager khi được yêu cầu.

## 4. Bật GitHub Pages

1. Mở repository trên github.com.
2. Vào **Settings → Pages**.
3. Trong **Build and deployment → Source**, chọn **GitHub Actions**.
4. Vào **Actions → Test and deploy PixelWorld → Run workflow**, chọn `main` và chạy; những lần push tiếp theo sẽ tự chạy.
5. Chờ workflow hoàn tất. Lấy URL thật từ **Settings → Pages** hoặc môi trường `github-pages`.
6. Thường URL có dạng `https://YOUR_USERNAME.github.io/pixelworld/`.

Workflow chạy unit tests và kiểm tra cú pháp trước khi deploy. Nó chỉ đưa file game vào Pages, không đưa tài liệu/test/server phát triển.

Khả năng dùng Pages cho repository private phụ thuộc gói GitHub. Nếu tài khoản yêu cầu repository public, chỉ công khai sau khi bạn có quyền phân phối sprite gốc. Bản lưu không được đẩy lên repository.

## 5. Chơi trên iPhone

1. Mở URL Pages bằng **Safari**.
2. Chờ màn hình hiện **BẮT ĐẦU HÀNH TRÌNH** rồi thử chọn nhân vật.
3. Chọn **Chia sẻ → Thêm vào Màn hình chính**; bật **Mở dưới dạng ứng dụng web** nếu có.
4. Mở từ biểu tượng PixelWorld, xoay ngang máy.
5. Kéo joystick trái và bấm các nút bên phải. Nút ♪ bật/tắt âm thanh.
6. Để thử offline: tải game đầy đủ qua mạng, mở lại từ màn hình chính rồi ngắt mạng. Nếu Safari đã dọn cache, cần kết nối mạng để tải lại.

Không dùng địa chỉ `localhost:8080` trên iPhone để truy cập máy tính: localhost trên iPhone là chính điện thoại. URL GitHub Pages qua HTTPS là đường dẫn phù hợp cho việc cài PWA.

## 6. Khi thay đổi game

Sửa file → tăng phiên bản `CACHE` trong `sw.js` → chạy `npm test` và `npm run check` → commit/push. Đóng và mở lại game để nhận bản cập nhật. Khi thêm file mới dùng trong gameplay, thêm đường dẫn vào `FILES` trong `sw.js`.

## 7. Nếu muốn lên App Store sau này

Gói hiện tại là web/PWA, chưa có project Xcode, chứng chỉ ký hoặc IPA. Bước tiếp theo là đóng gói với một lớp native (ví dụ Capacitor), chạy thử trên thiết bị thật bằng Xcode, chuẩn bị icon/splash, kiểm tra quyền tài nguyên, ký và gửi duyệt. Phần đó chưa nằm trong gói mã nguồn này.

## Tài liệu chính thức

- GitHub Pages: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- Apple, thêm web app trên iPhone: https://support.apple.com/guide/iphone/open-as-web-app-iphea86e5236/ios
