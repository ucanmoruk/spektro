import JsonLd from "@/components/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqSectionProps = {
  title?: string;
  intro?: string;
  items: FaqItem[];
};

export const hplcFaqs: FaqItem[] = [
  {
    question: "HPLC sistemi seçerken hangi kriterler önemlidir?",
    answer:
      "Analiz tipi, basınç aralığı, dedektör ihtiyacı, numune sayısı, yazılım uyumu, servis erişimi ve metot geliştirme beklentisi HPLC seçiminde birlikte değerlendirilmelidir.",
  },
  {
    question: "Analitik HPLC ile preparatif HPLC arasındaki fark nedir?",
    answer:
      "Analitik HPLC bileşenleri tanımlamak ve miktar tayini yapmak için kullanılır. Preparatif HPLC ise hedef bileşeni daha yüksek miktarda saflaştırmak ve fraksiyon toplamak için yapılandırılır.",
  },
  {
    question: "Spektrotek HPLC kurulumu sonrası destek verir mi?",
    answer:
      "Evet. Spektrotek kurulum, kullanıcı eğitimi, metot geliştirme, IQ/OQ/PQ validasyon, bakım ve teknik servis süreçlerinde laboratuvarlara uçtan uca destek sağlar.",
  },
  {
    question: "KNAUER AZURA HPLC hangi laboratuvarlar için uygundur?",
    answer:
      "KNAUER AZURA platformu eğitim, Ar-Ge, kalite kontrol, rutin analiz, yüksek basınçlı UHPLC ve modüler metot geliştirme ihtiyaçları için farklı konfigürasyonlarla uygulanabilir.",
  },
];

export const nmrFaqs: FaqItem[] = [
  {
    question: "Benchtop NMR hangi analizlerde kullanılır?",
    answer:
      "Benchtop NMR eğitim, kalite kontrol, gıda otantisite analizi, proses izleme, reaksiyon takibi ve hızlı moleküler parmak izi uygulamalarında kullanılabilir.",
  },
  {
    question: "Benchtop NMR cihazları kriyojen gerektirir mi?",
    answer:
      "Nanalysis benchtop NMR sistemleri kompakt yapılarıyla kriyojen ihtiyacı olmadan günlük laboratuvar operasyonlarına uygun şekilde kullanılabilir.",
  },
  {
    question: "Spektrotek NMR cihazı için eğitim sağlar mı?",
    answer:
      "Evet. Spektrotek cihaz devreye alma, kullanıcı eğitimi ve uygulama odaklı kullanım desteği sağlar.",
  },
];

export const osmometerFaqs: FaqItem[] = [
  {
    question: "Ozmometre ne ölçer?",
    answer:
      "Ozmometre, bir numunedeki çözünmüş partikül yoğunluğunu osmolalite olarak ölçer. Klinik, farmasötik ve kalite kontrol laboratuvarlarında sık kullanılır.",
  },
  {
    question: "KNAUER K-7400S hangi numune hacimleriyle çalışır?",
    answer:
      "KNAUER K-7400S freezing point ozmometre 50 ul veya 150 ul numune hacmiyle hızlı ve tekrarlanabilir ölçüm için yapılandırılabilir.",
  },
  {
    question: "Ozmometre kurulumu için teknik destek veriliyor mu?",
    answer:
      "Spektrotek kurulum, kullanıcı eğitimi, metot aktarımı ve teknik servis süreçlerinde destek sağlar.",
  },
];

export const serviceFaqs: FaqItem[] = [
  {
    question: "Spektrotek hangi teknik servisleri sağlar?",
    answer:
      "Spektrotek kurulum, bakım, arıza tespiti, yedek parça temini, kullanıcı eğitimi, kalibrasyon ve IQ/OQ/PQ validasyon hizmetleri sunar.",
  },
  {
    question: "Metot geliştirme desteği alabilir miyiz?",
    answer:
      "Evet. Uygulama ekibi HPLC, kromatografi ve laboratuvar süreçleri için metot geliştirme, transfer ve optimizasyon desteği sağlar.",
  },
  {
    question: "Teklif almak için ne yapmalıyız?",
    answer:
      "İletişim formu üzerinden cihaz, uygulama alanı ve laboratuvar ihtiyacınızı paylaşmanız yeterlidir. Spektrotek ekibi uygun çözüm için geri dönüş yapar.",
  },
];

export default function FaqSection({
  title = "Sık Sorulan Sorular",
  intro = "Laboratuvar yatırımı öncesinde en sık sorulan soruları kısa ve net şekilde yanıtladık.",
  items,
}: FaqSectionProps) {
  const jsonLd = faqPageJsonLd(items);

  return (
    <section className="border-t border-slate-100 bg-slate-50 py-14 md:py-20">
      <JsonLd data={jsonLd} />
      <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">FAQ</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">{intro}</p>
        </div>
        <div className="mt-8 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {items.map((item) => (
            <details key={item.question} className="group p-5 open:bg-white md:p-6">
              <summary className="cursor-pointer list-none text-base font-semibold text-slate-900 marker:hidden">
                <span className="inline-flex w-full items-center justify-between gap-4">
                  {item.question}
                  <span className="text-xl leading-none text-spektro-blue group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
