"use client";

import Link from "next/link";
import { ListPlus, ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { effectivePrice, type StoreProduct } from "@/lib/store-view";
import { useCartStore } from "@/store/useCartStore";
import { ProductThumb } from "./ProductThumb";

export function ProductGridCard({ product }: { product: StoreProduct }) {
  const addProduct = useCartStore((s) => s.addProduct);
  const price = effectivePrice(product);
  const hasDiscount =
    product.isDirectSale && product.discountedPrice !== null && product.price !== null;

  const add = () =>
    addProduct({
      id: product.id,
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      price,
      currency: product.currency,
      image: product.image,
      isDirectSale: product.isDirectSale,
    });

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-spektro-blue/30 hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
      <Link href={`/market/${product.slug}`} className="block" aria-label={product.name}>
        <ProductThumb
          src={product.image}
          alt={product.name}
          className="aspect-square w-full border-b border-slate-100"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        {/* Marka satırı — her kartta sabit yükseklik (marka yoksa da hizalı) */}
        <span className="block h-4 truncate text-[11px] font-semibold uppercase tracking-wide text-spektro-blue">
          {product.brand ?? " "}
        </span>
        {/* Başlık — daima 2 satır yüksekliğinde ayrılır */}
        <h3 className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-tight tracking-tight text-slate-900">
          <Link href={`/market/${product.slug}`} className="hover:text-spektro-blue">
            {product.name}
          </Link>
        </h3>

        {/* Fiyat + buton bloğu her zaman kartın altına yaslanır */}
        <div className="mt-auto pt-3">
          <div className="flex h-10 items-end">
            {product.isDirectSale ? (
              <div>
                {hasDiscount ? (
                  <p className="text-xs text-slate-400 line-through">
                    {formatPrice(product.price, product.currency)}
                  </p>
                ) : null}
                <p className="text-base font-semibold tracking-tight text-slate-900">
                  {formatPrice(price, product.currency)}
                </p>
              </div>
            ) : (
              <p className="text-sm font-semibold text-slate-700">Fiyat İçin Danışın</p>
            )}
          </div>

          <button
            onClick={add}
            className={`mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-white transition hover:opacity-90 ${
              product.isDirectSale ? "bg-spektro-blue" : "bg-slate-900"
            }`}
          >
            {product.isDirectSale ? (
              <>
                <ShoppingCart className="h-4 w-4" /> Sepete Ekle
              </>
            ) : (
              <>
                <ListPlus className="h-4 w-4" /> Teklife Ekle
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
