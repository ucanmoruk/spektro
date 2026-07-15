import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Package } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { LogoutButton } from "@/components/LogoutButton";
import { getCurrentUser } from "@/lib/auth";
import { listOrdersByUser } from "@/lib/repositories/orders";
import { formatDate, formatPrice } from "@/lib/format";
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from "@/lib/status";
import { OrderStatusStepper } from "./_components/OrderStatusStepper";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hesabım | Spektrotek",
};

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/giris?next=/hesabim");
  if (user.role === "admin") redirect("/admin");

  const orders = await listOrdersByUser(user.id);

  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900">
      <Navbar />

      <section className="border-b border-slate-100 bg-slate-50 pb-10 pt-32">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-4 px-6 md:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">
              Hesabım
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              Merhaba, {user.fullName}
            </h1>
            <p className="mt-1 text-sm text-slate-500">{user.email}</p>
          </div>
          <LogoutButton />
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl flex-1 px-6 py-10 md:px-10">
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs uppercase tracking-wide text-slate-400">Toplam Sipariş</p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">{orders.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs uppercase tracking-wide text-slate-400">Firma</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{user.company ?? "—"}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs uppercase tracking-wide text-slate-400">Telefon</p>
            <p className="mt-1 text-lg font-semibold text-slate-900">{user.phone ?? "—"}</p>
          </div>
        </div>

        <h2 id="siparislerim" className="mb-4 scroll-mt-28 text-xl font-semibold tracking-tight">
          Siparişlerim
        </h2>

        {orders.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 p-12 text-center">
            <Package className="mx-auto h-8 w-8 text-slate-300" />
            <p className="mt-3 text-slate-500">Henüz siparişiniz bulunmuyor.</p>
            <Link
              href="/market"
              className="mt-4 inline-flex rounded-xl bg-spektro-blue px-5 py-3 text-sm font-medium text-white"
            >
              Markete Git
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <p className="font-semibold text-slate-900">{order.orderNumber}</p>
                    <p className="text-xs text-slate-400">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        ORDER_STATUS_COLORS[order.status]
                      }`}
                    >
                      {ORDER_STATUS_LABELS[order.status]}
                    </span>
                    <span className="text-lg font-semibold tracking-tight text-slate-900">
                      {formatPrice(order.total, order.currency)}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <OrderStatusStepper status={order.status} />
                </div>

                <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-3">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex justify-between text-sm text-slate-600">
                      <span>
                        {item.name} <span className="text-slate-400">× {item.quantity}</span>
                      </span>
                      <span>{formatPrice(item.lineTotal, order.currency)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
