import { NextResponse } from "next/server";
import { AuthError, register } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const user = await register({
      email: String(body.email ?? ""),
      password: String(body.password ?? ""),
      fullName: String(body.fullName ?? ""),
      phone: body.phone ? String(body.phone) : undefined,
      company: body.company ? String(body.company) : undefined,
    });
    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email } });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ ok: false, error: err.message }, { status: 400 });
    }
    console.error("register error", err);
    return NextResponse.json({ ok: false, error: "Sunucu hatası." }, { status: 500 });
  }
}
