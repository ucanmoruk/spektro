"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import type { Order, OrderStatus } from "@/lib/types";
import { formatDate, formatPrice } from "@/lib/format";
import {
  ORDER_STATUSES,
  ORDER_STATUS_COLORS,
  ORDER_STATUS_LABELS,
  PAYMENT_STATUS_LABELS,
} from "@/lib/status";

export function OrdersManager({ orders }: { orders: Order[] }) {
  const router = useRouter();
  const [openId, setOpenId] = useState<number | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);

  const changeStatus = async (id: number, status: OrderStatus) => {
    setBusyId(id);
    try {
      await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      router.refresh();
    } finally {
      setBusyId(null);
    }
  };

  if (orders.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 p-12 text-center text-slate-500">
        Henüz sipariş bulunmuyor.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => {
        const open = openId === order.id;
        return (
          <div key={order.id} className="rounded-2xl border border-slate-200 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-3 p-4">
              <button
                onClick={() => setOpenId(open ? null : order.id)}
                className="flex items-center gap-2 text-left"
              >
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition ${open ? "rotate-180" : ""}`}
                />
                <div>
                  <p className="font-semibold text-slate-900">{order.orderNumber}</p>
                  <p className="text-xs text-slate-400">
                    {order.customerName} · {formatDate(order.createdAt)}
                  </p>
                </div>
              </button>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">
                  Ödeme: {PAYMENT_STATUS_LABELS[order.paymentStatus]}
                </span>
                <span className="font-semibold text-slate-900">
                  {formatPrice(order.total, order.currency)}
                </span>
                <select
                  disabled={busyId === order.id}
                  value={order.status}
                  onChange={(e) => changeStatus(order.id, e.target.value as OrderStatus)}
                  className={`rounded-lg border-0 px-3 py-1.5 text-xs font-medium outline-none ${
                    ORDER_STATUS_COLORS[order.status]
                  }`}
                >
                  {ORDER_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {ORDER_STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {open ? (
              <div className="border-t border-slate-100 p-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Müşteri
                    </p>
                    <p className="mt-1 text-sm text-slate-700">{order.customerName}</p>
                    <p className="text-sm text-slate-500">{order.customerEmail}</p>
                    {order.customerPhone ? (
                      <p className="text-sm text-slate-500">{order.customerPhone}</p>
                    ) : null}
                    {order.company ? (
                      <p className="text-sm text-slate-500">{order.company}</p>
                    ) : null}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Teslimat
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      {order.shippingAddress ?? "—"}
                    </p>
                    <p className="text-sm text-slate-500">
                      {[order.shippingCity, order.shippingCountry].filter(Boolean).join(", ")}
                    </p>
                    {order.notes ? (
                      <p className="mt-1 text-sm italic text-slate-500">Not: {order.notes}</p>
                    ) : null}
                  </div>
                </div>
                <table className="mt-4 w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-slate-400">
                      <th className="pb-2 font-medium">Ürün</th>
                      <th className="pb-2 font-medium">Adet</th>
                      <th className="pb-2 text-right font-medium">Tutar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item.id} className="border-t border-slate-100">
                        <td className="py-2 text-slate-700">
                          {item.name}
                          {item.sku ? (
                            <span className="ml-1 text-xs text-slate-400">({item.sku})</span>
                          ) : null}
                        </td>
                        <td className="py-2 text-slate-500">{item.quantity}</td>
                        <td className="py-2 text-right text-slate-700">
                          {formatPrice(item.lineTotal, order.currency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
