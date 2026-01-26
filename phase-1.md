# PHASE 1 — Scaffold + Config + Theme (Next.js 14 App Router)

ROLE
Bạn là senior frontend engineer. Mục tiêu là tạo website giới thiệu sản phẩm chatbot doanh nghiệp theo chuẩn SaaS AI hiện đại, UI đẹp – sáng tạo – tinh gọn, performance tốt. Không hỏi thêm; nếu thiếu thông tin thì tự giả định hợp lý và ghi comment.

SCOPE CHÍNH
Xây nền tảng dự án, cấu trúc thư mục, hệ thống config + types + loader + validate runtime, setup theme + fonts, icon map. Chưa cần làm toàn bộ UI section.

BỐI CẢNH SẢN PHẨM (phải dùng để viết nội dung config mẫu)
Sản phẩm: Enterprise RAG Chatbot 3 tầng.
- Routing 3 tầng: Q&A (exact + vector), Data Query (SQL/API), Fallback LLM.
- Hybrid retrieval: BM25 + vector + rerank.
- Cache Redis + background worker (RQ) để không block request.
- Multi‑LLM: Gemini, OpenAI, Anthropic, Grok + key rotation.
- Metrics Prometheus: /metrics (latency, error rate, quota, queue).
- Evaluation set + feedback loop + threshold tuning.
- Data Query có schema validation + whitelist.
- Routing logs đầy đủ.
- Admin auth: JWT + Google SSO + allowlist email/domain.
- Frontend: Chat UI + Admin UI (Q&A, Data Sources, Query Templates, API Configs, Logs, Feedback, Eval, Metrics, Jobs).

NON‑NEGOTIABLE (from promt.txt)
- Tech stack: Next.js 14+ (App Router) + TypeScript + TailwindCSS + shadcn/ui + Framer Motion + next/image + next/font.
- Không dùng CSS file thủ công ngoài Tailwind (trừ khi cực cần).
- Tuyệt đối không hardcode nội dung trong component. Mọi text/link/pricing/features… phải đọc từ config JSON.
- Có theme light/dark + toggle.
- Có SEO cơ bản: metadata, OpenGraph, favicon placeholder, robots, sitemap.
- Các section sẽ bật/tắt theo config.
- Deploy‑friendly (Vercel).

YÊU CẦU THIẾT KẾ (bắt buộc)
- Tránh layout “AI slop”, không dùng font mặc định (Inter/Roboto/Arial/system).
- Chọn 2 font có cá tính (ví dụ Space Grotesk + Fraunces hoặc Sora + Instrument Serif) qua next/font.
- Có background gradient và/hoặc pattern nhẹ; không dùng nền phẳng đơn điệu.
- Màu sắc định hướng rõ; định nghĩa CSS variables (đặc biệt cho brand).
- Có animation có chủ đích (page‑load + stagger), dùng Framer Motion.

