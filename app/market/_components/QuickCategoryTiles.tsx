import Link from "next/link";
import { ArrowRight, Beaker, Columns3, FlaskConical } from "lucide-react";

const quickCategories = [
  {
    title: "Sıvı Kromatografi Sistemleri",
    description: "HPLC, UHPLC, FPLC ve preparatif sistem çözümleri",
    href: "/market?kategori=hplc#urun-listesi",
    icon: FlaskConical,
    tone: "bg-slate-950 text-white",
  },
  {
    title: "HPLC Kolonları",
    description: "Analitik kolonlar, guard kolonlar ve kromatografi sarfları",
    href: "/market?kategori=hplc-kolonu#urun-listesi",
    icon: Columns3,
    tone: "bg-spektro-blue text-white",
  },
  {
    title: "Sistemler",
    description: "Laboratuvar cihazları ve komple analiz sistemleri",
    href: "/market?kategori=sistemler#urun-listesi",
    icon: Beaker,
    tone: "bg-emerald-700 text-white",
  },
];

export function QuickCategoryTiles() {
  return (
    <section className="bg-white pb-4">
      <div className="mx-auto grid w-full max-w-7xl gap-4 px-6 md:px-10 lg:grid-cols-3">
        {quickCategories.map(({ title, description, href, icon: Icon, tone }) => (
          <Link
            key={title}
            href={href}
            className={`group relative overflow-hidden rounded-2xl p-5 shadow-[0_14px_40px_rgba(15,23,42,0.10)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(15,23,42,0.14)] ${tone}`}
          >
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10" />
            <div className="relative flex items-start justify-between gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                <Icon className="h-5 w-5" />
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 opacity-70 transition group-hover:translate-x-1 group-hover:opacity-100" />
            </div>
            <h3 className="relative mt-5 text-lg font-semibold tracking-tight">{title}</h3>
            <p className="relative mt-2 text-sm leading-relaxed text-white/75">{description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
