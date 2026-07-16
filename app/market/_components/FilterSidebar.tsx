"use client";

import { Search } from "lucide-react";

export type FilterOption = { name: string; slug: string; count?: number };

type Props = {
  categories: FilterOption[];
  brands: FilterOption[];
  selectedCategories: string[];
  selectedBrands: string[];
  search: string;
  onToggleCategory: (slug: string) => void;
  onToggleBrand: (slug: string) => void;
  onSearch: (value: string) => void;
  onReset: () => void;
};

function CheckRow({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count?: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg px-2 py-1.5 transition hover:bg-slate-50">
      <span className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="h-4 w-4 rounded border-slate-300 text-spektro-blue focus:ring-spektro-blue"
        />
        <span className="text-sm text-slate-700">{label}</span>
      </span>
      {count !== undefined ? <span className="text-xs text-slate-400">{count}</span> : null}
    </label>
  );
}

export function FilterSidebar({
  categories,
  brands,
  selectedCategories,
  selectedBrands,
  search,
  onToggleCategory,
  onToggleBrand,
  onSearch,
  onReset,
}: Props) {
  const hasFilters =
    selectedCategories.length > 0 || selectedBrands.length > 0 || search.length > 0;

  return (
    <aside className="h-fit max-h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Ürün ara..."
          className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-spektro-blue/30 focus:ring-4 focus:ring-spektro-blue/10"
        />
      </div>

      <div className="mt-5 flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-tight text-slate-900">Filtreler</h3>
        {hasFilters ? (
          <button onClick={onReset} className="text-xs font-medium text-spektro-blue hover:underline">
            Temizle
          </button>
        ) : null}
      </div>

      <div className="mt-4 border-t border-slate-100 pt-4">
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Kategoriler
        </h4>
        <div className="space-y-0.5">
          {categories.map((c) => (
            <CheckRow
              key={c.slug}
              label={c.name}
              count={c.count}
              checked={selectedCategories.includes(c.slug)}
              onChange={() => onToggleCategory(c.slug)}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 border-t border-slate-100 pt-4">
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Markalar</h4>
        <div className="space-y-0.5">
          {brands.map((b) => (
            <CheckRow
              key={b.slug}
              label={b.name}
              count={b.count}
              checked={selectedBrands.includes(b.slug)}
              onChange={() => onToggleBrand(b.slug)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
