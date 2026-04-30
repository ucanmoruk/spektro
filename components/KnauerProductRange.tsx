"use client";

import Image from "next/image";
import { useState } from "react";

type KnauerProduct = {
  title: string;
  description: string;
  /** KNAUER sitesiyle aynı ürün görselleri (knauer.net /web/image/…) */
  imageSrc: string;
  isNew?: boolean;
};

type KnauerTab = {
  id: string;
  label: string;
  products: KnauerProduct[];
};

/** KNAUER Product Range — içerik knauer.net ile uyumlu, metinler Türkçe. */
const KNAUER_PRODUCT_RANGE: KnauerTab[] = [
  {
    id: "innovations",
    label: "Yenilikler",
    products: [
      {
        title: "OligoScaler",
        imageSrc: "https://www.knauer.net/web/image/218948",
        isNew: true,
        description:
          "Sezgisel programlama, hassas kontrol, çok dalga boylu UV izleme, entegre iletkenlik ölçümü ve esnek, genişletilebilir kurulum ile hızlı, güvenilir ve uygun maliyetli oligonükleotit sentezi.",
      },
      {
        title: "AZURA® HTQC UHPLC System",
        imageSrc: "https://www.knauer.net/web/image/218943",
        description:
          "Yüksek verimli kalite kontrol: hız, sadelik ve sağlamlık. Yüksek hızlı UHPLC yöntemleri, cihaz ve yazılım tabanlı otomasyon ile akıllı paralel kolon işleme sayesinde örnek çıktınızı artırın.",
      },
      {
        title: "AZURA® FC 6.1 Fraction Collector",
        imageSrc: "https://www.knauer.net/web/image/218944",
        description:
          "Yeni FC 6.1 fraksiyon toplayıcı; FPLC ve HPLC uygulamaları için tasarlanmış, küçük ve çok yönlü bir fraksiyon toplayıcıdır.",
      },
      {
        title: "knauerOS®",
        imageSrc: "https://www.knauer.net/web/image/245711",
        isNew: true,
        description:
          "Çok dedektörlü iş akışlarını yönetmek, veri işlemeyi ve iş birliğini kolaylaştırmak için tasarlanmış; sezgisel istemci–sunucu web mimarisine sahip, modern ve tarayıcı tabanlı (U)HPLC uygulaması.",
      },
      {
        title: "IJM NanoCalculator Tool",
        imageSrc: "https://www.knauer.net/web/image/218945",
        description:
          "Yeni IJM ölçeklendirme aracımız; yerleşik bir sürece sahip ve daha yüksek debiler veya daha büyük IJM’lere ölçeklenmek isteyen müşteriler için pratik bir çevrim içi rehberdir.",
      },
      {
        title: "Sepapure® oliGO Columns",
        imageSrc: "https://www.knauer.net/web/image/218946",
        description:
          "Sepapure® oliGO kolonları, standart HPLC sistemlerinde düşük geri basınç ve UHPLC düzeyinde performansla oligonükleotitlerin IP-RP ayrımını sunar — QC ve safsızlık profillemesi için idealdir.",
      },
    ],
  },
  {
    id: "lc-systems",
    label: "LC Sistemleri",
    products: [
      {
        title: "(U)HPLC Systems",
        imageSrc: "https://www.knauer.net/web/image/219628",
        description:
          "KNAUER AZURA® LC ailesinin analitik HPLC, ULDC ve UHPLC sistemleri çalışmanızı desteklemek ve kolaylaştırmak için tasarlanmıştır.",
      },
      {
        title: "Prep. LC Systems",
        imageSrc: "https://www.knauer.net/web/image/219630",
        description:
          "Preparatif kromatografinin temel amacı, ilgi gören hedef bileşikleri etkin biçimde izole etmek, saflaştırmak ve geri kazanmaktır.",
      },
      {
        title: "FPLC Systems",
        imageSrc: "https://www.knauer.net/web/image/219632",
        description:
          "Küçük ayak izinde FPLC (Fast Protein LC) için eksiksiz çözümler: AZURA® FPLC sistemleri esneklik ve güvenilirliği bir araya getirir.",
      },
      {
        title: "GPC/SEC Systems",
        imageSrc: "https://www.knauer.net/web/image/219634",
        description:
          "Jel geçirim ve boy dışlama kromatografisi — GPC/SEC analizi, fraksiyonasyon ve GPC temizliği için sağlam sistem çözümleri.",
      },
      {
        title: "SMB Systems",
        imageSrc: "https://www.knauer.net/web/image/219635",
        description:
          "Simüle hareketli yatak kromatografisi (SMBC), giderek daha sık ilaç endüstrisinde bir ayrım tekniği olarak uygulanmaktadır.",
      },
    ],
  },
  {
    id: "life-science",
    label: "Yaşam Bilimleri",
    products: [
      {
        title: "LNP Systems",
        imageSrc: "https://www.knauer.net/web/image/218942",
        description:
          "Çarpma jetleri karıştırma (IJM) teknolojisi, API taşıyan (ör. mRNA aşıları için) yüksek kaliteli lipid nanopartiküllerin formülasyonu ve üretimini mümkün kılar.",
      },
      {
        title: "oliGO Synthesizer",
        imageSrc: "https://www.knauer.net/web/image/218948",
        description:
          "Sezgisel programlama, hassas kontrol, çok dalga boylu UV izleme, entegre iletkenlik ölçümü ve esnek, genişletilebilir kurulum ile hızlı, güvenilir ve uygun maliyetli oligonükleotit sentezi.",
      },
    ],
  },
  {
    id: "osmometry",
    label: "Ozmometri",
    products: [
      {
        title: "KNAUER Freezing Point Osmometer K-7400S",
        imageSrc: "https://www.knauer.net/web/image/219657",
        description:
          "KNAUER K-7400S, kullanıcı dostu arayüz ve isteğe bağlı EuroOsmo yazılımı ile sulu örneklerin ozmolalitesini hızlı ve tekrarlanabilir biçimde ölçer.",
      },
      {
        title: "Measuring head for K-7400S Osmometer",
        imageSrc: "https://www.knauer.net/web/image/259377",
        description:
          "K-7400S osmometresi için ölçüm başlığı, örnek hacmi 150 µl — 50 µl hacim için ilgili A0840-4 ölçüm başlığını sipariş edin.",
      },
      {
        title: "BlueOrchid Pipette – 150 µl Fixed Volume",
        imageSrc: "https://www.knauer.net/web/image/259406",
        description:
          "BlueOrchid pipet, doğru ve zahmetsiz pipetleme için doğru seçim — konfor ve dayanıklılık için tasarlanmıştır.",
      },
    ],
  },
];

