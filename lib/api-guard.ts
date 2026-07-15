import { NextResponse } from "next/server";
import { AuthError } from "./auth";

/** Route handler'larda tekdüze hata yanıtı üretir. */
export function errorResponse(err: unknown): NextResponse {
  if (err instanceof AuthError) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 401 });
  }
  if (err instanceof Error) {
    console.error("api error", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 400 });
  }
  console.error("api error", err);
  return NextResponse.json({ ok: false, error: "Sunucu hatası." }, { status: 500 });
}
