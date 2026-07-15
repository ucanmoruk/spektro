import FaqSection, { hplcFaqs, nmrFaqs, osmometerFaqs, serviceFaqs } from "@/components/FaqSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function SssPage() {
  return (
    <main className="bg-white text-slate-900">
      <Navbar />
      <section className="border-b border-slate-100 bg-slate-950 pb-14 pt-32 text-white md:pb-20 md:pt-36">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-cyan-200">Spektrotek Bilgi Merkezi</p>
          <h1 className="mt-3 font-heading max-w-4xl">HPLC, NMR ve laboratuvar teknolojileri hakkında sık sorulan sorular</h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-300">
            Analitik HPLC, preparatif HPLC, benchtop NMR, ozmometre, teknik servis, validasyon ve metot geliştirme
            süreçleri için en çok sorulan soruları yanıtladık.
          </p>
        </div>
      </section>
      <FaqSection title="HPLC ve Kromatografi" items={hplcFaqs} />
      <FaqSection title="Benchtop NMR" items={nmrFaqs} />
      <FaqSection title="Ozmometre" items={osmometerFaqs} />
      <FaqSection title="Teknik Servis ve Validasyon" items={serviceFaqs} />
      <Footer />
    </main>
  );
}