TASKS
1) Tạo dự án Next.js 14.2 (App Router) nếu repo chưa có. Dùng TypeScript + Tailwind.
2) Cài dependencies: shadcn/ui, framer-motion, lucide-react, react-hook-form, zod, next-themes (nếu cần).
3) Tạo cấu trúc thư mục theo spec:
   - /src/app/(marketing)/page.tsx
   - /src/app/layout.tsx
   - /src/components/sections/*
   - /src/components/ui/* (shadcn)
   - /src/components/icon-map.tsx
   - /src/config/site.config.json
   - /src/config/site.types.ts
   - /src/config/site.loader.ts
   - /src/lib/* (cn, validators)
4) Tạo loader + validate runtime cho config. Ưu tiên zod; nếu dùng custom validator thì vẫn phải kiểm tra tối thiểu field chính.
5) Setup ThemeProvider + dark mode trong `layout.tsx` và `globals.css` (Tailwind).
6) Tạo `icon-map.tsx` map string -> icon component (lucide-react).
7) Tạo file config JSON mẫu đầy đủ nội dung theo sản phẩm (bên dưới).

LƯU Ý
- Không tạo CSS file riêng ngoài Tailwind.
- Không hardcode nội dung trong JSX. Mọi text/link đều lấy từ config.

OUTPUT CHECKLIST
- Dự án chạy được.
- Cấu trúc thư mục đúng.
- Config đầy đủ + typed + validate.
- Theme + fonts sẵn sàng.

DEFAULT CONFIG (dán đúng JSON, không comment)
{
  "site": {
    "name": "saas RAG Chatbot",
    "tagline": "Chatbot doanh nghiệp 3 tầng, trả lời đúng dữ liệu – vận hành vững",
    "description": "Nền tảng chatbot LLM cho doanh nghiệp với routing 3 tầng (Exact QA, Data Query, Fallback), hybrid retrieval, quản trị và quan sát đầy đủ. Kết nối dữ liệu nội bộ qua SQL/API an toàn và đo lường chất lượng theo thời gian.",
    "domain": "https://your-domain.com",
    "themeColor": "#0F172A",
    "language": "vi"
  },
  "brand": {
    "logoText": "saas",
    "logoImage": "",
    "primaryColor": "#0EA5E9",
    "accentColor": "#22C55E"
  },
  "nav": {
    "items": [
      { "label": "Tính năng", "href": "#features" },
      { "label": "Kiến trúc", "href": "#architecture" },
      { "label": "Use cases", "href": "#use-cases" },
      { "label": "Bảng giá", "href": "#pricing" },
      { "label": "FAQ", "href": "#faq" }
    ],
    "cta": { "label": "Yêu cầu demo", "href": "#contact" }
  },
  "hero": {
    "enabled": true,
    "headline": "Chatbot RAG 3 tầng cho doanh nghiệp: đúng dữ liệu, đúng ngữ cảnh",
    "subheadline": "Kết hợp Hybrid Retrieval, Data Query an toàn và Multi‑LLM để trả lời nhanh, chính xác và có thể kiểm soát chất lượng ở quy mô lớn.",
    "bullets": [
      "Routing 3 tầng: Exact QA → Data Query → Fallback LLM",
      "Hybrid Retrieval: BM25 + Vector + Rerank",
      "SQL/API query có schema validation + whitelist",
      "Multi‑LLM & key rotation, chống rate‑limit"
    ],
    "primaryCta": { "label": "Yêu cầu demo", "href": "#contact" },
    "secondaryCta": { "label": "Xem kiến trúc", "href": "#architecture" },
    "heroStats": [
      { "label": "Routing tầng", "value": "3" },
      { "label": "LLM providers", "value": "4+" },
      { "label": "Tích hợp", "value": "SQL/API" }
    ]
  },
  "trust": {
    "enabled": true,
    "logos": ["Fintech Co", "Retail Group", "Logistics Hub", "EdTech Labs", "Healthcare One"],
    "badges": ["SSO Ready", "On‑prem / Cloud", "Observability Built‑in"]
  },
  "features": {
    "enabled": true,
    "title": "Tính năng cốt lõi cho chatbot doanh nghiệp",
    "subtitle": "Tối ưu độ chính xác, độ trễ và khả năng vận hành ở quy mô lớn.",
    "items": [
      { "title": "Routing 3 tầng thông minh", "description": "Exact QA → Data Query → Fallback LLM để vừa nhanh vừa đúng dữ liệu.", "icon": "Layers" },
      { "title": "Hybrid Retrieval + Rerank", "description": "BM25 + vector + rerank giúp tăng độ chính xác trong truy xuất.", "icon": "Search" },
      { "title": "Data Query an toàn", "description": "Schema validation, whitelist tables/columns, giảm rủi ro truy vấn sai.", "icon": "Shield" },
      { "title": "Multi‑LLM & Key Rotation", "description": "Gemini/OpenAI/Anthropic/Grok, tự xoay key và xử lý rate‑limit.", "icon": "Shuffle" },
      { "title": "Redis Cache + Worker", "description": "Giảm latency, xử lý background jobs không làm chậm chat.", "icon": "Gauge" },
      { "title": "Observability đầy đủ", "description": "Prometheus metrics, routing logs, theo dõi latency và error rate.", "icon": "BarChart3" },
      { "title": "Admin UI toàn diện", "description": "Q&A, Data Sources, Query Templates, API Configs, Logs, Eval, Feedback.", "icon": "PanelLeft" },
      { "title": "Bảo mật & SSO", "description": "JWT, Google SSO, allowlist email/domain.", "icon": "Lock" }
    ]
  },
  "howItWorks": {
    "enabled": true,
    "title": "Cách hệ thống hoạt động",
    "steps": [
      { "title": "Nạp dữ liệu & cấu hình", "description": "Thêm Q&A, kết nối DB/API, cấu hình query templates." },
      { "title": "User hỏi – hệ thống định tuyến", "description": "Cache → Exact match → Hybrid search → Data Query." },
      { "title": "Trả lời có kiểm soát", "description": "Fallback LLM khi cần, kèm logs & metrics." },
      { "title": "Đo lường & tối ưu", "description": "Eval set + feedback loop, tinh chỉnh ngưỡng routing." }
    ]
  },
  "architecture": {
    "enabled": true,
    "title": "Kiến trúc RAG 3 tầng",
    "subtitle": "FastAPI + PostgreSQL/pgvector + Redis + RQ + Frontend static.",
    "diagram": {
      "type": "text",
      "content": "User → Cache → Exact QA → Hybrid Retrieval → Data Query (SQL/API) → Fallback LLM → Logs/Metrics"
    }
  },
  "demo": {
    "enabled": true,
    "title": "Demo nhanh",
    "subtitle": "Trải nghiệm luồng hỏi đáp và truy vấn dữ liệu nội bộ.",
    "widget": {
      "mode": "mock",
      "mockMessages": [
        { "role": "user", "content": "Chính sách bảo hành của sản phẩm A là gì?" },
        { "role": "assistant", "content": "Sản phẩm A bảo hành 12 tháng, đổi mới trong 30 ngày nếu lỗi kỹ thuật." },
        { "role": "user", "content": "Thống kê doanh số quý này theo khu vực?" },
        { "role": "assistant", "content": "Đang truy vấn dữ liệu… Q3: Miền Bắc 12.3B, Miền Trung 6.1B, Miền Nam 18.4B." }
      ]
    },
    "openDemoCta": { "label": "Open demo", "href": "#contact" }
  },
  "useCases": {
    "enabled": true,
    "title": "Use cases phổ biến",
    "items": [
      { "title": "CSKH & Hỗ trợ sản phẩm", "description": "Giải đáp nhanh chính sách, hướng dẫn, lỗi thường gặp.", "tags": ["Q&A", "Self‑service"] },
      { "title": "Tra cứu dữ liệu nội bộ", "description": "Hỏi đáp trực tiếp với dữ liệu CRM/ERP qua SQL/API.", "tags": ["Data Query", "SQL/API"] },
      { "title": "Hỗ trợ IT/HR", "description": "Quy trình nội bộ, onboarding, chính sách nhân sự.", "tags": ["Internal Knowledge"] },
      { "title": "Báo cáo vận hành", "description": "Tóm tắt KPI, dashboard theo câu hỏi tự nhiên.", "tags": ["Analytics"] }
    ]
  },
  "pricing": {
    "enabled": true,
    "title": "Bảng giá linh hoạt",
    "currency": "USD",
    "plans": [
      {
        "name": "Starter",
        "priceMonthly": 199,
        "priceYearly": 1990,
        "description": "Cho team nhỏ bắt đầu với RAG chatbot.",
        "features": ["1 workspace", "Q&A + Hybrid Retrieval", "Basic metrics", "Email support"],
        "highlighted": false,
        "ctaLabel": "Bắt đầu",
        "ctaHref": "#contact"
      },
      {
        "name": "Pro",
        "priceMonthly": 499,
        "priceYearly": 4990,
        "description": "Dành cho đội vận hành cần Data Query.",
        "features": ["Multi‑LLM", "SQL/API query", "Eval + feedback", "Priority support"],
        "highlighted": true,
        "ctaLabel": "Đặt lịch demo",
        "ctaHref": "#contact"
      },
      {
        "name": "Enterprise",
        "priceMonthly": 999,
        "priceYearly": 9990,
        "description": "Bảo mật, SSO, tùy biến sâu.",
        "features": ["SSO + allowlist", "Custom SLA", "On‑prem option", "Dedicated success"],
        "highlighted": false,
        "ctaLabel": "Liên hệ",
        "ctaHref": "#contact"
      }
    ]
  },
  "faq": {
    "enabled": true,
    "title": "Câu hỏi thường gặp",
    "items": [
      { "q": "Hệ thống có cần dữ liệu sạch không?", "a": "Có. Dữ liệu càng chuẩn hóa, độ chính xác càng cao. Có thể import Excel hoặc kết nối DB/API." },
      { "q": "Có hỗ trợ nhiều LLM cùng lúc không?", "a": "Có. Multi‑LLM và key rotation giúp tối ưu chi phí và độ ổn định." },
      { "q": "Data Query có an toàn không?", "a": "Có. Query chỉ chạy qua whitelist và schema validation." },
      { "q": "Có hỗ trợ SSO?", "a": "Có. JWT + Google SSO, allowlist email/domain." },
      { "q": "Có thể triển khai on‑prem không?", "a": "Có. Hỗ trợ Docker/Hybrid tùy nhu cầu." }
    ]
  },
  "contact": {
    "enabled": true,
    "title": "Yêu cầu demo",
    "subtitle": "Để lại thông tin, đội ngũ sẽ liên hệ trong 24h.",
    "fields": [
      { "name": "fullName", "label": "Họ và tên", "type": "text", "placeholder": "Nguyễn Văn A", "required": true, "minLength": 2 },
      { "name": "workEmail", "label": "Email công việc", "type": "email", "placeholder": "name@company.com", "required": true },
      { "name": "company", "label": "Công ty", "type": "text", "placeholder": "Công ty ABC", "required": true },
      { "name": "role", "label": "Vai trò", "type": "text", "placeholder": "CTO / Head of CSKH", "required": false },
      {
        "name": "useCase",
        "label": "Use case",
        "type": "select",
        "placeholder": "Chọn use case",
        "required": true,
        "options": ["CSKH", "Tra cứu dữ liệu", "Hỗ trợ nội bộ", "Báo cáo vận hành"]
      },
      { "name": "message", "label": "Mô tả nhu cầu", "type": "textarea", "placeholder": "Bạn muốn chatbot giải quyết vấn đề gì?", "required": true, "minLength": 10 }
    ],
    "submit": { "label": "Gửi yêu cầu demo" },
    "successMessage": "Cảm ơn bạn! Chúng tôi sẽ liên hệ trong vòng 24 giờ."
  },
  "footer": {
    "columns": [
      {
        "title": "Sản phẩm",
        "links": [
          { "label": "Tính năng", "href": "#features" },
          { "label": "Kiến trúc", "href": "#architecture" },
          { "label": "Use cases", "href": "#use-cases" }
        ]
      },
      {
        "title": "Tài nguyên",
        "links": [
          { "label": "Bảng giá", "href": "#pricing" },
          { "label": "FAQ", "href": "#faq" },
          { "label": "Demo", "href": "#contact" }
        ]
      },
      {
        "title": "Công ty",
        "links": [
          { "label": "Liên hệ", "href": "#contact" },
          { "label": "Chính sách", "href": "#privacy" },
          { "label": "Điều khoản", "href": "#terms" }
        ]
      }
    ],
    "socials": [
      { "label": "LinkedIn", "href": "#" },
      { "label": "GitHub", "href": "#" },
      { "label": "YouTube", "href": "#" }
    ],
    "copyright": "© 2026 saas. All rights reserved."
  },
  "legal": {
    "privacyUrl": "#privacy",
    "termsUrl": "#terms"
  }
}
