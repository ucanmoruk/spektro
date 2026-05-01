"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";

type NavLink = { label: string; href: string };
type MegaColumn = { title: string; links: NavLink[] };
type NavItem = {
  label: string;
  href: string;
  children?: NavLink[];
  megaColumns?: MegaColumn[];
};

function MegaMenuLink({ link }: { link: NavLink }) {
  if (link.href === "#") {
    return (
      <span className="block cursor-not-allowed rounded-lg px-2 py-2 text-sm font-medium text-slate-400">{link.label}</span>
    );
  }
  return (
    <Link href={link.href} className="block rounded-lg px-2 py-2 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-slate-900">
      {link.label}
    </Link>
  );
}

export default function Navbar() {
  const navItems: NavItem[] = [
    { label: "Anasayfa", href: "/" },
    {
      label: "Kurumsal",
      href: "/hakkimizda",
      children: [
        { label: "Hakkımızda", href: "/hakkimizda" },
        { label: "Misyon & Vizyon", href: "/misyon-vizyon" },
        { label: "Kalite Politikamız", href: "/kalite-politikamiz" },
        { label: "Bilgi Toplumu Hizmetleri", href: "/bilgi-toplumu-hizmetleri" },
      ],
    },
    { label: "Hizmetlerimiz", href: "/hizmetlerimiz" },
    {
      label: "Ürünlerimiz",
      href: "/analitik-hplc",
      megaColumns: [
        {
          title: "Analitik Cihazlar",
          links: [
            { label: "Analitik HPLC", href: "/analitik-hplc" },
            { label: "Benchtop NMR", href: "/benchtop-nmr" },
            { label: "Ozmometre", href: "/ozmometre" },
            { label: "Preparatif HPLC", href: "/preparatif-hplc" },
          ],
        },
        {
          title: "Temel Cihazlar",
          links: [{ label: "Yakında eklenecek", href: "#" }],
        },
        {
          title: "Sarf Malzemeler",
          links: [{ label: "Yakında eklenecek", href: "#" }],
        },
      ],
    },
    { label: "Market", href: "/market" },
    { label: "Bilgi Merkezi", href: "/#bilgi-merkezi" },
    { label: "İletişim", href: "/iletisim" },
  ];

  return (
    <nav className="fixed top-0 z-50 flex h-20 w-full items-center border-b border-emerald-100/80 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 md:px-10">
        <Link href="/" className="shrink-0">
          <Image
            src="/brand/spektrotek-logo.svg"
            alt="Spektrotek"
            width={408}
            height={94}
            className="h-7 w-auto object-contain sm:h-8"
            priority
          />
        </Link>
        <div className="hidden items-center gap-1 rounded-full bg-emerald-50/70 p-1.5 xl:flex">
          {navItems.map((item) =>
            item.megaColumns ? (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-all duration-300 hover:bg-white hover:text-slate-900"
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute left-1/2 top-full z-20 mt-2 w-[760px] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-4 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="grid gap-3 md:grid-cols-3">
                    {item.megaColumns.map((col) => (
                      <div key={col.title} className="rounded-xl border border-slate-100 bg-slate-50/50 p-3">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">{col.title}</p>
                        <div className="space-y-1">
                          {col.links.map((link) => (
                            <MegaMenuLink key={link.label} link={link} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : item.children ? (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-all duration-300 hover:bg-white hover:text-slate-900"
                >
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute left-0 top-full z-20 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  {item.children.map((child) => (
                    <Link key={child.label} href={child.href} className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={item.label} href={item.href} className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-all duration-300 hover:bg-white hover:text-slate-900">
                {item.label}
              </Link>
            ),
          )}
        </div>
        <button className="hidden rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-700 md:inline-flex">
          Giriş Yap
        </button>
        <button
          aria-label="Menüyü aç"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 xl:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </nav>
  );
}
