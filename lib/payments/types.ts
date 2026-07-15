import type { Order } from "../types";

export type PaymentInitResult = {
  /** Ödeme oturumunun sonucu. */
  status: "pending" | "redirect" | "succeeded" | "failed";
  /** 'redirect' ise kullanıcının yönlendirileceği ödeme sayfası. */
  redirectUrl?: string;
  /** Sağlayıcıdaki işlem/oturum kimliği (payments.provider_ref). */
  providerRef?: string;
  /** Denetim için ham yanıt. */
  raw?: unknown;
  /** Kullanıcıya gösterilecek mesaj (manuel akış vb.). */
  message?: string;
};

export interface PaymentProvider {
  readonly name: string;
  /** Sipariş oluşturulduktan sonra ödeme akışını başlatır. */
  initiate(order: Order): Promise<PaymentInitResult>;
}
