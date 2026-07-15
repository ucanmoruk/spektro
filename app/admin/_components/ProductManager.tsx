"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, ExternalLink, Plus, Trash2, Upload, X } from "lucide-react";
import type { Brand, Category, Product } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { slugify } from "@/lib/slug";
import { ProductThumb } from "../../market/_components/ProductThumb";
import { RichTextEditor } from "./RichTextEditor";

type SpecRow = { label: string; value: string; slug: string };

type Draft = {
  id: number | null;
  name: string;
  slug: string;
  sku: string;
  brandId: string;
  categoryId: string;
  shortDescription: string;
  description: string;
  shippingInfo: string;
  specs: SpecRow[];
  price: string;
  discountedPrice: string;
  currency: string;
  stock: string;
  isDirectSale: boolean;
  isActive: boolean;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  imageUrls: string;
  newBrand: string;
  newCategory: string;
};

const emptyDraft: Draft = {
  id: null,
  name: "",
  slug: "",
  sku: "",
  brandId: "",
  categoryId: "",
  shortDescription: "",
  description: "",
  shippingInfo: "",
  specs: [],
  price: "",
  discountedPrice: "",
  currency: "EUR",
  stock: "0",
  isDirectSale: true,
  isActive: true,
  seoTitle: "",
  seoDescription: "",
  seoKeywords: "",
  imageUrls: "",
  newBrand: "",
  newCategory: "",
};

function toDraft(p: Product): Draft {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    sku: p.sku ?? "",
    brandId: p.brandId ? String(p.brandId) : "",
    categoryId: p.categoryId ? String(p.categoryId) : "",
    shortDescription: p.shortDescription ?? "",
    description: p.description ?? "",
    shippingInfo: p.shippingInfo ?? "",
    specs: p.specs.map((s) => ({ label: s.label, value: s.value, slug: s.slug })),
    price: p.price !== null ? String(p.price) : "",
    discountedPrice: p.discountedPrice !== null ? String(p.discountedPrice) : "",
    currency: p.currency,
    stock: String(p.stock),
    isDirectSale: p.isDirectSale,
    isActive: p.isActive,
    seoTitle: p.seoTitle ?? "",
    seoDescription: p.seoDescription ?? "",
    seoKeywords: p.seoKeywords ?? "",
    imageUrls: p.images.map((i) => i.url).join("\n"),
    newBrand: "",
    newCategory: "",
  };
}

