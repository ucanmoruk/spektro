"use client";

import { useState } from "react";
import { Check, ListPlus, Minus, Plus, ShoppingCart } from "lucide-react";
import type { StoreProduct } from "@/lib/store-view";
import { useCartStore } from "@/store/useCartStore";

export function ProductDetailActions({ product }: { product: StoreProduct }) {
  const addProduct = useCartStore((s) => s.addProduct);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const price = product.discountedPrice ?? product.price;

  const handleAdd = () => {
    addProduct(
      {
        id: product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        price,
        currency: product.currency,
        image: product.image,
        isDirectSale: product.isDirectSale,
      },
      product.isDirectSale ? qty : 1,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="mt-6 space-y-4">
      {product.isDirectSale ? (
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center rounded-xl border border-slate-200">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="p-3 text-slate-600 hover:bg-slate-50"
              aria-label="Azalt"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="min-w-10 text-center text-sm font-semibold">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="p-3 text-slate-600 hover:bg-slate-50"
              aria-label="Artır"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={handleAdd}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-spektro-blue px-6 py-3.5 text-sm font-medium text-white transition hover:opacity-90"
          >
            {added ? <Check className="h-4 w-4" /> : <ShoppingCart className="h-4 w-4" />}
            {added ? "Sepete Eklendi" : "Sepete Ekle"}
          </button>
        </div>
      ) : (
        <button
          onClick={handleAdd}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-medium text-white transition hover:opacity-90"
        >
          {added ? <Check className="h-4 w-4" /> : <ListPlus className="h-4 w-4" />}
          {added ? "Teklif Listesine Eklendi" : "Teklif Listesine Ekle"}
        </button>
      )}
    </div>
  );
}
