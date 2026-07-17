import "server-only";
import { execute, query, queryOne } from "../db";
import type { FeaturedSlot, Product, ProductImage, ProductSpec } from "../types";

type ProductRow = {
  id: number;
  slug: string;
  name: string;
  brand_id: number | null;
  brand_name: string | null;
  category_id: number | null;
  category_name: string | null;
  category_slug: string | null;
  sku: string | null;
  short_description: string | null;
  description: string | null;
  shipping_info: string | null;
  price: string | null;
  discounted_price: string | null;
  currency: string;
  stock: number;
  is_direct_sale: number;
  is_active: number;
  featured_slot: FeaturedSlot | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  primary_image: string | null;
  created_at: string;
  updated_at: string;
};

const num = (v: string | null): number | null => (v === null ? null : Number(v));

function mapProduct(
  row: ProductRow,
  images: ProductImage[] = [],
  specs: ProductSpec[] = [],
): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brandId: row.brand_id,
    brandName: row.brand_name,
    categoryId: row.category_id,
    categoryName: row.category_name,
    categorySlug: row.category_slug,
    sku: row.sku,
    shortDescription: row.short_description,
    description: row.description,
    shippingInfo: row.shipping_info,
    price: num(row.price),
    discountedPrice: num(row.discounted_price),
    currency: row.currency,
    stock: row.stock,
    isDirectSale: !!row.is_direct_sale,
    isActive: !!row.is_active,
    featuredSlot: row.featured_slot,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    seoKeywords: row.seo_keywords,
    primaryImage: row.primary_image,
    images,
    specs,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

const BASE_SELECT = `
  SELECT
    p.*, b.name AS brand_name,
    c.name AS category_name, c.slug AS category_slug,
    (SELECT pi.url FROM product_images pi WHERE pi.product_id = p.id
       ORDER BY pi.sort_order ASC, pi.id ASC LIMIT 1) AS primary_image
  FROM products p
  LEFT JOIN brands b ON b.id = p.brand_id
  LEFT JOIN categories c ON c.id = p.category_id
`;

export type ProductFilter = {
  categorySlugs?: string[];
  brandSlugs?: string[];
  search?: string;
  onlyActive?: boolean;
};

/** Vitrin listelemesi (varsayılan: yalnızca aktif ürünler). */
export async function listProducts(filter: ProductFilter = {}): Promise<Product[]> {
  const where: string[] = [];
  const params: unknown[] = [];

  if (filter.onlyActive !== false) where.push("p.is_active = 1");

  if (filter.categorySlugs?.length) {
    where.push(`c.slug IN (${filter.categorySlugs.map(() => "?").join(",")})`);
    params.push(...filter.categorySlugs);
  }
  if (filter.brandSlugs?.length) {
    where.push(`b.slug IN (${filter.brandSlugs.map(() => "?").join(",")})`);
    params.push(...filter.brandSlugs);
  }
  if (filter.search) {
    where.push("(p.name LIKE ? OR p.short_description LIKE ? OR p.sku LIKE ?)");
    const like = `%${filter.search}%`;
    params.push(like, like, like);
  }

  const sql = `${BASE_SELECT}
    ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
    ORDER BY p.created_at DESC`;

  const rows = await query<ProductRow>(sql, params);
  return rows.map((r) => mapProduct(r));
}

/**
 * Admin için: tüm ürünleri görselleri VE teknik özellikleriyle birlikte döndürür.
 * Görsel/spec'ler 2 toplu sorguyla yüklenir (N+1 yok).
 */
export async function listProductsForAdmin(): Promise<Product[]> {
  const rows = await query<ProductRow>(`${BASE_SELECT} ORDER BY p.created_at DESC`);
  if (rows.length === 0) return [];
  const ids = rows.map((r) => r.id);
  const ph = ids.map(() => "?").join(",");

  const imgRows = await query<{
    product_id: number;
    id: number;
    url: string;
    alt: string | null;
    sort_order: number;
  }>(
    `SELECT product_id, id, url, alt, sort_order FROM product_images
     WHERE product_id IN (${ph}) ORDER BY sort_order ASC, id ASC`,
    ids,
  );
  const specRows = await query<{
    product_id: number;
    spec_slug: string;
    label: string;
    value: string;
  }>(
    `SELECT product_id, spec_slug, label, value FROM product_specs
     WHERE product_id IN (${ph}) ORDER BY sort_order ASC, id ASC`,
    ids,
  );

  const imgsByProduct = new Map<number, ProductImage[]>();
  for (const r of imgRows) {
    const list = imgsByProduct.get(r.product_id) ?? [];
    list.push({ id: r.id, url: r.url, alt: r.alt, sortOrder: r.sort_order });
    imgsByProduct.set(r.product_id, list);
  }
  const specsByProduct = new Map<number, ProductSpec[]>();
  for (const r of specRows) {
    const list = specsByProduct.get(r.product_id) ?? [];
    list.push({ slug: r.spec_slug, label: r.label, value: r.value });
    specsByProduct.set(r.product_id, list);
  }

  return rows.map((r) =>
    mapProduct(r, imgsByProduct.get(r.id) ?? [], specsByProduct.get(r.id) ?? []),
  );
}

export async function getProductBySlug(
  slug: string,
  opts: { includeInactive?: boolean } = {},
): Promise<Product | null> {
  const row = await queryOne<ProductRow>(
    `${BASE_SELECT} WHERE p.slug = ? ${opts.includeInactive ? "" : "AND p.is_active = 1"} LIMIT 1`,
    [slug],
  );
  if (!row) return null;
  const [images, specs] = await Promise.all([getProductImages(row.id), getProductSpecs(row.id)]);
  return mapProduct(row, images, specs);
}

