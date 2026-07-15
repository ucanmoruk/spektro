import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getProductById } from "@/lib/repositories/products";
import { createQuoteRequest } from "@/lib/repositories/quotes";

type IncomingItem = { id: number; quantity?: number };

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const items: IncomingItem[] = Array.isArray(body.items) ? body.items : [];
    const contact = body.contact ?? {};

    if (!contact.name || !contact.email) {
      return NextResponse.json(
        { ok: false, error: "Ad soyad ve e-posta zorunludur." },
        { status: 400 },
      );
    }
    if (items.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Teklif listeniz boş." },
        { status: 400 },
      );
    }

    const user = await getCurrentUser();

    const quoteItems = [];
    for (const raw of items) {
      const product = await getProductById(Number(raw.id));
      quoteItems.push({
        productId: product?.id ?? null,
        name: product?.name ?? "Bilinmeyen ürün",
        brand: product?.brandName ?? null,
        quantity: Math.max(1, Number(raw.quantity) || 1),
      });
    }

    await createQuoteRequest({
      userId: user?.id ?? null,
      name: String(contact.name),
      email: String(contact.email),
      phone: contact.phone ? String(contact.phone) : null,
      company: contact.company ? String(contact.company) : null,
      message: contact.message ? String(contact.message) : null,
      items: quoteItems,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("quote error", err);
    return NextResponse.json({ ok: false, error: "Teklif talebi gönderilemedi." }, { status: 500 });
  }
}
