"use client";

import { useMemo, useState } from "react";
import { ShoppingCart } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { mockProducts, ProductCategory } from "@/data/mockProducts";
import { useCartStore } from "@/store/useCartStore";
import { CartDrawer } from "./_components/CartDrawer";
import { FilterSidebar } from "./_components/FilterSidebar";
import { ProductCard } from "./_components/ProductCard";

const categories: ProductCategory[] = ["Sistemler", "Kolonlar", "Yedek Parçalar"];
const brands = Array.from(new Set(mockProducts.map((product) => product.brand)));

export default function MarketPage() {
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { addProduct, totalCount } = useCartStore();

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const categoryMatch =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      return categoryMatch && brandMatch;
    });
  }, [selectedBrands, selectedCategories]);

  const toggleCategory = (category: ProductCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category],
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((item) => item !== brand) : [...prev, brand],
    );
  };

  return (
    <main className="bg-white text-slate-900">
      <Navbar />

      <section className="bg-slate-50 pb-14 pt-32 md:pb-20 md:pt-36">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">Mağaza</p>
          <h1 className="font-heading max-w-4xl text-slate-900">
            Analitik Çözüm ve Sarf Malzeme Kataloğu
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600">
            Sarf malzemelerinizi anında sipariş edin veya laboratuvar sistemleriniz için
            mühendislerimizden proje teklifi isteyin.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 md:px-10 lg:grid-cols-[280px_1fr]">
          <FilterSidebar
            categories={categories}
            brands={brands}
            selectedCategories={selectedCategories}
            selectedBrands={selectedBrands}
            onToggleCategory={toggleCategory}
            onToggleBrand={toggleBrand}
          />

          <div>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Ürünler</h2>
              <p className="text-sm text-slate-500">{filteredProducts.length} ürün listelendi</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAdd={addProduct} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <button
        onClick={() => setDrawerOpen(true)}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-[0_8px_30px_rgb(0,0,0,0.20)] transition hover:bg-slate-800"
      >
        <span className="relative">
          <ShoppingCart className="h-4 w-4" />
          {totalCount() > 0 ? (
            <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-spektro-blue px-1 text-[10px] font-bold text-white">
              {totalCount()}
            </span>
          ) : null}
        </span>
        Sepet
      </button>

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <Footer />
    </main>
  );
}

