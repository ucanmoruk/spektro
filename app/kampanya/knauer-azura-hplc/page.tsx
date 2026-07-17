import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { metadataFor } from "@/lib/seo";
import {
  ArrowUpRight,
  CalendarClock,
  CheckCircle2,
  CreditCard,
  FlaskConical,
  Gauge,
  MonitorCheck,
  PackageCheck,
  ScanLine,
  TestTubes,
  Thermometer,
  TimerReset,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = metadataFor("kampanya/knauer-azura-hplc");

const campaignMail =
  "mailto:info@spektrotek.com?subject=KNAUER%20AZURA%20HPLC%20Kampanya%20Talebi";

const headlineStats = [
  { value: "862 bar", label: "LPG pompa basıncı" },
  { value: "190-700 nm", label: "DAD dedektör aralığı" },
  { value: "108 vial", label: "Autosampler kapasitesi" },
  { value: "15 Ağustos", label: "Son kampanya günü" },
];

const highlights = [
  {
    icon: Gauge,
    title: "Quaternary LPG Pompa",
    body: "P 6.1L pompa; 10 ml paslanmaz çelik pompa kafası, 862 bar basınç sınıfı, degasser ve 600 ul mixer ile esnek metot geliştirme sağlar.",
  },
  {
    icon: ScanLine,
    title: "DAD 2.1L Dedektör",
    body: "190-700 nm aralığında ölçüm yapan diode array dedektör; pik saflığı ve spektral izleme gerektiren ileri uygulamalar için güçlü bir temel oluşturur.",
  },
  {
    icon: TestTubes,
    title: "AS 6.1L Autosampler",
    body: "862 bar uyumlu otomatik örnekleyici; 100 ul loop ve 108 vial rack ile yoğun numune akışına hazır yapılandırılmıştır.",
  },
  {
    icon: Thermometer,
    title: "CT 2.1 Kolon Termostatı",
    body: "5-85 C aralığında çalışan kolon termostatı, 8 adede kadar HPLC kolonu için kararlı sıcaklık kontrolü sunar.",
  },
];

const configuration = [
  "Eluent Tray E 2.1L ve AZURA tubing kit ile uyumlu eluent şişe seti",
  "P 6.1L LPG pompa, 862 bar, degasser ve 600 ul mixer",
  "AS 6.1L autosampler, 100 ul loop, 108 vial rack",
  "Autosampler atık kiti ve sistem bağlantı aksesuarları",
  "CT 2.1 kolon termostatı, 5-85 C sıcaklık aralığı",
  "DAD 2.1L diode array dedektör, 190-700 nm",
  "PressureProof titanium flow cell, 10 mm, 10 ul, 300 bar",
  "AZURA Analytical MarvelXACT start-up kapiler ve adaptör kiti",
  "ClarityChrom 9.0 station single instrument lisansı",
  "ClarityChrom offline veri değerlendirme lisansı",
  "Windows 11 Pro iş istasyonu, 24 inch Full HD monitör ve router",
];

const reasons = [
  {
    icon: FlaskConical,
    title: "Ar-Ge ve metot geliştirme için hazır",
    body: "Dört çözücü hattı, DAD izleme ve sıcaklık kontrollü kolon yönetimi aynı pakette toplandı.",
  },
  {
    icon: Workflow,
    title: "Kurulum sonrası hızlı devreye alma",
    body: "Start-up kit, flow cell, iş istasyonu ve yazılım lisansı kampanya kapsamına dahil edildi.",
  },
  {
    icon: MonitorCheck,
    title: "Tek noktadan yazılım ve kontrol",
    body: "ClarityChrom lisansı ve hazır iş istasyonu ile sistem kontrolü ve veri değerlendirme akışı sadeleşir.",
  },
];

export default function KnauerAzuraCampaignPage() {
  return (
    <main className="bg-white text-slate-900">
      <Navbar />

      <section className="relative overflow-hidden border-b border-slate-100 bg-slate-50 pb-16 pt-32 md:pb-20 md:pt-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:44px_44px]" />
          <div className="absolute -left-24 top-12 h-80 w-80 rounded-full bg-cyan-100/80 blur-[100px]" />
          <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-blue-100/70 blur-[100px]" />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-spektro-blue shadow-sm">
              <CalendarClock className="h-4 w-4" />
              Sınırlı kampanya
            </div>
            <h1 className="font-heading max-w-4xl text-slate-950">
              KNAUER AZURA Analitik HPLC ile laboratuvar kapasitenizi yükseltin
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
              Alman mühendisliğiyle yapılandırılmış KNAUER AZURA HPLC sistemi; ileri Ar-Ge, metot geliştirme ve kalite kontrol süreçleri için pompa, DAD dedektör, autosampler, kolon termostatı, yazılım ve iş istasyonunu tek pakette sunar.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={campaignMail}
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Randevu ve teklif talep edin
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link
                href="/analitik-hplc"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Analitik HPLC sayfası
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_20px_70px_rgba(15,23,42,0.10)]">
            <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-6 text-white">
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
              <div className="relative flex items-center justify-between gap-4">
                <Image
                  src="/brands/knauer.png"
                  alt="KNAUER"
                  width={180}
                  height={70}
                  className="h-9 w-auto rounded bg-white px-3 py-1 object-contain"
                  priority
                />
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-cyan-100">
                  5 adet kontenjan
                </span>
              </div>
              <div className="relative mt-8">
                <p className="text-sm text-cyan-100">Özel kampanya koşulları</p>
                <p className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">Teklif ile paylaşılır</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  Son gün: 15 Ağustos 2026. Kampanya koşulları sınırlı stok, proje kapsamı ve teslimat planına göre teklif aşamasında netleştirilir.
                </p>
              </div>
              <div className="relative mt-8 grid gap-3 sm:grid-cols-2">
                {headlineStats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3">
                    <p className="text-lg font-semibold text-white">{stat.value}</p>
                    <p className="text-xs text-slate-300">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 md:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative">
            <div className="relative aspect-[690/520] overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50 p-6 shadow-sm">
              <Image
                src="/images/Analitik-3.webp"
                alt="KNAUER AZURA Analitik HPLC sistemi"
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="object-contain object-center p-6"
                priority
              />
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">Sistem özeti</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
              Eksiksiz yapılandırılmış 862 bar AZURA paketi
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
              Teklif kapsamındaki konfigürasyon; numune hazırlığından kromatografik ayrım ve veri değerlendirmeye kadar günlük kullanıma hazır bir analitik HPLC hattı oluşturacak şekilde kurgulandı.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {highlights.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                    <Icon className="h-5 w-5 text-spektro-blue" />
                    <h3 className="mt-4 text-sm font-semibold text-slate-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50 py-14 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">Teklif kapsamı</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
                Cihaz, yazılım ve devreye alma bileşenleri aynı pakette
              </h2>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {configuration.map((item) => (
                  <div key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-spektro-blue" />
                    <p className="text-sm leading-relaxed text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="rounded-2xl bg-blue-50 p-3 text-spektro-blue">
                  <PackageCheck className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-950">Kampanya paketi</p>
                  <p className="text-xs text-slate-500">Tek sistem, net kapsam, hızlı karar</p>
                </div>
              </div>
              <dl className="mt-6 divide-y divide-slate-100 text-sm">
                <div className="flex items-center justify-between py-3">
                  <dt className="text-slate-500">Teklif no</dt>
                  <dd className="font-medium text-slate-900">S24312</dd>
                </div>
                <div className="flex items-center justify-between py-3">
                  <dt className="text-slate-500">PDF teklif tarihi</dt>
                  <dd className="font-medium text-slate-900">15.07.2026</dd>
                </div>
                <div className="flex items-center justify-between py-3">
                  <dt className="text-slate-500">Kampanya bitişi</dt>
                  <dd className="font-medium text-slate-900">15.08.2026</dd>
                </div>
                <div className="flex items-center justify-between py-3">
                  <dt className="text-slate-500">Kontenjan</dt>
                  <dd className="font-medium text-slate-900">5 adet</dd>
                </div>
              </dl>
              <p className="mt-5 rounded-2xl bg-slate-50 p-4 text-xs leading-relaxed text-slate-600">
                PDF teklifinde yer alan üretici konfigürasyonu kampanya paketinin teknik temelidir. Nihai ticari koşullar Spektrotek tarafından proje ve teslimat planına göre teyit edilir.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <div className="grid gap-6 md:grid-cols-3">
            {reasons.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)]">
                  <Icon className="h-6 w-6 text-spektro-blue" />
                  <h3 className="mt-5 text-base font-semibold text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-14 text-white md:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 md:px-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-cyan-200">Ödeme kolaylığı</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
              Siparişte %50 peşin, teslimat ve kurulum sonrası 2 taksit
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
              Kredi kartı ile güvenli ödeme imkanı mevcuttur. Kampanya kapsamı ve ödeme planı, firma onayı ve teslimat takvimi ile netleştirilir.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: PackageCheck, title: "Özel teklif", body: "Proje kapsamına göre" },
              { icon: CreditCard, title: "%50 peşin", body: "Sipariş onayında" },
              { icon: TimerReset, title: "2 taksit", body: "Kurulum sonrası" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/10 p-5">
                  <Icon className="h-5 w-5 text-cyan-200" />
                  <p className="mt-4 text-lg font-semibold">{item.title}</p>
                  <p className="mt-1 text-xs text-slate-300">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 md:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-center md:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">15 Ağustos&apos;a kadar</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
              Sistemi laboratuvarınıza göre birlikte netleştirelim
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
              Uygulamanız, numune matriksiniz ve metod hedefinize göre kolon, sarf, validasyon ve servis planını aynı görüşmede netleştirebiliriz.
            </p>
          </div>
          <a
            href={campaignMail}
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Görüşme planlayın
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
