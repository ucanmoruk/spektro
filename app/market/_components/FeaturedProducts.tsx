"use client";

import Link from "next/link";
import { ArrowRight, BadgePercent, Sparkles, Star } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { effectivePrice, type StoreProduct } from "@/lib/store-view";
import { ProductThumb } from "./ProductThumb";

type FeaturedItem = {
  label: string;
  helper: string;
  product: StoreProduct;
  icon: "discount" | "star" | "new";
};

const iconMap = {
  discount: BadgePercent,
  star: Star,
  new: Sparkles,
};

function discountPercent(product: StoreProduct) {
  if (!product.price || !product.discountedPrice || product.discountedPrice >= product.price) {
    return null;
  }
  return Math.round(((product.price - product.discountedPrice) / product.price) * 100);
}

function FeaturedCard({ item }: { item: FeaturedItem }) {
  const Icon = iconMap[item.icon];
  const price = effectivePrice(item.product);
  const discount = discountPercent(item.product);

  return (
    <Link
      href={`/market/${item.product.slug}`}
      className="group grid min-w-[260px] grid-cols-[82px_1fr] gap-3 rounded-2xl border border-slate-200 bg-white p-3 transition hover:border-spektro-blue/30 hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
    >
      <ProductThumb
        src={item.product.image}
        alt={item.product.name}
        className="aspect-square w-full rounded-xl border border-slate-100"
      />
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-spektro-blue">
          <Icon className="h-3.5 w-3.5" />
          {item.label}
        </div>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-tight text-slate-900">
          {item.product.name}
        </h3>
        <p className="mt-1 line-clamp-1 text-xs text-slate-500">{item.helper}</p>
        <div className="mt-2 flex items-center justify-between gap-2">
          <div className="min-w-0">
            {item.product.isDirectSale ? (
              <p className="text-sm font-semibold text-slate-900">
                {formatPrice(price, item.product.currency)}
              </p>
            ) : (
              <p className="text-sm font-semibold text-slate-900">Teklif Al</p>
            )}
            {discount ? (
              <p className="text-xs text-emerald-600">%{discount} indirim</p>
            ) : null}
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-spektro-blue" />
        </div>
      </div>
    </Link>
  );
}

export function FeaturedProducts({ products }: { products: StoreProduct[] }) {
  const directSale = products.filter((product) => product.isDirectSale && product.price !== null);
  const manualBestDiscount = products.find((product) => product.featuredSlot === "best-discount");
  const manualWeeklyProduct = products.find((product) => product.featuredSlot === "weekly-product");
  const manualNewestProduct = products.find((product) => product.featuredSlot === "new-arrival");
  const bestDiscount = manualBestDiscount ?? directSale
    .filter((product) => discountPercent(product))
    .sort((a, b) => (discountPercent(b) ?? 0) - (discountPercent(a) ?? 0))[0];
  const weeklyProduct =
    manualWeeklyProduct ?? directSale.find((product) => product.stock > 0 && product.image) ?? directSale[0];
  const newestProduct = manualNewestProduct ?? directSale.find(
    (product) => product.id !== weeklyProduct?.id && product.id !== bestDiscount?.id,
  );

  const items = [
    bestDiscount
      ? {
          label: "En İyi İndirim",
          helper: "Kampanyalı fiyatla öne çıkan ürün",
          product: bestDiscount,
          icon: "discount" as const,
        }
      : null,
    weeklyProduct
      ? {
          label: "Haftanın Ürünü",
          helper: weeklyProduct.stock > 0 ? "Stokta, hızlı siparişe uygun" : "Öne çıkan laboratuvar ürünü",
          product: weeklyProduct,
          icon: "star" as const,
        }
      : null,
    newestProduct
      ? {
          label: "Yeni Gelen",
          helper: newestProduct.category ?? "Market ürünleri",
          product: newestProduct,
          icon: "new" as const,
        }
      : null,
  ].filter((item): item is FeaturedItem => Boolean(item));

  if (items.length === 0) return null;

  return (
    <section className="bg-white pb-8 pt-10 md:pt-12">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">Öne Çıkanlar</h2>
            <p className="text-sm text-slate-500">Hızlı bakış için seçili market ürünleri.</p>
          </div>
          <Link
            href="#urun-listesi"
            className="text-sm font-medium text-spektro-blue hover:underline"
          >
            Tüm ürünler
          </Link>
        </div>
        <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0">
          {items.map((item) => (
            <FeaturedCard key={`${item.label}-${item.product.id}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
