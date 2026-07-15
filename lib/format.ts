// Para ve tarih biçimlendirme yardımcıları.

const CURRENCY_SYMBOL: Record<string, string> = {
  EUR: "€",
  USD: "$",
  TRY: "₺",
  GBP: "£",
};

export function formatPrice(
  amount: number | null | undefined,
  currency = "EUR",
): string {
  if (amount === null || amount === undefined) return "Fiyat İçin Danışın";
  const formatted = new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
  const symbol = CURRENCY_SYMBOL[currency] ?? currency;
  return `${formatted} ${symbol}`;
}

export function formatDate(value: string | Date): string {
  const d = typeof value === "string" ? new Date(value.replace(" ", "T") + "Z") : value;
  return new Intl.DateTimeFormat("tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}
