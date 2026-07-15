import type { Order } from "../types";
import type { PaymentInitResult, PaymentProvider } from "./types";

/**
 * iyzico (Türkiye) sağlayıcı iskeleti.
 *
 * Canlıya almak için:
 *   1) `.env.local` içine IYZICO_API_KEY, IYZICO_SECRET_KEY, IYZICO_BASE_URL girin
 *      ve PAYMENT_PROVIDER=iyzico yapın.
 *   2) `npm i iyzipay` (resmi SDK) veya iyzico "Checkout Form (CF)" REST API'sini kullanın.
 *   3) Aşağıdaki initiate() içinde ödeme formu oturumu (initializeCheckoutForm) oluşturup
 *      dönen `paymentPageUrl`'i redirectUrl olarak döndürün.
 *   4) Dönüş (callback) için /api/payments/iyzico/callback route'u ekleyip imzayı doğrulayın,
 *      ardından orders.payment_status = 'paid' ve status = 'paid' güncelleyin (updateOrderPayment).
 *
 * İmza/HMAC üretimi ve alan eşleşmesi iyzico dökümantasyonuna göre yapılmalıdır.
 */
export const iyzicoProvider: PaymentProvider = {
  name: "iyzico",
  async initiate(order: Order): Promise<PaymentInitResult> {
    const apiKey = process.env.IYZICO_API_KEY;
    const secret = process.env.IYZICO_SECRET_KEY;
    if (!apiKey || !secret) {
      // Anahtarlar yoksa güvenli tarafta kal: manuel akışa düş.
      return {
        status: "pending",
        message:
          "iyzico anahtarları yapılandırılmadığı için sipariş beklemede alındı. Yönetici onayı sonrası ödeme bağlantısı iletilecektir.",
        providerRef: order.orderNumber,
      };
    }

    // TODO(iyzico): initializeCheckoutForm çağrısı ve paymentPageUrl dönüşü.
    throw new Error(
      "iyzico initiate() henüz uygulanmadı. iyzico Checkout Form entegrasyonunu tamamlayın.",
    );
  },
};
