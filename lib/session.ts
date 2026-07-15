import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { execute, query } from "./db";

// -----------------------------------------------------------------------------
// Oturum yönetimi.
// - Ham token yalnızca httpOnly cookie'de tutulur.
// - DB'de token'ın SHA-256 özeti saklanır (sızıntı halinde ham token elde edilemez).
// - Oturumlar iptal edilebilir (satır silinir) ve süre sonu (expires_at) vardır.
// -----------------------------------------------------------------------------

export const SESSION_COOKIE = "spektro_session";
const SESSION_TTL_DAYS = 30;

function sha256(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}

/** Yeni oturum oluşturur, cookie'yi yazar ve ham token'ı döndürür. */
export async function createSession(
  userId: number,
  meta: { userAgent?: string | null; ip?: string | null } = {},
): Promise<void> {
  const token = crypto.randomBytes(32).toString("hex");
  const id = sha256(token);
  const expires = new Date(Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000);
  const expiresSql = expires.toISOString().slice(0, 19).replace("T", " ");

  await execute(
    `INSERT INTO sessions (id, user_id, user_agent, ip, expires_at)
     VALUES (?, ?, ?, ?, ?)`,
    [id, userId, meta.userAgent ?? null, meta.ip ?? null, expiresSql],
  );

  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires,
  });
}

/** Geçerli oturuma ait user_id'yi döndürür (yoksa null). */
export async function getSessionUserId(): Promise<number | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const id = sha256(token);
  const rows = await query<{ user_id: number }>(
    `SELECT user_id FROM sessions WHERE id = ? AND expires_at > UTC_TIMESTAMP() LIMIT 1`,
    [id],
  );
  return rows[0]?.user_id ?? null;
}

/** Mevcut oturumu sonlandırır (DB satırı + cookie). */
export async function destroySession(): Promise<void> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) {
    await execute(`DELETE FROM sessions WHERE id = ?`, [sha256(token)]);
  }
  store.delete(SESSION_COOKIE);
}
