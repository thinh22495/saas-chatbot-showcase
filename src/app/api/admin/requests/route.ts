import { getSessionFromCookies } from "@/lib/auth";
import { getDb } from "@/lib/db";

async function requireAuth() {
  const session = await getSessionFromCookies();
  if (!session) {
    return new Response(JSON.stringify({ ok: false, error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  return null;
}

export async function GET(request: Request) {
  const authError = await requireAuth();
  if (authError) return authError;

  const url = new URL(request.url);
  const page = Math.max(1, Number(url.searchParams.get("page") || 1));
  const pageSize = Math.min(
    50,
    Math.max(5, Number(url.searchParams.get("pageSize") || 10))
  );
  const offset = (page - 1) * pageSize;

  const db = getDb();
  const totalRow = db
    .prepare("SELECT COUNT(*) as count FROM demo_requests")
    .get() as { count: number };

  const rows = db
    .prepare(
      `SELECT id, full_name, work_email, phone, company, role, use_case, message, created_at
       FROM demo_requests
       ORDER BY datetime(created_at) DESC
       LIMIT ? OFFSET ?`
    )
    .all(pageSize, offset);

  return new Response(
    JSON.stringify({
      ok: true,
      data: rows,
      pagination: {
        page,
        pageSize,
        total: totalRow.count,
        totalPages: Math.ceil(totalRow.count / pageSize),
      },
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

export async function DELETE(request: Request) {
  const authError = await requireAuth();
  if (authError) return authError;

  const url = new URL(request.url);
  const id = Number(url.searchParams.get("id"));
  if (!Number.isFinite(id)) {
    return new Response(JSON.stringify({ ok: false, error: "Invalid id" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const db = getDb();
  const result = db
    .prepare("DELETE FROM demo_requests WHERE id = ?")
    .run(id);

  return new Response(JSON.stringify({ ok: result.changes > 0 }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
