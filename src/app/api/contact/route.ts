import { Resend } from "resend";

export const runtime = "edge"; // Use Edge Runtime for better compatibility

type DemoRequest = {
  fullName: string;
  workEmail: string;
  phone?: string;
  company: string;
  role?: string;
  useCase: string;
  message: string;
};

function toText(value: unknown) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

// Email Notification với Resend
async function sendEmailNotification(data: DemoRequest) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.NOTIFY_EMAIL;

  if (!resendApiKey || !notifyEmail) {
    console.warn("Email notification skipped: Missing RESEND_API_KEY or NOTIFY_EMAIL");
    return;
  }

  try {
    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: "Demo Request <onboarding@resend.dev>",
      to: notifyEmail,
      subject: `🎯 Yêu cầu demo mới từ ${data.company}`,
      html: `
        <h2>Yêu cầu demo mới</h2>
        <p><strong>Họ tên:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.workEmail}</p>
        ${data.phone ? `<p><strong>Số điện thoại:</strong> ${data.phone}</p>` : ""}
        <p><strong>Công ty:</strong> ${data.company}</p>
        ${data.role ? `<p><strong>Vai trò:</strong> ${data.role}</p>` : ""}
        <p><strong>Use case:</strong> ${data.useCase}</p>
        <p><strong>Mô tả:</strong></p>
        <p>${data.message}</p>
        <hr>
        <p><small>Gửi lúc: ${new Date().toLocaleString("vi-VN")}</small></p>
      `,
    });

    console.log("✅ Email notification sent");
  } catch (error) {
    console.error("❌ Email notification failed:", error);
  }
}

// Google Sheets Integration
async function saveToGoogleSheets(data: DemoRequest) {
  const scriptUrl = process.env.GOOGLE_SHEETS_SCRIPT_URL;

  if (!scriptUrl) {
    console.warn("Google Sheets skipped: Missing GOOGLE_SHEETS_SCRIPT_URL");
    return;
  }

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: data.fullName,
        workEmail: data.workEmail,
        phone: data.phone || "",
        company: data.company,
        role: data.role || "",
        useCase: data.useCase,
        message: data.message,
        timestamp: new Date().toISOString(),
      }),
    });

    if (response.ok) {
      console.log("✅ Saved to Google Sheets");
    } else {
      console.error("❌ Google Sheets failed:", response.statusText);
    }
  } catch (error) {
    console.error("❌ Google Sheets error:", error);
  }
}

// Telegram Bot Notification
async function sendTelegramNotification(data: DemoRequest) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn("Telegram skipped: Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
    return;
  }

  try {
    const message = `
🎯 *Yêu cầu demo mới*

👤 *Họ tên:* ${data.fullName}
📧 *Email:* ${data.workEmail}
${data.phone ? `📱 *Số ĐT:* ${data.phone}` : ""}
🏢 *Công ty:* ${data.company}
${data.role ? `💼 *Vai trò:* ${data.role}` : ""}
📋 *Use case:* ${data.useCase}

💬 *Mô tả:*
${data.message}

⏰ ${new Date().toLocaleString("vi-VN")}
    `.trim();

    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown",
        }),
      }
    );

    if (response.ok) {
      console.log("✅ Telegram notification sent");
    } else {
      console.error("❌ Telegram failed:", response.statusText);
    }
  } catch (error) {
    console.error("❌ Telegram error:", error);
  }
}

// Gửi tất cả notifications đồng thời
async function sendAllNotifications(data: DemoRequest) {
  await Promise.allSettled([
    sendEmailNotification(data),
    saveToGoogleSheets(data),
    sendTelegramNotification(data),
  ]);
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Invalid JSON" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
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
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
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
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
