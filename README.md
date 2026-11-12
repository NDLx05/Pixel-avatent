# PixelWorld — Echoes of the Rift

Game nhập vai pixel **một người chơi**, thiết kế cho Safari iPhone ở chiều ngang và trình duyệt máy tính. Giao diện lấy cảm hứng từ MMORPG. Đây là mã nguồn web/PWA chơi được; không phải IPA, ứng dụng đã ký để lên App Store, hoặc máy chủ MMO.

## Chơi trên máy tính

Cài Node.js 20 trở lên, mở Terminal trong thư mục chứa `package.json`, chạy:

```sh
npm start
```

Mở **http://localhost:8080**. Không cần `npm install`; game không dùng thư viện bên ngoài. Không mở `index.html` bằng cách nhấp đúp vì module và tài nguyên cần HTTP.

Nếu đã có Python, cũng có thể chạy `python -m http.server 8080` tại thư mục này.

## Đưa lên GitHub và chơi trên iPhone

Đọc **[HUONG_DAN_GITHUB_IPHONE.md](docs/HUONG_DAN_GITHUB_IPHONE.md)**. Có sẵn workflow GitHub Actions để kiểm tra và triển khai lên Pages.

## Nội dung hiện có

- **3 lớp:** Kiếm Vệ, Linh Pháp, Du Hiệp; chỉ số, phạm vi đánh và hiệu ứng kỹ năng khác nhau.
- **8 quái:** slime xanh, dơi, sói, bộ xương, goblin, nhện, imp, golem boss.
- **5 trạng thái cho toàn bộ 11 sprite gốc:** idle, walk, attack, hurt, die. Giữ nguyên atlas gốc, dùng manifest để phát từng trạng thái; lật ngang khi đổi hướng.
- **2 thú mới vẽ bằng Canvas:** cáo và gà. Có 5 trạng thái xem trong thư viện; trong gameplay, thú là bạn đồng hành trang trí, dùng đứng/di chuyển, không tham chiến.
- **3 vùng 1800 × 1400:** Thung Lũng Lục Bảo, Băng Nguyên Tĩnh Lặng, Phế Tích Tro Tàn.
- Nhà, rừng, đường mòn, suối, cầu, tuyết, dung nham, cổng, rương và hiệu ứng môi trường vẽ bằng mã.
- **6 nhiệm vụ liên tiếp**, mở vùng mới, boss cuối, màn hình hoàn thành chương.
- Tấn công thường, hai kỹ năng, lướt có thời gian miễn thương, hồi phục, năng lượng/cooldown.
- Tự chọn mục tiêu gần, kinh nghiệm, lên cấp, nâng cấp vũ khí/giáp, mua bình, 9 rương.
- NPC hồi phục miễn phí, quái thường hồi sinh, người chơi hồi sinh không mất tiến trình.
- Joystick nhiều điểm chạm, bàn phím, minimap, túi đồ, nhật ký, thư viện hoạt ảnh.
- Tự lưu cục bộ, xuất/nhập JSON, service worker cho ngoại tuyến sau lần tải đầy đủ.
- Hiệu ứng âm thanh tổng hợp bằng Web Audio; mặc định tắt, bật bằng nút ♪.

## Điều khiển

| Hành động | Máy tính | iPhone |
|---|---|---|
| Đi lại | WASD / phím mũi tên | Joystick trái |
| Đánh thường | Giữ J | Giữ nút kiếm |
| Kỹ năng vùng | K | Nút kỹ năng |
| Kỹ năng mạnh | L | Nút tối thượng |
| Lướt | Space | Nút mũi tên |
| Hồi phục | Q | Nút dấu cộng |
| Tương tác | E | Nút xuất hiện khi ở gần |
| Túi đồ / bản đồ | B / M | Nút trên màn hình |
| Tạm dừng / đóng bảng | Esc | Ⅱ / × |

Bảng menu tạm dừng chiến đấu. Hoàn thành mục tiêu rồi bấm **Nhận thưởng** để nhận vàng, EXP và nhiệm vụ tiếp theo. Vùng băng mở sau 2 nhiệm vụ; vùng tro mở sau 4. Aelia đứng gần điểm xuất phát ở làng.

## Lưu và cập nhật

- Bản lưu nằm trong `localStorage` với khóa `pixelworld.rift.v1`, riêng theo trình duyệt và tên miền.
- Đổi thiết bị, xóa dữ liệu Safari hoặc đổi địa chỉ hosting không tự chuyển bản lưu. Dùng **Tạm dừng → Xuất bản lưu / Nhập bản lưu**.
- Ngoại tuyến chỉ hoạt động sau khi toàn bộ tài nguyên đã được cache. iOS có thể dọn bộ nhớ trang web; nên xuất bản lưu định kỳ.
- Khi cập nhật game, đổi `CACHE` trong `sw.js` (ví dụ `pixelworld-v1.0.2`) để khách nhận nội dung mới. Danh sách `FILES` phải được bổ sung khi thêm tài nguyên.

## Cấu trúc mã nguồn

| File | Vai trò |
|---|---|
| `src/core.js` | Chỉ số, lên cấp, sát thương, cooldown, xác thực bản lưu, va chạm |
| `src/world.js` | Dữ liệu ba vùng, vị trí quái, tạo cây/cảnh vật và vật cản |
| `src/render.js` | Atlas animation, renderer Canvas, hai thú mới, môi trường/VFX |
| `src/game.js` | Game loop, chiến đấu, AI, nhiệm vụ, UI, input, lưu/khôi phục |
| `assets/characters/manifest.json` | Kích thước frame, hàng, số frame và FPS |
| `style.css` / `index.html` | UI responsive, HUD, các menu |
| `manifest.webmanifest` / `sw.js` | PWA và bộ nhớ ngoại tuyến |
| `tests/` | Kiểm thử logic và tài nguyên |

Muốn thêm quái: thêm atlas + manifest, cấu hình `MONSTERS`, thêm spawn trong `SPAWNS`, cập nhật danh sách cache. Muốn thay hình map: sửa các hàm vẽ trong `render.js`; không cần thay cơ chế chiến đấu.

## Kiểm tra

```sh
npm test
npm run check
```

Xem **[QA.md](docs/QA.md)** về phạm vi đã kiểm tra và các bước cần thử trên iPhone thật.

## Giới hạn và quyền tài nguyên

- Không có server, tài khoản, multiplayer, giao dịch hoặc đồng bộ cloud.
- Sprite dùng hướng trái/phải (lật ngang); không có bộ hướng nhìn lên/xuống riêng.
- Nguồn gốc hoạt ảnh giữ theo gói người dùng gửi. Một số trạng thái idle có hai hình khác nhau lặp lại; cuối trạng thái die có frame trong suốt để biến mất, có chủ đích.
- Thú và hiệu ứng mới là hình vẽ theo thời gian bằng mã, không phải bộ sprite PNG mới từng frame.
- Xem **ASSET_NOTICES.md**: gói sprite gốc chưa có giấy phép phân phối rõ ràng. Kiểm tra quyền đối với tài nguyên trước khi công khai repository/phát hành thương mại.
