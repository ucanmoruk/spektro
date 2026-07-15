import { Check } from "lucide-react";
import type { OrderStatus } from "@/lib/types";
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from "@/lib/status";

// Normal sipariş akışı (iptal/iade dışında).
const FLOW: { status: OrderStatus; label: string }[] = [
  { status: "pending", label: "Alındı" },
  { status: "paid", label: "Ödendi" },
  { status: "processing", label: "Hazırlanıyor" },
  { status: "shipped", label: "Kargoda" },
  { status: "completed", label: "Teslim" },
];

export function OrderStatusStepper({ status }: { status: OrderStatus }) {
  // İptal / iade: akış yerine uyarı rozeti göster.
  if (status === "cancelled" || status === "refunded") {
    return (
      <div className={`inline-flex rounded-lg px-3 py-1.5 text-xs font-medium ${ORDER_STATUS_COLORS[status]}`}>
        {ORDER_STATUS_LABELS[status]}
      </div>
    );
  }

  const currentIndex = FLOW.findIndex((s) => s.status === status);
  const idx = currentIndex === -1 ? 0 : currentIndex;

  return (
    <div className="flex items-center">
      {FLOW.map((step, i) => {
        const done = i < idx;
        const active = i === idx;
        return (
          <div key={step.status} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ${
                  done
                    ? "bg-spektro-blue text-white"
                    : active
                      ? "bg-spektro-blue text-white ring-4 ring-spektro-blue/15"
                      : "bg-slate-100 text-slate-400"
                }`}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span
                className={`mt-1 whitespace-nowrap text-[10px] font-medium ${
                  done || active ? "text-slate-700" : "text-slate-400"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < FLOW.length - 1 ? (
              <div className={`mx-1 h-0.5 flex-1 rounded ${i < idx ? "bg-spektro-blue" : "bg-slate-200"}`} />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
