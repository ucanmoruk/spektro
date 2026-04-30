"use client";

import { ProductCategory } from "@/data/mockProducts";

type FilterSidebarProps = {
  categories: ProductCategory[];
  brands: string[];
  selectedCategories: ProductCategory[];
  selectedBrands: string[];
  onToggleCategory: (category: ProductCategory) => void;
  onToggleBrand: (brand: string) => void;
};

function FilterCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-slate-50">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-slate-300 text-spektro-blue focus:ring-spektro-blue"
      />
      <span className="text-sm text-slate-700">{label}</span>
    </label>
  );
}

export function FilterSidebar({
  categories,
  brands,
  selectedCategories,
  selectedBrands,
  onToggleCategory,
  onToggleBrand,
}: FilterSidebarProps) {
  return (
    <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
      <h3 className="text-lg font-semibold tracking-tight text-slate-900">Filtreler</h3>

      <div className="mt-5 border-t border-slate-100 pt-5">
        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">Kategoriler</h4>
        <div className="space-y-1">
          {categories.map((category) => (
            <FilterCheckbox
              key={category}
              label={category}
              checked={selectedCategories.includes(category)}
              onChange={() => onToggleCategory(category)}
            />
          ))}
        </div>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-5">
        <h4 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">Markalar</h4>
        <div className="space-y-1">
          {brands.map((brand) => (
            <FilterCheckbox
              key={brand}
              label={brand}
              checked={selectedBrands.includes(brand)}
              onChange={() => onToggleBrand(brand)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

