"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const rows = [
  ["Şirket Türü", "Anonim Şirket"],
  ["Ticaret Ünvanı", "SPEKTROTEK LABORATUVAR CİHAZLARI PAZARLAMA PROJE VE DANIŞMANLIK ANONİM ŞİRKETİ"],
  ["Adres", "Atatürk Mah. Hadımköy Yolu Cad. No:10 İç Kapı No:7 Esenyurt / İstanbul"],
  ["Vergi Dairesi", "Esenyurt"],
  ["Vergi Numarası", "7810493470"],
  ["Mersis No", "0781049347000001"],
  ["Ticaret Sicil Memurluğu", "İstanbul"],
  ["Ticaret Sicil Numarası", "498767-5"],
  ["İletişim Bilgileri", "+90 (212) 706 1076 | muhasebe@spektrotek.com"],
];

export default function BilgiToplumuHizmetleriPage() {
  return (
    <main className="bg-white text-slate-900">
      <Navbar />

      <section className="border-b border-slate-100 bg-slate-50 pb-14 pt-32 md:pb-20 md:pt-36">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">Kurumsal</p>
          <h1 className="font-heading max-w-4xl text-slate-900">Bilgi Toplumu Hizmetleri</h1>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <table className="w-full border-collapse text-left text-sm">
              <tbody>
                {rows.map(([label, value]) => (
                  <tr key={label} className="border-b border-slate-100 last:border-b-0">
                    <th className="w-1/3 bg-slate-50 px-4 py-3 font-semibold text-slate-800 md:px-6">{label}</th>
                    <td className="px-4 py-3 leading-relaxed text-slate-700 md:px-6">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

