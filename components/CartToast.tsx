"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

/**
 * Ürün sepete/teklife eklenince alt köşede beliren bildirim.
 * "Sepete Git" / "Alışverişe Devam" seçenekleri sunar. Global olarak layout'a monte edilir.
 */
export function CartToast() {
  const notice = useCartStore((s) => s.notice);
  const clearNotice = useCartStore((s) => s.clearNotice);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!notice) return;
    setVisible(true);
    const hide = setTimeout(() => setVisible(false), 5000);
    const clear = setTimeout(() => clearNotice(), 5300);
    return () => {
      clearTimeout(hide);
      clearTimeout(clear);
    };
  }, [notice, clearNotice]);

  if (!notice) return null;

  const isQuote = notice.kind === "quote";

  return (
    <div
      className={`fixed bottom-4 right-4 z-[60] w-[calc(100%-2rem)] max-w-sm transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_12px_40px_rgba(15,23,42,0.16)]">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-900">
              {isQuote ? "Teklif listesine eklendi" : "Sepete eklendi"}
            </p>
            <p className="mt-0.5 truncate text-sm text-slate-500">{notice.name}</p>
          </div>
          <button
            onClick={() => setVisible(false)}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
            aria-label="Kapat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-3 flex gap-2">
          <Link
            href="/sepet"
            onClick={() => setVisible(false)}
            className="flex-1 rounded-xl bg-spektro-blue px-3 py-2.5 text-center text-sm font-medium text-white transition hover:opacity-90"
          >
            Sepete Git
          </Link>
          <button
            onClick={() => setVisible(false)}
            className="flex-1 rounded-xl border border-slate-200 px-3 py-2.5 text-center text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Alışverişe Devam Et
          </button>
        </div>
      </div>
    </div>
  );
}
