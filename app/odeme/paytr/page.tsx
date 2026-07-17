import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

type PageProps = {
  searchParams: Promise<{ token?: string }>;
};

export default async function PaytrPaymentPage({ searchParams }: PageProps) {
  const { token } = await searchParams;
  const paymentUrl = token
    ? `https://www.paytr.com/odeme/guvenli/${encodeURIComponent(token)}`
    : null;

  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900">
      <Navbar />

      <section className="flex-1 bg-slate-50 px-4 pb-10 pt-28 sm:px-6 md:px-10">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">
                <LockKeyhole className="h-4 w-4" />
                Güvenli Ödeme
              </p>
              <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
                PayTR güvenli ödeme adımı
              </h1>
            </div>
            <Link
              href="/sepet"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Sepete Dön
            </Link>
          </div>

          {paymentUrl ? (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <iframe
                title="PayTR Güvenli Ödeme"
                src={paymentUrl}
                className="h-[760px] w-full border-0"
                allow="payment *"
              />
            </div>
          ) : (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-800">
              Ödeme oturumu bulunamadı. Lütfen sepete dönüp ödeme adımını tekrar başlatın.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
