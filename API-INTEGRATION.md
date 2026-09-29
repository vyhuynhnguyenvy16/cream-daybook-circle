# Bản đồ gắn API thật (Spring Boot trên Railway)

Prototype hiện tại dùng dữ liệu mẫu trong `src/components/mat-prototype.tsx`.
Mỗi màn hình trong file đó đã có chú thích `// API:` ngay phía trên để biết chỗ nào cần nối backend.

## Cấu hình chung

- Base URL: đặt biến môi trường `VITE_API_BASE_URL=https://<app>.up.railway.app/api`
- Gửi kèm `Authorization: Bearer <accessToken>` cho mọi request sau khi đăng nhập.
- Nên dùng TanStack Query (`useQuery` / `useMutation`) thay cho `useState` dữ liệu mẫu.

## Danh sách điểm nối

| Màn hình (component) | Việc cần làm | Endpoint gợi ý |
| --- | --- | --- |
| `Today` | Tem hẹn gần nhất, lời mời chờ, ảnh mới, 3 lịch sắp tới | `GET /home/today` |
| `Today` (nút Đi) | Nhận lời hẹn | `POST /appointments/{id}/rsvp` `{status:"GOING"}` |
| `Friends` | Danh sách bạn, bạn thân, nhóm, hạn mức gói | `GET /friends`, `GET /groups`, `GET /me/limits` |
| `CameraView` | Upload ảnh + người nhận + sticker | `POST /photos` (multipart: file, recipientIds, sticker) |
| `PhotoView` | Chi tiết ảnh và thả cảm xúc | `GET /photos/{id}`, `POST /photos/{id}/reactions` |
| `Schedule` | Tạo lịch hẹn 4 bước | `POST /appointments` |
| `Poll` | Lấy/bỏ phiếu/chốt khung giờ | `GET /polls/{id}`, `POST /polls/{id}/votes`, `POST /polls/{id}/finalize` |
| `Appointment` | Chi tiết, trả lời, trạng thái đang đến/đã tới | `GET /appointments/{id}`, `POST /appointments/{id}/rsvp`, `POST /appointments/{id}/presence` |
| `Appointments` | Danh sách lịch hẹn theo tháng | `GET /appointments?from=&to=` |
| `Group` / `NewGroup` | Chi tiết nhóm, tạo nhóm (kiểm tra hạn mức 3 nhóm) | `GET /groups/{id}`, `POST /groups` |
| `Bestie` | Hồ sơ bạn thân, streak, mời bạn thân | `GET /friends/{id}`, `POST /friends/{id}/bestie` |
| `Availability` | Đồng ý đối chiếu lịch, khung giờ rảnh chung | `POST /calendar/consent`, `GET /availability/overlap` |
| `SplitBill` | Tạo yêu cầu chia tiền + mã VietQR | `POST /appointments/{id}/split`, `GET /split/{id}/qr` |
| `Album` | Ảnh của buổi hẹn, upload thêm | `GET /appointments/{id}/album`, `POST /appointments/{id}/album` |
| `Premium` | Gói, giá, dùng thử | `GET /billing/plans`, `POST /billing/trial` |
| `Personalize` | Bộ sưu tập chủ đề/sticker/khung, lưu lựa chọn | `GET /personalization`, `PUT /me/personalization` |
| `Memories` | Kỷ niệm "Năm ngoái hôm nay" | `GET /memories?onThisDay=true` |
| `Notifications` | Danh sách thông báo, đăng ký thiết bị push | `GET /notifications`, `POST /devices` (FCM token) |
| `Settings` | Cài đặt không làm phiền, nhắc chụp, emoji nhanh | `GET /me/settings`, `PUT /me/settings` |
| `QuickInvite` | Lời rủ nhanh hết hạn sau 4 giờ | `POST /quick-invites` |
| `DailyQuestion` | Câu hỏi trong ngày và câu trả lời bạn bè | `GET /daily-question`, `POST /daily-question/answers` |
| `EmojiPicker` | Lưu 6 emoji phản ứng nhanh | `PUT /me/settings/quick-emojis` |
| `Invite` | Sinh link mời và số bạn hiện có | `POST /invites`, `GET /invites/active` |

## Lưu ý khi nối Railway

- Bật CORS cho domain preview và domain đã publish.
- Ảnh nên trả về URL (S3/Cloudinary) thay vì base64 để giữ hiệu năng.
- Thời gian trả về ISO-8601 kèm offset `+07:00`, format tiếng Việt ở phía giao diện.
