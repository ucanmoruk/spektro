"use client";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

export default function Navbar() {
  const navItems = [
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
    { label: "Ürünlerimiz", href: "#" },
    { label: "Market", href: "/market" },
    { label: "Bilgi Merkezi", href: "#" },
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
            item.children ? (
              <div key={item.label} className="group relative">
                <Link href={item.href} className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-all duration-300 hover:bg-white hover:text-slate-900">
                  {item.label}
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
