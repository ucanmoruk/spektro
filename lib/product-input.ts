import { slugify } from "./slug";
import type { ProductInput } from "./repositories/products";
import type { FeaturedSlot, ProductSpec } from "./types";

const toNum = (v: unknown): number | null => {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

const FEATURED_SLOTS = new Set<FeaturedSlot>([
  "best-discount",
  "weekly-product",
  "new-arrival",
]);

function featuredSlot(value: unknown): FeaturedSlot | null {
  if (!value) return null;
  const slot = String(value);
  return FEATURED_SLOTS.has(slot as FeaturedSlot) ? (slot as FeaturedSlot) : null;
}

/** Admin panelinden gelen ham gövdeyi doğrulanmış ProductInput'a çevirir. */
export function parseProductInput(body: Record<string, unknown>): ProductInput {
  const name = String(body.name ?? "").trim();
  const slug = slugify(String(body.slug ?? "") || name);
  if (!name) throw new Error("Ürün adı zorunludur.");
  if (!slug) throw new Error("Geçerli bir slug üretilemedi.");

  const imageUrls = Array.isArray(body.imageUrls)
    ? (body.imageUrls as unknown[]).map((u) => String(u).trim()).filter(Boolean)
    : [];

  const specs: ProductSpec[] = Array.isArray(body.specs)
    ? (body.specs as unknown[])
        .map((raw) => {
          const s = raw as Record<string, unknown>;
          const label = String(s.label ?? "").trim();
          return {
            label,
            slug: s.slug ? slugify(String(s.slug)) : slugify(label),
            value: String(s.value ?? "").trim(),
          };
        })
        .filter((s) => s.label && s.value)
    : [];

  return {
    slug,
    name,
    brandId: toNum(body.brandId),
    categoryId: toNum(body.categoryId),
    sku: body.sku ? String(body.sku).trim() : null,
    shortDescription: body.shortDescription ? String(body.shortDescription) : null,
    description: body.description ? String(body.description) : null,
    shippingInfo: body.shippingInfo ? String(body.shippingInfo) : null,
    specs,
    price: toNum(body.price),
    discountedPrice: toNum(body.discountedPrice),
    currency: body.currency ? String(body.currency) : "EUR",
    stock: Math.max(0, Math.trunc(toNum(body.stock) ?? 0)),
    isDirectSale: Boolean(body.isDirectSale),
    isActive: body.isActive === undefined ? true : Boolean(body.isActive),
    featuredSlot: featuredSlot(body.featuredSlot),
    seoTitle: body.seoTitle ? String(body.seoTitle) : null,
    seoDescription: body.seoDescription ? String(body.seoDescription) : null,
    seoKeywords: body.seoKeywords ? String(body.seoKeywords) : null,
    imageUrls,
  };
}
