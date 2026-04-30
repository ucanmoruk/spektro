"use client";

import { Product } from "@/data/mockProducts";
import { ListPlus, ShoppingCart } from "lucide-react";

type ProductCardProps = {
  product: Product;
  onAdd: (product: Product) => void;
};

export function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_34px_rgba(0,0,0,0.08)]">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{product.brand}</p>
      <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-900">{product.name}</h3>
      <p className="mt-1 text-sm text-slate-500">{product.category}</p>

      {product.isDirectSale ? (
        <p className="mt-5 text-2xl font-semibold tracking-tight text-slate-900">{product.price} €</p>
      ) : (
        <p className="mt-5 text-base font-semibold text-slate-700">Fiyat İçin Danışın</p>
      )}

      <button
        onClick={() => onAdd(product)}
        className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition hover:opacity-90 ${
          product.isDirectSale ? "bg-spektro-blue text-white" : "bg-slate-900 text-white"
        }`}
      >
        {product.isDirectSale ? <ShoppingCart className="h-4 w-4" /> : <ListPlus className="h-4 w-4" />}
        {product.isDirectSale ? "Sepete Ekle" : "Projeye Ekle"}
      </button>
    </article>
  );
}

