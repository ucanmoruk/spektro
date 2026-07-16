import fs from "node:fs/promises";
import path from "node:path";
import mysql from "mysql2/promise";

const ROOT = process.cwd();
const PUBLIC_IMAGE_DIR = path.join(ROOT, "public", "products", "woocommerce");
const PUBLIC_IMAGE_PREFIX = "/products/woocommerce";

function readEnvFile(file) {
  return fs
    .readFile(file, "utf8")
    .then((content) => {
      for (const line of content.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
        if (!match) continue;
        const [, key, rawValue] = match;
        if (process.env[key] !== undefined) continue;
        process.env[key] = rawValue.replace(/^['"]|['"]$/g, "");
      }
    })
    .catch(() => undefined);
}

await readEnvFile(path.join(ROOT, ".env.local"));

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const limitArg = [...args].find((arg) => arg.startsWith("--limit="));
const limit = limitArg ? Number(limitArg.split("=")[1]) : null;
const includeDrafts = args.has("--include-drafts");
const skipImages = args.has("--skip-images");

const wcUrl = (process.env.WOOCOMMERCE_URL || "").replace(/\/+$/, "");
const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

if (!wcUrl || !consumerKey || !consumerSecret) {
  throw new Error("WOOCOMMERCE_URL, WOOCOMMERCE_CONSUMER_KEY ve WOOCOMMERCE_CONSUMER_SECRET gerekli.");
}

const TR_MAP = {
  ç: "c", Ç: "c", ğ: "g", Ğ: "g", ı: "i", İ: "i",
  ö: "o", Ö: "o", ş: "s", Ş: "s", ü: "u", Ü: "u",
};

function slugify(input) {
  return String(input || "")
    .replace(/[çÇğĞıİöÖşŞüÜ]/g, (ch) => TR_MAP[ch] ?? ch)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stripHtml(html) {
  return decodeEntities(String(html || ""))
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeEntities(input) {
  return String(input || "")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#8378;/g, "₺");
}

function truncate(input, length) {
  const text = stripHtml(input);
  if (text.length <= length) return text || null;
  return `${text.slice(0, length - 3).replace(/\s+\S*$/, "")}...`;
}

function priceFromWoo(product, key = "price") {
  const direct = product?.[key];
  if (direct !== undefined && direct !== null && direct !== "") {
    const value = Number(String(direct).replace(",", "."));
    return Number.isFinite(value) ? value : null;
  }

  const raw = product?.prices?.[key];
  if (!raw) return null;
  const minor = Number(product.prices.currency_minor_unit ?? 2);
  const value = Number(raw) / 10 ** minor;
  return Number.isFinite(value) ? value : null;
}

function currencyFromWoo(product) {
  const currency = product.prices?.currency_code || product.currency || "EUR";
  return currency === "TRY" ? "EUR" : currency;
}

function categoryFor(product) {
  const categories = product.categories || [];
  return decodeEntities(categories.at(-1)?.name || categories[0]?.name || "WooCommerce");
}

function brandFor(product) {
  const brand = product.brands?.[0]?.name;
  if (brand) return decodeEntities(brand);
  const tagBrand = (product.tags || []).find((tag) =>
    /chromxpert|prexpert|dlab|knauer|sielc|nanalysis|boeco|peak|avantor|aapptec|advion|aplichrom|hta/i.test(tag.name),
  );
  if (tagBrand) return decodeEntities(tagBrand.name);
  const name = product.name || "";
  const match = name.match(/^(ChromXpert|PreXpert|DLAB|KNAUER|SIELC|Nanalysis|BOECO|Peak|Avantor|Aapptec|Advion|AppliChrom|HTA)\b/i);
  return match?.[1] ? decodeEntities(match[1]) : null;
}

function specsFor(product) {
  const specs = [];
  for (const attr of product.attributes || []) {
    const values = (attr.terms || []).map((term) => term.name).filter(Boolean);
    if (attr.name && values.length) {
      specs.push({ label: decodeEntities(attr.name), slug: slugify(attr.name), value: decodeEntities(values.join(", ")) });
    }
  }
  for (const cat of product.categories || []) {
    specs.push({ label: "Kategori", slug: `kategori-${cat.slug || slugify(cat.name)}`, value: decodeEntities(cat.name) });
  }
  if (product.sku) specs.unshift({ label: "SKU", slug: "sku", value: product.sku });
  return specs;
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": "SpektrotekLocalImporter/1.0" },
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`WooCommerce isteği başarısız: ${response.status} ${body.slice(0, 200)}`);
  }
  return { data: await response.json(), headers: response.headers };
}

async function fetchWooProducts() {
  const products = [];
  for (let page = 1; ; page++) {
    const url = new URL(`${wcUrl}/wp-json/wc/v3/products`);
    url.searchParams.set("consumer_key", consumerKey);
    url.searchParams.set("consumer_secret", consumerSecret);
    url.searchParams.set("per_page", "100");
    url.searchParams.set("page", String(page));
    url.searchParams.set("status", includeDrafts ? "any" : "publish");
    const { data, headers } = await fetchJson(url);
    products.push(...data);
    const totalPages = Number(headers.get("x-wp-totalpages") || page);
    if (page >= totalPages) break;
  }
  return limit ? products.slice(0, limit) : products;
}

function dbConfig() {
  const common = {
    waitForConnections: true,
    connectionLimit: Number(process.env.DB_POOL_LIMIT ?? 10),
    queueLimit: 0,
    charset: "utf8mb4",
    dateStrings: true,
    timezone: "Z",
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
  };
  if (process.env.DATABASE_URL) return { uri: process.env.DATABASE_URL, ...common };
  return {
    host: process.env.DB_HOST ?? "127.0.0.1",
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER ?? "root",
    password: process.env.DB_PASSWORD ?? "",
    database: process.env.DB_NAME ?? "spektrotek",
    ...common,
  };
}

async function findOrCreate(conn, table, name) {
  if (!name) return null;
  const clean = String(name).trim();
  const slug = slugify(clean);
  const [rows] = await conn.execute(`SELECT id FROM ${table} WHERE slug = ? OR name = ? LIMIT 1`, [slug, clean]);
  if (rows[0]) return rows[0].id;
  const [result] = await conn.execute(`INSERT INTO ${table} (name, slug) VALUES (?, ?)`, [clean, slug]);
  return result.insertId;
}

async function uniqueSlug(conn, baseSlug, existingId = null) {
  let slug = baseSlug;
  for (let i = 2; ; i++) {
    const [rows] = await conn.execute(
      `SELECT id FROM products WHERE slug = ? ${existingId ? "AND id <> ?" : ""} LIMIT 1`,
      existingId ? [slug, existingId] : [slug],
    );
    if (!rows[0]) return slug;
    slug = `${baseSlug}-${i}`;
  }
}

function imageExtension(url, contentType) {
  const pathname = new URL(url).pathname;
  const ext = path.extname(pathname).toLowerCase();
  if (/^\.(jpg|jpeg|png|webp|gif)$/.test(ext)) return ext;
  if (contentType?.includes("png")) return ".png";
  if (contentType?.includes("webp")) return ".webp";
  if (contentType?.includes("gif")) return ".gif";
  return ".jpg";
}

async function downloadImage(src, slug, index) {
  await fs.mkdir(PUBLIC_IMAGE_DIR, { recursive: true });
  const response = await fetch(src, { headers: { "User-Agent": "SpektrotekLocalImporter/1.0" } });
  if (!response.ok) throw new Error(`Görsel indirilemedi (${response.status}): ${src}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  const ext = imageExtension(src, response.headers.get("content-type"));
  const fileName = `${slug}-${String(index + 1).padStart(2, "0")}${ext}`;
  await fs.writeFile(path.join(PUBLIC_IMAGE_DIR, fileName), buffer);
  return `${PUBLIC_IMAGE_PREFIX}/${fileName}`;
}

async function imageUrlsFor(product, slug) {
  const images = product.images || [];
  if (skipImages) return images.map((image) => image.src).filter(Boolean);
  const urls = [];
  for (let i = 0; i < images.length; i++) {
    try {
      urls.push(await downloadImage(images[i].src, slug, i));
    } catch (error) {
      console.warn(`Görsel atlandı: ${product.name} -> ${error.message}`);
    }
  }
  return urls;
}

function normalizeProduct(product) {
  const regular = priceFromWoo(product, "regular_price") ?? priceFromWoo(product, "price");
  const sale = product.on_sale ? priceFromWoo(product, "sale_price") : null;
  const currency = currencyFromWoo(product);
  const description = product.description || product.short_description || "";
  const inStock = product.stock_status ? product.stock_status === "instock" : Boolean(product.is_in_stock);
  const stockQuantity =
    product.stock_quantity !== null && product.stock_quantity !== undefined
      ? Number(product.stock_quantity)
      : null;
  return {
    sourceId: product.id,
    slug: slugify(product.slug || product.name),
    name: decodeEntities(product.name),
    sku: product.sku || `woo-${product.id}`,
    brandName: brandFor(product),
    categoryName: categoryFor(product),
    shortDescription: stripHtml(product.short_description || product.description),
    description,
    shippingInfo: product.is_in_stock ? "Stokta. Teslimat ve kargo koşulları sipariş öncesi teyit edilir." : "Tedarik süreli. Teslimat için teklif isteyin.",
    price: regular,
    discountedPrice: sale && sale !== regular ? sale : null,
    currency,
    stock: inStock ? Math.max(0, Math.trunc(stockQuantity ?? Number(product.add_to_cart?.maximum || 9999))) : 0,
    isDirectSale: Boolean((product.purchasable ?? product.is_purchasable) && (product.price || product.prices?.price)),
    isActive: true,
    seoTitle: `${product.name} | Spektrotek`,
    seoDescription: truncate(product.short_description || product.description, 155),
    seoKeywords: [...(product.tags || []).map((tag) => tag.name), ...(product.categories || []).map((cat) => cat.name)]
      .filter(Boolean)
      .join(", "),
    specs: specsFor(product),
  };
}

async function upsertProduct(conn, product) {
  const normalized = normalizeProduct(product);
  const [existingRows] = await conn.execute(
    `SELECT id FROM products WHERE sku = ? OR slug = ? LIMIT 1`,
    [normalized.sku, normalized.slug],
  );
  const existingId = existingRows[0]?.id ?? null;
  const slug = existingId ? await uniqueSlug(conn, normalized.slug, existingId) : await uniqueSlug(conn, normalized.slug);
  const brandId = await findOrCreate(conn, "brands", normalized.brandName);
  const categoryId = await findOrCreate(conn, "categories", normalized.categoryName);
  const imageUrls = await imageUrlsFor(product, slug);

  const values = [
    slug,
    normalized.name,
    brandId,
    categoryId,
    normalized.sku,
    normalized.shortDescription,
    normalized.description,
    normalized.shippingInfo,
    normalized.price,
    normalized.discountedPrice,
    normalized.currency,
    normalized.stock,
    normalized.isDirectSale ? 1 : 0,
    normalized.isActive ? 1 : 0,
    normalized.seoTitle,
    normalized.seoDescription,
    normalized.seoKeywords,
  ];

  let productId = existingId;
  if (existingId) {
    await conn.execute(
      `UPDATE products SET
       slug=?, name=?, brand_id=?, category_id=?, sku=?, short_description=?, description=?, shipping_info=?,
       price=?, discounted_price=?, currency=?, stock=?, is_direct_sale=?, is_active=?,
       seo_title=?, seo_description=?, seo_keywords=?
       WHERE id=?`,
      [...values, existingId],
    );
  } else {
    const [result] = await conn.execute(
      `INSERT INTO products
       (slug, name, brand_id, category_id, sku, short_description, description, shipping_info,
        price, discounted_price, currency, stock, is_direct_sale, is_active,
        seo_title, seo_description, seo_keywords)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      values,
    );
    productId = result.insertId;
  }

  await conn.execute(`DELETE FROM product_images WHERE product_id = ?`, [productId]);
  for (let i = 0; i < imageUrls.length; i++) {
    await conn.execute(
      `INSERT INTO product_images (product_id, url, alt, sort_order) VALUES (?, ?, ?, ?)`,
      [productId, imageUrls[i], normalized.name, i],
    );
  }

  await conn.execute(`DELETE FROM product_specs WHERE product_id = ?`, [productId]);
  for (let i = 0; i < normalized.specs.length; i++) {
    const spec = normalized.specs[i];
    await conn.execute(
      `INSERT INTO product_specs (product_id, spec_slug, label, value, sort_order) VALUES (?, ?, ?, ?, ?)`,
      [productId, spec.slug || `spec-${i + 1}`, spec.label, spec.value, i],
    );
  }

  return { action: existingId ? "updated" : "created", name: normalized.name, slug, sku: normalized.sku };
}

const wooProducts = await fetchWooProducts();
console.log(`WooCommerce ürünleri alındı: ${wooProducts.length}`);

const preview = wooProducts.slice(0, 8).map((product) => {
  const normalized = normalizeProduct(product);
  return {
    name: normalized.name,
    sku: normalized.sku,
    brand: normalized.brandName,
    category: normalized.categoryName,
    price: normalized.price,
    currency: normalized.currency,
    images: product.images?.length ?? 0,
  };
});
console.table(preview);

if (dryRun) {
  console.log("Dry-run tamamlandı. Veritabanına yazılmadı, görseller indirilmedi.");
  process.exit(0);
}

const pool = mysql.createPool(dbConfig());
const conn = await pool.getConnection();

let created = 0;
let updated = 0;
try {
  await conn.beginTransaction();
  for (const product of wooProducts) {
    const result = await upsertProduct(conn, product);
    if (result.action === "created") created += 1;
    if (result.action === "updated") updated += 1;
    console.log(`${result.action === "created" ? "Eklendi" : "Güncellendi"}: ${result.name}`);
  }
  await conn.commit();
} catch (error) {
  await conn.rollback();
  throw error;
} finally {
  conn.release();
  await pool.end();
}

console.log(`Import tamamlandı. Eklenen: ${created}, güncellenen: ${updated}`);
