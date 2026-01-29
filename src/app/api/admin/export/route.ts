import { getSessionFromCookies } from "@/lib/auth";
import { getDb } from "@/lib/db";

function requireAuth() {
  const session = getSessionFromCookies();
  if (!session) {
    return new Response(JSON.stringify({ ok: false, error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  return null;
}

function escapeCsv(value: unknown) {
  const text = value === null || value === undefined ? "" : String(value);
  if (/[",\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

export async function GET() {
  const authError = requireAuth();
  if (authError) return authError;

  const db = getDb();
  const rows = db
    .prepare(
      `SELECT full_name, work_email, company, role, use_case, message, created_at
       FROM demo_requests
       ORDER BY datetime(created_at) DESC`
    )
    .all() as Array<Record<string, unknown>>;

  const headers = [
    "full_name",
    "work_email",
    "company",
    "role",
    "use_case",
    "message",
    "created_at",
  ];

  const lines = [headers.join(",")];
  rows.forEach((row) => {
    lines.push(headers.map((key) => escapeCsv(row[key])).join(","));
  });

  return new Response(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=demo_requests.csv",
    },
  });
}
