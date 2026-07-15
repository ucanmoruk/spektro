"use client";

import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/store/useCartStore";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function CartDrawer({ open, onClose }: Props) {
  const {
    buyItems,
    quoteItems,
    removeBuyItem,
    removeQuoteItem,
    setQuantity,
    buyTotal,
  } = useCartStore();

  return (
    <>
      {open ? (
        <button
          aria-label="Sepeti kapat"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-[1px]"
        />
      ) : null}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h3 className="text-lg font-semibold tracking-tight text-slate-900">Akıllı Sepet</h3>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5">
            <section>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Satın Alınacaklar
              </h4>
              <div className="mt-3 space-y-3">
                {buyItems.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">
                    Sepete eklenmiş sarf malzeme bulunmuyor.
                  </p>
                ) : (
                  buyItems.map((item) => (
                    <div key={item.id} className="rounded-xl border border-slate-200 p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-900">{item.name}</p>
                          <p className="mt-0.5 text-xs text-slate-500">
                            {formatPrice(item.price, item.currency)}
                          </p>
                        </div>
                        <button
                          onClick={() => removeBuyItem(item.id)}
                          className="text-xs font-medium text-red-600 hover:underline"
                        >
                          Kaldır
                        </button>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => setQuantity(item.id, item.quantity - 1)}
                          className="rounded-md border border-slate-200 p-1 text-slate-600 hover:bg-slate-50"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => setQuantity(item.id, item.quantity + 1)}
                          className="rounded-md border border-slate-200 p-1 text-slate-600 hover:bg-slate-50"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>

            {quoteItems.length > 0 ? (
              <section className="mt-8">
                <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Teklif İstenecek Sistemler
                </h4>
                <div className="mt-3 space-y-3">
                  {quoteItems.map((item) => (
                    <div key={item.id} className="rounded-xl border border-slate-200 p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-900">{item.name}</p>
                          <p className="mt-0.5 text-xs text-slate-500">{item.brand}</p>
                        </div>
                        <button
                          onClick={() => removeQuoteItem(item.id)}
                          className="text-xs font-medium text-red-600 hover:underline"
                        >
                          Kaldır
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <div className="border-t border-slate-100 px-5 py-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-slate-500">Ara Toplam</span>
              <span className="text-xl font-semibold tracking-tight text-slate-900">
                {formatPrice(buyTotal(), buyItems[0]?.currency ?? "EUR")}
              </span>
            </div>
            <Link
              href="/sepet"
              onClick={onClose}
              className="flex w-full items-center justify-center rounded-xl bg-spektro-blue px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Sepete Git & Öde
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
