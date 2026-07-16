import { NextResponse } from "next/server";
import { listProducts } from "@/lib/repositories/products";
import { absoluteUrl, organization, siteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

function stripHtml(value: string | null | undefined) {
  return String(value || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function xml(value: string | number | null | undefined) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function imageUrl(url: string | null | undefined) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  return absoluteUrl(url);
}

export async function GET() {
  const products = await listProducts();
  const merchantProducts = products.filter(
    (product) =>
      product.isActive &&
      product.isDirectSale &&
      product.price !== null &&
      product.primaryImage,
  );

  const items = merchantProducts
    .map((product) => {
      const currentPrice = product.discountedPrice ?? product.price;
      const description =
        stripHtml(product.seoDescription) ||
        stripHtml(product.shortDescription) ||
        stripHtml(product.description) ||
        product.name;
      const availability = product.stock > 0 ? "in_stock" : "preorder";
      const link = absoluteUrl(`market/${product.slug}`);
      const mainImage = imageUrl(product.primaryImage);
      const additionalImages = product.images
        .map((image) => imageUrl(image.url))
        .filter((url) => url && url !== mainImage)
        .slice(0, 10);

      return `
    <item>
      <g:id>${xml(product.sku || product.id)}</g:id>
      <g:title>${xml(product.name)}</g:title>
      <g:description>${xml(description)}</g:description>
      <g:link>${xml(link)}</g:link>
      <g:image_link>${xml(mainImage)}</g:image_link>
      ${additionalImages.map((url) => `<g:additional_image_link>${xml(url)}</g:additional_image_link>`).join("\n      ")}
      <g:availability>${availability}</g:availability>
      <g:price>${xml(`${currentPrice?.toFixed(2)} ${product.currency}`)}</g:price>
      <g:condition>new</g:condition>
      <g:brand>${xml(product.brandName || organization.name)}</g:brand>
      <g:mpn>${xml(product.sku || product.slug)}</g:mpn>
      <g:identifier_exists>no</g:identifier_exists>
      <g:product_type>${xml(product.categoryName || "Laboratuvar Ürünleri")}</g:product_type>
    </item>`;
    })
    .join("");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${xml(organization.name)} Ürün Feed</title>
    <link>${xml(siteUrl)}</link>
    <description>${xml("Spektrotek laboratuvar ürünleri ve sarf malzemeleri Google Merchant feed'i.")}</description>${items}
  </channel>
</rss>`;

  return new NextResponse(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
