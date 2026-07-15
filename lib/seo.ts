import type { Metadata, MetadataRoute } from "next";

export const siteUrl = "https://spektrotek.com";

export const organization = {
  name: "Spektrotek",
  legalName: "SPEKTROTEK LABORATUVAR CİHAZLARI PAZARLAMA PROJE VE DANIŞMANLIK ANONİM ŞİRKETİ",
  url: siteUrl,
  logo: `${siteUrl}/brand/spektrotek-logo.png`,
  email: "info@spektrotek.com",
  phone: "+90 212 706 1076",
  address: {
    streetAddress: "Atatürk Mah. Hadımköy Yolu Cad. No:10 İç Kapı No:7",
    addressLocality: "Esenyurt",
    addressRegion: "İstanbul",
    addressCountry: "TR",
  },
  brands: [
    "KNAUER",
    "Nanalysis",
    "SIELC",
    "BOECO",
    "Peak Scientific",
    "Advion Interchim",
    "Aapptec",
    "Axel Semrau",
    "HTA",
    "DLAB",
    "Avantor",
    "AppliChrom",
  ],
};

export const staticSeoPages = [
  {
    path: "",
    title: "Spektrotek | HPLC, NMR ve Laboratuvar Teknolojileri",
    description:
      "Spektrotek; HPLC, preparatif HPLC, benchtop NMR, ozmometre, kolon ve laboratuvar sarf malzemeleri için mühendislik, kurulum, validasyon ve teknik servis çözümleri sunar.",
    priority: 1,
  },
  {
    path: "analitik-hplc",
    title: "Analitik HPLC Sistemleri | KNAUER AZURA | Spektrotek",
    description:
      "KNAUER AZURA analitik HPLC, UHPLC ve ULDC sistemleri için modüler konfigürasyon, dedektör, pompa, autosampler, validasyon ve metot geliştirme desteği.",
    priority: 0.92,
  },
  {
    path: "preparatif-hplc",
    title: "Preparatif HPLC Sistemleri | Saflaştırma Çözümleri | Spektrotek",
    description:
      "Preparatif HPLC sistemleriyle yarı preparatiften pilot ölçeğe saflaştırma, fraksiyon toplama, solvent geri kazanımı ve proses geliştirme çözümleri.",
    priority: 0.88,
  },
  {
    path: "benchtop-nmr",
    title: "Benchtop NMR Cihazları | Nanalysis | Spektrotek",
    description:
      "Nanalysis benchtop NMR sistemleriyle eğitim, kalite kontrol, gıda, ilaç ve proses analizleri için kompakt NMR çözümleri.",
    priority: 0.86,
  },
  {
    path: "ozmometre",
    title: "Ozmometre Cihazları | KNAUER K-7400S | Spektrotek",
    description:
      "KNAUER freezing point ozmometre çözümleriyle klinik, farmasötik ve kalite kontrol laboratuvarlarında hızlı osmolalite ölçümü.",
    priority: 0.82,
  },
  {
    path: "hizmetlerimiz",
    title: "Teknik Servis, Validasyon ve Metot Geliştirme | Spektrotek",
    description:
      "Spektrotek; laboratuvar cihazları için kurulum, teknik servis, kullanıcı eğitimi, IQ/OQ/PQ validasyon ve aplikasyon desteği sağlar.",
    priority: 0.78,
  },
  {
    path: "hakkimizda",
    title: "Hakkımızda | Spektrotek Laboratuvar Teknolojileri",
    description:
      "Spektrotek, laboratuvar teknolojileri alanında analitik cihaz, sarf malzeme, teknik servis ve proje danışmanlığı sunan çözüm ortağıdır.",
    priority: 0.7,
  },
  {
    path: "misyon-vizyon",
    title: "Misyon ve Vizyon | Spektrotek",
    description:
      "Spektrotek'in misyonu ve vizyonu: Türkiye'deki laboratuvarların dünya standartlarında analiz yapmasını sağlayan güvenilir teknoloji çözümleri.",
    priority: 0.62,
  },
  {
    path: "kalite-politikamiz",
    title: "Kalite Politikamız | Spektrotek",
    description:
      "Spektrotek kalite politikası; güvenilir ürün, sürdürülebilir hizmet, teknik uzmanlık ve müşteri memnuniyeti ilkelerine dayanır.",
    priority: 0.6,
  },
  {
    path: "bilgi-toplumu-hizmetleri",
    title: "Bilgi Toplumu Hizmetleri | Spektrotek",
    description:
      "Spektrotek ticari unvan, adres, MERSİS, vergi ve iletişim bilgileri dahil bilgi toplumu hizmetleri sayfası.",
    priority: 0.45,
  },
  {
    path: "haberler",
    title: "Haberler ve Teknik Yazılar | Spektrotek",
    description:
      "HPLC, kromatografi, laboratuvar teknolojileri ve Spektrotek gelişmeleri hakkında teknik yazılar ve haberler.",
    priority: 0.72,
  },
  {
    path: "iletisim",
    title: "İletişim | Spektrotek Laboratuvar Cihazları",
    description:
      "HPLC, NMR, ozmometre, kolon ve laboratuvar teknolojileri için Spektrotek uzman ekibiyle iletişime geçin.",
    priority: 0.76,
  },
  {
    path: "sss",
    title: "Sık Sorulan Sorular | HPLC, NMR ve Laboratuvar Teknolojileri | Spektrotek",
    description:
      "HPLC, preparatif HPLC, benchtop NMR, ozmometre, teknik servis, validasyon ve metot geliştirme hakkında sık sorulan sorular.",
    priority: 0.74,
  },
  {
    path: "market",
    title: "Laboratuvar Ürünleri ve Sarf Malzemeleri | Spektrotek Market",
    description:
      "Analitik sistemler, HPLC kolonları, kromatografi sarf malzemeleri ve laboratuvar ürünleri için Spektrotek market.",
    priority: 0.72,
  },
  {
    path: "kampanya/knauer-azura-hplc",
    title: "KNAUER AZURA Analitik HPLC Kampanyası | Spektrotek",
    description:
      "KNAUER AZURA analitik HPLC sistemi için sınırlı kampanya: 862 bar LPG pompa, DAD dedektör, autosampler, kolon termostatı ve yazılım paketi.",
    priority: 0.8,
  },
] satisfies Array<{
  path: string;
  title: string;
  description: string;
  priority: number;
}>;