export default function KnauerProductRange() {
  const [active, setActive] = useState(0);
  const panelId = "knauer-product-panel";
  const tablistId = "knauer-product-tabs";

  return (
    <section className="border-t border-slate-100 bg-white py-24" aria-labelledby="knauer-portfolio-heading">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">Modüler Sistemler</p>
          <h2 id="knauer-portfolio-heading" className="font-heading text-slate-900">
            KNAUER Ürün Portföyü
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base font-normal leading-relaxed text-slate-600">
            Modüler, geliştirilebilir, değiştirilebilir ve kompakt yapıları sayesinde KNAUER sıvı kromatografisi çözümlerinde sınırlarınızı zorluyor. Siz prosesinizi söyleyin, biz size uygun çözümlerimizi sunalım.
          </p>
        </div>

        <div className="mt-14">
          <div
            id={tablistId}
            role="tablist"
            aria-label="KNAUER ürün grupları"
            className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] md:mx-0 md:flex-wrap md:justify-center md:gap-2 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            {KNAUER_PRODUCT_RANGE.map((tab, i) => {
              const selected = active === i;
              return (
                <button
                  key={tab.id}
                  id={`knauer-tab-${tab.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={panelId}
                  onClick={() => setActive(i)}
                  className={
                    selected
                      ? "shrink-0 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"
                      : "shrink-0 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                  }
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div
            id={panelId}
            role="tabpanel"
            aria-labelledby={`knauer-tab-${KNAUER_PRODUCT_RANGE[active].id}`}
            className="mt-10"
          >
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {KNAUER_PRODUCT_RANGE[active].products.map((p) => (
                <article
                  key={`${KNAUER_PRODUCT_RANGE[active].id}-${p.title}`}
                  className="relative flex flex-col rounded-2xl border border-gray-100 bg-slate-50/60 p-6 shadow-[0_4px_20px_rgba(15,23,42,0.04)]"
                >
                  <div className="relative mb-4 h-44 w-full overflow-hidden rounded-xl bg-white">
                    {p.isNew ? (
                      <span className="absolute left-3 top-3 z-10 inline-flex rounded-md bg-spektro-blue px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                        Yeni
                      </span>
                    ) : null}
                    <Image
                      src={p.imageSrc}
                      alt={p.title}
                      fill
                      className="object-contain p-3"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 320px"
                    />
                  </div>
                  <h3 className="text-base font-semibold leading-snug text-slate-900">{p.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">{p.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
