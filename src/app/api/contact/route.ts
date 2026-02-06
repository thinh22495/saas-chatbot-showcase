import { sendAllNotifications } from "@/lib/notifications";

function toText(value: unknown) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const fullName = toText(payload.fullName);
  const workEmail = toText(payload.workEmail);
  const phone = toText(payload.phone);
  const company = toText(payload.company);
  const role = toText(payload.role);
  const useCase = toText(payload.useCase);
  const message = toText(payload.message);

  if (!fullName || !workEmail || !company || !useCase || !message) {
    return new Response(
      JSON.stringify({ ok: false, error: "Missing required fields" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // Gửi notifications qua Email, Google Sheets, Telegram đồng thời
  await sendAllNotifications({
    fullName,
    workEmail,
    phone,
    company,
    role,
    useCase,
    message,
  });

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
