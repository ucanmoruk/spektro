"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { FlaskConical, GraduationCap, Settings, ShieldCheck } from "lucide-react";

const coreServices = [
  {
    title: "Teknik Servis",
    icon: <Settings className="h-6 w-6" aria-hidden />,
    summary:
      "Distribütörü olduğumuz cihazlar için yerinde kurulum, bakım, arıza giderme ve kalibrasyon hizmetlerini uzman teknisyen kadromuzla sağlıyoruz.",
    bullets: [
      "Kurulum ve devreye alma",
      "Periyodik bakım ve performans kontrolleri",
      "Arıza tespiti, onarım ve yedek parça temini",
      "Uluslararası standartlara uygun kalibrasyon hizmetleri",
    ],
  },
  {
    title: "Kullanıcı Eğitimi",
    icon: <GraduationCap className="h-6 w-6" aria-hidden />,
    summary:
      "Laboratuvar ekibinizin cihazları güvenli, doğru ve yüksek verimle kullanabilmesi için ihtiyaç odaklı uygulamalı eğitim programları sunuyoruz.",
    bullets: [
      "Temel cihaz kullanımı ve hızlı hata tespiti",
      "İleri düzey fonksiyonlar ve özel uygulamalar",
      "Gerçek senaryo bazlı uygulamalı çalışmalar",
      "Bakım/kalibrasyon süreçleri için yetkinlik geliştirme",
    ],
  },
  {
    title: "Aplikasyon ve Metot Geliştirme",
    icon: <FlaskConical className="h-6 w-6" aria-hidden />,
    summary:
      "Analiz hedeflerinize uygun metot geliştirme, validasyon ve uygulama desteğiyle laboratuvar süreçlerinizin doğruluk ve tekrarlanabilirliğini artırıyoruz.",
    bullets: [
      "Numuneye özel metot geliştirme ve optimizasyon",
      "Mevcut metotların performans iyileştirmesi",
      "Metot validasyonu (ulusal/uluslararası standart uyumu)",
      "Personel eğitimi ve devreye alma desteği",
    ],
  },
  {
    title: "Danışmanlık",
    icon: <ShieldCheck className="h-6 w-6" aria-hidden />,
    summary:
      "Cihaz seçimi, laboratuvar tasarımı, akreditasyon hazırlığı ve düzenleyici uyumluluk başlıklarında projelerinize uçtan uca danışmanlık sağlıyoruz.",
    bullets: [
      "Laboratuvar kurulum ve altyapı planlama danışmanlığı",
      "Proje yönetimi, zaman/bütçe optimizasyonu",
      "ISO/IEC 17025 ve benzeri süreçlerde rehberlik",
      "Kalite sistemi, dokümantasyon ve personel gelişimi desteği",
    ],
  },
];

export default function HizmetlerimizPage() {
  return (
    <main className="bg-white text-slate-900">
      <Navbar />

      <section className="border-b border-slate-100 bg-slate-50 pb-14 pt-32 md:pb-20 md:pt-36">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">Hizmetlerimiz</p>
          <h1 className="font-heading max-w-4xl text-slate-900">Laboratuvar Yaşam Döngüsünün Her Aşamasında Destek</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600">
            Teknik servis, eğitim, aplikasyon ve danışmanlık hizmetlerimizi tek bir çatı altında sunarak laboratuvarınızın
            kesintisiz, doğru ve verimli çalışmasını güvence altına alıyoruz.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-6 md:px-10 lg:grid-cols-2">
          {coreServices.map((service) => (
            <article
              key={service.title}
              className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50/90 to-slate-100/70 p-7 shadow-[0_8px_30px_rgb(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(29,78,216,0.12)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.10),transparent_40%)]" />
              <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-spektro-blue/10 text-spektro-blue">
                {service.icon}
              </div>
              <h2 className="relative text-2xl font-semibold tracking-tight text-slate-900">{service.title}</h2>
              <p className="relative mt-3 text-sm leading-relaxed text-slate-600">{service.summary}</p>
              <ul className="relative mt-5 space-y-2.5 border-t border-slate-200/80 pt-5 text-sm text-slate-700">
                {service.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-spektro-blue" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-14 md:py-20">
        <div className="mx-auto w-full max-w-5xl rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm md:px-10">
          <h3 className="text-2xl font-semibold tracking-tight text-slate-900">Neden Spektrotek Hizmet Modeli?</h3>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Kurulumdan validasyona, uygulama desteğinden sürekli eğitime kadar laboratuvarınızın operasyonel yükünü azaltan
            entegre bir hizmet modeli sunuyoruz. Böylece ekipleriniz analize odaklanırken, sistem sürdürülebilirliğini biz
            güvenceye alıyoruz.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

