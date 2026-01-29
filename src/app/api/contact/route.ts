import { getDb } from "@/lib/db";

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

  const db = getDb();
  db.prepare(
    `INSERT INTO demo_requests
      (full_name, work_email, company, role, use_case, message, created_at, user_agent, referer, ip)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    fullName,
    workEmail,
    company,
    role || null,
    useCase,
    message,
    new Date().toISOString(),
    request.headers.get("user-agent") || null,
    request.headers.get("referer") || null,
    request.headers.get("x-forwarded-for") || null
  );

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
