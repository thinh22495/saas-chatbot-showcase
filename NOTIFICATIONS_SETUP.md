# 🔔 Hướng dẫn Setup Notifications

Hệ thống gửi thông báo qua 3 kênh đồng thời:
1. ✉️ Email (Resend)
2. 📊 Google Sheets
3. 📱 Telegram Bot

---

## 1. ✉️ Email Notification (Resend)

### Bước 1: Tạo tài khoản Resend
1. Truy cập: https://resend.com/signup
2. Đăng ký tài khoản miễn phí (100 emails/day)

### Bước 2: Lấy API Key
1. Vào **API Keys** trong dashboard
2. Tạo API key mới
3. Copy API key

### Bước 3: Thêm Environment Variables
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
NOTIFY_EMAIL=thinh95.tranhuu@gmail.com
```

✅ **Done!** Email sẽ được gửi mỗi khi có request mới.

---

## 2. 📊 Google Sheets Integration

### Bước 1: Tạo Google Sheet
1. Tạo Google Sheet mới: https://sheets.new
2. Đặt tên sheet (vd: "Demo Requests")
3. Tạo header row:
   ```
   A1: Full Name | B1: Email | C1: Phone | D1: Company | E1: Role | F1: Use Case | G1: Message | H1: Timestamp
   ```

### Bước 2: Tạo Google Apps Script
1. Trong Google Sheet, vào **Extensions → Apps Script**
2. Xóa code mặc định và paste code này:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.fullName,
      data.workEmail,
      data.phone,
      data.company,
      data.role,
      data.useCase,
      data.message,
      data.timestamp
    ]);

    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. **Deploy:**
   - Click **Deploy → New deployment**
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**
   - Copy **Web app URL**

### Bước 3: Thêm Environment Variable
```env
GOOGLE_SHEETS_SCRIPT_URL=https://script.google.com/macros/s/xxxxx/exec
```

✅ **Done!** Data sẽ tự động ghi vào Google Sheets.

---

## 3. 📱 Telegram Bot Notification

### Bước 1: Tạo Telegram Bot
1. Mở Telegram, tìm **@BotFather**
2. Gửi: `/newbot`
3. Đặt tên bot (vd: "Demo Request Bot")
4. Đặt username bot (vd: "your_demo_bot")
5. Copy **Bot Token** (dạng: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

### Bước 2: Lấy Chat ID
1. Tạo group/channel hoặc chat với bot
2. Gửi message bất kỳ cho bot
3. Truy cập URL (thay YOUR_BOT_TOKEN):
   ```
   https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
   ```
4. Tìm `"chat":{"id":...}` và copy **Chat ID**

**Hoặc dùng bot helper:**
1. Tìm **@userinfobot** trên Telegram
2. Start chat và nó sẽ cho bạn Chat ID

### Bước 3: Thêm Environment Variables
```env
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
```

✅ **Done!** Sẽ nhận message Telegram mỗi khi có request.

---

## 🚀 Deploy lên Vercel

### Thêm tất cả Environment Variables:

```env
# Email
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
NOTIFY_EMAIL=thinh95.tranhuu@gmail.com

# Google Sheets
GOOGLE_SHEETS_SCRIPT_URL=https://script.google.com/macros/s/xxxxx/exec

# Telegram
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
```

**Vercel Dashboard:**
1. Project Settings → Environment Variables
2. Thêm từng biến ở trên
3. Redeploy project

---

## ✅ Test thử

1. Truy cập trang contact form
2. Gửi request test
3. Kiểm tra:
   - ✉️ Email inbox
   - 📊 Google Sheet có row mới
   - 📱 Telegram có message mới

**Logs:** Check Vercel Function Logs để xem status của mỗi notification.

---

## ⚠️ Lưu ý

- **Resend free:** 100 emails/day
- **Google Sheets:** Không giới hạn rows
- **Telegram:** Không giới hạn messages
- Nếu 1 service lỗi, các service khác vẫn hoạt động (Promise.allSettled)
- Không cần database nữa, phù hợp với serverless!
