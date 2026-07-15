import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { errorResponse } from "@/lib/api-guard";
import { hashPassword, verifyPassword } from "@/lib/password";
import { findUserHashById, updateUserPassword } from "@/lib/repositories/users";

// Giriş yapmış herhangi bir kullanıcı (müşteri veya admin) kendi şifresini değiştirir.
export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const body = await request.json();
    const current = String(body.currentPassword ?? "");
    const next = String(body.newPassword ?? "");

    if (next.length < 8) {
      throw new Error("Yeni şifre en az 8 karakter olmalıdır.");
    }

    const hash = await findUserHashById(user.id);
    if (!hash || !(await verifyPassword(current, hash))) {
      throw new Error("Mevcut şifre hatalı.");
    }

    await updateUserPassword(user.id, await hashPassword(next));
    return NextResponse.json({ ok: true });
  } catch (err) {
    return errorResponse(err);
  }
}
