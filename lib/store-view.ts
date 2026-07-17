// Client bileşenlerine güvenle geçirilebilen sade vitrin tipi (server-only bağımlılığı yok).
import type { Product } from "./types";

export type StoreProduct = {
  id: number;
  slug: string;
  name: string;
  brand: string | null;
  brandSlug: string | null;
  category: string | null;
  categorySlug: string | null;
  sku: string | null;
  shortDescription: string | null;
  price: number | null;
  discountedPrice: number | null;
  currency: string;
  stock: number;
  isDirectSale: boolean;
  featuredSlot: Product["featuredSlot"];
  image: string | null;
};

export function toStoreProduct(p: Product, brandSlug: string | null = null): StoreProduct {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brandName,
    brandSlug,
    category: p.categoryName,
    categorySlug: p.categorySlug,
    sku: p.sku,
    shortDescription: p.shortDescription,
    price: p.price,
    discountedPrice: p.discountedPrice,
    currency: p.currency,
    stock: p.stock,
    isDirectSale: p.isDirectSale,
    featuredSlot: p.featuredSlot,
    image: p.primaryImage,
  };
}

/** Geçerli satış fiyatı (indirim varsa onu). */
export function effectivePrice(p: {
  price: number | null;
  discountedPrice: number | null;
}): number | null {
  if (p.price === null) return null;
  return p.discountedPrice ?? p.price;
}
