"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionImageFrame from "@/components/SectionImageFrame";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

const specs = [
  { label: "Numune hacmi", value: "50 µl veya 150 µl" },
  { label: "Çözünürlük", value: "1 mOsmol/kg" },
  { label: "Test süresi", value: "~2 dakika" },
  { label: "Ozmolalite aralığı", value: "0–2000 mOsmol/kg" },
  {
    label: "Kesinlik",
    value: "SD ≤ 4 mOsmol/kg (0–400 mOsmol/kg), RSD ≤ 1 % (400–2000 mOsmol/kg)",
  },
  {
    label: "Doğrusallık",
    value: "±1 % (0–1500 mOsmol/kg), ±1,5 % (0–2000 mOsmol/kg)",
  },
];

const needMatcher = [
  { need: "Hızlı rutin ozmolalite (serum vb.)", pick: "K-7400S + EuroOsmo", href: "#cihaz" },
  { need: "Koligatif donma noktası prensibi", pick: "Freezing point osmometry", href: "#prensip" },
  { need: "Yazılım ve izlenebilirlik", pick: "EuroOsmo 7400", href: "#yazilim" },
  { need: "Klinik / QC dokümantasyonu", pick: "Spektrotek danışmanlık", href: "/iletisim" },
];

const featureCards = [
  { title: "EuroOsmo 7400 yazılımı", body: "Gelişmiş kontrol ve ölçüm sonuçlarının görselleştirilmesi." },
  { title: "Kullanıcı dostu arayüz", body: "Günlük operasyon için sade ekranlar ve akış." },
  { title: "Kolay parametre ayarı", body: "Metot ve rutin geçişlerinde hızlı ayar." },
  { title: "KNAUER osmometre geleneği", body: "Ozmometre alanında onlarca yıllık güvenilir cihaz deneyimi." },
];

export default function OzmometrePage() {
  return (
    <main className="bg-white text-slate-900">
      <Navbar />

      <section className="border-b border-slate-100 bg-slate-50 pb-12 pt-32 md:pb-16 md:pt-36">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">Analitik Cihazlar</p>
          <h1 className="font-heading max-w-4xl text-slate-900">Ozmometre</h1>
          <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-800">KNAUER K-7400S Donma Noktası Ozmometresi</p>
          <p className="mt-2 max-w-3xl text-base leading-relaxed text-slate-600">
            Bu <strong>Semi-Micro Ozmometre</strong>, sulu çözeltilerin ozmolalite değerini kolay ve hızlı belirler.
          </p>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-slate-600">
            Donma noktası osmometrisi ve KNAUER modül ekosistemi hakkında teknik detaylar için{" "}
            <a
              href="https://www.knauer.net/en/products/life-science/osmometers"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-spektro-blue underline decoration-spektro-blue/30 underline-offset-2 hover:decoration-spektro-blue"
            >
              KNAUER osmometre ürünleri
            </a>{" "}
            kaynağını inceleyebilirsiniz.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/iletisim" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800">
              Teklif ve danışmanlık
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href="https://www.knauer.net/en/products/life-science/osmometers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Üretici sayfası
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section id="cihaz" className="py-10 md:py-14">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <SectionImageFrame>
            <div className="relative aspect-[4/3] w-full max-h-[min(78vh,680px)] min-h-[260px] sm:min-h-[360px]">
              <Image
                src="/images/ozmometre-1.jpg"
                alt="KNAUER K-7400S ozmometre"
                fill
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-contain object-center"
                priority
              />
            </div>
          </SectionImageFrame>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white py-12 md:py-16">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">Hızlı seçim</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {needMatcher.map((row, i) => (
              <motion.a
                key={row.need}
                href={row.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition hover:border-spektro-blue/40 hover:bg-white hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-spektro-blue">İhtiyaç</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{row.need}</p>
                <p className="mt-3 text-xs text-slate-500">Yönelim</p>
                <p className="text-sm font-semibold text-slate-800">{row.pick}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-4 px-6 md:grid-cols-2 md:gap-5 md:px-10 lg:grid-cols-3">
          {specs.map((item) => (
            <article key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.label}</p>
              <p className="mt-2 text-sm font-semibold leading-snug text-slate-900">{item.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-14 md:py-20">
        <div className="mx-auto grid w-full max-w-7xl items-stretch gap-10 px-6 md:gap-12 md:px-10 lg:grid-cols-2 lg:gap-14">
          <SectionImageFrame>
            <div className="relative aspect-[4/3] w-full max-h-[min(72vh,600px)] min-h-[240px]">
              <Image src="/images/ozmometre-knauer.jpg" alt="KNAUER ozmometre detay" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain object-center" />
            </div>
          </SectionImageFrame>
          <div className="flex flex-col justify-center rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] md:p-8">
            <h2 id="prensip" className="text-xl font-semibold tracking-tight text-slate-900">
              Freezing Point Osmometry
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
              K-7400S Yarı-Mikro Osmometre&apos;nin ölçüm prensibi, <strong>donma noktası düşmesinin koligatif özelliğine</strong> dayanır.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
              Bir çözücüye bir çözünen madde eklendiğinde, bu durum çözeltinin donma noktasının düşmesine yol açar. Bu düşüş, 1 litre suda ideal şekilde çözünmüş 1 mol bileşik başına <strong>1,858 K</strong>&apos;dir.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
              Bu etki yalnızca sıvıdaki parçacıkların sayısına bağlıdır; çözünen maddenin fiziksel ya da kimyasal özelliklerine bağlı değildir. Bu doğrusal ilişki sayesinde, bir numunenin donma noktası hassas biçimde ölçülerek <strong>osmolalite</strong> değeri kolaylıkla belirlenebilir.
            </p>
            <p className="mt-6 text-sm text-slate-700">
              <strong>KNAUER</strong>, ozmometre alanında öncülerden biridir ve onlarca yıldır güvenilir ve kullanıcı dostu cihazlarıyla bilinmektedir.
            </p>
          </div>
        </div>
      </section>

      <section id="yazilim" className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <h2 className="text-center text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">Yazılım ve operasyon</h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-600">Broşür başlığıyla uyumlu: Freezing Point Osmometry ve EuroOsmo 7400 vurguları.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featureCards.map((card, index) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.06, type: "spring", stiffness: 90, damping: 18 }}
                whileHover={{ y: -6 }}
                className="relative overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-white via-slate-50/90 to-blue-50 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.07)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(29,78,216,0.12)]"
              >
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-sky-200/50 blur-2xl"
                  animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.06, 1] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                <h3 className="relative text-sm font-semibold text-slate-900">{card.title}</h3>
                <p className="relative mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">{card.body}</p>
              </motion.article>
            ))}
          </div>
          <ul className="mx-auto mt-10 max-w-2xl space-y-2 text-sm text-slate-700">
            <li className="flex gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-spektro-blue" />
              <strong>EuroOsmo 7400 yazılımı</strong> ile gelişmiş kontrol
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-spektro-blue" />
              <strong>Ölçüm sonuçlarının</strong> görselleştirilmesi
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-spektro-blue" />
              <strong>Kullanıcı dostu</strong> arayüz
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-spektro-blue" />
              <strong>Kolay ayar</strong> değiştirme
            </li>
          </ul>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 py-14 md:py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center md:px-10">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 md:text-xl">Kurulum, metot ve bakım planı</h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600">Numune türü ve akreditasyon beklentilerinize göre doğru konfigürasyonu birlikte seçelim.</p>
          </div>
          <Link href="/iletisim" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
            İletişim
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
