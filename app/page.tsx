"use client";

import Footer from "@/components/Footer";
import KnauerProductRange from "@/components/KnauerProductRange";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import {
  ArrowUpRight,
  Atom,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  FlaskConical,
  GraduationCap,
  HandCoins,
  Leaf,
  Layers,
  Clock,
  Cpu,
  Droplets,
  Microscope,
  PackageX,
  Percent,
  Stethoscope,
  Thermometer,
  Plug2,
  Radio,
  Sparkles,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { animate, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Fragment, useEffect, useRef, useState } from "react";

function MagneticCta({ primary = false, label, onClick }: { primary?: boolean; label: string; onClick?: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18 });
  const sy = useSpring(y, { stiffness: 220, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.14);
    y.set(dy * 0.14);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      whileHover="hover"
      className={
        primary
          ? "group relative inline-flex min-w-[250px] items-center overflow-hidden rounded-full bg-slate-900 px-4 py-4 text-white shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
          : "group relative inline-flex min-w-[250px] items-center overflow-hidden rounded-full border border-slate-200 bg-white px-4 py-4 text-slate-900 transition-all duration-500 hover:bg-slate-100"
      }
    >
      <span className="block w-full pl-[10px] pr-10 text-left transition-all duration-300 group-hover:pl-10 group-hover:pr-[10px] group-hover:text-right">
        {label}
      </span>
      <motion.span
        variants={{ hover: { opacity: 0, scale: 0.9 } }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="absolute right-[10px] rounded-full bg-white/90 p-1 text-slate-900"
      >
        <ArrowUpRight className="h-4 w-4" />
      </motion.span>
      <motion.span
        initial={{ opacity: 0, scale: 0.9 }}
        variants={{ hover: { opacity: 1, scale: 1 } }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="absolute left-[10px] rounded-full bg-white/90 p-1 text-slate-900"
      >
        <ArrowUpRight className="h-4 w-4" />
      </motion.span>
    </motion.button>
  );
}

function Counter({
  to,
  suffix = "",
  prefix = "",
  formatLocale = false,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  /** Türkçe binlik ayırıcı (örn. 10.000) */
  formatLocale?: boolean;
}) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));
  const [value, setValue] = useState(0);

  useEffect(() => {
    const controls = animate(mv, to, { duration: 1.8, ease: "easeOut" });
    const unsub = rounded.on("change", (v) => setValue(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [mv, rounded, to]);

  const num = formatLocale ? value.toLocaleString("tr-TR") : value;

  return (
    <span>
      {prefix}
      {num}
      {suffix}
    </span>
  );
}

function FloatingDataCard() {
  const [pressure, setPressure] = useState(21.8);

  useEffect(() => {
    const id = setInterval(() => {
      setPressure((v) => Number((v + (Math.random() * 0.5 - 0.25)).toFixed(2)));
    }, 1300);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      animate={{ y: [-10, 10, -10] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="rounded-3xl border border-white/10 bg-[#0B1221]/80 p-6 shadow-[0_0_80px_-10px_rgba(6,182,212,0.32)] backdrop-blur-md"
    >
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-slate-300">Sistem Durumu: Aktif</p>
        <motion.span
          animate={{
            opacity: [0.65, 1, 0.65],
            boxShadow: [
              "0 0 0 rgba(74,222,128,0.2)",
              "0 0 16px rgba(74,222,128,0.95)",
              "0 0 0 rgba(74,222,128,0.2)",
            ],
          }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="h-2.5 w-2.5 rounded-full bg-emerald-400"
        />
      </div>
      <div className="flex items-end gap-5">
        <p className="text-4xl font-semibold tracking-[-0.02em] text-white">{pressure} bar</p>
        <p className="pb-1 text-sm font-medium text-cyan-200">1 ml/dk</p>
      </div>
      <svg viewBox="0 0 320 110" className="mt-4 h-28 w-full rounded-xl bg-slate-800/40">
        <line x1="0" y1="92" x2="320" y2="92" stroke="#334155" strokeWidth="1.5" />
        <line x1="40" y1="92" x2="40" y2="84" stroke="#334155" strokeWidth="1.2" />
        <line x1="74" y1="92" x2="74" y2="84" stroke="#334155" strokeWidth="1.2" />
        <line x1="108" y1="92" x2="108" y2="84" stroke="#334155" strokeWidth="1.2" />
        <path
          d="M0 92 L32 92 L44 92 L52 40 L58 92 L72 92 L80 18 L86 92 L98 92 L106 52 L112 92 L130 92 L140 70 L148 92 L320 92"
          stroke="#06b6d4"
          strokeWidth="2.6"
          fill="none"
          strokeLinejoin="miter"
          strokeLinecap="square"
        />
        <motion.path
          d="M0 92 L32 92 L44 92 L52 40 L58 92 L72 92 L80 18 L86 92 L98 92 L106 52 L112 92 L130 92 L140 70 L148 92 L320 92"
          stroke="#1e3a8a"
          strokeWidth="1.8"
          fill="none"
          strokeDasharray="26 12"
          strokeLinecap="square"
          animate={{ strokeDashoffset: [0, -120] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </motion.div>
  );
}

export default function Home() {
  return (
    <main className="bg-white text-slate-900">
      <Navbar />
      <button className="fixed bottom-6 right-6 z-50 rounded-full bg-spektro-blue px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700">
        Teklif Al
      </button>

      <section className="relative min-h-[100vh] overflow-hidden pb-24 pt-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:44px_44px]" />
          <motion.div animate={{ x: [0, 40, 0], y: [0, 25, 0] }} transition={{ duration: 14, repeat: Infinity }} className="absolute -left-20 top-8 h-80 w-80 rounded-full bg-cyan-100/70 blur-[100px]" />
          <motion.div animate={{ x: [0, -35, 0], y: [0, -20, 0] }} transition={{ duration: 16, repeat: Infinity }} className="absolute right-2 top-12 h-80 w-80 rounded-full bg-amber-100/70 blur-[100px]" />
          <motion.div animate={{ y: ["-20%", "120%"] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute left-0 top-0 h-28 w-full bg-gradient-to-b from-cyan-100/30 to-transparent" />
        </div>
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">Çözüm Mühendisliği Güvencesi</p>
            <h1 className="font-heading mb-8 text-slate-950">
              <motion.span initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }} className="block">
                Laboratuvarınızı geleceğe taşıyan
              </motion.span>
              <motion.span initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14, duration: 0.55, ease: [0.16, 1, 0.3, 1] }} className="mt-1 block bg-gradient-to-r from-spektro-blue to-spektro-accent bg-clip-text font-accent text-transparent">
                akılcı mühendislik
              </motion.span>
            </h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.65, ease: [0.16, 1, 0.3, 1] }} className="mx-auto mb-12 max-w-3xl text-base font-normal leading-relaxed text-slate-500">
              Küresel analitik teknolojileri, çözüm mühendisliği vizyonumuzla projelendiriyoruz. Cihaz tedariğinin ötesine geçerek; metotlarınızı geliştiriyor, validasyon süreçlerinizi yönetiyor ve yatırımlarınızı baştan sona güvence altına alıyoruz.
            </motion.p>
            <div className="flex flex-wrap justify-center gap-4">
              <MagneticCta primary label="Sisteminizi Birlikte Tasarlayalım" />
              <MagneticCta label="Teknolojileri Keşfedin" />
            </div>
          </div>
          <div className="mx-auto mt-14 max-w-3xl rounded-3xl border border-slate-100 bg-slate-50/50 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <FloatingDataCard />
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                ["Runtime", "16 min."],
                ["Method Match", "USP/EP"],
                ["Validation", "IQ/OQ Ready"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-left">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{k}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <p className="mb-3 text-center text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">Dünyanın Teknolojisi, Spektrotek Uzmanlığı</p>
          <p className="mb-10 text-center text-base font-normal text-slate-600">15 yıldan uzun süredir başarıyla temsil ettiğimiz markalar</p>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Knauer",
                logo: "/brands/knauer.png",
                text: "Sıvı Kromatografisi, Preparatif ve Saflaştırma Çözümlerinde Alman Standartları",
                tags: ["HPLC/UHPLC", "Preparatif HPLC", "FPLC / BioLC", "KnauerOS", "GPC / SEC", "SMB", "Ozmometre"],
              },
              {
                name: "Nanalysis",
                logo: "/brands/nanalysis.png",
                text: "Sıvı Azot Gerektirmeyen, Masaüstü NMR Yapı Tayini Teknolojisi",
                tags: ["100 & 60 MHz", "Sıvı Helyum Yok", "qNMR Yazılımı", "Otosampler", "Flow Kit / Online NMR"],
              },
              {
                name: "SIELC Technologies",
                logo: "/brands/sielc.png",
                text: "İmkansız Ayrımlar İçin Gelişmiş Mixed-Mode Kolon Teknolojisi",
                tags: ["Primesep® Mixed-Mode", "HILIC", "Kiral Kolonlar", "Obelisc™", "Newcrom™", "BIST™ Bridge Ion"],
              },
            ].map((item, index) => (
              <motion.article key={item.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ delay: index * 0.12, type: "spring", stiffness: 90, damping: 20 }} className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-10 shadow-[0_8px_30px_rgb(0,0,0,0.07)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(29,78,216,0.1)]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.10),transparent_35%)]" />
                <div className="mb-5 flex h-24 items-center justify-center">
                  <Image src={item.logo} alt={item.name} width={360} height={96} className="h-20 w-auto object-contain" />
                </div>
                <div className="mb-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.09em] text-spektro-blue">
                  <Image src="/brands/verified-badge.png" alt="Onay rozeti" width={14} height={14} className="h-3.5 w-3.5" />
                  TÜRKİYE TEK YETKİLİ TEMSİLCİLİĞİ
                </div>
                <p className="min-h-20 text-base font-normal leading-relaxed text-slate-500">{item.text}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
          <div className="mt-12 overflow-hidden rounded-2xl border border-gray-100 bg-slate-50 py-4">
            <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 30, ease: "linear", repeat: Infinity }} className="flex w-max gap-1 px-1">
              {[
                { src: "/brands/boeco-v2.png", alt: "BOECO" },
                { src: "/brands/peak-v2.png", alt: "Peak Scientific" },
                { src: "/brands/advion-v2.png", alt: "Advion Interchim" },
                { src: "/brands/aapptec.png", alt: "aapptec" },
                { src: "/brands/axelsemrau.png", alt: "Axel Semrau" },
                { src: "/brands/hta.png", alt: "HTA" },
                { src: "/brands/dlab-v2.png", alt: "DLAB" },
                { src: "/brands/avantor-v2.png", alt: "Avantor" },
                { src: "/brands/aplichrom-v2.png", alt: "AppliChrom" },
                { src: "/brands/boeco-v2.png", alt: "BOECO 2" },
                { src: "/brands/peak-v2.png", alt: "Peak Scientific 2" },
                { src: "/brands/advion-v2.png", alt: "Advion Interchim 2" },
                { src: "/brands/aapptec.png", alt: "aapptec 2" },
                { src: "/brands/axelsemrau.png", alt: "Axel Semrau 2" },
                { src: "/brands/hta.png", alt: "HTA 2" },
                { src: "/brands/dlab-v2.png", alt: "DLAB 2" },
                { src: "/brands/avantor-v2.png", alt: "Avantor 2" },
                { src: "/brands/aplichrom-v2.png", alt: "AppliChrom 2" },
                { src: "/brands/boeco-v2.png", alt: "BOECO 3" },
                { src: "/brands/peak-v2.png", alt: "Peak Scientific 3" },
                { src: "/brands/advion-v2.png", alt: "Advion Interchim 3" },
                { src: "/brands/aapptec.png", alt: "aapptec 3" },
                { src: "/brands/axelsemrau.png", alt: "Axel Semrau 3" },
                { src: "/brands/hta.png", alt: "HTA 3" },
                { src: "/brands/dlab-v2.png", alt: "DLAB 3" },
                { src: "/brands/avantor-v2.png", alt: "Avantor 3" },
                { src: "/brands/aplichrom-v2.png", alt: "AppliChrom 3" },
              ].map((logo, idx) => (
                <div key={`${logo.alt}-${idx}`} className="flex h-24 min-w-[220px] items-center justify-center rounded-3xl border border-gray-100 bg-white px-4">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={260}
                    height={96}
                    className="h-16 w-auto bg-transparent object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <h2 className="font-heading text-center text-slate-900">Bilimsel çalışmalarınızı, modüler donanım mimarisi ve tam otonom süreçlerle birleştiriyoruz.</h2>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {[
              { label: "Sürdürülebilirlik", icon: <Leaf className="h-5 w-5" />, box: "bg-emerald-100", text: "text-emerald-800" },
              { label: "Modüler", icon: <Layers className="h-5 w-5" />, box: "bg-sky-100", text: "text-sky-800" },
              { label: "Otomasyon", icon: <Cpu className="h-5 w-5" />, box: "bg-violet-100", text: "text-violet-800" },
            ].map((item) => (
              <div
                key={item.label}
                className={`inline-flex h-14 w-fit items-center gap-3 rounded-full border border-slate-200 px-5 ${item.box}`}
              >
                <span className={item.text}>{item.icon}</span>
                <span className={`text-sm font-semibold ${item.text}`}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">Akılcı Yatırım Stratejisi</p>
            <h2 className="font-heading text-slate-900">Küçük Başla, Sonsuza Büyü</h2>
            <p className="mx-auto mt-6 max-w-3xl text-base font-normal leading-relaxed text-slate-600">
              Knauer AZURA® platformu; eğitimden Ar-Ge&apos;ye, rutin QC&apos;den LNP üretimine kadar aynı modüller üzerine inşa edilir. Cihazınız asla eskimez, sadece sizinle büyür.
            </p>
          </div>

          <div className="mt-14 flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-3">
            {[
              {
                tierLabel: "Başlangıç",
                Icon: GraduationCap,
                title: "Eğitim için HPLC",
                description:
                  "Kompakt, izokratik pompa ve UV dedektör. Üniversiteler ve kısıtlı bütçeler için mükemmel giriş noktası.",
                bullets: ["İzokratik Pompa P 4.1S", "UV/VIS Dedektör UVD 2.1S", "Manuel Enjeksiyon"],
                footnote: "400 bar — Eğitim uygulamaları",
                pillClass: "bg-emerald-100 text-emerald-800",
                iconClass: "text-emerald-700",
              },
              {
                tierLabel: "En Çok Tercih Edilen",
                Icon: TrendingUp,
                title: "Rutin Analiz için HPLC",
                description: "İşleriniz büyüdü mü? Eski cihazı atmayın! Sadece Gradient Box ve Otosampler ekleyin.",
                bullets: ["Binari Yüksek Basınç Gradyan", "Otosampler AS 6.1L", "Kolon Fırını AZURA CT 2.1"],
                footnote: "862 bar — UHPLC kapasitesi",
                pillClass: "bg-sky-100 text-sky-800",
                iconClass: "text-sky-700",
              },
              {
                tierLabel: "İleri Seviye",
                Icon: Sparkles,
                title: "Ar-Ge & Eser Analiz Tayini için Sistem",
                description:
                  "Aynı sisteme Kütle Spektrometresi veya Floresan dedektör entegre ederek eser analiz kapasitesine ulaşın.",
                bullets: ["Advion CMS Entegrasyonu", "Çoklu Dedektör Kurulumu", "1000 bar UHPLC", "SMB / Preparatif ölçekleme"],
                pillClass: "bg-violet-100 text-violet-800",
                iconClass: "text-violet-700",
              },
            ].map((item, index) => {
              const Icon = item.Icon;
              const isLast = index === 2;
              return (
                <Fragment key={item.tierLabel}>
                  <motion.article className="relative flex h-full min-h-0 flex-1 flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white p-10 shadow-[0_8px_30px_rgb(0,0,0,0.07)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(29,78,216,0.1)] lg:min-w-0">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.10),transparent_35%)]" />
                    <span
                      className={`mb-4 inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${item.pillClass}`}
                    >
                      {item.tierLabel}
                    </span>
                    <div className={item.iconClass}>
                      <Icon className="h-7 w-7" aria-hidden />
                    </div>
                    <h3 className="mt-3 text-lg font-semibold tracking-tight text-slate-900">{item.title}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{item.description}</p>
                    <ul className="mt-6 space-y-2.5 border-t border-slate-100 pt-5 text-sm text-slate-800">
                      {item.bullets.map((line) => (
                        <li key={line} className="flex gap-2">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-spektro-blue" aria-hidden />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>
                    {item.footnote ? (
                      <p className="mt-5 text-sm font-semibold text-slate-900">{item.footnote}</p>
                    ) : null}
                  </motion.article>
                  {!isLast ? (
                    <div
                      className="flex shrink-0 items-center justify-center text-slate-300 lg:w-12 lg:self-center"
                      aria-hidden
                    >
                      <ChevronRight className="hidden h-9 w-9 lg:block" strokeWidth={1.25} />
                      <ChevronDown className="h-8 w-8 lg:hidden" strokeWidth={1.25} />
                    </div>
                  ) : null}
                </Fragment>
              );
            })}
          </div>
        </div>
      </section>

      <KnauerProductRange />

      <section className="bg-slate-50 py-24">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">Bütünleşik Ekosistem</p>
            <h2 className="font-heading text-slate-900">
              HPLC&apos;yi{" "}
              <span className="inline-block bg-gradient-to-r from-spektro-blue to-spektro-accent bg-clip-text font-accent text-transparent">Yalnız Bırakmayın</span>
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base font-normal leading-relaxed text-slate-600">
              HPLC ile elde ettiğiniz bileşenleri anlık olarak yapı tayini ve kütle analizlerine tabi tutarak hızlı bileşen keşfi yapabilirsiniz.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <motion.article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white p-10 shadow-[0_8px_30px_rgb(0,0,0,0.07)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(29,78,216,0.1)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.10),transparent_35%)]" />
              <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-spektro-blue">Nanalysis</h4>
              <div className="mt-4 text-violet-700">
                <Radio className="h-7 w-7" aria-hidden />
              </div>
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-slate-900">Masaüstü NMR Sistemleri</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                60 ve 100 MHz çözünürlüğü. Tak-çalıştır benchtop teknolojisiyle rutin sentez kontrollerini kendi tezgahınızda dakikalar içinde tamamlayın.
              </p>
              <ul className="mt-6 space-y-2.5 border-t border-slate-100 pt-5 text-sm text-slate-800">
                {["Kriyojen gerektirmez", "Dakikalar içinde sonuç", "Düşük işletme maliyeti"].map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-spektro-blue" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </motion.article>

            <motion.article className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white p-10 shadow-[0_8px_30px_rgb(0,0,0,0.07)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(29,78,216,0.1)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.10),transparent_35%)]" />
              <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-spektro-blue">Advion Interchim</h4>
              <div className="mt-4 text-sky-700">
                <Plug2 className="h-7 w-7" aria-hidden />
              </div>
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-slate-900">Kütle Spektrometresi (CMS)</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                Knauer AZURA&apos;ya kolayca entegre olan Expression® CMS serisi. Çeker ocak içine sığacak kadar kompakt, anlık kütle doğrulaması artık tek tuşta.
              </p>
              <ul className="mt-6 space-y-2.5 border-t border-slate-100 pt-5 text-sm text-slate-800">
                {["TLC Plate Express ile direkt analiz", "HPLC ile tam entegrasyon", "Çeker ocak boyutlu footprint"].map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-spektro-blue" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">Otomasyon</p>
            <h2 className="font-heading text-slate-900">Tam Otonom Analiz Zinciri ile Hataya Yer Yok</h2>
            <p className="mx-auto mt-6 max-w-3xl text-base font-normal leading-relaxed text-slate-600">
              Otomasyon; örnek hazırlığından enjeksiyona, SPE adımlarından raporlamaya kadar tüm zinciri standartlaştırır. Operatör hatalarını azaltır, tekrarlanabilirliği artırır ve süreçlerinizi sürdürülebilir, denetlenebilir ve ölçeklenebilir hale getirir.
            </p>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-12">
            <div className="relative mx-auto min-h-[22rem] w-full max-w-lg overflow-hidden rounded-3xl border border-gray-100 bg-slate-50 shadow-[0_8px_30px_rgb(0,0,0,0.06)] lg:mx-0 lg:h-full lg:max-w-none lg:min-h-0">
              <Image
                src="/products/chronect-symbiosis.png"
                alt="CHRONECT Symbiosis — Axel Semrau online SPE ve UHPLC otomasyon platformu"
                fill
                className="object-contain p-4"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-spektro-logo/95 via-spektro-logo/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200/95">Axel Semrau</p>
                <h3 className="mt-2 font-heading text-balance text-white drop-shadow-md">CHRONECT Symbiosis</h3>
              </div>
            </div>

            <div className="flex min-h-0 flex-col gap-6 lg:h-full">
              <p className="text-base font-normal leading-relaxed text-slate-600">
                Esnek UHPLC ile çevrim içi SPE entegrasyonu: örnek hazırlığını otomatikleştirerek LC-MS ölçümlerinde hassasiyeti artırır, matris yükünü düşürür ve manuel adımları en aza indirir.
              </p>

              <motion.article className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-white via-slate-50/90 to-spektro-logo/[0.06] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.07)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_50px_rgba(29,78,216,0.1)]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.10),transparent_35%)]" />
                <div className="relative z-[1] flex min-h-0 flex-1 flex-col">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-spektro-logo">Teknoloji özeti</p>
                  <ul className="min-h-0 flex-1 space-y-4">
                    {[
                      {
                        head: "İkisi Bir Arada Güç",
                        body: "Doğrudan enjeksiyon ve online SPE ile tam entegre UHPLC-MS analizi.",
                      },
                      {
                        head: "Manuel Adımlara Son",
                        body: "CHRONECT Robotic otosampler ile otonom seyreltme, iç standart ekleme ve esnek hazırlık rutinleri.",
                      },
                      {
                        head: "Hassas Akış Kontrolü",
                        body: "SPH1299 gradyan pompaları, ACE kartuş modülü ve HPD yüksek basınçlı dağıtıcı ile optimize edilmiş SPE akışları.",
                      },
                      {
                        head: "Kesintisiz Yürütme",
                        body: "CHRONOS Symbiosis yazılımı ile LC-MS bağlantısı ve toplu örnek setlerinin 7/24 operatörsüz analizi.",
                      },
                      {
                        head: "Geleceğe Hazır",
                        body: "İhtiyacınıza göre Basic’ten Plus ve Advanced sürümlerine yükseltilebilir modüler mimari.",
                      },
                    ].map((item) => (
                      <li key={item.head} className="flex gap-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600">
                          <Check className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden />
                        </span>
                        <p className="text-sm leading-relaxed text-slate-700">
                          <span className="font-semibold text-slate-900">{item.head}: </span>
                          {item.body}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">İleri Kromatografi Çözümleri</p>
            <h2 className="font-heading text-slate-900">
              İmkansız Ayrımların Kısa Yolu:{" "}
              <span className="inline-block bg-gradient-to-r from-spektro-blue to-spektro-accent bg-clip-text font-accent text-transparent">Mixed-Mode Teknolojisi</span>
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base font-normal leading-relaxed text-slate-600">
              Standart C18 kolonlarla polar ve non-polar bileşikleri ayırmak için günlerce metot geliştirmeye son verin. İyon değişimi (ion-exchange) ve ters faz (reverse-phase) teknolojilerini tek bir yapıda birleştiren SIELC ile en zorlu matriksleri bile tek analizde, kusursuzca ayırın.
            </p>
          </div>

          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-8 sm:gap-10">
            {[
              {
                src: "https://sielc.com/wp-content/uploads/2022/10/Primesep-A.webp",
                alt: "SIELC Primesep® mixed-mode HPLC kolonu",
                caption: "Primesep® — mixed-mode",
              },
              {
                src: "https://sielc.com/wp-content/uploads/2022/10/Obelisc-R.webp",
                alt: "SIELC Obelisc™ R LiSC mixed-mode kolonu",
                caption: "Obelisc™ R — LiSC teknolojisi",
              },
              {
                src: "https://sielc.com/wp-content/uploads/2022/10/Newcrom-R1.webp",
                alt: "SIELC Newcrom™ R1 mixed-mode kolonu",
                caption: "Newcrom™ R1 — yeni nesil mixed-mode",
              },
            ].map((item) => (
              <div key={item.src} className="flex w-[140px] shrink-0 flex-col items-center sm:w-[152px]">
                <div className="relative h-28 w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm sm:h-32">
                  <Image src={item.src} alt={item.alt} fill className="object-contain p-2" sizes="(max-width:640px) 140px, 152px" />
                </div>
                <p className="mt-2 text-center text-[11px] leading-snug text-slate-500">{item.caption}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Tek Analizde Çoklu Ayrım",
                body: "Amino asitler, peptitler, küçük organik asitler ve nötral bileşenleri aynı kromatogramda baseline (taban çizgisi) ayrımıyla elde edin.",
                icon: <Layers className="h-6 w-6" />,
                box: "bg-violet-100",
                iconColor: "text-violet-700",
              },
              {
                title: "Basitleşen Metotlar",
                body: "Karmaşık gradyanlara ve sisteme zarar veren iyon eşleştirici (ion-pairing) reaktiflere olan ihtiyacı ortadan kaldırın.",
                icon: <Sparkles className="h-6 w-6" />,
                box: "bg-sky-100",
                iconColor: "text-sky-700",
              },
              {
                title: "%70 Zaman ve Solvent Tasarrufu",
                body: "Uzayan analiz sürelerini kısaltın, laboratuvarınızın kolon ve solvent maliyetlerini radikal biçimde düşürün.",
                icon: <Percent className="h-6 w-6" />,
                box: "bg-emerald-100",
                iconColor: "text-emerald-700",
              },
              {
                title: "Geniş pH ve Kararlılık",
                body: "Zorlu şartlarda bile kolon ömründen taviz vermeden maksimum tekrarlanabilirlik sağlayın.",
                icon: <Thermometer className="h-6 w-6" />,
                box: "bg-amber-100",
                iconColor: "text-amber-700",
              },
            ].map((item) => (
              <motion.article
                key={item.title}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
                className={`rounded-3xl border border-slate-200/80 p-6 shadow-sm transition-shadow hover:shadow-md ${item.box}`}
              >
                <div className={item.iconColor}>{item.icon}</div>
                <p className="mt-4 text-[17px] font-semibold leading-snug text-[#333]">{item.title}</p>
                <p className="mt-2 text-sm font-normal leading-relaxed text-slate-600">{item.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-white py-24">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">Akılcı Yatırım Stratejisi</p>
            <h2 className="font-heading text-slate-900">Bütçenizi Çöpe Atmayın: Yatırım Geri Dönüş Analizi (ROI)</h2>
            <p className="mx-auto mt-6 max-w-3xl text-base font-normal leading-relaxed text-slate-600">
              Modüler, entegre ve otomasyon odaklı platformlarımız; donanımı kademeli yükseltme, gereksiz yedek kapasiteyi önleme ve laboratuvar iş gücünü verimli kullanma ile uzun vadede sabit mimarili rakip sistemlere kıyasla toplam sahip olma maliyetinde avantaj sağlar.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: <Droplets className="h-8 w-8" aria-hidden />,
                iconClass: "text-cyan-600",
                iconGradient: "from-cyan-400/35 via-sky-400/25 to-blue-600/30",
                counter: <Counter to={70} suffix="%" />,
                title: "Solvent Tasarrufu",
                body: 'Knauer "Green LC" mimarisi ve optimize edilmiş akış yolları ile ithal ve pahalı solvent giderlerinizi minimize edin.',
              },
              {
                icon: <PackageX className="h-8 w-8" aria-hidden />,
                iconClass: "text-amber-600",
                iconGradient: "from-amber-300/40 via-orange-400/25 to-amber-600/30",
                counter: <Counter to={0} suffix=" €" prefix="" />,
                title: "Çöp Olan Yatırım",
                body: "Kapalı kutu sistemlerin aksine; sadece modül (dedektör/pompa kafası) ekleyerek sisteminizi yükseltin. Eski cihazınız asla atıl kalmaz.",
              },
              {
                icon: <Clock className="h-8 w-8" aria-hidden />,
                iconClass: "text-violet-600",
                iconGradient: "from-violet-400/35 via-purple-400/20 to-indigo-600/28",
                counter: <Counter to={10000} suffix=" Saat" prefix="+" formatLocale />,
                title: "İşgücü Kazancı",
                body: "Robotik otomasyon ile manuel numune hazırlığını bitirin. Uzman personeliniz pipetlemeye değil, Ar-Ge'ye ve sonuçlara odaklansın.",
              },
              {
                icon: <HandCoins className="h-8 w-8" aria-hidden />,
                iconClass: "text-emerald-700",
                iconGradient: "from-emerald-400/35 via-teal-400/22 to-cyan-700/25",
                counter: <Counter to={42} suffix="%" />,
                title: "Ortalama Min. Tasarruf",
                body: "Optimize ve otomatize çözümlerimizde giriş ve yükseltme yatırımları ile rakip markaların giriş ve yenileme maliyetleri karşılaştırmalı olarak değerlendirilmiştir.",
              },
            ].map((card, index) => (
              <motion.article
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-white via-slate-50/95 to-slate-100/80 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] ring-1 ring-slate-900/[0.04] transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(29,78,216,0.12)]"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.14),transparent_42%)]" />
                <motion.div
                  className={`relative mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${card.iconGradient} shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] ring-1 ring-white/70`}
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 4.2 + index * 0.35,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.25,
                  }}
                  whileHover={{ scale: 1.06, transition: { type: "spring", stiffness: 400, damping: 22 } }}
                >
                  <span className={`relative z-10 drop-shadow-sm ${card.iconClass}`}>{card.icon}</span>
                </motion.div>
                <p className="relative text-4xl font-semibold tabular-nums tracking-tight text-slate-900 md:text-5xl">{card.counter}</p>
                <p className="relative mt-3 text-base font-semibold text-slate-900">{card.title}</p>
                <p className="relative mt-2 flex-1 text-sm leading-relaxed text-slate-600">{card.body}</p>
              </motion.article>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <MagneticCta label="Bütçe Değerlendirmesi İste" />
          </div>

          <div className="mx-auto mt-16 max-w-6xl rounded-[2rem] border border-slate-800/25 bg-slate-900 px-8 py-10 text-white shadow-[0_24px_60px_-12px_rgba(15,23,42,0.35)] md:px-12 md:py-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-10">
              <div className="max-w-xl">
                <p className="text-base font-normal text-slate-300">Uygulamalarımızı Yakından Keşfedin.</p>
                <h3 className="mt-3 font-heading text-white">Laboratuvarınızın Geleceğini Birlikte Tasarlayalım!</h3>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
                <MagneticCta primary label="Uzmanımıza Danışın" />
                <MagneticCta label="Başarı Hikayelerimiz" />
              </div>
            </div>
          </div>

          <div className="mt-16 border-t border-slate-100 pt-16 md:mt-20 md:pt-20">
            <p className="mb-5 text-center text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">Aplikasyon Alanları</p>
            <h3 className="text-center font-heading text-slate-900">
              Karmaşık analizler için
              <br />
              <span className="inline-block bg-gradient-to-r from-spektro-blue to-spektro-accent bg-clip-text font-accent text-transparent">ileri çözümler</span>
            </h3>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Biyoteknoloji & Yaşam Bilimleri",
                  body: "Protein & peptid saflaştırma, biyomolekül karakterizasyonu, FPLC",
                  icon: <Microscope className="h-5 w-5" />,
                  box: "bg-violet-100",
                  iconColor: "text-violet-700",
                },
                {
                  title: "Kozmetik & Aromatik Bitkiler",
                  body: "Etken madde analizi, stabilite testleri, GC/HPLC kalite kontrol, saflaştırma",
                  icon: <Leaf className="h-5 w-5" />,
                  box: "bg-rose-100",
                  iconColor: "text-rose-700",
                },
                {
                  title: "Farmasötik (İlaç)",
                  body: "API saflık analizi, kiral separasyon, metot validasyonu (ICH/USP)",
                  icon: <FlaskConical className="h-5 w-5" />,
                  box: "bg-sky-100",
                  iconColor: "text-sky-700",
                },
                {
                  title: "Medikal & Klinik",
                  body: "Osmolalite ölçümü, klinik numune analizi, akreditasyona uygunluk",
                  icon: <Stethoscope className="h-5 w-5" />,
                  box: "bg-amber-100",
                  iconColor: "text-amber-700",
                },
                {
                  title: "Malzeme Bilimi & Polimer",
                  body: "GPC/SEC ile mol. ağırlık dağılımı, NMR ile yapı aydınlatma",
                  icon: <Atom className="h-5 w-5" />,
                  box: "bg-indigo-100",
                  iconColor: "text-indigo-700",
                },
                {
                  title: "Akademik & Ar-Ge",
                  body: "Metot geliştirme desteği, aplikasyon notları, eğitim sistemleri",
                  icon: <GraduationCap className="h-5 w-5" />,
                  box: "bg-emerald-100",
                  iconColor: "text-emerald-700",
                },
              ].map((item) => (
                <div key={item.title} className={`rounded-3xl border border-slate-200 p-6 ${item.box}`}>
                  <div className={`mb-4 ${item.iconColor}`}>{item.icon}</div>
                  <p className="text-[17px] font-semibold leading-snug text-[#333]">{item.title}</p>
                  <p className="mt-2 text-sm font-normal leading-relaxed text-slate-600">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 border-t border-slate-100 pt-16 md:mt-20 md:pt-20">
            <div className="mx-auto max-w-5xl">
              <p className="text-center text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">Başarı Hikayesi</p>
              <h3 className="mt-4 text-center font-heading text-slate-900">
                <span className="block text-xl font-semibold tracking-tight text-slate-800 md:text-2xl">Lider Teknoloji Firmasında</span>
                <span className="mt-2 inline-block bg-gradient-to-r from-spektro-blue to-spektro-accent bg-clip-text font-accent text-transparent">
                  Metot Transferi Başarısı
                </span>
              </h3>

              <div className="mt-10 grid gap-8 rounded-[2rem] border border-slate-200 bg-gradient-to-b from-slate-50/90 to-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:p-10 lg:grid-cols-3 lg:gap-10">
                <div className="flex flex-col">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Problem</p>
                  <p className="mt-3 text-sm font-normal leading-relaxed text-slate-600">
                    Müşterimiz, eski sistemde 45 dakika süren safsızlık analizini hızlandırmak istiyordu. Resolution kaybı olmaksızın USP validasyon kriterlerinin de sağlanması şarttı.
                  </p>
                  <div className="mt-6 self-start">
                    <MagneticCta primary label="Benzer Bir Projeniz mi Var?" />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Spektrotek Yaklaşımı</p>
                  <p className="mt-3 text-sm font-normal leading-relaxed text-slate-600">
                    Knauer AZURA UHPLC + SIELC Primesep® C18 (1.8µm) kombinasyonu ile metodu modernize ettik. Mobil faz pH optimizasyonuyla pik simetrisini mükemmelleştirdik.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Sonuç</p>
                  <div className="mt-4 space-y-4">
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 text-center shadow-sm">
                      <p className="text-3xl font-semibold tabular-nums text-slate-900 md:text-4xl">
                        <Counter to={12} suffix=" dk" />
                      </p>
                      <p className="mt-2 text-xs leading-snug text-slate-600">Yeni analiz süresi (45 dk → 12 dk)</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 text-center shadow-sm">
                      <p className="text-3xl font-semibold tabular-nums text-slate-900 md:text-4xl">
                        <Counter to={70} suffix="%" />
                      </p>
                      <p className="mt-2 text-xs leading-snug text-slate-600">Solvent ve işletim maliyeti tasarrufu</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-gradient-to-b from-slate-50 via-white to-white py-20 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">Sürekli Performans Garantisi</p>
            <h2 className="mt-4 font-heading text-slate-900">Cihazı Kurup Gitmiyoruz, Sonucu Garanti Ediyoruz.</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "IQ/OQ/PQ Validasyonları",
                body: "Cihazlarınızın uluslararası denetimlerden (FDA, GMP, GLP) tek seferde, pürüzsüz geçmesini sağlayacak resmi kalifikasyon ve dokümantasyon hizmetleri.",
                icon: <ClipboardCheck className="h-7 w-7" aria-hidden />,
              },
              {
                title: "Metot Geliştirme ve Transferi",
                body: "Yeni sisteminize geçerken eski metotlarınızı kaybetmeyin. Uzman aplikasyon ekibimizle metotlarınızı optimize ediyor ve yeni sisteminize entegre ediyoruz.",
                icon: <FlaskConical className="h-7 w-7" aria-hidden />,
              },
              {
                title: "Önleyici Bakım ve Teknik Servis",
                body: '"Beklenmedik duruşlara (downtime) son." Yedek parça güvencesi ve hızlı müdahale ile laboratuvarınızın kalbi hiç durmasın.',
                icon: <Wrench className="h-7 w-7" aria-hidden />,
              },
            ].map((item) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl border border-white/80 bg-white/55 p-6 shadow-[0_8px_32px_rgba(15,23,42,0.06)] backdrop-blur-md ring-1 ring-slate-900/[0.04] md:p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-spektro-blue/10 text-spektro-blue">{item.icon}</div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-white py-20 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">Spektrotek Bilgi Merkezi</p>
            <h2 className="mt-4 font-heading text-slate-900">Bilimsel Doğruluk, Kanıtlanmış Metotlar</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                tag: "Aplikasyon Notu",
                title: "Knauer AZURA ile Zeytinyağında Tağşiş Analizi Hızlandırma",
                description:
                  "Tağşiş tespiti için kromatografik metodu kısaltın; tekrarlanabilir pik alanı ve raporlanabilir çıktılarla kalite kontrolü güçlendirin.",
                action: "PDF İndir",
                href: "#",
                image:
                  "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=85",
                imageAlt: "Zeytin ve zeytinyağı",
              },
              {
                tag: "Whitepaper",
                title: "SIELC Mixed-Mode Kolonlarla Peptit Ayrımında Verimlilik",
                description:
                  "Mixed-mode seçicilik ile peptit karakterizasyonunda çözünürlük ve analiz süresi optimizasyonuna dair teknik özet ve karşılaştırmalı veriler.",
                action: "İncele",
                href: "#",
                image: "https://sielc.com/wp-content/uploads/2022/10/Primesep-A.webp",
                imageAlt: "SIELC Primesep mixed-mode HPLC kolonu",
              },
              {
                tag: "Vaka Analizi",
                title: "X İlaç Firması CHRONECT ile Operatör Hatalarını Nasıl Sıfırladı?",
                description:
                  "Operatör bağımlılığını azaltan otomatik hat kurulumu, izlenebilir iş akışı ve doğrulama uyumu ile kesintisiz üretim analitiği.",
                action: "Oku",
                href: "#",
                image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85",
                imageAlt: "Laboratuvar otomasyonu ve analiz",
              },
            ].map((doc, index) => (
              <motion.article
                key={doc.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-white via-slate-50/95 to-slate-100/80 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] ring-1 ring-slate-900/[0.04] transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(29,78,216,0.12)]"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.12),transparent_42%)]" />
                <span className="relative inline-flex w-fit rounded-md bg-spektro-blue px-2.5 py-1 text-xs font-semibold tracking-wide text-white">
                  {doc.tag}
                </span>
                <h3 className="relative mt-4 text-lg font-semibold leading-snug tracking-tight text-slate-950 md:text-xl">{doc.title}</h3>
                <p className="relative mt-2 flex-1 text-sm leading-relaxed text-slate-600">{doc.description}</p>
                <div className="relative mt-4 aspect-[16/10] w-full overflow-hidden rounded-xl border border-slate-200/80 bg-slate-100 shadow-inner">
                  <Image
                    src={doc.image}
                    alt={doc.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 33vw"
                    priority={index === 0}
                  />
                </div>
                <a
                  href={doc.href}
                  className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-spektro-blue transition hover:text-blue-800"
                >
                  {doc.action}
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-r from-cyan-50 via-white to-amber-50 px-8 py-20 text-center">
            <h2 className="font-heading text-slate-900">Laboratuvarınızı Bir Sonraki Seviyeye Taşımaya Hazır mısınız?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base font-normal text-slate-500">Ücretsiz proje analizi ile mevcut altyapınızı ölçelim, en hızlı geri dönüş sağlayacak modüler büyüme planını birlikte çıkaralım.</p>
            <div className="mt-8 flex justify-center">
              <MagneticCta primary label="Ücretsiz Proje Analizi Alın" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
