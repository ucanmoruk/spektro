import { manualProvider } from "./manual";
import { paytrProvider } from "./paytr";
import { iyzicoProvider } from "./iyzico";
import { stripeProvider } from "./stripe";
import type { PaymentProvider } from "./types";

export type { PaymentProvider, PaymentInitResult } from "./types";

/** PAYMENT_PROVIDER env değerine göre aktif ödeme sağlayıcısını döndürür. */
export function getPaymentProvider(): PaymentProvider {
  switch (process.env.PAYMENT_PROVIDER) {
    case "paytr":
      return paytrProvider;
    case "iyzico":
      return iyzicoProvider;
    case "stripe":
      return stripeProvider;
    case "manual":
    default:
      return manualProvider;
  }
}
