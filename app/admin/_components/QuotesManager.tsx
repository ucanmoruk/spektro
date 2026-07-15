"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { QuoteRequest, QuoteStatus } from "@/lib/types";
import { formatDate } from "@/lib/format";
import { QUOTE_STATUSES, QUOTE_STATUS_COLORS, QUOTE_STATUS_LABELS } from "@/lib/status";

export function QuotesManager({ quotes }: { quotes: QuoteRequest[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<number | null>(null);

  const changeStatus = async (id: number, status: QuoteStatus) => {
    setBusyId(id);
    try {
      await fetch(`/api/admin/quotes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      router.refresh();
    } finally {
      setBusyId(null);
    }
  };

  if (quotes.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 p-12 text-center text-slate-500">
        Henüz teklif talebi bulunmuyor.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {quotes.map((quote) => (
        <div key={quote.id} className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-slate-900">{quote.name}</p>
              <p className="text-sm text-slate-500">
                {quote.email}
                {quote.phone ? ` · ${quote.phone}` : ""}
                {quote.company ? ` · ${quote.company}` : ""}
              </p>
              <p className="text-xs text-slate-400">{formatDate(quote.createdAt)}</p>
            </div>
            <select
              disabled={busyId === quote.id}
              value={quote.status}
              onChange={(e) => changeStatus(quote.id, e.target.value as QuoteStatus)}
              className={`rounded-lg border-0 px-3 py-1.5 text-xs font-medium outline-none ${
                QUOTE_STATUS_COLORS[quote.status]
              }`}
            >
              {QUOTE_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {QUOTE_STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </div>

          <ul className="mt-3 flex flex-wrap gap-2">
            {quote.items.map((item) => (
              <li
                key={item.id}
                className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs text-slate-600"
              >
                {item.name}
                {item.brand ? <span className="text-slate-400"> · {item.brand}</span> : null}
                {item.quantity > 1 ? <span className="ml-1 font-medium">×{item.quantity}</span> : null}
              </li>
            ))}
          </ul>

          {quote.message ? (
            <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm italic text-slate-600">
              {quote.message}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
