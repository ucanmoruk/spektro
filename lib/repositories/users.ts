import "server-only";
import { execute, queryOne } from "../db";
import type { User } from "../types";

type UserRow = {
  id: number;
  email: string;
  password_hash: string;
  full_name: string;
  phone: string | null;
  company: string | null;
  tax_office: string | null;
  tax_number: string | null;
  role: "customer" | "admin";
  created_at: string;
};

function mapUser(row: UserRow): User {
  return {
    id: row.id,
    email: row.email,
    fullName: row.full_name,
    phone: row.phone,
    company: row.company,
    taxOffice: row.tax_office,
    taxNumber: row.tax_number,
    role: row.role,
    createdAt: row.created_at,
  };
}

export async function findUserById(id: number): Promise<User | null> {
  const row = await queryOne<UserRow>(`SELECT * FROM users WHERE id = ? AND is_active = 1`, [id]);
  return row ? mapUser(row) : null;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const row = await queryOne<UserRow>(`SELECT * FROM users WHERE email = ? AND is_active = 1`, [
    email.toLowerCase(),
  ]);
  return row ? mapUser(row) : null;
}

/** Şifre doğrulama için hash ile birlikte döndürür. */
export async function findUserWithHashByEmail(
  email: string,
): Promise<(User & { passwordHash: string }) | null> {
  const row = await queryOne<UserRow>(`SELECT * FROM users WHERE email = ? AND is_active = 1`, [
    email.toLowerCase(),
  ]);
  return row ? { ...mapUser(row), passwordHash: row.password_hash } : null;
}

export async function createUser(input: {
  email: string;
  passwordHash: string;
  fullName: string;
  phone?: string | null;
  company?: string | null;
}): Promise<number> {
  const result = await execute(
    `INSERT INTO users (email, password_hash, full_name, phone, company, role)
     VALUES (?, ?, ?, ?, ?, 'customer')`,
    [
      input.email.toLowerCase(),
      input.passwordHash,
      input.fullName,
      input.phone ?? null,
      input.company ?? null,
    ],
  );
  return result.insertId;
}

export async function findUserHashById(id: number): Promise<string | null> {
  const row = await queryOne<{ password_hash: string }>(
    `SELECT password_hash FROM users WHERE id = ? AND is_active = 1`,
    [id],
  );
  return row?.password_hash ?? null;
}

export async function updateUserPassword(id: number, passwordHash: string): Promise<void> {
  await execute(`UPDATE users SET password_hash = ? WHERE id = ?`, [passwordHash, id]);
}

export async function updateUserProfile(
  id: number,
  input: { fullName: string; phone?: string | null; company?: string | null },
): Promise<void> {
  await execute(
    `UPDATE users SET full_name = ?, phone = ?, company = ? WHERE id = ?`,
    [input.fullName, input.phone ?? null, input.company ?? null, id],
  );
}
