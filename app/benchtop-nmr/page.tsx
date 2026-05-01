"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionImageFrame from "@/components/SectionImageFrame";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

const models: {
  id: string;
  title: string;
  body: string;
  image: string;
  forWho: string;
  bullets: string[];
}[] = [
  {
    id: "60teach",
    title: "60Teach",
    body: "Öğrencilerinizi, kendi bileşiklerinin NMR spektrumlarını edinme, işleme ve yorumlayarak çözme süreciyle tanıştırın.",
    image: "/images/nmr-60teach.png",
    forWho: "Eğitim kurumları ve öğrenci laboratuvarları; spektrum okuma ve yorumlamayı uygulamalı öğretmek için.",
    bullets: ["Eğitim odaklı masaüstü NMR", "Spektrum edinme ve işleme süreçleri", "Sınıf ve laboratuvar uyumu"],
  },
  {
    id: "n60",
    title: "Nanalysis-60",
    body: "Standart Manyetik Alan Gücü. Üstün NMR Verisi.",
    image: "/images/nmr-nanalysis-60.png",
    forWho: "Rutin yapı tayini ve kalite kontrol; güvenilir, tekrarlanabilir proton ve çoklu çekirdek analizi.",
    bullets: ["60 MHz platform", "Çoklu nüklid seçenekleri (ör. 1H, 13C, 19F, 31P vb.)", "Düşük bakım, kolay işletim"],
  },
  {
    id: "n100",
    title: "Nanalysis-100",
    body: "Piyasadaki en yüksek manyetik alan gücüne sahip sistem. Kullanımı kolay ve düşük bakım gereksinimi ile öne çıkar.",
    image: "/images/nmr-nanalysis-100.png",
    forWho: "Maksimum çözünürlük ve hassasiyet isteyen Ar-Ge, QC ve ileri uygulamalar.",
    bullets: ["100 MHz yüksek alan", "Zorlu yapı problemleri için güçlü sinyal", "Kompakt masaüstü form"],
  },
];

const needMatcher = [
  { need: "Öğretim ve öğrenci laboratuvarı", pick: "60Teach", href: "#60teach" },
  { need: "Standart saha ve çoklu nüklid rutin analiz", pick: "Nanalysis-60", href: "#n60" },
  { need: "En yüksek çözünürlük (yüksek alan)", pick: "Nanalysis-100", href: "#n100" },
  { need: "Otosampler ve yüksek hacim numune", pick: "Aksesuar / konfigürasyon", href: "#destek" },
];

const featureCards = [
  { title: "Kompakt ve güçlü", body: "Yüksek hassasiyetli analizleri kompakt tasarımda sunar." },
  { title: "Otomasyona uygun", body: "Kolayca entegre edilebilir ve otomatikleştirilebilir çözümler sunar." },
  { title: "Erişilebilir ve ekonomik", body: "Geleneksel yüksek alanlı NMR sistemlerine uygun maliyetli bir alternatiftir." },
  { title: "Geniş uygulama alanı", body: "Eğitimden ilaç analizine, proses izleme ve kalite kontrol süreçlerine kadar çok çeşitli alanlarda kullanılır." },
];

