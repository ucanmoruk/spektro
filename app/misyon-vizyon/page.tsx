"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function MisyonVizyonPage() {
  return (
    <main className="bg-white text-slate-900">
      <Navbar />

      <section className="border-b border-slate-100 bg-slate-50 pb-14 pt-32 md:pb-20 md:pt-36">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">Kurumsal</p>
          <h1 className="font-heading max-w-4xl text-slate-900">Misyon &amp; Vizyon</h1>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto grid w-full max-w-5xl gap-6 px-6 md:px-10 md:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Misyonumuz</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              Laboratuvar teknolojileri alanında yenilikçi, güvenilir ve verimli çözümler sunarak bilimsel araştırmalara
              ve analiz süreçlerine değer katmak. Türkiye’deki laboratuvarların dünya standartlarında analiz yapmasını
              sağlamak için ileri teknoloji cihazlar ve uzman desteği sunmak.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-slate-50 p-7 shadow-sm">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Vizyonumuz</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700">
              Türkiye’de analitik cihaz sektöründe lider bir marka olmak ve bilim ile teknoloji alanında global ölçekte
              değer yaratan bir firma haline gelmek. Sektörün gelişimine yön veren çözümlerle laboratuvar
              teknolojilerinde öncü ve yenilikçi bir güç olmak.
            </p>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}

