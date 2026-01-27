type RequestContext = {
  request: Request;
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestPost({ request }: RequestContext) {
  try {
    const payload = await request.json();
    console.log("Contact request:", payload);
  } catch (error) {
    return jsonResponse({ ok: false, error: "Invalid JSON" }, 400);
  }

  return jsonResponse({ ok: true });
}

export function onRequestGet() {
  return new Response("Method Not Allowed", { status: 405 });
}