export const noIndexRobots = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
  },
};

export function absoluteUrl(path = "") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${normalized === "/" ? "" : normalized}`;
}

export function canonicalFor(path = "") {
  return path ? `/${path.replace(/^\/+/, "")}` : "/";
}

export function sitemapEntry(path: string, priority: number): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: path ? "monthly" : "weekly",
    priority,
  };
}

export function metadataFor(path: string): Metadata {
  const normalized = path.replace(/^\/+/, "");
  const page = staticSeoPages.find((item) => item.path === normalized);

  if (!page) {
    return {
      alternates: {
        canonical: canonicalFor(normalized),
      },
    };
  }

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: canonicalFor(page.path),
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: absoluteUrl(page.path),
      siteName: "Spektrotek",
      locale: "tr_TR",
      type: "website",
      images: [
        {
          url: `${siteUrl}/brand/spektrotek-logo.png`,
          width: 1200,
          height: 630,
          alt: "Spektrotek Laboratuvar Teknolojileri",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [`${siteUrl}/brand/spektrotek-logo.png`],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: organization.name,
    legalName: organization.legalName,
    url: organization.url,
    logo: organization.logo,
    image: organization.logo,
    email: organization.email,
    telephone: organization.phone,
    address: {
      "@type": "PostalAddress",
      ...organization.address,
    },
    areaServed: "TR",
    knowsAbout: [
      "Analitik HPLC",
      "Preparatif HPLC",
      "Benchtop NMR",
      "Ozmometre",
      "HPLC kolonları",
      "Kromatografi sarf malzemeleri",
      "Laboratuvar cihaz validasyonu",
      "Metot geliştirme",
    ],
    brand: organization.brands.map((name) => ({ "@type": "Brand", name })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Spektrotek",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/market?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceJsonLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "Organization",
      name: organization.name,
      url: siteUrl,
    },
    areaServed: "TR",
    url: absoluteUrl(path),
  };
}