export async function getProductById(id: number): Promise<Product | null> {
  const row = await queryOne<ProductRow>(`${BASE_SELECT} WHERE p.id = ? LIMIT 1`, [id]);
  if (!row) return null;
  const [images, specs] = await Promise.all([getProductImages(row.id), getProductSpecs(row.id)]);
  return mapProduct(row, images, specs);
}

async function getProductImages(productId: number): Promise<ProductImage[]> {
  const rows = await query<{ id: number; url: string; alt: string | null; sort_order: number }>(
    `SELECT id, url, alt, sort_order FROM product_images
     WHERE product_id = ? ORDER BY sort_order ASC, id ASC`,
    [productId],
  );
  return rows.map((r) => ({ id: r.id, url: r.url, alt: r.alt, sortOrder: r.sort_order }));
}

async function getProductSpecs(productId: number): Promise<ProductSpec[]> {
  const rows = await query<{ spec_slug: string; label: string; value: string }>(
    `SELECT spec_slug, label, value FROM product_specs
     WHERE product_id = ? ORDER BY sort_order ASC, id ASC`,
    [productId],
  );
  return rows.map((r) => ({ slug: r.spec_slug, label: r.label, value: r.value }));
}

/** Anahtar kelime / kategori eşleşmeli ilgili ürünler. */
export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const keywords = (product.seoKeywords ?? "")
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean)
    .slice(0, 6);

  const conds: string[] = [];
  const params: unknown[] = [];
  if (product.categoryId) {
    conds.push("p.category_id = ?");
    params.push(product.categoryId);
  }
  for (const kw of keywords) {
    conds.push("(p.seo_keywords LIKE ? OR p.name LIKE ?)");
    params.push(`%${kw}%`, `%${kw}%`);
  }
  if (conds.length === 0) return [];

  const sql = `${BASE_SELECT}
    WHERE p.is_active = 1 AND p.id <> ? AND (${conds.join(" OR ")})
    ORDER BY (p.category_id <=> ?) DESC, p.created_at DESC
    LIMIT ${Math.max(1, Math.min(12, limit))}`;
  const rows = await query<ProductRow>(sql, [product.id, ...params, product.categoryId]);
  return rows.map((r) => mapProduct(r));
}

// --- Admin CRUD -------------------------------------------------------------

export type ProductInput = {
  slug: string;
  name: string;
  brandId: number | null;
  categoryId: number | null;
  sku: string | null;
  shortDescription: string | null;
  description: string | null;
  shippingInfo: string | null;
  price: number | null;
  discountedPrice: number | null;
  currency: string;
  stock: number;
  isDirectSale: boolean;
  isActive: boolean;
  featuredSlot: FeaturedSlot | null;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  imageUrls: string[];
  specs: ProductSpec[];
};

export async function createProduct(input: ProductInput): Promise<number> {
  const result = await execute(
    `INSERT INTO products
       (slug, name, brand_id, category_id, sku, short_description, description, shipping_info,
        price, discounted_price, currency, stock, is_direct_sale, is_active, featured_slot,
        seo_title, seo_description, seo_keywords)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      input.slug, input.name, input.brandId, input.categoryId, input.sku,
      input.shortDescription, input.description, input.shippingInfo, input.price, input.discountedPrice,
      input.currency, input.stock, input.isDirectSale ? 1 : 0, input.isActive ? 1 : 0,
      input.featuredSlot,
      input.seoTitle, input.seoDescription, input.seoKeywords,
    ],
  );
  await replaceImages(result.insertId, input.imageUrls);
  await replaceSpecs(result.insertId, input.specs);
  return result.insertId;
}

export async function updateProduct(id: number, input: ProductInput): Promise<void> {
  await execute(
    `UPDATE products SET
       slug=?, name=?, brand_id=?, category_id=?, sku=?, short_description=?, description=?, shipping_info=?,
       price=?, discounted_price=?, currency=?, stock=?, is_direct_sale=?, is_active=?, featured_slot=?,
       seo_title=?, seo_description=?, seo_keywords=?
     WHERE id=?`,
    [
      input.slug, input.name, input.brandId, input.categoryId, input.sku,
      input.shortDescription, input.description, input.shippingInfo, input.price, input.discountedPrice,
      input.currency, input.stock, input.isDirectSale ? 1 : 0, input.isActive ? 1 : 0,
      input.featuredSlot,
      input.seoTitle, input.seoDescription, input.seoKeywords, id,
    ],
  );
  await replaceImages(id, input.imageUrls);
  await replaceSpecs(id, input.specs);
}

export async function deleteProduct(id: number): Promise<void> {
  await execute(`DELETE FROM products WHERE id = ?`, [id]);
}

async function replaceImages(productId: number, urls: string[]): Promise<void> {
  await execute(`DELETE FROM product_images WHERE product_id = ?`, [productId]);
  const clean = urls.map((u) => u.trim()).filter(Boolean);
  for (let i = 0; i < clean.length; i++) {
    await execute(
      `INSERT INTO product_images (product_id, url, sort_order) VALUES (?, ?, ?)`,
      [productId, clean[i], i],
    );
  }
}

async function replaceSpecs(productId: number, specs: ProductSpec[]): Promise<void> {
  await execute(`DELETE FROM product_specs WHERE product_id = ?`, [productId]);
  const clean = specs
    .map((s) => ({ slug: s.slug.trim(), label: s.label.trim(), value: s.value.trim() }))
    .filter((s) => s.label && s.value);
  for (let i = 0; i < clean.length; i++) {
    await execute(
      `INSERT INTO product_specs (product_id, spec_slug, label, value, sort_order) VALUES (?,?,?,?,?)`,
      [productId, clean[i].slug || `spec-${i + 1}`, clean[i].label, clean[i].value, i],
    );
  }
}
