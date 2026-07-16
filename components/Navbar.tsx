"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, LogOut, Menu, Package, ShoppingCart, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/useCartStore";

type MenuLink = { label: string; href: string };
type MegaLink = { label: string; href?: string };
type MegaSection = { title: string; links: MegaLink[] };
type MegaColumn = { title: string; links?: MegaLink[]; sections?: MegaSection[] };
type NavItem = {
  label: string;
  href: string;
  children?: MenuLink[];
  megaColumns?: MegaColumn[];
};

function MegaMenuLink({ link }: { link: MegaLink }) {
  if (!link.href) {
    return (
      <span className="block rounded-lg px-2 py-2 text-sm font-medium text-slate-500">
        {link.label}
      </span>
    );
  }

  return (
    <Link href={link.href} className="block rounded-lg px-2 py-2 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-slate-900">
      {link.label}
    </Link>
  );
}

function MegaMenuColumn({ column }: { column: MegaColumn }) {
  return (
    <div className="flex min-h-[360px] flex-col rounded-xl border border-slate-100 bg-slate-50/60 p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">{column.title}</p>
      {column.links ? (
        <div className="grid gap-1">
          {column.links.map((link) => (
            <MegaMenuLink key={link.label} link={link} />
          ))}
        </div>
      ) : null}
      {column.sections ? (
        <div className="grid gap-3">
          {column.sections.map((section) => (
            <div key={section.title} className="rounded-lg border border-white bg-white/75 p-2.5 shadow-sm">
              <p className="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-wide text-spektro-blue">
                {section.title}
              </p>
              <div className="grid gap-0.5">
                {section.links.map((link) => (
                  <MegaMenuLink key={link.label} link={link} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

type MeState = { loggedIn: boolean; role?: string; fullName?: string };

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [me, setMe] = useState<MeState>({ loggedIn: false });
  const cartCount = useCartStore((s) => s.totalCount());

  useEffect(() => {
    let active = true;
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (active && d.user) {
          setMe({ loggedIn: true, role: d.user.role, fullName: d.user.fullName });
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setMe({ loggedIn: false });
    window.location.href = "/";
  };

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
            { label: "(U)HPLC" },
            { label: "FPLC / BioLC" },
            { label: "Preparatif HPLC", href: "/preparatif-hplc" },
            { label: "GPC / SEC", href: "/gpc-sec-sistemleri" },
            { label: "SMB" },
            { label: "Dosing Pumps" },
            { label: "Ozmometre", href: "/ozmometre" },
            { label: "Kompakt Kütle Spektrometre CMS" },
            { label: "Benchtop NMR", href: "/benchtop-nmr" },
            { label: "Online SPE Sistemi" },
            { label: "Peptid Sentez Sistemi" },
          ],
        },
        {
          title: "Temel Laboratuvar Cihazları",
          links: [
            { label: "Analitik / Hassas Terazi" },
            { label: "Nem Tayin Cihazı" },
            { label: "Dosing Pump" },
            { label: "Gaz Jeneratörü" },
            { label: "Vakum Pompası" },
            { label: "Santrifüj" },
            { label: "pH Metre / İletkenlik Ölçer" },
            { label: "Manyetik Karıştırıcı ve Isıtıcı" },
            { label: "Ultra Saf Su" },
            { label: "Mantolu Isıtıcı" },
            { label: "Vorteks Karıştırıcı" },
            { label: "Mekanik Karıştırıcı" },
            { label: "Titratör" },
            { label: "Kuru Blok Isıtıcı" },
            { label: "Etüv & İnkübatör" },
          ],
        },
        {
          title: "Sarf Malzemeler",
          links: [
            { label: "Kromatografi Vial Çeşitleri" },
            { label: "Vial Septa ve Kapakları" },
            { label: "Şırınga Ucu Filtreler" },
            { label: "Quechers Kitleri" },
            { label: "Spektrofotometre Küvetleri" },
            { label: "Pipet / Pipet Ucu" },
            { label: "Filtrasyon Düzenekleri" },
            { label: "SPE Katı Faz Ekstraksiyon" },
            { label: "Membran Filtre" },
            { label: "GC Kolonları" },
          ],
        },
        {
          title: "HPLC Kolonları",
          links: [
            { label: "HPLC Kolonları", href: "/hplc-kolonlari" },
            { label: "SIELC Kolonları", href: "/sielc/analitik-kolonlar" },
            { label: "Silica jel bazlı HPLC kolonları" },
            { label: "Kiral HPLC Kolonları" },
            { label: "Ion exclusion and ligand exchange columns" },
            { label: "Analitik geniş gözenekli HPLC kolonları" },
            { label: "FPLC Kolonları" },
            { label: "Preparatif HPLC Kolonları" },
            { label: "GPC/SEC Kolonları" },
          ],
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
                <div className="invisible absolute left-1/2 top-full z-20 mt-2 w-[1040px] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-4 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="grid gap-3 md:grid-cols-4">
                    {item.megaColumns.map((col) => (
                      <MegaMenuColumn key={col.title} column={col} />
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
                    <MegaMenuLink key={child.label} link={child} />
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
        <div className="flex items-center gap-2">
          {/* Sepet */}
          <Link
            href="/sepet"
            aria-label="Sepet"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-spektro-blue px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            ) : null}
          </Link>

          {/* Hesap */}
          {me.loggedIn ? (
            <div className="relative hidden md:block">
              <button
                onClick={() => setAccountOpen((v) => !v)}
                aria-label="Hesabım"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                <User className="h-4 w-4" />
                <span className="max-w-28 truncate">{me.fullName?.split(" ")[0] ?? "Hesabım"}</span>
                <ChevronDown className={`h-3.5 w-3.5 transition ${accountOpen ? "rotate-180" : ""}`} />
              </button>
              {accountOpen ? (
                <>
                  <button
                    aria-hidden
                    tabIndex={-1}
                    onClick={() => setAccountOpen(false)}
                    className="fixed inset-0 z-20 cursor-default"
                  />
                  <div className="absolute right-0 top-full z-30 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
                    {me.role === "admin" ? (
                      <Link href="/admin" onClick={() => setAccountOpen(false)} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                        <Package className="h-4 w-4" /> Admin Paneli
                      </Link>
                    ) : (
                      <>
                        <Link href="/hesabim" onClick={() => setAccountOpen(false)} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                          <User className="h-4 w-4" /> Hesabım
                        </Link>
                        <Link href="/hesabim#siparislerim" onClick={() => setAccountOpen(false)} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                          <Package className="h-4 w-4" /> Siparişlerim
                        </Link>
                      </>
                    )}
                    <button onClick={logout} className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
                      <LogOut className="h-4 w-4" /> Çıkış Yap
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          ) : (
            <Link
              href="/giris"
              aria-label="Giriş Yap"
              title="Giriş Yap"
              className="hidden h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-700 md:inline-flex"
            >
              <User className="h-5 w-5" />
            </Link>
          )}

          <button
            aria-label="Menüyü aç"
            onClick={() => setMobileOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-100 xl:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
      {mobileOpen ? (
        <div className="absolute left-0 top-20 z-40 max-h-[80vh] w-full overflow-y-auto border-b border-slate-200 bg-white px-6 py-4 shadow-lg xl:hidden">
          <div className="grid gap-1.5">
            {navItems.map((item) => {
              const cols = item.megaColumns;
              const children = item.children;
              if (!cols && !children) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950"
                  >
                    {item.label}
                  </Link>
                );
              }
              return (
                <details key={item.label} className="group rounded-xl">
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 [&::-webkit-details-marker]:hidden">
                    {item.label}
                    <ChevronDown className="h-4 w-4 text-slate-400 transition group-open:rotate-180" />
                  </summary>
                  <div className="mb-1 ml-3 mt-1 space-y-0.5 border-l border-slate-100 pl-2">
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-3 py-1.5 text-sm font-medium text-spektro-blue hover:bg-slate-50"
                    >
                      Tümü
                    </Link>
                    {cols
                      ? cols.map((col) => (
                          <div key={col.title}>
                            <p className="px-3 pt-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                              {col.title}
                            </p>
                            {(col.links ?? []).map((link) =>
                              link.href ? (
                                <Link
                                  key={link.label}
                                  href={link.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="block rounded-lg px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                >
                                  {link.label}
                                </Link>
                              ) : (
                                <span key={link.label} className="block px-3 py-1.5 text-sm text-slate-400">
                                  {link.label}
                                </span>
                              ),
                            )}
                          </div>
                        ))
                      : children!.map((link) => (
                          <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="block rounded-lg px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                          >
                            {link.label}
                          </Link>
                        ))}
                  </div>
                </details>
              );
            })}
            <Link
              href="/sepet"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700"
            >
              <span className="inline-flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" /> Sepetim
              </span>
              {cartCount > 0 ? (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-spektro-blue px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              ) : null}
            </Link>
            {me.loggedIn ? (
              <>
                <Link
                  href={me.role === "admin" ? "/admin" : "/hesabim"}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700"
                >
                  {me.role === "admin" ? "Admin Paneli" : "Hesabım"}
                </Link>
                <button
                  onClick={logout}
                  className="rounded-xl px-3 py-2 text-left text-sm font-medium text-red-600"
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <Link
                href="/giris"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white"
              >
                Giriş Yap
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
