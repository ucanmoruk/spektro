import type { Order } from "../types";
import type { PaymentInitResult, PaymentProvider } from "./types";

/**
 * Manuel ödeme akışı (varsayılan).
 * Sipariş "beklemede" oluşur; ödeme entegrasyonu devrede değilken kullanılır.
 * Admin siparişi inceleyip havale/EFT veya teklif süreciyle ilerletir.
 */
export const manualProvider: PaymentProvider = {
  name: "manual",
  async initiate(order: Order): Promise<PaymentInitResult> {
    return {
      status: "pending",
      message:
        "Siparişiniz alındı. Ödeme ve teslimat detayları için ekibimiz sizinle iletişime geçecek.",
      providerRef: order.orderNumber,
    };
  },
};
