"use client";

import { useState } from "react";
import type { ProductSpec } from "@/lib/types";

type Props = {
  descriptionHtml: string | null;
  specs: ProductSpec[];
  shippingInfo: string | null;
  stock: number;
  isDirectSale: boolean;
};

type TabKey = "desc" | "specs" | "shipping";

export function ProductTabs({ descriptionHtml, specs, shippingInfo, stock, isDirectSale }: Props) {
  const tabs: { key: TabKey; label: string; show: boolean }[] = [
    { key: "desc", label: "Ürün Açıklaması", show: !!descriptionHtml },
    { key: "specs", label: "Teknik Detaylar", show: specs.length > 0 },
    { key: "shipping", label: "Stok ve Kargo", show: true },
  ];
  const visible = tabs.filter((t) => t.show);
  const [active, setActive] = useState<TabKey>(visible[0]?.key ?? "shipping");

  if (visible.length === 0) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white">
      <div className="flex flex-wrap gap-1 border-b border-slate-200 px-3 pt-2">
        {visible.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`-mb-px border-b-2 px-4 py-3 text-sm font-medium transition ${
              active === t.key
                ? "border-spektro-blue text-spektro-blue"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-6 md:p-8">
        {active === "desc" && descriptionHtml ? (
          <div
            className="legacy-content max-w-none text-[15px] leading-relaxed text-slate-600"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        ) : null}

        {active === "specs" ? (
          <table className="w-full text-sm">
            <tbody>
              {specs.map((s) => (
                <tr key={s.slug} className="border-b border-slate-100 last:border-0">
                  <th
                    scope="row"
                    data-spec={s.slug}
                    className="w-1/2 py-2.5 pr-4 text-left font-medium text-slate-700 align-top"
                  >
                    {s.label}
                  </th>
                  <td className="py-2.5 text-slate-600">{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}

        {active === "shipping" ? (
          <div className="space-y-4 text-[15px] leading-relaxed text-slate-600">
            {isDirectSale ? (
              <p>
                <span className="font-medium text-slate-800">Stok durumu: </span>
                {stock > 0 ? (
                  <span className="text-emerald-600">Stokta ({stock} adet)</span>
                ) : (
                  <span className="text-amber-600">Tedarik süreli</span>
                )}
              </p>
            ) : null}
            {shippingInfo ? (
              <p className="whitespace-pre-line">{shippingInfo}</p>
            ) : (
              <p className="text-slate-500">
                Kargo ve teslimat detayları için ekibimizle iletişime geçebilirsiniz.
              </p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
