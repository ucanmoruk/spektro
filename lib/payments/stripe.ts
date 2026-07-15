import type { Order } from "../types";
import type { PaymentInitResult, PaymentProvider } from "./types";

/**
 * Stripe sağlayıcı iskeleti (uluslararası ödeme için alternatif).
 *
 * Canlıya almak için:
 *   1) `npm i stripe`, `.env.local` içine STRIPE_SECRET_KEY girin, PAYMENT_PROVIDER=stripe yapın.
 *   2) initiate() içinde stripe.checkout.sessions.create({ ... success_url, cancel_url }) çağırıp
 *      dönen session.url'i redirectUrl olarak döndürün.
 *   3) /api/payments/stripe/webhook route'u ekleyip STRIPE_WEBHOOK_SECRET ile imzayı doğrulayın,
 *      checkout.session.completed olayında updateOrderPayment(order, 'paid') yapın.
 */
export const stripeProvider: PaymentProvider = {
  name: "stripe",
  async initiate(order: Order): Promise<PaymentInitResult> {
    if (!process.env.STRIPE_SECRET_KEY) {
      return {
        status: "pending",
        message:
          "Stripe anahtarı yapılandırılmadığı için sipariş beklemede alındı.",
        providerRef: order.orderNumber,
      };
    }
    // TODO(stripe): checkout session oluştur.
    throw new Error("stripe initiate() henüz uygulanmadı. Stripe Checkout entegrasyonunu tamamlayın.");
  },
};
