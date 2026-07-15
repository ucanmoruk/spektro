import crypto from "node:crypto";
import { getPaymentByRef, updatePaymentStatus } from "@/lib/repositories/payments";
import { updateOrderPayment, updateOrderStatus } from "@/lib/repositories/orders";

// PayTR sunucu-sunucu bildirimi (callback). Bu adres PayTR panelinde
// "Bildirim URL" olarak tanımlanmalıdır. Yanıt olarak düz metin "OK" beklenir.
export async function POST(request: Request) {
  const merchantKey = process.env.PAYTR_MERCHANT_KEY;
  const merchantSalt = process.env.PAYTR_MERCHANT_SALT;
  if (!merchantKey || !merchantSalt) {
    return new Response("PAYTR yapılandırılmadı", { status: 500 });
  }

  const form = await request.formData();
  const merchantOid = String(form.get("merchant_oid") ?? "");
  const status = String(form.get("status") ?? "");
  const totalAmount = String(form.get("total_amount") ?? "");
  const hash = String(form.get("hash") ?? "");

  // Hash doğrulama: base64( HMAC_SHA256( oid + salt + status + total_amount, key ) )
  const expected = crypto
    .createHmac("sha256", merchantKey)
    .update(merchantOid + merchantSalt + status + totalAmount)
    .digest("base64");

  if (
    hash.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(expected))
  ) {
    return new Response("PAYTR notification failed: bad hash", { status: 400 });
  }

  try {
    const payment = await getPaymentByRef(merchantOid);
    if (!payment) {
      // Kayıt yoksa yine de OK dön ki PayTR tekrar denemesin.
      return new Response("OK");
    }

    if (status === "success") {
      await updatePaymentStatus(payment.id, "succeeded", Object.fromEntries(form.entries()));
      await updateOrderPayment(payment.orderId, "paid", "paytr");
      await updateOrderStatus(payment.orderId, "paid");
    } else {
      const failReason = String(form.get("failed_reason_msg") ?? "");
      await updatePaymentStatus(payment.id, "failed", {
        ...Object.fromEntries(form.entries()),
        failReason,
      });
      await updateOrderPayment(payment.orderId, "failed", "paytr");
    }

    return new Response("OK");
  } catch (err) {
    console.error("paytr callback error", err);
    return new Response("PAYTR notification failed: server error", { status: 500 });
  }
}
