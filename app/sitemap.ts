import type { MetadataRoute } from "next";
import { legacyPages } from "@/data/legacyPages";
import { legacyPosts } from "@/data/legacyPosts";
import { sitemapEntry, staticSeoPages } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticSeoPages.map((page) => sitemapEntry(page.path, page.priority));
  const legacyEntries = legacyPages.map((page) => sitemapEntry(page.path, 0.58));
  const postEntries = legacyPosts.map((post) => sitemapEntry(post.slug, 0.68));

  return [...staticEntries, ...legacyEntries, ...postEntries];
}
