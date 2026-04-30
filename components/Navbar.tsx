"use client";
import Image from "next/image";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 flex h-20 w-full items-center border-b border-emerald-100/80 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 md:px-10">
        <Image
          src="/brand/spektrotek-logo.svg"
          alt="Spektrotek"
          width={210}
          height={52}
          className="h-10 w-auto object-contain"
          priority
        />
        <div className="hidden items-center gap-1 rounded-full bg-emerald-50/70 p-1.5 xl:flex">
          {["Anasayfa", "Kurumsal", "Hizmetlerimiz", "Ürünlerimiz", "Market", "Haberler", "İletişim"].map((item) => (
            <a key={item} href="#" className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-all duration-300 hover:bg-white hover:text-slate-900">
              {item}
            </a>
          ))}
        </div>
        <button className="hidden rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-700 md:inline-flex">
          Birlikte Çalışalım
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