export default function BenchtopNmrPage() {
  return (
    <main className="bg-white text-slate-900">
      <Navbar />

      <section className="border-b border-slate-100 bg-slate-50 pb-12 pt-32 md:pb-16 md:pt-36">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">Analitik Cihazlar</p>
          <h1 className="font-heading max-w-4xl text-slate-900">Benchtop NMR</h1>
          <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-800">Nanalysis Yüksek Performanslı Masaüstü | Benchtop NMR Spektrometreleri</p>
          <p className="mt-2 max-w-3xl text-base leading-relaxed text-slate-600">Geliştirilmiş doğruluk ve hassasiyet için laboratuvarınızı kompakt ve güçlü kimya araçlarımızla donatın.</p>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-slate-600">
            Masaüstü NMR (Nükleer Manyetik Rezonans) spektrometresi, maddelerin yapılarını ve bileşimlerini analiz etmekte kullanılan güçlü bir kimya laboratuvar aracıdır. Üretici ürün gamı ve teknik detaylar için{" "}
            <a
              href="https://www.nanalysis.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-spektro-blue underline decoration-spektro-blue/30 underline-offset-2 hover:decoration-spektro-blue"
            >
              Nanalysis
            </a>{" "}
            kaynağını inceleyebilirsiniz.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/iletisim" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800">
              Teklif ve danışmanlık
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href="https://www.nanalysis.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Üretici sitesi
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white py-12 md:py-16">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">Hangi ihtiyaç hangi model?</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">Senaryonuzu seçin; doğru platformu birlikte netleştirelim.</p>
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
                <p className="mt-3 text-xs text-slate-500">Önerilen</p>
                <p className="text-sm font-semibold text-slate-800">{row.pick}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {models.map((item, index) => {
        const imageOnRight = index % 2 === 1;
        return (
          <section key={item.id} id={item.id} className={`py-14 md:py-20 ${index % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
            <div className="mx-auto grid w-full max-w-7xl items-stretch gap-10 px-6 md:gap-12 md:px-10 lg:grid-cols-2 lg:gap-14">
              <div className={imageOnRight ? "order-2" : "order-2 lg:order-1"}>
                <SectionImageFrame>
                  <div className="relative aspect-[4/3] w-full max-h-[min(72vh,620px)] min-h-[240px] sm:min-h-[320px]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain object-center transition duration-500 hover:scale-[1.02]"
                      priority={index === 0}
                    />
                  </div>
                </SectionImageFrame>
              </div>
              <div className={`flex flex-col justify-center ${imageOnRight ? "order-1" : "order-1 lg:order-2"}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ type: "spring", stiffness: 90, damping: 20 }}
                >
                  <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">{item.title}</h2>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">{item.body}</p>
                  <p className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50/60 px-4 py-3 text-sm text-slate-800">
                    <span className="font-semibold text-emerald-900">Kimler için: </span>
                    {item.forWho}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {item.bullets.map((b) => (
                      <li key={b} className="flex gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-spektro-blue" aria-hidden />
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </section>
        );
      })}

      <section id="destek" className="border-y border-slate-100 bg-white py-14 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">Erişilebilir. Uygun Maliyetli. Otomatikleştirilebilir.</h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-slate-600 md:text-base">
            <p>
              Masaüstü NMR spektrometresi, ince kimyasallar ve polimerler gibi birçok endüstride yaygın olarak kullanılır. Kompakt ve küçük boyutlu tasarımı sayesinde, büyük ve yüksek alanlı NMR sistemlerine güçlü bir alternatiftir. Yalnızca verimli ve dayanıklı olmakla kalmaz; bilim camiasında devrim niteliğinde bir teknoloji olarak öne çıkar.
            </p>
            <p>
              <strong>Spektrotek</strong>, Kanadalı üretici <strong>Nanalysis</strong> firmasının Türkiye, KKTC, Azerbaycan, Özbekistan, Türkmenistan tek yetkili distribütörü olarak hizmet sağlamaktadır. NMR yapı tayini başta olmak üzere pek çok kullanım alanı sunar. Patentli teknolojilerle donatılmış benchtop NMR çözümleri 60 MHz ve 100 MHz modeller ile sunulur; isterseniz yalnızca proton, isterseniz 1H (60 MHz), 7Li (24 MHz), 11B (19 MHz), 13C (15 MHz), 19F (56 MHz) ve 31P (25 MHz) gibi çoklu analiz imkanlarına sahip olabilirsiniz.
            </p>
            <p>
              Tam kapasiteli dokunmatik ekran ve yerleşik bilgisayar ile ek bir aksesuara ihtiyaç duymadan kompakt bir sistem elde edersiniz. Klasik NMR&apos;lara kıyasla özel soğutma veya ağır bilgi işlem altyapısı gerektirmemesi, işletim maliyetini düşürür ve kullanımı kolaylaştırır. Çok sayıda numune veya merkez laboratuvar senaryolarında otosampler gibi aksesuarlar için uzmanlarımızdan bilgi ve teklif alabilirsiniz.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <h2 className="text-center text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">Öne çıkan avantajlar</h2>
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
                  animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.08, 1] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                <h3 className="relative text-sm font-semibold leading-snug text-slate-900">{card.title}</h3>
                <p className="relative mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">{card.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 py-14 md:py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center md:px-10">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 md:text-xl">Aplikasyon ve konfigürasyon desteği</h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600">Uygulama notları ve üretici kaynakları için bizimle iletişime geçebilir veya Nanalysis sayfasını ziyaret edebilirsiniz.</p>
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
