# Cập nhật PixelWorld V2 lên repository đang dùng

1. Trong game cũ, vào Tạm dừng → Xuất bản lưu để có bản dự phòng.
2. Giải nén ZIP mới, mở thư mục pixelworld bên trong.
3. Mở repository GitHub cũ → Code → Add file → Upload files.
4. Kéo toàn bộ nội dung BÊN TRONG pixelworld lên. Bao gồm src, assets, tests, docs, .github và các file ngoài cùng. Không kéo file ZIP; không tạo thêm lớp thư mục pixelworld trong repository.
5. Commit changes vào main. Workflow hiện có kiểm tra rồi triển khai. Không cần tạo repository hoặc đổi URL.
6. Khi Actions xanh, mở lại game và tải lại trang. Kiểm tra màn hình đầu có chữ V2 · REBORN và nhân vật tóc đỏ.
7. Nếu vẫn thấy V1, đóng các tab/cửa sổ game và mở lại để service worker mới nhận quyền điều khiển. Không xóa dữ liệu Safari vì thao tác đó cũng xóa bản lưu cục bộ. Nếu đã mất bản lưu, dùng Nhập bản lưu từ file dự phòng.

Khóa lưu vẫn là pixelworld.rift.v1, cấu trúc version:1. Tên V2 chỉ là phiên bản game/đồ họa. Cấp, vàng, nhiệm vụ, trang bị và thú được giữ khi dùng cùng URL/trình duyệt. Giữ nguyên index.html ở thư mục gốc repo. Bản này không tự đăng lên GitHub và không thay đổi repository của bạn.

## Thay đổi
- 84 tư thế nhân vật/quái/thú mới: 24 anh hùng, 48 quái, 12 thú.
- 12 đạo cụ môi trường mới và nền ba vùng được vẽ lại.
- Hiệu ứng lốc lửa, địa chấn, thiên thạch, mưa tên, bão lá, tơ nhện, vuốt cào và vệt lướt.
- HUD ngang gọn hơn, thẻ nhân vật và thư viện hoạt ảnh dùng hình mới.

## Phạm vi
Năm trạng thái hoạt ảnh cơ bản; một số trạng thái dùng một tư thế kết hợp chuyển động bằng mã. Hình theo phong cách ảnh tham khảo, không cam kết trùng hoàn toàn. Một người chơi, chưa có máy chủ online/IPA/App Store.
