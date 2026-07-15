import Image from "next/image";
import Link from "next/link";

const distributorLogos = [
  { src: "/brands/knauer.png", alt: "KNAUER" },
  { src: "/brands/nanalysis.png", alt: "Nanalysis" },
  { src: "/brands/sielc.png", alt: "SIELC" },
  { src: "/brands/boeco-v2.png", alt: "BOECO" },
  { src: "/brands/peak-v2.png", alt: "Peak Scientific" },
  { src: "/brands/advion-v2.png", alt: "Advion Interchim" },
  { src: "/brands/aapptec.png", alt: "Aapptec" },
  { src: "/brands/axelsemrau.png", alt: "Axel Semrau" },
  { src: "/brands/hta.png", alt: "HTA" },
  { src: "/brands/dlab-v2.png", alt: "DLAB" },
  { src: "/brands/avantor-v2.png", alt: "Avantor" },
  { src: "/brands/aplichrom-v2.png", alt: "AppliChrom" },
];

const footerLinks = {
  kurumsal: [
    { label: "Hakkımızda", href: "/hakkimizda" },
    { label: "Misyon & Vizyon", href: "/misyon-vizyon" },
    { label: "Kalite Politikamız", href: "/kalite-politikamiz" },
    { label: "Bilgi Toplumu Hizmetleri", href: "/bilgi-toplumu-hizmetleri" },
    { label: "Sık Sorulan Sorular", href: "/sss" },
  ],
  cozumler: [
    { label: "Analitik HPLC", href: "/analitik-hplc" },
    { label: "Preparatif HPLC", href: "/preparatif-hplc" },
    { label: "Benchtop NMR", href: "/benchtop-nmr" },
    { label: "Ozmometre", href: "/ozmometre" },
    { label: "Market", href: "/market" },
  ],
};

function DistributorStrip() {
  const logos = [...distributorLogos, ...distributorLogos];

  return (
    <section className="overflow-hidden border-y border-slate-200 bg-slate-50 py-5">
      <div className="mx-auto mb-4 flex w-full max-w-7xl items-center justify-between gap-4 px-6 md:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
          Distribütörlüklerimiz
        </p>
        <Link href="/hakkimizda" className="text-xs font-medium text-spektro-blue hover:text-blue-700">
          Tüm iş ortaklarımız
        </Link>
      </div>
      <div className="relative flex overflow-hidden">
        <div className="flex w-max animate-footer-marquee gap-3 px-3">
          {logos.map((logo, index) => (
            <div
              key={`${logo.alt}-${index}`}
              className="flex h-16 w-44 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={180}
                height={64}
                className="max-h-10 w-auto object-contain opacity-65 grayscale contrast-125"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Footer({ showDistributorStrip = true }: { showDistributorStrip?: boolean }) {
  return (
    <>
      {showDistributorStrip ? <DistributorStrip /> : null}
      <footer className="bg-slate-950 pb-10 pt-20 text-slate-300">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-6 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-4 lg:gap-12 lg:px-10">
          <div className="min-w-0">
            <Link href="/" className="inline-flex">
              <Image
                src="/brand/spektrotek-logo.svg"
                alt="Spektrotek"
                width={260}
                height={32}
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Analitik laboratuvar teknolojileri, validasyon ve metot geliştirme süreçlerinde uçtan uca mühendislik çözümleri sunuyoruz.
            </p>
          </div>
          <div className="min-w-0">
            <h4 className="break-words text-base font-semibold leading-snug tracking-tight text-white sm:text-lg">
              Kurumsal
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {footerLinks.kurumsal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0">
            <h4 className="break-words text-base font-semibold leading-snug tracking-tight text-white sm:text-lg">
              Çözümler
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {footerLinks.cozumler.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0">
            <h4 className="break-words text-base font-semibold leading-snug tracking-tight text-white sm:text-lg">
              İletişim
            </h4>
            <address className="mt-4 space-y-2 text-sm not-italic text-slate-400">
              <p className="break-words">
                Atatürk Mah. Hadımköy Yolu Cad.
                <br />
                No:10 İç Kapı No:7
                <br />
                Esenyurt / İstanbul
              </p>
              <p>
                <a href="mailto:info@spektrotek.com" className="transition hover:text-white">
                  info@spektrotek.com
                </a>
              </p>
              <p>
                <a href="tel:+902127061076" className="transition hover:text-white">
                  +90 (212) 706 1076
                </a>
              </p>
            </address>
          </div>
        </div>
        <div className="mx-auto mt-12 w-full max-w-7xl border-t border-white/10 px-6 pt-7 text-center text-xs text-slate-500 md:px-10">
          © 2026 Spektrotek. Tüm hakları saklıdır.
        </div>
      </footer>
    </>
  );
}
