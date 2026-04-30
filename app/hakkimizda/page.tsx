"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function HakkimizdaPage() {
  return (
    <main className="bg-white text-slate-900">
      <Navbar />

      <section className="border-b border-slate-100 bg-slate-50 pb-14 pt-32 md:pb-20 md:pt-36">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">Kurumsal</p>
          <h1 className="font-heading max-w-4xl text-slate-900">Hakkımızda</h1>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-5xl space-y-6 px-6 md:px-10">
          <p className="text-base leading-relaxed text-slate-700">
            2013 yılından beri laboratuvar teknolojileri alanında güvenilir çözümler sunan SPEKTROTEK, resmi kurum
            laboratuvarları ve özel laboratuvarların tüm ihtiyaçlarını karşılamak üzere yapılanmıştır.
          </p>
          <p className="text-base leading-relaxed text-slate-700">
            Sektördeki 15 yıllık deneyimimizle, dünyanın önde gelen firmalarının Türkiye temsilciliğini yapıyor;
            analitik cihaz satışının yanı sıra laboratuvarlara satış sonrası destek, servis ve metot geliştirme
            konularında danışmanlık sağlıyoruz.
          </p>
          <p className="text-base leading-relaxed text-slate-700">
            SPEKTROTEK ailesi, uzman mühendislerden oluşur. Ekibimize düzenli şirket içi eğitimler sağlıyor, teknik
            kadromuzun üretici firmaların laboratuvarlarında sertifikasyon eğitimleri almasını destekliyoruz.
          </p>
          <p className="text-base leading-relaxed text-slate-700">
            Uluslararası konferans, kongre ve seminerlere aktif katılımımızla güncel gelişmeleri yakından takip ediyor;
            temsil ettiğimiz firmaların know-how bilgisini Türkiye’deki laboratuvarlara taşıyoruz.
          </p>
          <p className="text-base leading-relaxed text-slate-700">
            Amacımız yenilikçi teknolojilerle laboratuvar süreçlerini daha verimli hale getirmek ve Türkiye’de analitik
            cihaz sektörünün lider markası olmaktır. Bu hedef doğrultusunda market bölümümüzle araştırmacıların sık
            ihtiyaç duyduğu ürünlere hızlı ve güvenilir erişim sağlamayı amaçlıyoruz.
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-14 md:py-20">
        <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">İlkelerimiz</h2>
          <ul className="mt-6 space-y-4 text-slate-700">
            <li>
              <span className="font-semibold text-slate-900">Bilim ve Teknoloji Odaklılık:</span> Analitik cihaz
              sektöründeki yenilikleri takip ederek en iyi çözümleri sunmak.
            </li>
            <li>
              <span className="font-semibold text-slate-900">Müşteri Memnuniyeti:</span> Laboratuvarların ihtiyacına en
              uygun sistemleri sağlamak ve satış sonrası güçlü destek sunmak.
            </li>
            <li>
              <span className="font-semibold text-slate-900">Güvenilirlik ve Kalite:</span> Yüksek kalite
              standartlarında hizmet vererek güvenilirliği korumak.
            </li>
            <li>
              <span className="font-semibold text-slate-900">Eğitim ve Sürekli Gelişim:</span> Ekibi sürekli eğiterek
              müşterilere güncel ve doğru destek sağlamak.
            </li>
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}

