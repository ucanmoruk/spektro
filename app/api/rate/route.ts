import { NextResponse } from "next/server";
import { convertToTry } from "@/lib/exchange";

// Güncel TCMB kuru (1 birim döviz = kaç TRY). Sepette TL karşılığını göstermek için.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const from = (searchParams.get("from") || "EUR").toUpperCase();
  try {
    const conv = await convertToTry(1, from);
    return NextResponse.json({ ok: true, from, rate: conv.rate, date: conv.date });
  } catch {
    return NextResponse.json({ ok: false, error: "Kur alınamadı." }, { status: 503 });
  }
}
