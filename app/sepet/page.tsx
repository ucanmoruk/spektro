"use client";

import { FormEvent, MouseEvent, useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Minus, Plus, Trash2 } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { formatPrice } from "@/lib/format";
import type { StoreProduct } from "@/lib/store-view";
import { useCartStore } from "@/store/useCartStore";
import { ProductGridCard } from "@/app/market/_components/ProductGridCard";

type Contact = {
  name: string;
  email: string;
  phone: string;
  invoiceType: "individual" | "corporate";
  company: string;
  taxOffice: string;
  taxNumber: string;
  address: string;
  city: string;
  district: string;
  notes: string;
};

const emptyContact: Contact = {
  name: "",
  email: "",
  phone: "",
  invoiceType: "individual",
  company: "",
  taxOffice: "",
  taxNumber: "",
  address: "",
  city: "",
  district: "",
  notes: "",
};

export default function CartPage() {
  const {
    buyItems,
    quoteItems,
    setQuantity,
    removeBuyItem,
    removeQuoteItem,
    buyTotal,
    clearBuy,
    clearQuote,
  } = useCartStore();

  const [contact, setContact] = useState<Contact>(emptyContact);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<{ type: "order" | "quote"; message: string } | null>(null);
  const [rate, setRate] = useState<{ rate: number; date: string } | null>(null);
  const [suggestions, setSuggestions] = useState<StoreProduct[]>([]);
  const currency = buyItems[0]?.currency ?? "EUR";

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.user) {
          setContact((c) => ({
            ...c,
            name: d.user.fullName ?? "",
            email: d.user.email ?? "",
            phone: d.user.phone ?? "",
            invoiceType: d.user.invoiceType ?? "individual",
            company: d.user.company ?? "",
            taxOffice: d.user.taxOffice ?? "",
            taxNumber: d.user.taxNumber ?? "",
            address: d.user.address ?? "",
            city: d.user.city ?? "",
            district: d.user.district ?? "",
          }));
        }
      })
      .catch(() => {});

    fetch("/api/market/suggestions")
      .then((r) => r.json())
      .then((d) => setSuggestions(d.products ?? []))
      .catch(() => {});
  }, []);

  // Sepet para birimi TRY değilse (EUR), TL karşılığını göstermek için kuru çek.
  useEffect(() => {
    if (currency === "TRY") {
      setRate({ rate: 1, date: "" });
      return;
    }
    fetch(`/api/rate?from=${currency}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.ok) setRate({ rate: d.rate, date: d.date });
      })
      .catch(() => {});
  }, [currency]);

  const set = (key: keyof Contact) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setContact((c) => ({ ...c, [key]: e.target.value }));

  const checkout = async (e: FormEvent | MouseEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: buyItems.map((i) => ({ id: i.id, quantity: i.quantity })),
          customer: contact,
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error ?? "Sipariş oluşturulamadı.");
        return;
      }
      if (data.payment?.status === "redirect" && data.payment.redirectUrl) {
        window.location.href = data.payment.redirectUrl;
        return;
      }
      clearBuy();
      setSuccess({
        type: "order",
        message: `${data.orderNumber} numaralı siparişiniz alındı. ${data.payment?.message ?? ""}`,
      });
    } catch {
      setError("Bağlantı hatası.");
    } finally {
      setLoading(false);
    }
  };

  const requestQuote = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: quoteItems.map((i) => ({ id: i.id, quantity: 1 })),
          contact,
        }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error ?? "Teklif talebi gönderilemedi.");
        return;
      }
      clearQuote();
      setSuccess({
        type: "quote",
        message: "Teklif talebiniz alındı. Ekibimiz en kısa sürede iletişime geçecek.",
      });
    } catch {
      setError("Bağlantı hatası.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-spektro-blue/30 focus:ring-4 focus:ring-spektro-blue/10";

  const isEmpty = buyItems.length === 0 && quoteItems.length === 0;

  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900">
      <Navbar />

      <section className="border-b border-slate-100 bg-slate-50 pb-10 pt-32">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">Sepet</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Sepetim &amp; Teklif Listem
          </h1>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 md:px-10">
        {success ? (
          <div className="mb-8 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
            <div>
              <p className="font-semibold text-emerald-800">
                {success.type === "order" ? "Sipariş alındı" : "Teklif talebi alındı"}
              </p>
              <p className="mt-1 text-sm text-emerald-700">{success.message}</p>
              <div className="mt-3 flex gap-3">
                <Link href="/market" className="text-sm font-medium text-spektro-blue hover:underline">
                  Alışverişe devam et
                </Link>
                <Link href="/hesabim" className="text-sm font-medium text-spektro-blue hover:underline">
                  Hesabım
                </Link>
              </div>
            </div>
          </div>
        ) : null}

        {isEmpty && !success ? (
          <div className="rounded-2xl border border-dashed border-slate-200 p-12 text-center">
            <p className="text-slate-500">Sepetinizde ürün bulunmuyor.</p>
            <Link
              href="/market"
              className="mt-4 inline-flex rounded-xl bg-spektro-blue px-5 py-3 text-sm font-medium text-white"
            >
              Markete Git
            </Link>
          </div>
        ) : null}

        <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="min-w-0 space-y-8">
            {buyItems.length > 0 ? (
              <div>
                <h2 className="mb-3 text-lg font-semibold tracking-tight">Satın Alınacaklar</h2>
                <div className="space-y-3">
                  {buyItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex min-w-0 flex-col gap-4 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <Link
                          href={`/market/${item.slug}`}
                          className="block break-words font-medium text-slate-900 hover:text-spektro-blue sm:line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-0.5 text-sm text-slate-500">
                          {formatPrice(item.price, item.currency)}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center justify-between gap-3 sm:justify-start">
                        <div className="inline-flex items-center rounded-lg border border-slate-200">
                          <button
                            onClick={() => setQuantity(item.id, item.quantity - 1)}
                            className="p-2 text-slate-600 hover:bg-slate-50"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => setQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-slate-600 hover:bg-slate-50"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeBuyItem(item.id)}
                          className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                          aria-label="Kaldır"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {quoteItems.length > 0 ? (
              <div>
                <h2 className="mb-3 text-lg font-semibold tracking-tight">
                  Teklif İstenecek Sistemler
                </h2>
                <div className="space-y-3">
                  {quoteItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex min-w-0 flex-col gap-4 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <Link
                          href={`/market/${item.slug}`}
                          className="block break-words font-medium text-slate-900 hover:text-spektro-blue sm:line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-0.5 text-sm text-slate-500">{item.brand}</p>
                      </div>
                      <div className="flex justify-end sm:block">
                        <button
                          onClick={() => removeQuoteItem(item.id)}
                          className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                          aria-label="Kaldır"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {!isEmpty ? (
            <div className="min-w-0 h-fit rounded-2xl border border-slate-200 bg-slate-50/60 p-4 sm:p-6 lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold tracking-tight">İletişim Bilgileri</h2>
              <div className="mt-4 space-y-3">
                <input required placeholder="Ad Soyad *" value={contact.name} onChange={set("name")} className={inputCls} />
                <input required type="email" placeholder="E-posta *" value={contact.email} onChange={set("email")} className={inputCls} />
                <input placeholder="Telefon" value={contact.phone} onChange={set("phone")} className={inputCls} />
                <div className="rounded-xl bg-white p-1">
                  <div className="grid grid-cols-2 gap-1 rounded-lg bg-slate-100 p-1">
                    <button
                      type="button"
                      onClick={() => setContact((c) => ({ ...c, invoiceType: "individual" }))}
                      className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                        contact.invoiceType === "individual"
                          ? "bg-white text-slate-950 shadow-sm"
                          : "text-slate-500"
                      }`}
                    >
                      Bireysel
                    </button>
                    <button
                      type="button"
                      onClick={() => setContact((c) => ({ ...c, invoiceType: "corporate" }))}
                      className={`rounded-md px-3 py-2 text-sm font-medium transition ${
                        contact.invoiceType === "corporate"
                          ? "bg-white text-slate-950 shadow-sm"
                          : "text-slate-500"
                      }`}
                    >
                      Kurumsal
                    </button>
                  </div>
                </div>
                {contact.invoiceType === "corporate" ? (
                  <>
                    <input required placeholder="Firma / Unvan *" value={contact.company} onChange={set("company")} className={inputCls} />
                    <input placeholder="Vergi Dairesi" value={contact.taxOffice} onChange={set("taxOffice")} className={inputCls} />
                    <input placeholder="Vergi No" value={contact.taxNumber} onChange={set("taxNumber")} className={inputCls} />
                  </>
                ) : (
                  <input placeholder="T.C. Kimlik No (opsiyonel)" value={contact.taxNumber} onChange={set("taxNumber")} className={inputCls} />
                )}
                {buyItems.length > 0 ? (
                  <>
                    <input placeholder="Teslimat Adresi" value={contact.address} onChange={set("address")} className={inputCls} />
                    <input placeholder="Şehir" value={contact.city} onChange={set("city")} className={inputCls} />
                    <input placeholder="İlçe" value={contact.district} onChange={set("district")} className={inputCls} />
                  </>
                ) : null}
                <textarea placeholder="Not (opsiyonel)" rows={2} value={contact.notes} onChange={set("notes")} className={inputCls} />
              </div>

              {buyItems.length > 0 ? (
                <div className="mt-4 border-t border-slate-200 pt-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-sm text-slate-500">Ara Toplam</span>
                    <span className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
                      {formatPrice(buyTotal(), currency)}
                    </span>
                  </div>
                  {currency !== "TRY" && rate ? (
                    <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs text-slate-400">TL karşılığı (KDV Dahil)</span>
                      <span className="break-words text-sm font-semibold text-slate-700">
                        ≈ {formatPrice(buyTotal() * rate.rate, "TRY")}
                      </span>
                    </div>
                  ) : null}
                  <p className="mt-2 text-xs text-slate-400">
                    Fiyatlara KDV dahildir.
                    {currency !== "TRY"
                      ? ` Ödeme, güncel TCMB kuruyla${
                          rate?.date ? ` (${rate.date})` : ""
                        } TL olarak tahsil edilir.`
                      : ""}
                  </p>
                </div>
              ) : null}

              {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

              <div className="mt-4 space-y-2">
                {buyItems.length > 0 ? (
                  <button
                    onClick={checkout}
                    disabled={loading}
                    className="w-full rounded-xl bg-spektro-blue px-4 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
                  >
                    {loading ? "Ödeme hazırlanıyor..." : "Ödemeye Geç"}
                  </button>
                ) : null}
                {quoteItems.length > 0 ? (
                  <button
                    onClick={requestQuote}
                    disabled={loading}
                    className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
                  >
                    {loading ? "İşleniyor..." : "Teklif İste"}
                  </button>
                ) : null}
              </div>
              <p className="mt-3 text-center text-xs text-slate-400">
                <Link href="/giris" className="hover:underline">
                  Giriş yaparak
                </Link>{" "}
                siparişlerinizi panelinizden takip edebilirsiniz.
              </p>
            </div>
          ) : null}
        </div>

        {(() => {
          const inCart = new Set([
            ...buyItems.map((i) => i.id),
            ...quoteItems.map((i) => i.id),
          ]);
          const cross = suggestions.filter((p) => !inCart.has(p.id)).slice(0, 4);
          if (cross.length === 0) return null;
          return (
            <div className="mt-14">
              <h2 className="mb-1 text-xl font-semibold tracking-tight text-slate-900">
                Bunları da incelemek ister misiniz?
              </h2>
              <p className="mb-5 text-sm text-slate-500">
                Sık tercih edilen sarf malzeme ve aksesuarlar.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                {cross.map((p) => (
                  <ProductGridCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          );
        })()}
      </section>
      <Footer />
    </main>
  );
}
