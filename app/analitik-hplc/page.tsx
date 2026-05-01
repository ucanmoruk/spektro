"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SectionImageFrame from "@/components/SectionImageFrame";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

const systems: {
  title: string;
  body: string;
  image: string;
  forWho: string;
  bullets: string[];
}[] = [
  {
    title: "AZURA® Educational 400 bar System",
    body: "Geleceğin HPLC profesyonelleri için özel olarak tasarlanmış, tam donanımlı bir HPLC sistemidir.",
    image: "/images/Analitik-1.webp",
    forWho: "Üniversite ve eğitim laboratuvarları; öğrencilerin gerçek donanımla güvenli şekilde öğrenmesi.",
    bullets: ["400 bar basınç sınıfı", "Tam sistem, eğitim odaklı konfigürasyon", "Profesyonel HPLC’ye geçiş için ideal"],
  },
  {
    title: "AZURA® 862 Bar Sistem",
    body: "Günlük HPLC rutininiz için eksiksiz bir çözümdür. Kolayca ultra düşük dispersiyonlu kromatografi (ULDC) sistemine yükseltilebilir yapıdadır.",
    image: "/images/Analitik-3.webp",
    forWho: "Kalite kontrol ve rutin analiz; daha sonra ULDC / UHPLC performansına yükseltmek isteyen ekipler.",
    bullets: ["Günlük rutin için eksiksiz platform", "ULDC’ye yükseltilebilir mimari", "862 bar ile geniş metot esnekliği"],
  },
  {
    title: "AZURA® 1240 Bar Sistemi",
    body: "En zorlu analizler için yüksek teknolojili çözüm. Kütle spektrometresi (MS) bağlantıları için ideal bir partnerdir – ancak yalnızca bununla sınırlı değildir.",
    image: "/images/Analitik-2.webp",
    forWho: "Zorlu ayırma, yüksek basınç ve MS uyumluluğu gerektiren Ar-Ge ve ileri analitik.",
    bullets: ["1240 bar yüksek uç çözüm", "MS eşleştirmesi için uygun", "En zorlu matris ve ayırma görevleri"],
  },
];

const needMatcher = [
  {
    need: "Eğitim ve temel HPLC",
    pick: "Educational 400 bar",
    href: "#educational",
  },
  {
    need: "Rutin QC / günlük analiz, ileride ULDC",
    pick: "862 Bar",
    href: "#bar862",
  },
  {
    need: "Zorlu ayırma veya MS",
    pick: "1240 Bar",
    href: "#bar1240",
  },
  {
    need: "Yüksek verimli kalite kontrol (UHPLC)",
    pick: "AZURA® HTQC",
    href: "#htqc",
  },
];

const featureCards = [
  {
    title: "En uyarlanabilir sistem kurulumları",
    body: "Farklı gradient oluşturma teknolojileri ve basınç aralıklarıyla görevinize uygun konfigürasyon.",
  },
  {
    title: "knauerOS®, ClarityChrom®, OpenLab®, Chromeleon™",
    body: "Yazılım ekosisteminde esnek entegrasyon; mevcut laboratuvar altyapınıza uyum.",
  },
  {
    title: "Analitlerinize uygun dedektörler",
    body: "Numune tipine göre eşleşen algılama seçenekleri ve geniş akış hücresi yelpazesi.",
  },
  {
    title: "Hassas ve tekrarlanabilir",
    body: "Rutin analizden zorlu ayırma görevlerine kadar AZURA® ailesi analitik zorluklarınızı destekler.",
  },
];

