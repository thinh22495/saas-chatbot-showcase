import crypto from "node:crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || "dev-secret-change-me";
}

function sign(value: string) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createSessionToken(userId: number) {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = `${userId}:${expiresAt}`;
  const signature = sign(payload);
  return `${payload}:${signature}`;
}

export function verifySessionToken(token: string | undefined) {
  if (!token) return null;
  const parts = token.split(":");
  if (parts.length !== 3) return null;
  const [userIdRaw, expiresRaw, signature] = parts;
  const payload = `${userIdRaw}:${expiresRaw}`;
  if (sign(payload) !== signature) return null;
  const expiresAt = Number(expiresRaw);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return null;
  const userId = Number(userIdRaw);
  if (!Number.isFinite(userId)) return null;
  return { userId };
}

export function setSessionCookie(token: string) {
  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export function clearSessionCookie() {
  cookies().set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export function getSessionFromCookies() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}
