"use client";

import Link from "next/link";
import { ListPlus, ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { effectivePrice, type StoreProduct } from "@/lib/store-view";
import { useCartStore } from "@/store/useCartStore";
import { ProductThumb } from "./ProductThumb";

export function ProductRow({ product }: { product: StoreProduct }) {
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
    <article className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:border-spektro-blue/30 hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)] sm:flex-row sm:items-center">
      <Link
        href={`/market/${product.slug}`}
        className="shrink-0"
        aria-label={product.name}
      >
        <ProductThumb
          src={product.image}
          alt={product.name}
          className="h-28 w-full rounded-xl border border-slate-100 sm:h-24 sm:w-24"
        />
      </Link>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          {product.brand ? (
            <span className="text-[11px] font-semibold uppercase tracking-wide text-spektro-blue">
              {product.brand}
            </span>
          ) : null}
          {product.category ? (
            <span className="text-[11px] text-slate-400">· {product.category}</span>
          ) : null}
        </div>
        <h3 className="mt-1 truncate text-base font-semibold tracking-tight text-slate-900">
          <Link href={`/market/${product.slug}`} className="hover:text-spektro-blue">
            {product.name}
          </Link>
        </h3>
        {product.shortDescription ? (
          <p className="mt-1 line-clamp-2 text-sm text-slate-500">{product.shortDescription}</p>
        ) : null}
        {product.sku ? (
          <p className="mt-1 text-xs text-slate-400">SKU: {product.sku}</p>
        ) : null}
      </div>

      <div className="flex shrink-0 flex-col items-stretch gap-2 sm:w-44 sm:items-end">
        {product.isDirectSale ? (
          <div className="text-right">
            {hasDiscount ? (
              <p className="text-xs text-slate-400 line-through">
                {formatPrice(product.price, product.currency)}
              </p>
            ) : null}
            <p className="text-lg font-semibold tracking-tight text-slate-900">
              {formatPrice(price, product.currency)}
            </p>
            <p
              className={`text-[11px] font-medium ${
                product.stock > 0 ? "text-emerald-600" : "text-amber-600"
              }`}
            >
              {product.stock > 0 ? "Stokta" : "Tedarik süreli"}
            </p>
          </div>
        ) : (
          <p className="text-right text-sm font-semibold text-slate-700">Fiyat İçin Danışın</p>
        )}

        <button
          onClick={add}
          className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90 ${
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
    </article>
  );
}
