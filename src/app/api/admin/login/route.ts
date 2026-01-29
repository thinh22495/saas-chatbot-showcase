import { ensureAdminUser, verifyUser } from "@/lib/db";
import { createSessionToken, setSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  let payload: { email?: string; password?: string };

  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  ensureAdminUser();

  const email = payload.email?.trim() || "";
  const password = payload.password?.trim() || "";

  if (!email || !password) {
    return new Response(
      JSON.stringify({ ok: false, error: "Missing credentials" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const user = verifyUser(email, password);
  if (!user) {
    return new Response(JSON.stringify({ ok: false, error: "Invalid login" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const token = createSessionToken(user.id);
  setSessionCookie(token);

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
