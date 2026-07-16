import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

// DB bağlantısını test eder. Kimlik bilgisi SIZDIRMAZ; yalnızca bağlanılan
// host/port ve (varsa) hata kodunu döndürür. Vercel'de sorunu teşhis için:
//   https://<domain>/api/health/db
export async function GET() {
  const target = {
    host: process.env.DATABASE_URL ? "(DATABASE_URL)" : process.env.DB_HOST ?? "(tanımsız)",
    port: process.env.DB_PORT ?? "3306",
    db: process.env.DB_NAME ?? "(tanımsız)",
    hasPassword: Boolean(process.env.DB_PASSWORD || process.env.DATABASE_URL),
  };
  try {
    const rows = await query<{ n: number }>("SELECT COUNT(*) AS n FROM products");
    return NextResponse.json({ ok: true, target, productCount: rows[0]?.n ?? 0 });
  } catch (err) {
    const e = err as { code?: string; errno?: number; message?: string };
    return NextResponse.json(
      {
        ok: false,
        target,
        error: { code: e.code ?? null, errno: e.errno ?? null, message: e.message ?? String(err) },
      },
      { status: 500 },
    );
  }
}
