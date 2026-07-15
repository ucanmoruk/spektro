import "server-only";
import { execute, query, queryOne } from "../db";
import { slugify } from "../slug";
import type { Brand, Category } from "../types";

export async function listBrands(): Promise<Brand[]> {
  const rows = await query<{ id: number; name: string; slug: string; logo_url: string | null }>(
    `SELECT id, name, slug, logo_url FROM brands ORDER BY name ASC`,
  );
  return rows.map((r) => ({ id: r.id, name: r.name, slug: r.slug, logoUrl: r.logo_url }));
}

export async function listCategories(): Promise<Category[]> {
  const rows = await query<{
    id: number;
    name: string;
    slug: string;
    parent_id: number | null;
    sort_order: number;
  }>(`SELECT id, name, slug, parent_id, sort_order FROM categories ORDER BY sort_order ASC, name ASC`);
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    slug: r.slug,
    parentId: r.parent_id,
    sortOrder: r.sort_order,
  }));
}

/** İsimden markayı bulur; yoksa oluşturur ve id döndürür. */
export async function findOrCreateBrand(name: string): Promise<number> {
  const clean = name.trim();
  if (!clean) throw new Error("Marka adı boş olamaz.");
  const slug = slugify(clean);
  const existing = await queryOne<{ id: number }>(
    `SELECT id FROM brands WHERE slug = ? OR name = ? LIMIT 1`,
    [slug, clean],
  );
  if (existing) return existing.id;
  const res = await execute(`INSERT INTO brands (name, slug) VALUES (?, ?)`, [clean, slug]);
  return res.insertId;
}

/** İsimden kategoriyi bulur; yoksa oluşturur ve id döndürür. */
export async function findOrCreateCategory(name: string): Promise<number> {
  const clean = name.trim();
  if (!clean) throw new Error("Kategori adı boş olamaz.");
  const slug = slugify(clean);
  const existing = await queryOne<{ id: number }>(
    `SELECT id FROM categories WHERE slug = ? OR name = ? LIMIT 1`,
    [slug, clean],
  );
  if (existing) return existing.id;
  const res = await execute(`INSERT INTO categories (name, slug) VALUES (?, ?)`, [clean, slug]);
  return res.insertId;
}