export default function AnalitikHplcPage() {
  return (
    <main className="bg-white text-slate-900">
      <Navbar />

      <section className="border-b border-slate-100 bg-slate-50 pb-12 pt-32 md:pb-16 md:pt-36">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">Analitik Cihazlar</p>
          <h1 className="font-heading max-w-4xl text-slate-900">Analitik HPLC</h1>
          <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-800">Analitik (U)HPLC ve ULDC Sistemleri</p>
          <p className="mt-2 max-w-3xl text-base leading-relaxed text-slate-600">En Esnek HPLC Platformu - Almanya&apos;da Üretilmiştir</p>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-slate-600">
            KNAUER AZURA® analitik HPLC, ULDC ve UHPLC sistemleri; rutin analizden zorlu ayırma görevlerine kadar çalışmanızı desteklemek üzere tasarlanmıştır. Farklı gradient teknolojileri ve basınç aralıkları arasından görevinize en uygun yapılandırmayı seçebilirsiniz. Üretici teknik özet:{" "}
            <a
              href="https://www.knauer.net/uhplc"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-spektro-blue underline decoration-spektro-blue/30 underline-offset-2 hover:decoration-spektro-blue"
            >
              knauer.net/uhplc
            </a>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Teklif ve danışmanlık
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href="https://www.knauer.net/uhplc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
            >
              KNAUER ürün sayfası
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-100 bg-white py-12 md:py-16">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">Hangi ihtiyaç hangi sistem?</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            Aşağıdaki tablo, tipik laboratuvar senaryolarını AZURA® platformundaki çözümlerle eşleştirir. Detaylı konfigürasyon için bizimle iletişime geçebilirsiniz.
          </p>
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

      {systems.map((item, index) => {
        const id =
          item.title.includes("Educational") ? "educational" : item.title.includes("862") ? "bar862" : item.title.includes("1240") ? "bar1240" : `sys-${index}`;
        const imageOnRight = index % 2 === 1;
        return (
          <section key={item.title} id={id} className={`py-14 md:py-20 ${index % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
            <div className="mx-auto grid w-full max-w-7xl items-stretch gap-10 px-6 md:gap-12 md:px-10 lg:grid-cols-2 lg:gap-14">
              <div className={imageOnRight ? "order-2 lg:order-2" : "order-2 lg:order-1"}>
                <SectionImageFrame>
                  <div className="relative aspect-[690/520] w-full max-h-[min(72vh,620px)] min-h-[240px] sm:min-h-[320px]">
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
              <div className={`flex flex-col justify-center ${imageOnRight ? "order-1 lg:order-1" : "order-1 lg:order-2"}`}>
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

      <section id="htqc" className="border-y border-slate-100 bg-white py-14 md:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 md:grid-cols-[1fr_1.1fr] md:gap-12 md:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">Yüksek verim</p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">AZURA® HTQC UHPLC sistemi</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
              KNAUER tarafında <strong>yüksek verimli kalite kontrol (HTQC)</strong> için konumlandırılan UHPLC çözümü; hız, sade iş akışı ve dayanıklılık ile üretkenliği artırmayı hedefler. Çok sayıda rutin numunede kısa döngü ve tekrarlanabilir sonuç arayan QC laboratuvarları için uygundur.
            </p>
            <p className="mt-4 text-sm text-slate-600">
              Teknik özellik ve seçenekler için üretici sayfasındaki (U)HPLC bölümünü inceleyebilir veya Spektrotek üzerinden yapılandırma ve teklif talep edebilirsiniz.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://www.knauer.net/uhplc"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                HTQC ve UHPLC detayı
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link href="/iletisim" className="inline-flex rounded-full border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50">
                Bize yazın
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50/40 p-6 md:p-8">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Neden ayrı bir seçenek?</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-spektro-blue" />
                Rutin QC&apos;de öncelik genelde <strong>iş hacmi ve süre</strong> olduğundan UHPLC/HTQC hatları ayrı değerlendirilir.
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-spektro-blue" />
                Analitik HPLC ve ULDC ile aynı aileden modüller ve yazılım yaklaşımı; laboratuvar içi <strong>standartlaşma</strong> kolaylaşır.
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-spektro-blue" />
                Spektrotek ile <strong>metot, validasyon ve servis</strong> süreçlerinizi tek elden planlayabilirsiniz.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-14 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-start lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="relative w-full bg-gradient-to-b from-slate-50 to-white p-4 sm:p-6">
                <div className="relative mx-auto aspect-[690/276] w-full max-w-4xl">
                  <Image
                    src="/images/knauer_flowchart_HPLC_480x.webp"
                    alt="HPLC sistem seçimi akış şeması"
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-contain object-center"
                  />
                </div>
              </div>
            </motion.div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] md:p-8">
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">Uygulamanız Sistem Çözümünüzü Belirlesin</h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
                HPLC&apos;de, bir karışımdaki bileşenleri sabit faz boyunca hareketli faz akışıyla taşınır ve ayırma, numune bileşenleri arasındaki göç hızlarındaki farklılıklara dayanır. Bu nedenle, analiz etmek istediğiniz maddelerin doğası, yalnızca metodu değil, aynı zamanda HPLC sistem yapınızı da belirler.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-slate-700 md:text-base">
                <li>
                  <strong>Moleküler ağırlık</strong>; sabit fazın gözenek boyutunu belirler.
                </li>
                <li>
                  <strong>Çözünürlük</strong>; HPLC modunu, sabit fazın kimyasını ve kullanılan eluenti etkiler.
                </li>
                <li>
                  <strong>Konsantrasyon ve matris;</strong> dedektör seçiminde ve kolon boyutlarında belirleyicidir.
                </li>
                <li>Analiz ettiğiniz maddelerin çözünürlüğü HPLC modunu belirler.</li>
                <li>Elüotropik seri ise normal faz ve ters faz gibi en yaygın kromatografi modları için çözücü gücünü tanımlar.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <h2 className="text-center text-xl font-semibold tracking-tight text-slate-900 md:text-2xl">Platform avantajları</h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-slate-600">
            KNAUER AZURA® analitik LC ailesinin vurguladığı başlıca güçlü yönler (özet). Ayrıntılı broşür ve modül listesi için{" "}
            <a href="https://www.knauer.net/uhplc" target="_blank" rel="noopener noreferrer" className="font-medium text-spektro-blue underline underline-offset-2">
              üretici kaynağına
            </a>{" "}
            bakabilirsiniz.
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
            <h2 className="text-lg font-semibold text-slate-900 md:text-xl">Sisteminizi birlikte netleştirelim</h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              Basınç sınıfı, gradient tipi, dedektör ve yazılım seçiminde doğru kombinasyonu seçmenize yardımcı oluyoruz.
            </p>
          </div>
          <Link
            href="/iletisim"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            İletişim
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
