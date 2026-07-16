"use client";

import { useState } from "react";
import { ClipboardList, MessageSquareQuote, Package, Settings } from "lucide-react";
import type { Brand, Category, Order, Product, QuoteRequest } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { ProductManager } from "./ProductManager";
import { OrdersManager } from "./OrdersManager";
import { QuotesManager } from "./QuotesManager";
import { PasswordChange } from "./PasswordChange";

type Tab = "products" | "orders" | "quotes" | "settings";

type Props = {
  products: Product[];
  orders: Order[];
  quotes: QuoteRequest[];
  brands: Brand[];
  categories: Category[];
  initialProductId?: number | null;
  initialNewProduct?: boolean;
};

export function AdminDashboard({
  products,
  orders,
  quotes,
  brands,
  categories,
  initialProductId,
  initialNewProduct = false,
}: Props) {
  const [tab, setTab] = useState<Tab>("products");

  const revenue = orders
    .filter((o) => o.paymentStatus === "paid")
    .reduce((s, o) => s + o.total, 0);
  const openOrders = orders.filter(
    (o) => !["completed", "cancelled", "refunded"].includes(o.status),
  ).length;
  const newQuotes = quotes.filter((q) => q.status === "new").length;

  const tabs: { key: Tab; label: string; icon: typeof Package; badge?: number }[] = [
    { key: "products", label: "Ürünler", icon: Package },
    { key: "orders", label: "Siparişler", icon: ClipboardList, badge: openOrders },
    { key: "quotes", label: "Teklifler", icon: MessageSquareQuote, badge: newQuotes },
    { key: "settings", label: "Ayarlar", icon: Settings },
  ];

  return (
    <div>
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <StatCard label="Toplam Ürün" value={String(products.length)} />
        <StatCard label="Açık Sipariş" value={String(openOrders)} />
        <StatCard label="Yeni Teklif" value={String(newQuotes)} />
        <StatCard label="Tahsil Edilen" value={formatPrice(revenue, "EUR")} />
      </div>

      <div className="mb-6 flex flex-wrap gap-2 border-b border-slate-200">
        {tabs.map(({ key, label, icon: Icon, badge }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`-mb-px inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${
              tab === key
                ? "border-spektro-blue text-spektro-blue"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
            {badge ? (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-spektro-blue px-1 text-[10px] font-bold text-white">
                {badge}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {tab === "products" ? (
        <ProductManager
          products={products}
          brands={brands}
          categories={categories}
          initialProductId={initialProductId}
          initialNewProduct={initialNewProduct}
        />
      ) : null}
      {tab === "orders" ? <OrdersManager orders={orders} /> : null}
      {tab === "quotes" ? <QuotesManager quotes={quotes} /> : null}
      {tab === "settings" ? <PasswordChange /> : null}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">{value}</p>
    </div>
  );
}
