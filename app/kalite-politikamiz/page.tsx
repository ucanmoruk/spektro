"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function KalitePolitikamizPage() {
  return (
    <main className="bg-white text-slate-900">
      <Navbar />

      <section className="border-b border-slate-100 bg-slate-50 pb-14 pt-32 md:pb-20 md:pt-36">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">Kurumsal</p>
          <h1 className="font-heading max-w-4xl text-slate-900">Kalite Politikamız</h1>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
          <p className="text-base leading-relaxed text-slate-700">
            SPEKTROTEK olarak, sunduğumuz tüm ürün ve hizmetlerde en yüksek kalite standartlarını benimseyerek müşteri
            memnuniyetini en üst seviyeye taşımayı hedefliyoruz.
          </p>

          <ul className="mt-8 space-y-4 text-slate-700">
            <li>
              <span className="font-semibold text-slate-900">Uluslararası Standartlara Uygunluk:</span> Ürün ve
              hizmetlerimizi global kalite standartlarına ve düzenlemelere uygun sunarız.
            </li>
            <li>
              <span className="font-semibold text-slate-900">Sürekli Gelişim ve İnovasyon:</span> Teknolojik yenilikleri
              takip ederek en verimli çözümleri müşterilerimize ulaştırırız.
            </li>
            <li>
              <span className="font-semibold text-slate-900">Müşteri Odaklılık:</span> Laboratuvarların ihtiyaçlarını
              analiz ederek onlara özel çözümler ve sürekli destek sağlarız.
            </li>
            <li>
              <span className="font-semibold text-slate-900">Eğitim ve Uzmanlık:</span> Teknik ekibimizin düzenli
              eğitimlerle güncel bilgi ve beceriyle hizmet vermesini destekleriz.
            </li>
            <li>
              <span className="font-semibold text-slate-900">Hızlı ve Etkin Servis Desteği:</span> Satış sonrası destek
              ve servis hizmetlerimizle cihazların kesintisiz çalışmasını hedefleriz.
            </li>
            <li>
              <span className="font-semibold text-slate-900">Çevre ve Sürdürülebilirlik:</span> Çevre dostu çözümler
              geliştirerek sürdürülebilir bir gelecek için sorumlulukla hareket ederiz.
            </li>
          </ul>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">Değerlerimiz</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <p className="text-sm leading-relaxed text-slate-700">
                <span className="font-semibold text-slate-900">Güvenilirlik:</span> Uzun vadeli iş ortaklıkları kurarak
                sürdürülebilir çözümler sunarız.
              </p>
              <p className="text-sm leading-relaxed text-slate-700">
                <span className="font-semibold text-slate-900">İnovasyon:</span> Analizleri daha hızlı, doğru ve verimli
                hale getiren teknolojileri sürekli araştırırız.
              </p>
              <p className="text-sm leading-relaxed text-slate-700">
                <span className="font-semibold text-slate-900">Uzmanlık:</span> Ekibimizin sürekli eğitimiyle güncel bilgi
                ve deneyimi müşterilerimize taşırız.
              </p>
              <p className="text-sm leading-relaxed text-slate-700">
                <span className="font-semibold text-slate-900">Müşteri Odaklılık:</span> Her laboratuvarın ihtiyacına göre
                en uygun çözümleri sunarız.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

