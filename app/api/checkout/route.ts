import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getProductById } from "@/lib/repositories/products";
import { createOrder } from "@/lib/repositories/orders";
import { getPaymentProvider } from "@/lib/payments";
import { convertToTry } from "@/lib/exchange";
import { formatPrice } from "@/lib/format";

// Tahsilat para birimi: PayTR TL ile çalıştığı için siparişler TL'ye çevrilir.
const CHARGE_CURRENCY = "TRY";

type IncomingItem = { id: number; quantity: number };

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const items: IncomingItem[] = Array.isArray(body.items) ? body.items : [];
    const customer = body.customer ?? {};

    if (items.length === 0) {
      return NextResponse.json({ ok: false, error: "Sepetiniz boş." }, { status: 400 });
    }
    if (!customer.name || !customer.email) {
      return NextResponse.json(
        { ok: false, error: "Ad soyad ve e-posta zorunludur." },
        { status: 400 },
      );
    }
    const invoiceType = customer.invoiceType === "corporate" ? "corporate" : "individual";
    if (invoiceType === "corporate" && !customer.company) {
      return NextResponse.json(
        { ok: false, error: "Kurumsal fatura için firma/unvan bilgisi zorunludur." },
        { status: 400 },
      );
    }

    const user = await getCurrentUser();

    // Fiyatları güvenilir kaynaktan (DB) doğrula — client'tan gelen fiyata güvenilmez.
    // Kaynak kalemler ürünün kendi para biriminde (genelde EUR) toplanır.
    const sourceItems = [];
    for (const raw of items) {
      const product = await getProductById(Number(raw.id));
      if (!product || !product.isActive || !product.isDirectSale) continue;
      const unitPrice = product.discountedPrice ?? product.price;
      if (unitPrice === null) continue;
      const quantity = Math.max(1, Math.min(999, Number(raw.quantity) || 1));
      sourceItems.push({ product, unitPrice, quantity });
    }

    if (sourceItems.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Sepetteki ürünler satın alınabilir durumda değil." },
        { status: 400 },
      );
    }

    // Fiyatlar EUR gösterilir; ödeme o günkü TCMB kuruyla TL'ye çevrilip tahsil edilir.
    const orderItems = [];
    let sourceTotal = 0;
    const sourceCurrency = sourceItems[0].product.currency;
    let usedRate: { rate: number; date: string } | null = null;
    try {
      for (const it of sourceItems) {
        const conv = await convertToTry(it.unitPrice, it.product.currency);
        if (conv.rate !== 1) usedRate = { rate: conv.rate, date: conv.date };
        sourceTotal += it.unitPrice * it.quantity;
        orderItems.push({
          productId: it.product.id,
          name: it.product.name,
          sku: it.product.sku,
          unitPrice: conv.amount,
          quantity: it.quantity,
        });
      }
    } catch (rateErr) {
      console.error("kur çevrimi başarısız", rateErr);
      return NextResponse.json(
        { ok: false, error: "Güncel döviz kuru alınamadı. Lütfen birkaç dakika sonra tekrar deneyin." },
        { status: 503 },
      );
    }

    // Kur bilgisini siparişe not olarak ekle (şeffaflık / muhasebe).
    const rateNote = usedRate
      ? `Ödeme kuru: 1 ${sourceCurrency} = ${usedRate.rate.toLocaleString("tr-TR", { maximumFractionDigits: 4 })} ₺ (TCMB ${usedRate.date}). ` +
        `Liste tutarı ${formatPrice(sourceTotal, sourceCurrency)}.`
      : null;
    const notes = [customer.notes ? String(customer.notes) : null, rateNote]
      .filter(Boolean)
      .join(" | ");

    const provider = getPaymentProvider();
    const order = await createOrder({
      userId: user?.id ?? null,
      currency: CHARGE_CURRENCY,
      customerName: String(customer.name),
      customerEmail: String(customer.email),
      customerPhone: customer.phone ? String(customer.phone) : null,
      invoiceType,
      company: customer.company ? String(customer.company) : null,
      taxOffice: customer.taxOffice ? String(customer.taxOffice) : null,
      taxNumber: customer.taxNumber ? String(customer.taxNumber) : null,
      shippingAddress: customer.address ? String(customer.address) : null,
      shippingCity: customer.city ? String(customer.city) : null,
      notes: notes || null,
      paymentProvider: provider.name,
      items: orderItems,
    });

    // Sipariş oluşturuldu. Ödeme başlatma adımı hata verirse siparişi geçersiz
    // saymıyoruz; müşteriye "alındı" diyoruz ve ödeme sonradan tamamlanabilir.
    let payment;
    try {
      payment = await provider.initiate(order);
    } catch (paymentErr) {
      console.error("payment initiate failed", paymentErr);
      payment = {
        status: "pending" as const,
        message:
          "Siparişiniz alındı. Ödeme adımında bir sorun oluştu; ekibimiz ödeme için sizinle iletişime geçecek.",
      };
    }

    return NextResponse.json({
      ok: true,
      orderNumber: order.orderNumber,
      payment,
    });
  } catch (err) {
    console.error("checkout error", err);
    return NextResponse.json({ ok: false, error: "Sipariş oluşturulamadı." }, { status: 500 });
  }
}
