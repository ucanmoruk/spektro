import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import { formatPrice } from "@/lib/format";
import { getProductBySlug, getRelatedProducts } from "@/lib/repositories/products";
import { absoluteUrl, breadcrumbJsonLd, siteUrl } from "@/lib/seo";
import { toStoreProduct } from "@/lib/store-view";
import { ProductGallery } from "./_components/ProductGallery";
import { ProductDetailActions } from "./_components/ProductDetailActions";
import { ProductTabs } from "./_components/ProductTabs";
import { ProductGridCard } from "../_components/ProductGridCard";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Ürün bulunamadı | Spektrotek" };
  return {
    title: product.seoTitle || `${product.name} | Spektrotek`,
    description: product.seoDescription || product.shortDescription || undefined,
    keywords: product.seoKeywords || undefined,
    alternates: {
      canonical: `/market/${product.slug}`,
    },
    openGraph: {
      title: product.seoTitle || `${product.name} | Spektrotek`,
      description: product.seoDescription || product.shortDescription || undefined,
      url: absoluteUrl(`market/${product.slug}`),
      siteName: "Spektrotek",
      locale: "tr_TR",
      type: "website",
      images: [
        {
          url: product.images[0]?.url || `${siteUrl}/brand/spektrotek-logo.png`,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.seoTitle || `${product.name} | Spektrotek`,
      description: product.seoDescription || product.shortDescription || undefined,
      images: [product.images[0]?.url || `${siteUrl}/brand/spektrotek-logo.png`],
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const view = toStoreProduct(product);
  const images = product.images.map((i) => i.url);
  const price = product.discountedPrice ?? product.price;
  const hasDiscount =
    product.isDirectSale && product.discountedPrice !== null && product.price !== null;

  const related = (await getRelatedProducts(product, 4)).map((p) => toStoreProduct(p));
  const tags = (product.seoKeywords ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.seoDescription || product.shortDescription || product.description,
    image: images.length ? images : [`${siteUrl}/brand/spektrotek-logo.png`],
    sku: product.sku || undefined,
    brand: product.brandName ? { "@type": "Brand", name: product.brandName } : undefined,
    offers: product.isDirectSale
      ? {
          "@type": "Offer",
          url: absoluteUrl(`market/${product.slug}`),
          priceCurrency: product.currency,
          price: price ?? undefined,
          availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
        }
      : undefined,
  };

  return (
    <main className="bg-white text-slate-900">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Anasayfa", path: "" },
            { name: "Market", path: "market" },
            { name: product.name, path: `market/${product.slug}` },
          ]),
          productJsonLd,
        ]}
      />
      <Navbar />

      <div className="mx-auto w-full max-w-6xl px-6 pt-28 md:px-10">
        <nav className="flex items-center gap-1 text-xs text-slate-500">
          <Link href="/market" className="hover:text-spektro-blue">
            Market
          </Link>
          {product.categoryName ? (
            <>
              <ChevronRight className="h-3.5 w-3.5" />
              {product.categorySlug ? (
                <Link
                  href={`/market?kategori=${product.categorySlug}`}
                  className="hover:text-spektro-blue"
                >
                  {product.categoryName}
                </Link>
              ) : (
                <span>{product.categoryName}</span>
              )}
            </>
          ) : null}
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-slate-700">{product.name}</span>
        </nav>
      </div>

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-10 md:grid-cols-2 md:px-10">
        <ProductGallery images={images} name={product.name} />

        <div>
          {product.brandName ? (
            <p className="text-sm font-semibold uppercase tracking-wide text-spektro-blue">
              {product.brandName}
            </p>
          ) : null}
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            {product.name}
          </h1>
          {product.shortDescription ? (
            <p className="mt-3 max-w-full break-words text-base leading-relaxed text-slate-600">
              {product.shortDescription}
            </p>
          ) : null}

          <div className="mt-6 flex items-end gap-3">
            {product.isDirectSale ? (
              <>
                <span className="text-3xl font-semibold tracking-tight text-slate-900">
                  {formatPrice(price, product.currency)}
                </span>
                {hasDiscount ? (
                  <span className="pb-1 text-lg text-slate-400 line-through">
                    {formatPrice(product.price, product.currency)}
                  </span>
                ) : null}
              </>
            ) : (
              <span className="text-2xl font-semibold text-slate-800">Fiyat İçin Danışın</span>
            )}
          </div>
          {product.isDirectSale ? (
            <p className="mt-1 text-xs text-slate-400">
              KDV Dahil · Ödeme, güncel TCMB kuruyla TL olarak alınır.
            </p>
          ) : null}

          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {product.sku ? (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                SKU: {product.sku}
              </span>
            ) : null}
            {product.isDirectSale ? (
              <span
                className={`rounded-full px-3 py-1 font-medium ${
                  product.stock > 0
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {product.stock > 0 ? `Stokta (${product.stock})` : "Tedarik süreli"}
              </span>
            ) : null}
          </div>

          <ProductDetailActions product={view} />

          {product.categorySlug || tags.length > 0 ? (
            <div className="mt-6 space-y-2 border-t border-slate-100 pt-4 text-xs">
              {product.categorySlug ? (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-slate-500">Kategori:</span>
                  <Link
                    href={`/market?kategori=${product.categorySlug}`}
                    className="rounded-full bg-slate-100 px-3 py-1 text-slate-600 hover:bg-slate-200"
                  >
                    {product.categoryName} <span className="text-slate-400">/{product.categorySlug}</span>
                  </Link>
                </div>
              ) : null}
              {tags.length > 0 ? (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-slate-500">Etiketler:</span>
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-slate-500"
                    >
                      #{tag.replace(/\s+/g, "-").toLowerCase()}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-12 md:px-10">
        <ProductTabs
          descriptionHtml={product.description}
          specs={product.specs}
          shippingInfo={product.shippingInfo}
          stock={product.stock}
          isDirectSale={product.isDirectSale}
        />
      </section>

      {related.length > 0 ? (
        <section className="mx-auto w-full max-w-6xl px-6 pb-16 md:px-10">
          <h2 className="mb-5 text-xl font-semibold tracking-tight text-slate-900">İlgili Ürünler</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p) => (
              <ProductGridCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}

      <Footer />
    </main>
  );
}
