# PHASE 4 — Immersive Background + Media Showcase

ROLE
Bạn là senior frontend engineer. Mục tiêu Phase 4 là nâng mức “wow” bằng hiệu ứng background tương tác theo chuột và thêm cụm media (slide ảnh tĩnh + video) nhưng vẫn giữ performance, cấu trúc config‑driven, và không hardcode nội dung.

KIỂM TRA HIỆN TRẠNG (nhanh)
- Background hiện tại chủ yếu là gradient tĩnh ở Hero, chưa có hiệu ứng theo chuột.
- Chưa có section chứa slider ảnh tĩnh hoặc video.
- Config và schema chưa có vùng dữ liệu cho media/background FX.

GOALS
- Tạo hiệu ứng nền “AI/tech” tương tác với chuột: nhẹ, mượt, không gây lag.
- Thêm section media: slider ảnh tĩnh + video demo hợp lý.
- Mọi text/caption/link/video source phải lấy từ config JSON.
- Tôn trọng accessibility (prefers‑reduced‑motion) + mobile (touch).

Ý TƯỞNG THỊ GIÁC
- “Neural Grid + Nebula Glow”: nền có lớp grid mảnh + glow radial bám theo chuột.
- Nền phản ứng nhẹ theo hover (parallax ảo), màu brand‑primary/brand‑accent.
- Section media mang cảm giác “product lab”: khung ảnh + video trong card glassmorphism.

SCOPE CHÍNH
1) Background FX (global hoặc bọc quanh Hero + 1–2 section đầu)
2) Media Showcase Section (slider ảnh tĩnh + video demo)
3) Cập nhật config/types/loader + thêm assets mẫu

CONFIG CHANGES (bắt buộc)
- Thêm `backgroundFx`:
  - enabled: boolean
  - mode: "glow-grid" | "particles" (ưu tiên glow-grid)
  - intensity: number (0–1)
  - size: number (px)
  - disableOnMobile: boolean
  - blur: number
  - colors: string[] (mảng màu brand để blend)
- Thêm `mediaShowcase`:
  - enabled: boolean
  - title: string
  - subtitle: string
  - slides: [{ src, alt, label, description, tags[] }]
  - autoplay: boolean
  - intervalMs: number
- Thêm `productVideo`:
  - enabled: boolean
  - title: string
  - subtitle: string
  - poster: string
  - sources: [{ src, type }] (mp4/webm)
  - controls: boolean
  - loop: boolean
  - muted: boolean

IMPLEMENTATION TASKS (chi tiết)
1) Types + Schema
   - Update `src/config/site.types.ts` với BackgroundFxConfig, MediaShowcaseConfig, ProductVideoConfig.
   - Update `src/config/site.loader.ts` (zod) theo đúng shape.
   - Update `src/config/site.config.json` thêm dữ liệu mẫu (không hardcode trong component).

2) Background FX Component
   - Tạo `src/components/sections/background-fx.tsx` (client component).
   - Dùng `pointermove` + `requestAnimationFrame` để set CSS vars `--cursor-x`, `--cursor-y`.
   - Lớp nền gồm:
     - glow radial bám theo chuột
     - grid mảnh (linear-gradient) + noise nhẹ
   - Tối ưu: disable khi `prefers-reduced-motion` hoặc `disableOnMobile=true`.
   - Cho phép bật/tắt bằng `backgroundFx.enabled`.

3) Media Showcase Section
   - Tạo `src/components/sections/media-showcase.tsx`.
   - Layout 2 cột:
     - Trái: slider ảnh tĩnh (next/image) + caption/tags.
     - Phải: video card (HTML5 video) với poster.
   - Slider:
     - Prev/Next + dots, hỗ trợ swipe nhẹ trên mobile.
     - Autoplay nếu config bật (tạm dừng khi hover).
     - Animation chuyển slide bằng Framer Motion.

4) Page integration
   - Import `BackgroundFx` và `MediaShowcaseSection` vào `src/app/(marketing)/page.tsx`.
   - Gợi ý vị trí: sau Hero hoặc trước Demo để tăng “wow” sớm.

5) Assets mẫu
   - Thêm ảnh vào `public/media/` (ví dụ: `ui-1.jpg`, `ui-2.jpg`, `ui-3.jpg`).
   - Thêm video ngắn vào `public/video/` (ví dụ: `product-demo.mp4`) + poster.
   - Nếu chưa có video thực, dùng placeholder và note để thay sau.

6) Styling & Motion
   - Không thêm CSS file mới; tận dụng Tailwind + inline style.
   - Các class dùng `bg-[radial-gradient(...)]`, `bg-[linear-gradient(...)]`.
   - Dùng `MotionSection` và `sectionVariants` cho entrance.

7) QA / PERF
   - Kiểm tra không hardcode text.
   - Verify `prefers-reduced-motion`, mobile touch không lag.
   - Ensure video không auto‑play có âm thanh (muted=true).

DELIVERABLE CHECKLIST
- Background tương tác theo chuột hoạt động mượt.
- Có section media (slide ảnh + video) render theo config.
- Types + zod schema + config cập nhật đầy đủ.
- Không có hardcode nội dung trong JSX.
- UI responsive, dark/light ổn.

OUTPUT NOTE
- Sau Phase 4, chạy: `npm run dev` để xem hiệu ứng + media.
