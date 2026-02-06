import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "app.db");

let dbInstance: Database.Database | null = null;

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function hashPassword(password: string, salt: string) {
  return crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");
}

export function getDb() {
  if (dbInstance) return dbInstance;

  ensureDataDir();
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      password_salt TEXT NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS demo_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      work_email TEXT NOT NULL,
      phone TEXT,
      company TEXT NOT NULL,
      role TEXT,
      use_case TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL,
      user_agent TEXT,
      referer TEXT,
      ip TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_demo_requests_created_at
      ON demo_requests(created_at DESC);
  `);

  dbInstance = db;
  return db;
}

export function ensureAdminUser() {
  const email = process.env.ADMIN_EMAIL?.trim();
  const password = process.env.ADMIN_PASSWORD?.trim();

  if (!email || !password) {
    return;
  }

  const db = getDb();
  const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
  if (existing) return;

  const salt = crypto.randomBytes(16).toString("hex");
  const passwordHash = hashPassword(password, salt);

  db.prepare(
    "INSERT INTO users (email, password_hash, password_salt, created_at) VALUES (?, ?, ?, ?)"
  ).run(email, passwordHash, salt, new Date().toISOString());
}

export function verifyUser(email: string, password: string) {
  const db = getDb();
  const user = db
    .prepare(
      "SELECT id, email, password_hash, password_salt FROM users WHERE email = ?"
    )
    .get(email) as
    | { id: number; email: string; password_hash: string; password_salt: string }
    | undefined;

  if (!user) return null;

  const computed = hashPassword(password, user.password_salt);
  if (computed !== user.password_hash) return null;

  return { id: user.id, email: user.email };
}
