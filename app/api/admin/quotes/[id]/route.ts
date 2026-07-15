import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { errorResponse } from "@/lib/api-guard";
import { updateQuoteStatus } from "@/lib/repositories/quotes";
import type { QuoteStatus } from "@/lib/types";

const QUOTE_STATUSES: QuoteStatus[] = ["new", "contacted", "quoted", "won", "lost"];

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Ctx) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();
    if (!QUOTE_STATUSES.includes(body.status)) {
      throw new Error("Geçersiz teklif durumu.");
    }
    await updateQuoteStatus(Number(id), body.status);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return errorResponse(err);
  }
}
