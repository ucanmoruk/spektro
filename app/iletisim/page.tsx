"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Mail, MapPin, Phone } from "lucide-react";

export default function IletisimPage() {
  return (
    <main className="bg-white text-slate-900">
      <Navbar />

      <section className="border-b border-slate-100 bg-slate-50 pb-14 pt-32 md:pb-20 md:pt-36">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">İletişim</p>
          <h1 className="font-heading max-w-3xl text-slate-900">Bizimle Her Zaman İletişime Geçebilirsiniz</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600">
            Uzman ekibimiz; teknik servis, aplikasyon desteği, eğitim ve danışmanlık süreçlerinde size en hızlı şekilde
            dönüş yapar.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 md:px-10 lg:grid-cols-[1.05fr_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-7 md:p-9">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">İstanbul Ofisimiz</h2>
            <p className="mt-2 text-sm text-slate-500">Mutlaka ziyaret edin.</p>

            <div className="mt-7 space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-spektro-blue" />
                <p className="text-sm leading-relaxed text-slate-700">
                  Atatürk Mah. Hadımköy Yolu Cad. No:10 İç Kapı No:7
                  <br />
                  Esenyurt / İstanbul
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-spektro-blue" />
                <a href="mailto:info@spektrotek.com" className="text-sm text-slate-700 hover:text-slate-900">
                  info@spektrotek.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-spektro-blue" />
                <a href="tel:+902127061076" className="text-sm text-slate-700 hover:text-slate-900">
                  +90 (212) 706 1076
                </a>
              </div>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <iframe
                  title="Spektrotek İstanbul Ofisi Harita"
                  src="https://maps.google.com/maps?q=41.0363191,28.624424&z=18&output=embed"
                  className="h-56 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-9">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">İletişim Formu</h2>
            <p className="mt-2 text-sm text-slate-500">Mesajınızı bırakın, en kısa sürede size dönelim.</p>

            <form className="mt-7 space-y-4">
              <input type="text" placeholder="Ad Soyad*" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-spektro-blue/20 transition focus:ring-4" />
              <input type="email" placeholder="E-mail*" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-spektro-blue/20 transition focus:ring-4" />
              <input type="tel" placeholder="Telefon*" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-spektro-blue/20 transition focus:ring-4" />
              <input type="text" placeholder="Firma" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-spektro-blue/20 transition focus:ring-4" />
              <textarea placeholder="Mesajınız.." rows={5} className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-spektro-blue/20 transition focus:ring-4" />
              <button type="button" className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-700">
                Gönder
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

