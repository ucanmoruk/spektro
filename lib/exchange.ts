import "server-only";

// TCMB günlük döviz kuru servisi.
// Kaynak: https://www.tcmb.gov.tr/kurlar/today.xml (resmi, anahtar gerektirmez)
// "ForexSelling" (Döviz Satış) kuru kullanılır — müşteriden tahsilat için standarttır.
// Hafta sonu/tatilde TCMB son iş gününün değerini döndürür.

const TCMB_URL = "https://www.tcmb.gov.tr/kurlar/today.xml";
const TTL_MS = 30 * 60 * 1000; // 30 dakika önbellek

type RateCache = { rates: Record<string, number>; date: string; fetchedAt: number };
let cache: RateCache | null = null;

function parseRate(xml: string, code: string): number | null {
  const block = xml.match(new RegExp(`<Currency[^>]*Kod="${code}"[\\s\\S]*?</Currency>`))?.[0];
  if (!block) return null;
  const pick = (tag: string) => {
    const m = block.match(new RegExp(`<${tag}>([\\d.]+)</${tag}>`));
    return m ? Number(m[1]) : null;
  };
  return pick("ForexSelling") ?? pick("BanknoteSelling") ?? pick("ForexBuying");
}

async function loadRates(): Promise<RateCache> {
  if (cache && Date.now() - cache.fetchedAt < TTL_MS) return cache;

  const res = await fetch(TCMB_URL, { headers: { Accept: "application/xml" } });
  if (!res.ok) throw new Error(`TCMB kur servisi yanıt vermedi (${res.status}).`);
  const xml = await res.text();

  const eur = parseRate(xml, "EUR");
  const usd = parseRate(xml, "USD");
  if (!eur) throw new Error("TCMB EUR kuru okunamadı.");

  const date = xml.match(/Tarih="([^"]+)"/)?.[1] ?? "";
  cache = {
    rates: { EUR: eur, ...(usd ? { USD: usd } : {}), TRY: 1 },
    date,
    fetchedAt: Date.now(),
  };
  return cache;
}

export type ConversionResult = {
  /** Hedef tutar (TRY, 2 ondalık). */
  amount: number;
  /** 1 birim kaynak döviz = kaç TRY. */
  rate: number;
  /** TCMB kur tarihi (ör. "16.07.2026"). */
  date: string;
};

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Verilen tutarı kaynak para biriminden TRY'ye çevirir. */
export async function convertToTry(
  amount: number,
  fromCurrency: string,
): Promise<ConversionResult> {
  if (fromCurrency === "TRY") return { amount: round2(amount), rate: 1, date: "" };
  const { rates, date } = await loadRates();
  const rate = rates[fromCurrency];
  if (!rate) throw new Error(`${fromCurrency} için TCMB kuru bulunamadı.`);
  return { amount: round2(amount * rate), rate, date };
}
