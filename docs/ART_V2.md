# Hệ thống đồ họa V2

Bốn atlas PNG tạo bằng công cụ tạo ảnh tích hợp theo ảnh Pixel Adventure người dùng cung cấp, không dùng CLI/API key. Ảnh tham khảo dùng để định hướng, không chép pixel.

Prompt thiết kế: hero atlas 8 cột × 3 hàng (warrior tóc đỏ giáp bạc khăn đỏ, mage tóc tím áo tím xanh viền vàng, archer mũ xanh cung vàng), idle/breathe/walkA/walkB/windup/attack/hurt/fallen. Monster atlas 6 cột × 8 hàng, slime/bat/wolf/skeleton/goblin/spider/imp/golem, idle/walkA/walkB/attack/hurt/fallen. Pet atlas 6 cột × 2 hàng, fox/chicken, idle/walkA/walkB/pounce/hurt/sleep. Prop atlas 4 cột × 3 hàng: oak/pine/blossom/fir/cottage/snow-house/ruin/lava-tower/moss-rock/crystal/lava-rock/chest. Yêu cầu nền alpha, đủ thân, pixel fantasy chi tiết và không chữ.

assets/v2/atlas.json lưu hình chữ nhật nguồn đo theo alpha; art.js chuẩn hóa kích thước và phát animation. landscape.js tạo nền tĩnh một lần mỗi lần đổi vùng để giảm công việc mỗi frame. effects.js chỉ vẽ VFX; luật sát thương vẫn ở game.js/core.js. Hướng nhìn dùng lật ngang. Bản V1 được giữ trong assets/characters như fallback; không xóa tài nguyên cũ khỏi bản ZIP.
