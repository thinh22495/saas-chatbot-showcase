# PHASE 3 — SEO + API mock + Polish

ROLE
Bạn là senior frontend engineer. Hoàn thiện SEO, contact API, metadata.

TASKS
1) API route contact:
   - /src/app/api/contact/route.ts
   - Nhận POST, log payload, trả JSON { ok: true }.
2) Connect ContactSection với react-hook-form + zod:
   - Validate dựa trên config.contact.fields (required/email/minLength).
   - Hiển thị successMessage khi submit thành công.
3) SEO/Metadata:
   - layout.tsx tạo metadata động từ config (title template, description, og).
   - Tạo sitemap.ts và robots.ts dựa vào config.site.domain.
   - Thêm favicon placeholder (app/icon.png hoặc public/favicon.ico).
4) Final polish:
   - Kiểm tra dark/light theme.
   - Đảm bảo không có hardcode text.
   - Đảm bảo Next.js build không lỗi.

OUTPUT
- Ghi rõ lệnh chạy:
  - npm install
  - npm run dev
- Không cần README dài.
