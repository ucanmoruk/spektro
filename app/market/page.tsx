import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { listProducts } from "@/lib/repositories/products";
import { listBrands, listCategories } from "@/lib/repositories/taxonomy";
import { metadataFor } from "@/lib/seo";
import { toStoreProduct } from "@/lib/store-view";
import { FeaturedProducts } from "./_components/FeaturedProducts";
import { MarketClient } from "./_components/MarketClient";
import { QuickCategoryTiles } from "./_components/QuickCategoryTiles";
import type { FilterOption } from "./_components/FilterSidebar";

export const dynamic = "force-dynamic";

export const metadata: Metadata = metadataFor("market");

export default async function MarketPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string; q?: string }>;
}) {
  const { kategori, q } = await searchParams;
  const [products, brands, categories] = await Promise.all([
    listProducts(),
    listBrands(),
    listCategories(),
  ]);

  // Marka slug'ını isimden eşleştir (ürün satırı marka slug ile filtrelenecek).
  const brandSlugByName = new Map(brands.map((b) => [b.name, b.slug]));
  const storeProducts = products.map((p) =>
    toStoreProduct(p, p.brandName ? brandSlugByName.get(p.brandName) ?? null : null),
  );

  const categoryOptions: FilterOption[] = categories.map((c) => ({
    name: c.name,
    slug: c.slug,
    count: storeProducts.filter((p) => p.categorySlug === c.slug).length,
  }));
  const brandOptions: FilterOption[] = brands.map((b) => ({
    name: b.name,
    slug: b.slug,
    count: storeProducts.filter((p) => p.brandSlug === b.slug).length,
  }));

  return (
    <main className="bg-white text-slate-900">
      <Navbar />

      <section className="border-b border-slate-100 bg-slate-50 pb-12 pt-32 md:pb-16 md:pt-36">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">
            Market
          </p>
          <h1 className="font-heading max-w-4xl text-slate-900">
            Analitik Sistemler, Kolonlar &amp; Sarf Malzemeler
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
            Sarf malzemelerinizi anında sipariş edin veya laboratuvar sistemleriniz için
            mühendislerimizden proje teklifi isteyin.
          </p>
        </div>
      </section>

      <FeaturedProducts products={storeProducts} />
      <QuickCategoryTiles />

      <section id="urun-listesi" className="scroll-mt-28 py-10 md:py-14">
        <MarketClient
          products={storeProducts}
          categories={categoryOptions}
          brands={brandOptions}
          initialCategory={kategori}
          initialSearch={q}
        />
      </section>

      <Footer />
    </main>
  );
}
