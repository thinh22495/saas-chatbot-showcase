# 🚀 Hướng dẫn Deploy

⚠️ **QUAN TRỌNG:** Khuyến nghị dùng **Vercel** cho Next.js 16

**Vấn đề với Cloudflare Pages:**
- `@cloudflare/next-on-pages` chỉ support Next.js ≤15.5.2
- Package đã deprecated (khuyên dùng OpenNext - còn experimental)
- Next.js 16 chưa tương thích đầy đủ

**Vercel hoạt động hoàn hảo** với Next.js 16 + Edge Runtime! ✅

---

## ✅ Vercel (Khuyên dùng - Dễ nhất)

### 1. Deploy tự động
1. Truy cập: https://vercel.com/new
2. Import repository từ GitHub
3. Vercel tự động detect Next.js
4. Click **Deploy**

### 2. Environment Variables
Vào **Settings** → **Environment Variables**, thêm:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
NOTIFY_EMAIL=your-email@example.com
GOOGLE_SHEETS_SCRIPT_URL=https://script.google.com/macros/s/xxxxx/exec
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
```

### 3. Redeploy
Click **Redeploy** để apply environment variables.

✅ **Done!** API endpoint: `https://your-project.vercel.app/api/contact`

---

## ⚡ Cloudflare Pages

### 1. Connect Repository
1. Truy cập: https://dash.cloudflare.com
2. **Pages** → **Create a project** → **Connect to Git**
3. Chọn repository

### 2. Build Settings
```
Framework preset: Next.js
Build command: npx @cloudflare/next-on-pages
Build output directory: .vercel/output/static
```

### 3. ⚠️ Enable Node.js Compatibility (QUAN TRỌNG!)
Vào **Settings** → **Functions** → **Compatibility Flags**:
- Thêm flag: `nodejs_compat`
- Áp dụng cho **cả Production và Preview**

### 4. Environment Variables
Trong **Settings** → **Environment variables**:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
NOTIFY_EMAIL=your-email@example.com
GOOGLE_SHEETS_SCRIPT_URL=https://script.google.com/macros/s/xxxxx/exec
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
NODE_VERSION=18
```

⚠️ **Lưu ý:** Thêm cho cả **Production** và **Preview**.

### 5. Install Adapter
```bash
npm install --save-dev @cloudflare/next-on-pages
```

### 6. Update package.json
```json
{
  "scripts": {
    "pages:build": "npx @cloudflare/next-on-pages",
    "pages:dev": "npx @cloudflare/next-on-pages --watch"
  }
}
```

### 7. Deploy
Push code và Cloudflare sẽ tự động build.

✅ **Done!** API endpoint: `https://your-project.pages.dev/api/contact`

---

## 🔍 So sánh

| Feature | Vercel | Cloudflare Pages |
|---------|--------|------------------|
| **Setup** | ⭐⭐⭐ Cực dễ | ⭐⭐ Cần config thêm |
| **Performance** | ⭐⭐⭐ Rất nhanh | ⭐⭐⭐ Rất nhanh |
| **Free tier** | 100 GB bandwidth | Unlimited |
| **Edge Functions** | ✅ Included | ✅ Included |
| **Analytics** | ✅ Built-in | ✅ Built-in |
| **Custom Domain** | ✅ Free | ✅ Free |
| **DDoS Protection** | ✅ | ✅ |

---

## 🧪 Test API Endpoint

### Dùng curl:
```bash
curl -X POST https://your-domain.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "workEmail": "test@example.com",
    "company": "Test Company",
    "useCase": "Testing",
    "message": "This is a test"
  }'
```

### Response thành công:
```json
{"ok": true}
```

---

## 🐛 Troubleshooting

### Vercel: 405 Method Not Allowed
- ✅ **Fixed!** API route đã được tạo lại với Edge Runtime
- Kiểm tra Environment Variables đã được thêm chưa
- Redeploy project

### Cloudflare: "nodejs_compat compatibility flag" Error
**Lỗi:** `no nodejs_compat compatibility flag set`

**Fix:**
1. Vào **Settings** → **Functions** → **Compatibility Flags**
2. Thêm flag: `nodejs_compat`
3. Thêm cho **cả Production và Preview**
4. **Save** và **Retry deployment**

### Cloudflare: Function không hoạt động
- Kiểm tra Build command: `npx @cloudflare/next-on-pages`
- Kiểm tra Build output: `.vercel/output/static`
- Kiểm tra Environment Variables (cả Production & Preview)
- Kiểm tra đã thêm `nodejs_compat` flag chưa
- Xem logs tại **Functions** tab

### Không nhận được notifications
- **Email**: Kiểm tra RESEND_API_KEY và NOTIFY_EMAIL
- **Google Sheets**: Kiểm tra GOOGLE_SHEETS_SCRIPT_URL
- **Telegram**: Kiểm tra TELEGRAM_BOT_TOKEN và TELEGRAM_CHAT_ID
- Xem Function logs để debug

---

## 📝 Technical Details

### Vercel
- Sử dụng **Next.js Edge Runtime** cho API route
- File: `src/app/api/contact/route.ts`
- Runtime: `edge` (nhanh hơn, tốn ít tài nguyên hơn)

### Cloudflare Pages
- Sử dụng **@cloudflare/next-on-pages** adapter
- Tương thích với Edge Runtime của Next.js
- Deploy qua Cloudflare Workers

---

## 🎯 Khuyến nghị

**Cho production:**
- **Vercel** - Nếu muốn setup nhanh, ổn định
- **Cloudflare Pages** - Nếu cần unlimited bandwidth, DDoS protection mạnh

**Cả 2 đều:**
- ✅ Miễn phí cho projects nhỏ
- ✅ HTTPS tự động
- ✅ Global CDN
- ✅ Automatic deployments from Git
