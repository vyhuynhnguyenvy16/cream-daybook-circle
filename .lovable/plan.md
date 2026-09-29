# Hoàn thiện toàn bộ giao diện Mật

## Mục tiêu
Mở rộng bản demo hiện tại thành một prototype mobile đầy đủ cho cả tính năng miễn phí và Premium, dùng dữ liệu mẫu và thao tác mô phỏng. Không kết nối API, dữ liệu thật, thanh toán hay triển khai.

## Phạm vi xây dựng

### 1. Hoàn thiện các luồng cốt lõi còn thiếu
- Chi tiết lời mời hẹn với đủ ba lựa chọn: Đi, Không đi được, Đề xuất giờ khác.
- Danh sách và chi tiết lịch hẹn, trạng thái từng người, nhắc giờ, Đang đến/Đã tới.
- Tạo nhóm mới, màn nhóm, lịch và album riêng, bình chọn nhiều phương án.
- Hồ sơ bạn thân, lời mời bạn thân hai chiều và trạng thái giới hạn 5 người.

### 2. Bổ sung toàn bộ tiện ích miễn phí
- Gợi ý giờ rảnh với màn xin phép riêng tư và 2–3 kết quả tổng hợp.
- Chia tiền ba bước và màn VietQR mô phỏng; không xử lý giao dịch thật.
- Album buổi hẹn tối đa 20 ảnh, streak nhẹ, trạng thái emoji.
- Rủ nhanh, phản hồi bằng ảnh, câu hỏi trong ngày, tùy chỉnh emoji nhanh.
- Trung tâm thông báo, cài đặt riêng tư, không làm phiền, lịch nhắc và đồng bộ lịch dạng mô phỏng.

### 3. Bổ sung Premium
- Điểm vào Premium từ tính năng có biểu tượng khóa nhỏ, không cản luồng chính.
- Màn nâng cấp duy nhất với bản xem trước lợi ích, gói tháng/năm ở trạng thái “chưa chốt giá”, dùng thử 7 ngày và nút đóng rõ ràng.
- Giao diện lịch lặp hằng tuần/hằng tháng.
- Kho cá nhân hóa: chủ đề màu, khung, sticker, emoji mùa và icon app.
- Kho kỷ niệm: album không giới hạn và “Năm ngoái hôm nay”.
- Trạng thái giới hạn nhóm: Free 3 nhóm, Premium tối đa 20 nhóm.

### 4. Điều hướng và kiểm tra
- Giữ thanh đáy ba mục Hôm nay, Camera, Bạn bè; các màn phụ mở trong cùng prototype.
- Giữ phong cách kem ấm, terracotta, tem hẹn và polaroid đúng ngữ cảnh.
- Kiểm tra luồng chính trên màn hình điện thoại nhỏ và rộng, không lỗi hiển thị hay thao tác.

## Chi tiết kỹ thuật
- Chia màn hình thành các phần nhỏ, tái sử dụng trong frontend hiện tại.
- Toàn bộ trạng thái nằm cục bộ trong phiên demo; QR và các trạng thái Premium chỉ là mô phỏng trực quan.
- Không thêm thư viện thanh toán, dịch vụ bên ngoài, cơ sở dữ liệu hoặc đăng nhập thật.
