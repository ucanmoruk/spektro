"use client";

import { useCartStore } from "@/store/useCartStore";
import { X } from "lucide-react";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const {
    directSaleItems,
    quoteItems,
    removeDirectSaleItem,
    removeQuoteItem,
    clearDirectSale,
    clearQuote,
    directSaleTotal,
  } = useCartStore();

  return (
    <>
      {open ? <button aria-label="Sepeti kapat" onClick={onClose} className="fixed inset-0 z-40 bg-slate-900/30" /> : null}
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h3 className="text-lg font-semibold tracking-tight text-slate-900">Akıllı Sepet</h3>
            <button onClick={onClose} className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5">
            <section>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Satın Alınacaklar</h4>
              <div className="mt-3 space-y-3">
                {directSaleItems.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">
                    Sepete eklenmiş sarf malzeme bulunmuyor.
                  </p>
                ) : (
                  directSaleItems.map((item) => (
                    <div key={item.id} className="rounded-xl border border-slate-200 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                          <p className="mt-1 text-xs text-slate-500">
                            {item.quantity} x {item.price} €
                          </p>
                        </div>
                        <button onClick={() => removeDirectSaleItem(item.id)} className="text-xs font-medium text-red-600 hover:underline">
                          Kaldır
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-4 rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Toplam</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">{directSaleTotal()} €</p>
                <button className="mt-3 w-full rounded-xl bg-spektro-blue px-4 py-3 text-sm font-medium text-white transition hover:opacity-90">
                  Kredi Kartı ile Öde
                </button>
                {directSaleItems.length > 0 ? (
                  <button onClick={clearDirectSale} className="mt-2 w-full text-xs font-medium text-slate-500 hover:underline">
                    Satın alma sepetini temizle
                  </button>
                ) : null}
              </div>
            </section>

            <section className="mt-8">
              <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Teklif İstenecek Sistemler</h4>
              <div className="mt-3 space-y-3">
                {quoteItems.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">
                    Teklif listesine eklenmiş sistem bulunmuyor.
                  </p>
                ) : (
                  quoteItems.map((item) => (
                    <div key={item.id} className="rounded-xl border border-slate-200 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                          <p className="mt-1 text-xs text-slate-500">{item.brand}</p>
                        </div>
                        <button onClick={() => removeQuoteItem(item.id)} className="text-xs font-medium text-red-600 hover:underline">
                          Kaldır
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <button className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:opacity-90">
                Teklif İste
              </button>
              {quoteItems.length > 0 ? (
                <button onClick={clearQuote} className="mt-2 w-full text-xs font-medium text-slate-500 hover:underline">
                  Teklif listesini temizle
                </button>
              ) : null}
            </section>
          </div>
        </div>
      </aside>
    </>
  );
}

