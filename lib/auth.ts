import "server-only";
import { cache } from "react";
import { headers } from "next/headers";
import { createSession, destroySession, getSessionUserId } from "./session";
import { hashPassword, verifyPassword } from "./password";
import {
  createUser,
  findUserByEmail,
  findUserById,
  findUserWithHashByEmail,
} from "./repositories/users";
import type { User } from "./types";

/**
 * Geçerli oturumdaki kullanıcı. `cache` ile aynı istek içinde tek DB sorgusu yapılır.
 */
export const getCurrentUser = cache(async (): Promise<User | null> => {
  const userId = await getSessionUserId();
  if (!userId) return null;
  return findUserById(userId);
});

export class AuthError extends Error {}

export async function register(input: {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  company?: string;
}): Promise<User> {
  const email = input.email.trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    throw new AuthError("Geçerli bir e-posta adresi girin.");
  }
  if (input.password.length < 8) {
    throw new AuthError("Şifre en az 8 karakter olmalıdır.");
  }
  if (input.fullName.trim().length < 2) {
    throw new AuthError("Ad soyad zorunludur.");
  }

  const existing = await findUserByEmail(email);
  if (existing) {
    throw new AuthError("Bu e-posta ile zaten bir hesap var.");
  }

  const passwordHash = await hashPassword(input.password);
  const id = await createUser({
    email,
    passwordHash,
    fullName: input.fullName.trim(),
    phone: input.phone?.trim() || null,
    company: input.company?.trim() || null,
  });

  await startSessionFor(id);
  const user = await findUserById(id);
  if (!user) throw new AuthError("Kullanıcı oluşturulamadı.");
  return user;
}

export async function login(email: string, password: string): Promise<User> {
  const record = await findUserWithHashByEmail(email.trim().toLowerCase());
  // Zamanlama saldırılarını azaltmak için kullanıcı yoksa da doğrulama yapılır.
  const ok = record
    ? await verifyPassword(password, record.passwordHash)
    : await verifyPassword(password, "$2b$10$invalidinvalidinvalidinvalidinvalidinvalidinva");
  if (!record || !ok) {
    throw new AuthError("E-posta veya şifre hatalı.");
  }
  await startSessionFor(record.id);
  return record;
}

export async function logout(): Promise<void> {
  await destroySession();
}

async function startSessionFor(userId: number): Promise<void> {
  const h = await headers();
  await createSession(userId, {
    userAgent: h.get("user-agent"),
    ip: h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
  });
}

/** Route handler / server action içinde kullanıcı zorunlu kılmak için. */
export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) throw new AuthError("Bu işlem için giriş yapmalısınız.");
  return user;
}

export async function requireAdmin(): Promise<User> {
  const user = await requireUser();
  if (user.role !== "admin") throw new AuthError("Bu alana erişim yetkiniz yok.");
  return user;
}
