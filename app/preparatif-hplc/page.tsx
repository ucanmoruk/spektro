"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionImageFrame from "@/components/SectionImageFrame";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

const systems: {
  id: string;
  title: string;
  body: string;
  image: string;
  forWho: string;
  bullets: string[];
}[] = [
  {
    id: "compact",
    title: "AZURA® Compact Prep HPLC Sistemi",
    body: "UV algılama özelliğine sahip uygun fiyatlı izokratik yarı preparatif arıtma sistemi.",
    image: "/images/prep-azura-compact.webp",
    forWho: "Bütçe duyarlı yarı preparatif saflaştırma; izokratik rutin ve hızlı kurulum.",
    bullets: ["İzokratik yarı preparatif akış", "UV algılama", "Kompakt yerleşim"],
  },
  {
    id: "lab",
    title: "AZURA® Lab Prep HPLC Sistemi",
    body: "Mikro ila miligram ölçeğinde peptitler veya oligonükleotidler gibi numunelerin izolasyonu için mükemmeldir.",
    image: "/images/prep-azura-lab-prep.png",
    forWho: "Biyomolekül laboratuvarları; küçük ölçekte yüksek saflık fraksiyonları.",
    bullets: ["Peptit / oligonükleotid odaklı", "Lab ölçeği esnekliği", "Metot transferine uygun"],
  },
  {
    id: "plot",
    title: "AZURA® Plot Prep HPLC Sistemi",
    body: "Miligramdan yüksek grama kadar olan ölçekte peptitler veya oligonükleotidler gibi numunelerin izolasyonu için mükemmeldir.",
    image: "/images/prep-azura-plot-prep.png",
    forWho: "Ölçek büyüten üretim ve pilot hatlar; daha yüksek yük ve fraksiyon verimi.",
    bullets: ["Geniş ölçek bandı", "Pilot seviyeye taşınabilir iş akışı", "Saflaştırma verimliliği"],
  },
];

const needMatcher = [
  { need: "İzokratik yarı prep, sınırlı alan", pick: "Compact Prep", href: "#compact" },
  { need: "Mikro–mg biyomolekül izolasyonu", pick: "Lab Prep", href: "#lab" },
  { need: "mg–gram ölçek, pilot üretim", pick: "Plot Prep", href: "#plot" },
  { need: "Özel akış, valf ve geri dönüşüm", pick: "Özelleştirilmiş sistem", href: "#ozel" },
];

const featureCards = [
  { title: "Özelleştirilebilir sistemler", body: "Akış, modül ve dedektör seçimi işinize göre şekillenir." },
  { title: "Kompakttan pilota ölçeklendirme", body: "Aynı platform mantığıyla kapasite artırımı." },
  { title: "Yığılmış enjeksiyon ve çözücü geri dönüşümü", body: "Verim ve solvent tasarrufu için yapılandırılabilir hatlar." },
  { title: "Kullanıcı dostu güçlü yazılım", body: "Mobil kontrol ve LC yazılım ekosistemi ile uyumlu operasyon." },
];

