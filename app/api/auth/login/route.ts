import { NextResponse } from "next/server";
import { AuthError, login } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await login(String(body.email ?? ""), String(body.password ?? ""));
    return NextResponse.json({
      ok: true,
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 401 });
    }
    console.error("login error", err);
    return NextResponse.json({ ok: false, error: "Sunucu hatası." }, { status: 500 });
  }
}
