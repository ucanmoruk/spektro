import type { OrderStatus, PaymentStatus, QuoteStatus } from "./types";

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Beklemede",
  paid: "Ödendi",
  processing: "Hazırlanıyor",
  shipped: "Kargolandı",
  completed: "Tamamlandı",
  cancelled: "İptal",
  refunded: "İade",
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  pending: "bg-amber-50 text-amber-700",
  paid: "bg-blue-50 text-blue-700",
  processing: "bg-indigo-50 text-indigo-700",
  shipped: "bg-cyan-50 text-cyan-700",
  completed: "bg-emerald-50 text-emerald-700",
  cancelled: "bg-slate-100 text-slate-500",
  refunded: "bg-rose-50 text-rose-700",
};

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  unpaid: "Ödenmedi",
  pending: "Beklemede",
  paid: "Ödendi",
  failed: "Başarısız",
  refunded: "İade",
};

export const QUOTE_STATUS_LABELS: Record<QuoteStatus, string> = {
  new: "Yeni",
  contacted: "İletişime geçildi",
  quoted: "Teklif verildi",
  won: "Kazanıldı",
  lost: "Kaybedildi",
};

export const QUOTE_STATUS_COLORS: Record<QuoteStatus, string> = {
  new: "bg-amber-50 text-amber-700",
  contacted: "bg-blue-50 text-blue-700",
  quoted: "bg-indigo-50 text-indigo-700",
  won: "bg-emerald-50 text-emerald-700",
  lost: "bg-slate-100 text-slate-500",
};

export const ORDER_STATUSES: OrderStatus[] = [
  "pending", "paid", "processing", "shipped", "completed", "cancelled", "refunded",
];
export const QUOTE_STATUSES: QuoteStatus[] = ["new", "contacted", "quoted", "won", "lost"];
