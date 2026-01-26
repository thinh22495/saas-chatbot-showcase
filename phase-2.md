# PHASE 2 — Build Sections + UI + Motion

ROLE
Bạn là senior frontend engineer. Tiếp tục từ code Phase 1.

GOAL
Hoàn thiện trang landing chính theo config, từng section nằm ở /src/components/sections. Mọi nội dung lấy từ config. UI sáng tạo, không “default”.

REQUIREMENTS
- Mỗi section: props typed, chỉ render khi enabled=true, có anchor id (#features, #architecture…).
- Dùng Framer Motion để fade/slide + stagger.
- UI responsive desktop/tablet/mobile.
- Dark mode toggle trong header.
- Dùng next/image cho hình (nếu có). Không hardcode text.
- Use shadcn/ui cho Button, Card, Badge, Accordion, Input, Textarea, Tabs (nếu cần).
- Section divider + background gradient/pattern.

TASKS
1) Tạo components:
   - Header/Nav (CTA + theme toggle)
   - HeroSection
   - TrustSection
   - FeaturesSection
   - HowItWorksSection
   - ArchitectureSection
   - DemoSection (mock chat widget nếu mode="mock", iframe nếu mode="iframe")
   - UseCasesSection
   - PricingSection (highlighted plan style khác rõ rệt)
   - FaqSection (Accordion)
   - ContactSection (form layout, chưa cần submit logic)
   - FooterSection
2) Tạo /src/app/(marketing)/page.tsx để render các section theo thứ tự hợp lý.
3) Dùng `icon-map.tsx` để render icon từ config.features.items[].icon.
4) Đảm bảo page load có animation nhẹ và layout “có chủ đích”.

DEMO WIDGET (mock)
- Hiển thị khung chat nhỏ, danh sách messages từ config.
- Có typing animation nhẹ (simulate).
- Input chỉ UI (không cần backend).

ARCHITECTURE DIAGRAM
- Nếu type = "text" thì render dạng code block/mono.
- Nếu "svg" hay "image" thì render phù hợp.

DELIVERABLE CHECKLIST
- Tất cả sections render đúng, chỉ dùng config.
- Responsive & dark mode.
- Không hardcode text.
- No CSS file ngoài Tailwind.
