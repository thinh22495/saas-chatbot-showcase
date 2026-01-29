type RequestContext = {
  request: Request;
  env?: {
    GOOGLE_SHEETS_WEBHOOK?: string;
    GOOGLE_SHEETS_SECRET?: string;
  };
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function toSafeText(value: unknown) {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value.trim();
  return String(value);
}

export async function onRequestPost({ request, env }: RequestContext) {
  try {
    const payload = await request.json();
    const webhook = env?.GOOGLE_SHEETS_WEBHOOK?.trim();

    if (!webhook) {
      console.warn("Missing GOOGLE_SHEETS_WEBHOOK env var.");
      return jsonResponse({ ok: false, error: "Webhook not configured" }, 500);
    }

    const body: Record<string, unknown> = {
      ...payload,
      createdAt: new Date().toISOString(),
      meta: {
        userAgent: toSafeText(request.headers.get("user-agent")),
        referer: toSafeText(request.headers.get("referer")),
        ip: toSafeText(request.headers.get("cf-connecting-ip")),
      },
    };

    if (env?.GOOGLE_SHEETS_SECRET) {
      body.token = env.GOOGLE_SHEETS_SECRET;
    }

    const response = await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Sheets webhook error:", response.status, errorText);
      return jsonResponse({ ok: false, error: "Webhook request failed" }, 502);
    }
  } catch (error) {
    return jsonResponse({ ok: false, error: "Invalid JSON" }, 400);
  }

  return jsonResponse({ ok: true });
}

export function onRequestGet() {
  return new Response("Method Not Allowed", { status: 405 });
}
