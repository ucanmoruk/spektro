import "server-only";
import crypto from "node:crypto";
import { headers } from "next/headers";
import type { Order } from "../types";
import { createPayment } from "../repositories/payments";
import type { PaymentInitResult, PaymentProvider } from "./types";

// PayTR para birimi kodları
const CURRENCY_MAP: Record<string, "TL" | "EUR" | "USD"> = {
  TRY: "TL",
  EUR: "EUR",
  USD: "USD",
};

function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
}

/** PayTR merchant_oid yalnızca harf+rakam olmalı (tire yok). */
function toMerchantOid(orderNumber: string): string {
  return orderNumber.replace(/[^a-zA-Z0-9]/g, "");
}

/**
 * PayTR iFrame API entegrasyonu.
 * initiate() bir ödeme token'ı alır ve kullanıcıyı PayTR güvenli ödeme sayfasına
 * yönlendirmek için redirectUrl döndürür. Ödeme sonucu sunucu-sunucu bildirimiyle
 * (callback) /api/payments/paytr/callback adresine gelir.
 */
export const paytrProvider: PaymentProvider = {
  name: "paytr",
  async initiate(order: Order): Promise<PaymentInitResult> {
    const merchantId = process.env.PAYTR_MERCHANT_ID;
    const merchantKey = process.env.PAYTR_MERCHANT_KEY;
    const merchantSalt = process.env.PAYTR_MERCHANT_SALT;

    if (!merchantId || !merchantKey || !merchantSalt) {
      // Anahtarlar yoksa güvenli tarafta kal: sipariş beklemede alınır.
      return {
        status: "pending",
        message:
          "PayTR anahtarları yapılandırılmadığı için sipariş beklemede alındı. Ödeme bağlantısı ekibimizce iletilecektir.",
        providerRef: order.orderNumber,
      };
    }

    const h = await headers();
    const userIp =
      h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      h.get("x-real-ip") ||
      "127.0.0.1";

    const merchantOid = toMerchantOid(order.orderNumber);
    const paymentAmount = Math.round(order.total * 100); // kuruş (tam sayı)
    const currency = CURRENCY_MAP[order.currency] ?? "TL";
    const testMode = process.env.PAYTR_TEST_MODE === "0" ? "0" : "1";
    const noInstallment = "0";
    const maxInstallment = "0";

    const basket = order.items.map((it) => [
      it.name.slice(0, 100),
      it.unitPrice.toFixed(2),
      it.quantity,
    ]);
    const userBasket = Buffer.from(JSON.stringify(basket)).toString("base64");

    // paytr_token = base64( HMAC_SHA256( hashStr + merchant_salt, merchant_key ) )
    const hashStr =
      merchantId +
      userIp +
      merchantOid +
      order.customerEmail +
      paymentAmount +
      userBasket +
      noInstallment +
      maxInstallment +
      currency +
      testMode;
    const paytrToken = crypto
      .createHmac("sha256", merchantKey)
      .update(hashStr + merchantSalt)
      .digest("base64");

    const params = new URLSearchParams({
      merchant_id: merchantId,
      user_ip: userIp,
      merchant_oid: merchantOid,
      email: order.customerEmail,
      payment_amount: String(paymentAmount),
      paytr_token: paytrToken,
      user_basket: userBasket,
      debug_on: testMode === "1" ? "1" : "0",
      no_installment: noInstallment,
      max_installment: maxInstallment,
      user_name: order.customerName,
      user_address: order.shippingAddress ?? order.customerName,
      user_phone: order.customerPhone ?? "0000000000",
      merchant_ok_url: `${siteUrl()}/odeme-sonuc?status=success`,
      merchant_fail_url: `${siteUrl()}/odeme-sonuc?status=fail`,
      timeout_limit: "30",
      currency,
      test_mode: testMode,
      lang: "tr",
    });

    const res = await fetch("https://www.paytr.com/odeme/api/get-token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    const data = (await res.json()) as { status: string; token?: string; reason?: string };

    if (data.status !== "success" || !data.token) {
      throw new Error(`PayTR token alınamadı: ${data.reason ?? "bilinmeyen hata"}`);
    }

    // Bildirim (callback) ile eşleştirmek için ödeme kaydını oluştur.
    await createPayment({
      orderId: order.id,
      provider: "paytr",
      providerRef: merchantOid,
      amount: order.total,
      currency: order.currency,
      status: "pending",
    });

    return {
      status: "redirect",
      redirectUrl: `${siteUrl()}/odeme/paytr?token=${encodeURIComponent(data.token)}`,
      providerRef: merchantOid,
    };
  },
};
