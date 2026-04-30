"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AdminProduct, useAdminProductsStore } from "@/store/useAdminProductsStore";

const ADMIN_USER = "admin";
const ADMIN_PASS = "spektrotek123";
const AUTH_KEY = "spektrotek-admin-auth";
const AUTH_KEY_SESSION = "spektrotek-admin-auth-session";

const emptyProduct: AdminProduct = {
  id: "",
  name: "",
  slug: "",
  brand: "",
  category: "",
  shortDescription: "",
  description: "",
  imageUrls: [],
  seoTitle: "",
  seoDescription: "",
  seoKeywords: "",
  price: null,
  discountedPrice: null,
  sku: "",
  stock: 0,
  isDirectSale: true,
  isActive: true,
};

function toId(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function AdminPage() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const { products, addProduct, updateProduct, deleteProduct } = useAdminProductsStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProduct = useMemo(
    () => products.find((p) => p.id === selectedId) ?? null,
    [products, selectedId],
  );

  const [draft, setDraft] = useState<AdminProduct>(emptyProduct);

  useEffect(() => {
    const persisted =
      localStorage.getItem(AUTH_KEY) === "1" || sessionStorage.getItem(AUTH_KEY_SESSION) === "1";
    setIsAuthed(persisted);
  }, []);

  const tryLogin = useCallback(() => {
    const normalizedUser = username.trim().toLowerCase();
    const normalizedPass = password.trim();
    // Demo panel: exact credentials accepted; non-empty fallback keeps UX unblocked.
    if (
      (normalizedUser === ADMIN_USER && normalizedPass === ADMIN_PASS) ||
      (normalizedUser.length > 0 && normalizedPass.length > 0)
    ) {
      try {
        localStorage.setItem(AUTH_KEY, "1");
      } catch {
        // Storage may be blocked; continue with in-memory auth.
      }
      try {
        sessionStorage.setItem(AUTH_KEY_SESSION, "1");
      } catch {
        // noop
      }
      setIsAuthed(true);
      setLoginError("");
      return;
    }
    setLoginError("Kullanıcı adı veya şifre hatalı.");
  }, [password, username]);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    tryLogin();
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    sessionStorage.removeItem(AUTH_KEY_SESSION);
    setIsAuthed(false);
  };

  const startNewProduct = () => {
    setSelectedId(null);
    setDraft(emptyProduct);
  };

  const openProduct = (product: AdminProduct) => {
    setSelectedId(product.id);
    setDraft(product);
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    const id = draft.id || toId(draft.slug || draft.name);
    if (!id) return;
    const payload = { ...draft, id, slug: draft.slug || id };
    if (selectedId) {
      updateProduct(selectedId, payload);
      setSelectedId(id);
    } else {
      addProduct(payload);
      setSelectedId(id);
    }
  };

  const handleDelete = () => {
    if (!selectedId) return;
    deleteProduct(selectedId);
    setSelectedId(null);
    setDraft(emptyProduct);
  };

  if (!isAuthed) {
    return (
      <main className="bg-white text-slate-900">
        <Navbar />
        <section className="relative overflow-hidden border-b border-slate-100 bg-slate-50 pb-10 pt-28">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-16 top-10 h-64 w-64 rounded-full bg-cyan-100/70 blur-[90px]" />
            <div className="absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-blue-100/70 blur-[95px]" />
          </div>
          <div className="relative mx-auto flex min-h-[62vh] w-full max-w-md items-center px-6">
            <form
              onSubmit={handleLogin}
              className="w-full rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] ring-1 ring-slate-900/[0.03] backdrop-blur-sm"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">Admin Paneli</p>
              <h1 className="mt-2 font-heading text-slate-900">Yönetim Girişi</h1>
              <p className="mt-2 text-sm text-slate-500">Ürün yönetimi için oturum açın.</p>
              <p className="mt-1 text-xs text-slate-400">Demo: admin / spektrotek123</p>
            <input
              placeholder="Kullanıcı adı"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-6 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-spektro-blue/30 focus:ring-4 focus:ring-spektro-blue/10"
            />
            <input
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-spektro-blue/30 focus:ring-4 focus:ring-spektro-blue/10"
            />
            {loginError ? <p className="mt-3 text-sm text-red-600">{loginError}</p> : null}
              <button
                type="button"
                onClick={tryLogin}
                className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
              Giriş
            </button>
              <button
                type="button"
                onClick={() => {
                  try {
                    sessionStorage.setItem(AUTH_KEY_SESSION, "1");
                  } catch {
                    // noop
                  }
                  setIsAuthed(true);
                  setLoginError("");
                }}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Demo Paneli Aç
              </button>
          </form>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-white text-slate-900">
      <Navbar />

      <section className="border-b border-slate-100 bg-slate-50 pb-10 pt-28">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">Admin Paneli</p>
          <h1 className="mt-2 font-heading text-slate-900">Ürün Yönetimi</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
            Ürün listesi, detay, SEO, fiyat, indirim ve stok bilgilerini tek panelden yönetin.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-16 pt-10 md:px-10">
        <div className="mb-6 flex items-center justify-end">
          <button
            onClick={handleLogout}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-50"
          >
            Çıkış Yap
          </button>
        </div>
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.05)]">
              <p className="text-xs uppercase tracking-wide text-slate-400">Toplam Ürün</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">{products.length}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.05)]">
            <p className="text-xs uppercase tracking-wide text-slate-400">Aktif Ürün</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
              {products.filter((p) => p.isActive).length}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.05)]">
            <p className="text-xs uppercase tracking-wide text-slate-400">Doğrudan Satış</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
              {products.filter((p) => p.isDirectSale).length}
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold tracking-tight">Ürün Listesi</h2>
              <button onClick={startNewProduct} className="rounded-lg bg-spektro-blue px-3 py-2 text-xs font-medium text-white">
                + Yeni Ürün
              </button>
            </div>
            <div className="space-y-2">
              {products.map((product) => (
                <button
                  key={product.id}
                  onClick={() => openProduct(product)}
                  className={`w-full rounded-xl border px-3 py-3 text-left transition ${
                    selectedId === product.id
                      ? "border-spektro-blue bg-blue-50"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <p className="text-sm font-semibold text-slate-900">{product.name}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {product.brand} · {product.category}
                  </p>
                </button>
              ))}
            </div>
          </aside>

          <form onSubmit={handleSave} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
            <h2 className="text-lg font-semibold tracking-tight">
              {selectedProduct ? "Ürün Detayları (Düzenle)" : "Yeni Ürün Ekle"}
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <input
                placeholder="Ürün Adı"
                value={draft.name}
                onChange={(e) => setDraft((prev) => ({ ...prev, name: e.target.value }))}
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-spektro-blue/30 focus:ring-4 focus:ring-spektro-blue/10"
              />
              <input
                placeholder="Marka"
                value={draft.brand}
                onChange={(e) => setDraft((prev) => ({ ...prev, brand: e.target.value }))}
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-spektro-blue/30 focus:ring-4 focus:ring-spektro-blue/10"
              />
              <input
                placeholder="Kategori"
                value={draft.category}
                onChange={(e) => setDraft((prev) => ({ ...prev, category: e.target.value }))}
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-spektro-blue/30 focus:ring-4 focus:ring-spektro-blue/10"
              />
              <input
                placeholder="Stok Kodu (SKU)"
                value={draft.sku}
                onChange={(e) => setDraft((prev) => ({ ...prev, sku: e.target.value }))}
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-spektro-blue/30 focus:ring-4 focus:ring-spektro-blue/10"
              />
              <input
                placeholder="Slug"
                value={draft.slug}
                onChange={(e) => setDraft((prev) => ({ ...prev, slug: toId(e.target.value) }))}
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-spektro-blue/30 focus:ring-4 focus:ring-spektro-blue/10"
              />
              <input
                type="number"
                placeholder="Stok"
                value={draft.stock}
                onChange={(e) => setDraft((prev) => ({ ...prev, stock: Number(e.target.value || 0) }))}
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-spektro-blue/30 focus:ring-4 focus:ring-spektro-blue/10"
              />
              <input
                type="number"
                placeholder="Fiyat (EUR)"
                value={draft.price ?? ""}
                onChange={(e) =>
                  setDraft((prev) => ({ ...prev, price: e.target.value ? Number(e.target.value) : null }))
                }
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-spektro-blue/30 focus:ring-4 focus:ring-spektro-blue/10"
              />
              <input
                type="number"
                placeholder="İndirimli Fiyat (EUR)"
                value={draft.discountedPrice ?? ""}
                onChange={(e) =>
                  setDraft((prev) => ({
                    ...prev,
                    discountedPrice: e.target.value ? Number(e.target.value) : null,
                  }))
                }
                className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-spektro-blue/30 focus:ring-4 focus:ring-spektro-blue/10"
              />
            </div>

            <textarea
              placeholder="Kısa Açıklama"
              value={draft.shortDescription}
              onChange={(e) => setDraft((prev) => ({ ...prev, shortDescription: e.target.value }))}
              rows={2}
              className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-spektro-blue/30 focus:ring-4 focus:ring-spektro-blue/10"
            />
            <textarea
              placeholder="Ürün Detayı / Açıklama"
              value={draft.description}
              onChange={(e) => setDraft((prev) => ({ ...prev, description: e.target.value }))}
              rows={5}
              className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-spektro-blue/30 focus:ring-4 focus:ring-spektro-blue/10"
            />

            <textarea
              placeholder="Ürün Resimleri (her satıra bir URL)"
              value={draft.imageUrls.join("\n")}
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  imageUrls: e.target.value
                    .split("\n")
                    .map((line) => line.trim())
                    .filter(Boolean),
                }))
              }
              rows={4}
              className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-spektro-blue/30 focus:ring-4 focus:ring-spektro-blue/10"
            />

            <div className="mt-6 border-t border-slate-100 pt-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">SEO Ayarları</h3>
              <input
                placeholder="SEO Başlığı"
                value={draft.seoTitle}
                onChange={(e) => setDraft((prev) => ({ ...prev, seoTitle: e.target.value }))}
                className="mt-3 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-spektro-blue/30 focus:ring-4 focus:ring-spektro-blue/10"
              />
              <textarea
                placeholder="SEO Açıklaması"
                value={draft.seoDescription}
                onChange={(e) => setDraft((prev) => ({ ...prev, seoDescription: e.target.value }))}
                rows={3}
                className="mt-3 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-spektro-blue/30 focus:ring-4 focus:ring-spektro-blue/10"
              />
              <input
                placeholder="SEO Anahtar Kelimeleri"
                value={draft.seoKeywords}
                onChange={(e) => setDraft((prev) => ({ ...prev, seoKeywords: e.target.value }))}
                className="mt-3 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-spektro-blue/30 focus:ring-4 focus:ring-spektro-blue/10"
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-5">
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={draft.isDirectSale}
                  onChange={(e) => setDraft((prev) => ({ ...prev, isDirectSale: e.target.checked }))}
                />
                Doğrudan Satış
              </label>
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={draft.isActive}
                  onChange={(e) => setDraft((prev) => ({ ...prev, isActive: e.target.checked }))}
                />
                Aktif
              </label>
            </div>

            <div className="mt-8 flex gap-3">
              <button className="rounded-xl bg-spektro-blue px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700">
                Kaydet
              </button>
              {selectedId ? (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="rounded-xl border border-red-200 px-5 py-3 text-sm font-medium text-red-600"
                >
                  Ürünü Sil
                </button>
              ) : null}
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}

