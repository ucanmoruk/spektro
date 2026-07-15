"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useCartStore } from "@/store/useCartStore";

function Result() {
  const params = useSearchParams();
  const success = params.get("status") === "success";
  const clearBuy = useCartStore((s) => s.clearBuy);

  useEffect(() => {
    if (success) clearBuy();
  }, [success, clearBuy]);

  return (
    <section className="flex flex-1 items-center justify-center bg-slate-50 px-6 pb-20 pt-32">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
        {success ? (
          <>
            <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" />
            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
              Ödemeniz Alındı
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Siparişiniz onaylandı. Detayları hesabınızdan takip edebilirsiniz.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link href="/hesabim" className="rounded-xl bg-spektro-blue px-5 py-3 text-sm font-medium text-white">
                Siparişlerim
              </Link>
              <Link href="/market" className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700">
                Alışverişe Devam
              </Link>
            </div>
          </>
        ) : (
          <>
            <XCircle className="mx-auto h-14 w-14 text-rose-500" />
            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
              Ödeme Tamamlanamadı
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Ödeme sırasında bir sorun oluştu. Sepetiniz korunuyor, tekrar deneyebilirsiniz.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link href="/sepet" className="rounded-xl bg-spektro-blue px-5 py-3 text-sm font-medium text-white">
                Sepete Dön
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default function PaymentResultPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900">
      <Navbar />
      <Suspense fallback={<div className="flex-1 bg-slate-50" />}>
        <Result />
      </Suspense>
      <Footer />
    </main>
  );
}
