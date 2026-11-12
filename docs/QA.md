# Báo cáo kiểm tra — 12/11/2026

## Đã thực hiện

- 10 kiểm thử tự động bằng Node: lớp nhân vật, lên cấp nhiều lần, sát thương, tài nguyên/cooldown kỹ năng, bản lưu không hợp lệ, va chạm, tiến độ nhiệm vụ, vị trí xuất hiện quái, kích thước 11 atlas và danh sách tài nguyên cache.
- Kiểm tra cú pháp các module chính.
- Trình duyệt Chrome: màn hình chọn lớp, vào game, chiến đấu với slime, EXP/vàng/tiến độ nhiệm vụ, tiêu hao năng lượng, nâng cấp vũ khí, mua bình, thư viện hoạt ảnh, vùng băng và vùng boss.
- Đã quan sát sát thương lên boss; chưa chơi hết toàn bộ chiến dịch từ đầu tới cuối.
- Chuyển về trang game và tiếp tục bản lưu: giữ lớp, cấp, vàng, bình, khu vực và nhiệm vụ.
- Kiểm tra bố cục bằng iframe 844 × 390 và 390 × 844 trong Chrome; không phải mô phỏng đầy đủ Safari/iOS. Menu chiều dọc và lời nhắc xoay màn hình được kiểm tra.
- Kiểm tra atlas gốc: có đủ năm hàng idle/walk/attack/hurt/die cho cả 11 nhân vật/quái. Frame cuối die trong suốt là chủ ý. Một số idle lặp lại hai hình.

## Cần kiểm tra trước phát hành

- Trên iPhone thật: Safari, thêm vào màn hình chính, joystick và kỹ năng đồng thời bằng hai ngón tay; vùng an toàn màn hình và chuyển ngang/dọc.
- Tải đầy đủ qua HTTPS rồi thử chế độ máy bay; kiểm tra khởi động ngoại tuyến và lưu sau khi đóng app. Chưa xác nhận ngoại tuyến trên thiết bị iOS thật.
- Chơi hết sáu nhiệm vụ bằng cả ba lớp để cân bằng độ khó; kiểm tra hồi sinh và hoàn thành chương.
- Kiểm tra xuất/nhập bản lưu giữa thiết bị và khi nâng phiên bản.
- Đo hiệu năng, pin, nhiệt độ trên iPhone mục tiêu. Không có kết quả FPS thiết bị thật trong báo cáo này.
- Kiểm tra quyền phân phối sprite trước khi công khai; xem ASSET_NOTICES.md.

Không có bản IPA đã build/ký, kiểm thử App Store, máy chủ nhiều người chơi hay kiểm thử tải mạng.
