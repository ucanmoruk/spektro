import type { MetadataRoute } from "next";
import { legacyPages } from "@/data/legacyPages";
import { legacyPosts } from "@/data/legacyPosts";
import { listProducts } from "@/lib/repositories/products";
import { sitemapEntry, staticSeoPages } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = staticSeoPages.map((page) => sitemapEntry(page.path, page.priority));
  const legacyEntries = legacyPages.map((page) => sitemapEntry(page.path, 0.58));
  const postEntries = legacyPosts.map((post) => sitemapEntry(post.slug, 0.68));
  const products = await listProducts();
  const productEntries = products.map((product) => ({
    ...sitemapEntry(`market/${product.slug}`, 0.64),
    lastModified: new Date(product.updatedAt),
    changeFrequency: "weekly" as const,
  }));

  return [...staticEntries, ...legacyEntries, ...postEntries, ...productEntries];
}
