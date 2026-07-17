"use client";

import { useEffect, useMemo, useState } from "react";
import { LayoutGrid, List, ShoppingCart, SlidersHorizontal } from "lucide-react";
import type { StoreProduct } from "@/lib/store-view";
import { useCartStore } from "@/store/useCartStore";
import { CartDrawer } from "./CartDrawer";
import { FilterSidebar, type FilterOption } from "./FilterSidebar";
import { ProductRow } from "./ProductRow";
import { ProductGridCard } from "./ProductGridCard";

type Props = {
  products: StoreProduct[];
  categories: FilterOption[];
  brands: FilterOption[];
  initialCategory?: string;
  initialSearch?: string;
};

type SortKey = "new" | "price-asc" | "price-desc" | "name";
type ViewMode = "list" | "grid";
type PageSize = 12 | 24 | 48 | 96;

export function MarketClient({ products, categories, brands, initialCategory, initialSearch }: Props) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : [],
  );
  const [view, setView] = useState<ViewMode>("list");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [search, setSearch] = useState(initialSearch ?? "");
  const [sort, setSort] = useState<SortKey>("new");
  const [pageSize, setPageSize] = useState<PageSize>(12);
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const totalCount = useCartStore((s) => s.totalCount());

  useEffect(() => {
    setSelectedCategories(initialCategory ? [initialCategory] : []);
  }, [initialCategory]);

  useEffect(() => {
    setSearch(initialSearch ?? "");
  }, [initialSearch]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = products.filter((p) => {
      const catOk =
        selectedCategories.length === 0 ||
        (p.categorySlug ? selectedCategories.includes(p.categorySlug) : false);
      const brandOk =
        selectedBrands.length === 0 || (p.brandSlug ? selectedBrands.includes(p.brandSlug) : false);
      const searchOk =
        q.length === 0 ||
        p.name.toLowerCase().includes(q) ||
        (p.shortDescription ?? "").toLowerCase().includes(q) ||
        (p.sku ?? "").toLowerCase().includes(q);
      return catOk && brandOk && searchOk;
    });

    const priceOf = (p: StoreProduct) => p.discountedPrice ?? p.price ?? Number.POSITIVE_INFINITY;
    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => priceOf(a) - priceOf(b));
      case "price-desc":
        return [...list].sort((a, b) => priceOf(b) - priceOf(a));
      case "name":
        return [...list].sort((a, b) => a.name.localeCompare(b.name, "tr"));
      default:
        return list;
    }
  }, [products, selectedCategories, selectedBrands, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const startIndex = (page - 1) * pageSize;
  const paginated = filtered.slice(startIndex, startIndex + pageSize);
  const visibleStart = filtered.length === 0 ? 0 : startIndex + 1;
  const visibleEnd = Math.min(startIndex + pageSize, filtered.length);

  useEffect(() => {
    setPage(1);
  }, [selectedCategories, selectedBrands, search, sort, pageSize]);

  useEffect(() => {
    setPage((current) => Math.min(current, totalPages));
  }, [totalPages]);

  const toggle = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  const reset = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSearch("");
  };

  const sidebar = (
    <FilterSidebar
      categories={categories}
      brands={brands}
      selectedCategories={selectedCategories}
      selectedBrands={selectedBrands}
      search={search}
      onToggleCategory={(slug) => setSelectedCategories((p) => toggle(p, slug))}
      onToggleBrand={(slug) => setSelectedBrands((p) => toggle(p, slug))}
      onSearch={setSearch}
      onReset={reset}
    />
  );

  return (
    <>
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 md:px-10 lg:grid-cols-[280px_1fr]">
        <div className="hidden lg:block lg:sticky lg:top-28 lg:self-start">{sidebar}</div>

        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFiltersOpen((v) => !v)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" /> Filtreler
              </button>
              <p className="text-sm text-slate-500">
                {filtered.length} ürün
                {filtered.length > 0 ? (
                  <span className="text-slate-400"> · {visibleStart}-{visibleEnd} arası</span>
                ) : null}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-slate-500">
                Göster
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value) as PageSize)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-spektro-blue/30"
                >
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={48}>48</option>
                  <option value={96}>96</option>
                </select>
              </label>
              <div className="flex items-center rounded-lg border border-slate-200 p-0.5">
                <button
                  onClick={() => setView("list")}
                  aria-label="Liste görünümü"
                  className={`rounded-md p-1.5 transition ${
                    view === "list" ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setView("grid")}
                  aria-label="Kart görünümü"
                  className={`rounded-md p-1.5 transition ${
                    view === "grid" ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
              </div>
              <label className="flex items-center gap-2 text-sm text-slate-500">
                Sırala
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:border-spektro-blue/30"
                >
                  <option value="new">En Yeni</option>
                  <option value="price-asc">Fiyat (Artan)</option>
                  <option value="price-desc">Fiyat (Azalan)</option>
                  <option value="name">İsim (A-Z)</option>
                </select>
              </label>
            </div>
          </div>

          {filtersOpen ? <div className="mb-5 lg:hidden">{sidebar}</div> : null}

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center text-slate-500">
              Seçtiğiniz kriterlere uygun ürün bulunamadı.
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {paginated.map((p) => (
                <ProductGridCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {paginated.map((p) => (
                <ProductRow key={p.id} product={p} />
              ))}
            </div>
          )}

          {filtered.length > pageSize ? (
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
              <p className="text-sm text-slate-500">
                Sayfa {page} / {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={page === 1}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Önceki
                </button>
                <button
                  onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                  disabled={page === totalPages}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Sonraki
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <button
        onClick={() => setDrawerOpen(true)}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-[0_8px_30px_rgb(0,0,0,0.20)] transition hover:bg-slate-800"
      >
        <span className="relative">
          <ShoppingCart className="h-4 w-4" />
          {totalCount > 0 ? (
            <span className="absolute -right-2 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-spektro-blue px-1 text-[10px] font-bold text-white">
              {totalCount}
            </span>
          ) : null}
        </span>
        Sepet
      </button>

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