export function ProductManager({
  products,
  brands,
  categories,
}: {
  products: Product[];
  brands: Brand[];
  categories: Category[];
}) {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [uploading, setUploading] = useState(false);

  const upd = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setSuccess("");
    setDraft((d) => ({ ...d, [key]: value }));
  };

  // --- Teknik özellik satırları ---
  const addSpec = () =>
    setDraft((d) => ({ ...d, specs: [...d.specs, { label: "", value: "", slug: "" }] }));
  const updSpec = (idx: number, field: "label" | "value", val: string) =>
    setDraft((d) => ({
      ...d,
      specs: d.specs.map((s, i) =>
        i === idx
          ? { ...s, [field]: val, slug: field === "label" ? slugify(val) : s.slug }
          : s,
      ),
    }));
  const removeSpec = (idx: number) =>
    setDraft((d) => ({ ...d, specs: d.specs.filter((_, i) => i !== idx) }));

  const imageList = draft.imageUrls.split("\n").map((s) => s.trim()).filter(Boolean);

  const setImageList = (urls: string[]) => upd("imageUrls", urls.join("\n"));

  const removeImage = (idx: number) =>
    setImageList(imageList.filter((_, i) => i !== idx));

  const uploadFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError("");
    const added: string[] = [];
    try {
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (!data.ok) {
          setError(data.error ?? "Görsel yüklenemedi.");
          continue;
        }
        added.push(data.url);
      }
      if (added.length) setImageList([...imageList, ...added]);
    } finally {
      setUploading(false);
    }
  };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);
    const isUpdate = !!draft.id;
    const body = {
      name: draft.name,
      slug: draft.slug || slugify(draft.name),
      sku: draft.sku,
      brandId: draft.brandId || null,
      categoryId: draft.categoryId || null,
      newBrand: draft.newBrand.trim() || null,
      newCategory: draft.newCategory.trim() || null,
      shortDescription: draft.shortDescription,
      description: draft.description,
      shippingInfo: draft.shippingInfo,
      specs: draft.specs
        .map((s) => ({ label: s.label.trim(), value: s.value.trim(), slug: s.slug }))
        .filter((s) => s.label && s.value),
      price: draft.price,
      discountedPrice: draft.discountedPrice,
      currency: draft.currency,
      stock: draft.stock,
      isDirectSale: draft.isDirectSale,
      isActive: draft.isActive,
      seoTitle: draft.seoTitle,
      seoDescription: draft.seoDescription,
      seoKeywords: draft.seoKeywords,
      imageUrls: draft.imageUrls.split("\n").map((s) => s.trim()).filter(Boolean),
    };
    try {
      const url = isUpdate ? `/api/admin/products/${draft.id}` : "/api/admin/products";
      const res = await fetch(url, {
        method: isUpdate ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error ?? "Kaydedilemedi.");
        return;
      }
      // Formu koru: güncellemede aynı ürün açık kalsın; yeni üründe id'yi ata ki
      // "düzenle" moduna geçsin. Boş sayfa/reset yok.
      if (!isUpdate && data.id) {
        setDraft((d) => ({ ...d, id: data.id, newBrand: "", newCategory: "" }));
      } else {
        setDraft((d) => ({ ...d, newBrand: "", newCategory: "" }));
      }
      setSuccess(isUpdate ? "Ürün güncellendi." : "Ürün eklendi.");
      router.refresh();
    } catch {
      setError("Bağlantı hatası.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!draft.id) return;
    if (!confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/products/${draft.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error ?? "Silinemedi.");
        return;
      }
      setDraft(emptyDraft);
      router.refresh();
    } finally {
      setSaving(false);
    }
  };

  const input =
    "w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-spektro-blue/30 focus:ring-4 focus:ring-spektro-blue/10";

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <aside className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold tracking-tight">Ürünler ({products.length})</h2>
          <button
            onClick={() => setDraft(emptyDraft)}
            className="inline-flex items-center gap-1 rounded-lg bg-spektro-blue px-3 py-1.5 text-xs font-medium text-white"
          >
            <Plus className="h-3.5 w-3.5" /> Yeni
          </button>
        </div>
        <div className="max-h-[560px] space-y-2 overflow-y-auto pr-1">
          {products.map((p) => (
            <button
              key={p.id}
              onClick={() => setDraft(toDraft(p))}
              className={`w-full rounded-xl border px-3 py-2.5 text-left transition ${
                draft.id === p.id
                  ? "border-spektro-blue bg-blue-50"
                  : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-semibold text-slate-900">{p.name}</p>
                {!p.isActive ? (
                  <span className="shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500">
                    Pasif
                  </span>
                ) : null}
              </div>
              <p className="mt-0.5 truncate text-xs text-slate-500">
                {p.brandName ?? "—"} · {p.isDirectSale ? formatPrice(p.price, p.currency) : "Teklif"}
              </p>
            </button>
          ))}
        </div>
      </aside>

      <form onSubmit={save} className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-base font-semibold tracking-tight">
          {draft.id ? "Ürünü Düzenle" : "Yeni Ürün"}
        </h2>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <Field label="Ürün Adı *">
            <input required value={draft.name} onChange={(e) => upd("name", e.target.value)} className={input} />
          </Field>
          <Field label="Slug (boş bırakılırsa otomatik)">
            <input value={draft.slug} onChange={(e) => upd("slug", slugify(e.target.value))} className={input} />
          </Field>
          <Field label="Marka">
            <select
              value={draft.brandId}
              onChange={(e) => upd("brandId", e.target.value)}
              disabled={!!draft.newBrand.trim()}
              className={`${input} disabled:bg-slate-50 disabled:text-slate-400`}
            >
              <option value="">— Seçiniz —</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
            <input
              value={draft.newBrand}
              onChange={(e) => upd("newBrand", e.target.value)}
              placeholder="+ Yeni marka ekle"
              className={`mt-1.5 ${input}`}
            />
          </Field>
          <Field label="Kategori">
            <select
              value={draft.categoryId}
              onChange={(e) => upd("categoryId", e.target.value)}
              disabled={!!draft.newCategory.trim()}
              className={`${input} disabled:bg-slate-50 disabled:text-slate-400`}
            >
              <option value="">— Seçiniz —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <input
              value={draft.newCategory}
              onChange={(e) => upd("newCategory", e.target.value)}
              placeholder="+ Yeni kategori ekle"
              className={`mt-1.5 ${input}`}
            />
          </Field>
          <Field label="SKU">
            <input value={draft.sku} onChange={(e) => upd("sku", e.target.value)} className={input} />
          </Field>
          <Field label="Stok">
            <input type="number" value={draft.stock} onChange={(e) => upd("stock", e.target.value)} className={input} />
          </Field>
          <Field label="Fiyat">
            <input type="number" step="0.01" value={draft.price} onChange={(e) => upd("price", e.target.value)} className={input} />
          </Field>
          <Field label="İndirimli Fiyat">
            <input type="number" step="0.01" value={draft.discountedPrice} onChange={(e) => upd("discountedPrice", e.target.value)} className={input} />
          </Field>
          <Field label="Para Birimi">
            <select value={draft.currency} onChange={(e) => upd("currency", e.target.value)} className={input}>
              <option value="EUR">EUR (€)</option>
              <option value="USD">USD ($)</option>
              <option value="TRY">TRY (₺)</option>
            </select>
          </Field>
        </div>

        <Field label="Kısa Açıklama" className="mt-3">
          <textarea rows={2} value={draft.shortDescription} onChange={(e) => upd("shortDescription", e.target.value)} className={input} />
        </Field>

        <div className="mt-3">
          <span className="mb-1 block text-xs font-medium text-slate-600">Ürün Açıklaması</span>
          <RichTextEditor value={draft.description} onChange={(html) => upd("description", html)} />
        </div>

        {/* Teknik Detaylar (parametreli) */}
        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-600">Teknik Detaylar</span>
            <button
              type="button"
              onClick={addSpec}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
            >
              <Plus className="h-3.5 w-3.5" /> Satır Ekle
            </button>
          </div>
          {draft.specs.length === 0 ? (
            <p className="rounded-lg border border-dashed border-slate-200 px-3 py-2 text-xs text-slate-400">
              Henüz teknik özellik yok. Örn: &quot;Akış Hızı&quot; → &quot;0,01–10 mL/dk&quot;.
            </p>
          ) : (
            <div className="space-y-2">
              {draft.specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex-1">
                    <input
                      value={spec.label}
                      onChange={(e) => updSpec(i, "label", e.target.value)}
                      placeholder="Özellik (ör. Akış Hızı)"
                      className={input}
                    />
                    {spec.slug ? (
                      <span className="mt-0.5 block text-[10px] text-slate-400">slug: {spec.slug}</span>
                    ) : null}
                  </div>
                  <input
                    value={spec.value}
                    onChange={(e) => updSpec(i, "value", e.target.value)}
                    placeholder="Değer (ör. 0,01–10 mL/dk)"
                    className={`flex-1 ${input}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeSpec(i)}
                    className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                    aria-label="Satırı sil"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Field label="Stok ve Kargo Bilgisi" className="mt-4">
          <textarea
            rows={3}
            value={draft.shippingInfo}
            onChange={(e) => upd("shippingInfo", e.target.value)}
            placeholder="Örn: Stoktan 2 iş günü içinde kargolanır. Kargo ücreti alıcıya aittir."
            className={input}
          />
        </Field>
        <div className="mt-3">
          <span className="mb-1 block text-xs font-medium text-slate-600">Ürün Görselleri</span>

          {imageList.length > 0 ? (
            <div className="mb-3 grid grid-cols-4 gap-2 sm:grid-cols-6">
              {imageList.map((url, i) => (
                <div key={`${url}-${i}`} className="group relative">
                  <ProductThumb
                    src={url}
                    alt={`Görsel ${i + 1}`}
                    className="aspect-square w-full rounded-lg border border-slate-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute -right-1.5 -top-1.5 rounded-full bg-red-500 p-0.5 text-white opacity-0 transition group-hover:opacity-100"
                    aria-label="Görseli kaldır"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          ) : null}

          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:border-spektro-blue/40 hover:bg-slate-50">
            <Upload className="h-4 w-4" />
            {uploading ? "Yükleniyor..." : "Görsel Yükle"}
            <input
              type="file"
              accept="image/*"
              multiple
              disabled={uploading}
              onChange={(e) => {
                uploadFiles(e.target.files);
                e.target.value = "";
              }}
              className="hidden"
            />
          </label>

          <details className="mt-2">
            <summary className="cursor-pointer text-xs text-slate-400">
              Veya URL ile ekle (her satıra bir adet)
            </summary>
            <textarea
              rows={3}
              value={draft.imageUrls}
              onChange={(e) => upd("imageUrls", e.target.value)}
              className={`mt-2 ${input}`}
              placeholder="https://..."
            />
          </details>
        </div>

        <div className="mt-4 border-t border-slate-100 pt-4">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">SEO</h3>
          <div className="mt-2 space-y-3">
            <input placeholder="SEO Başlığı" value={draft.seoTitle} onChange={(e) => upd("seoTitle", e.target.value)} className={input} />
            <textarea placeholder="SEO Açıklaması" rows={2} value={draft.seoDescription} onChange={(e) => upd("seoDescription", e.target.value)} className={input} />
            <input placeholder="SEO Anahtar Kelimeler (virgülle)" value={draft.seoKeywords} onChange={(e) => upd("seoKeywords", e.target.value)} className={input} />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-5">
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={draft.isDirectSale} onChange={(e) => upd("isDirectSale", e.target.checked)} />
            Doğrudan Satış (kapalıysa &quot;Teklif İste&quot;)
          </label>
          <label className="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" checked={draft.isActive} onChange={(e) => upd("isActive", e.target.checked)} />
            Aktif (vitrinde görünür)
          </label>
        </div>

        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
        {success ? (
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <p className="flex items-center gap-2 text-sm text-emerald-600">
              <CheckCircle2 className="h-4 w-4" /> {success}
            </p>
            {draft.id && draft.slug ? (
              <Link
                href={`/market/${draft.slug}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Ürünü Görüntüle
              </Link>
            ) : null}
          </div>
        ) : null}

        <div className="mt-6 flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-spektro-blue px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {saving ? "Kaydediliyor..." : draft.id ? "Güncelle" : "Ekle"}
          </button>
          {draft.id && draft.slug ? (
            <Link
              href={`/market/${draft.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <ExternalLink className="h-4 w-4" /> Görüntüle
            </Link>
          ) : null}
          {draft.id ? (
            <button
              type="button"
              onClick={() => {
                setDraft(emptyDraft);
                setSuccess("");
              }}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              + Yeni Ürün
            </button>
          ) : null}
          {draft.id ? (
            <button
              type="button"
              onClick={remove}
              disabled={saving}
              className="rounded-xl border border-red-200 px-5 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              Sil
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-medium text-slate-600">{label}</span>
      {children}
    </label>
  );
}