export default function PreparatifHplcPage() {
  return (
    <main className="bg-white text-slate-900">
      <Navbar />

      <section className="border-b border-slate-100 bg-slate-50 pb-12 pt-32 md:pb-16 md:pt-36">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">Analitik Cihazlar</p>
          <h1 className="font-heading max-w-4xl text-slate-900">Preparatif HPLC</h1>
          <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-800">Preparatif HPLC Sistemleri</p>
          <p className="mt-2 max-w-3xl text-base leading-relaxed text-slate-600">Ölçeklenebilir ve uyarlanabilir LC saflaştırma çözümleri</p>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-slate-600">
            Preparatif ve saflaştırma hatlarında modül seçimi, pompa kapasitesi ve geri dönüşüm stratejisi işinizi doğrudan etkiler. KNAUER AZURA® preparatif platformu hakkında üretici özetine{" "}
            <a
              href="https://www.knauer.net/preparative-hplc"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-spektro-blue underline decoration-spektro-blue/30 underline-offset-2 hover:decoration-spektro-blue"
            >
              knauer.net/preparative-hplc
            </a>{" "}
            üzerinden ulaşabilirsiniz.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/iletisim" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800">
              Teklif ve danışmanlık
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href="https://www.knauer.net/preparative-hplc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
            >
              KNAUER preparatif LC
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white py-10 md:py-14">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <SectionImageFrame>
            <div className="relative aspect-[16/9] w-full max-h-[min(75vh,640px)] min-h-[220px] sm:min-h-[300px]">
              <Image
                src="/images/prep-intro.jpg"
                alt="Preparatif HPLC saflaştırma"
                fill
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-contain object-center"
                priority
              />
            </div>
          </SectionImageFrame>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <p className="text-sm leading-relaxed text-slate-700 md:text-base">
              <strong>Knauer</strong>, Berlin Almanya&apos;da 1962 yılından bu yana kromatografi sistemleri üretimi yapan lider firmadır. İsmi sektörde analitik HPLC ürünleriyle bilinen pek çok marka, analitik HPLC&apos;lerini küçük revizyonlarla saflaştırmaya uygun hale getirdiklerini beyan ederler. Oysa ki preparatif HPLC bambaşka bir uzmanlıktır.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              Bahsettikleri analitik ya da semi-preparatif akış oranlarından çok daha öteye Knauer pompaları <strong>1000 ml/dk&apos;ya</strong> ulaşabilmekte, çok daha yüksek akışlarda daha fazla hedef bileşeni <em>verim</em> ve <em>saflıkla</em> ayırabilmektedir.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-700 md:text-base">
              <strong>Knauer</strong>, uzmanlığı ile <strong>preparatif HPLC</strong> ve saflaştırma işini sizler için sıkıntısız bir çözüm haline getirmektedir. Recycle valf gibi seçenekleri ile de hem belirli bölgelerin daha yüksek saflaştırılmasına olanak vermekte hem de solvent sarfınızı azaltmaktadır.
            </p>
            <p className="mt-4 text-sm font-medium text-slate-900">
              Size uygun akış, konfigürasyon ve sistem çözümlerimiz için bizimle iletişime geçebilirsiniz:{" "}
              <a href="mailto:info@spektrotek.com" className="text-spektro-blue underline underline-offset-2 hover:text-blue-700">
                info@spektrotek.com
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-slate-50 py-12 md:py-16">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">Hızlı yönlendirme</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {needMatcher.map((row, i) => (
              <motion.a
                key={row.need}
                href={row.href}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-spektro-blue/40 hover:shadow-md"
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

      {systems.map((item, index) => {
        const imageOnRight = index % 2 === 1;
        return (
          <section key={item.id} id={item.id} className={`py-14 md:py-20 ${index % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
            <div className="mx-auto grid w-full max-w-7xl items-stretch gap-10 px-6 md:gap-12 md:px-10 lg:grid-cols-2 lg:gap-14">
              <div className={imageOnRight ? "order-2" : "order-2 lg:order-1"}>
                <SectionImageFrame>
                  <div className="relative aspect-[4/3] w-full max-h-[min(72vh,620px)] min-h-[240px] sm:min-h-[300px]">
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

      <section id="ozel" className="border-y border-slate-100 bg-white py-14 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
            <SectionImageFrame>
              <div className="relative aspect-[16/7] w-full max-h-[min(55vh,420px)] min-h-[200px]">
                <Image
                  src="/images/prep-azura-customizable.png"
                  alt="AZURA özelleştirilebilir preparatif sistem"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain object-center"
                />
              </div>
            </SectionImageFrame>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">
                AZURA® Preparatif HPLC – Özelleştirilmiş Saflaştırma Sistemleri
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
                AZURA® preparatif sistemleri, miligramdan çok gram ölçeğine kadar sık değişen ayırma görevleri için mükemmel bir çözümdür. AZURA® preparatif sisteminizi ihtiyaçlarınıza göre tasarlayın ve esneklik ile güvenilirliği birleştirin.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
                Pazar lideri AZURA® preparatif HPLC platformuyla peptitler, oligonükleotidler, RNA, kenevir ve diğer birçok API&apos;nin saflaştırma iş akışınız için mümkün olan en iyi sistemi yapılandırın. Sistemlerimizi kromatografi ölçeklendirme ve saflaştırma ihtiyaçlarınızı karşılayacak şekilde özelleştiriyoruz. Preparatif kromatografideki deneyimimizden yararlanın. Preparatif LC sistemleri sizin için özel olarak tasarlanmıştır.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <h2 className="text-center text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">Platform avantajları</h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-600">
            Spektrotek sayfasındaki vurgular ve KNAUER preparatif LC yaklaşımıyla özetlenmiştir.
          </p>
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
            <h2 className="text-lg font-semibold text-slate-900 md:text-xl">Akış, pompa ve geri dönüşümü birlikte planlayalım</h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600">Recycle hatları, enjeksiyon stratejisi ve fraksiyon toplama için net bir sistem tanımı çıkaralım.</p>
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
