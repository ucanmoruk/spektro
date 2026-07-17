"use client";

import { FormEvent, useState } from "react";
import type { User } from "@/lib/types";

type FormState = {
  fullName: string;
  phone: string;
  invoiceType: "individual" | "corporate";
  company: string;
  taxOffice: string;
  taxNumber: string;
  address: string;
  city: string;
  district: string;
};

function initialState(user: User): FormState {
  return {
    fullName: user.fullName,
    phone: user.phone ?? "",
    invoiceType: user.invoiceType ?? "individual",
    company: user.company ?? "",
    taxOffice: user.taxOffice ?? "",
    taxNumber: user.taxNumber ?? "",
    address: user.address ?? "",
    city: user.city ?? "",
    district: user.district ?? "",
  };
}

export function AccountProfileForm({ user }: { user: User }) {
  const [form, setForm] = useState<FormState>(() => initialState(user));
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const set = (key: keyof FormState) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((current) => ({ ...current, [key]: event.target.value }));

  const save = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const res = await fetch("/api/account/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error ?? "Bilgiler güncellenemedi.");
        return;
      }
      setMessage("Bilgileriniz güncellendi.");
    } catch {
      setError("Bağlantı hatası.");
    } finally {
      setSaving(false);
    }
  };

  const inputCls =
    "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-spektro-blue/30 focus:ring-4 focus:ring-spektro-blue/10";

  return (
    <form onSubmit={save} className="mb-10 rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">Hesap Bilgileri</h2>
          <p className="mt-1 text-sm text-slate-500">
            Bu bilgiler sepet ve teklif formlarına otomatik aktarılır.
          </p>
        </div>
        <button
          disabled={saving}
          className="rounded-xl bg-spektro-blue px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "Kaydediliyor..." : "Bilgileri Kaydet"}
        </button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="text-sm font-medium text-slate-700">
          Ad Soyad
          <input required value={form.fullName} onChange={set("fullName")} className={`${inputCls} mt-2`} />
        </label>
        <label className="text-sm font-medium text-slate-700">
          E-posta
          <input disabled value={user.email} className={`${inputCls} mt-2 bg-slate-50 text-slate-500`} />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Telefon
          <input value={form.phone} onChange={set("phone")} className={`${inputCls} mt-2`} />
        </label>
        <div>
          <p className="text-sm font-medium text-slate-700">Fatura Tipi</p>
          <div className="mt-2 grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
            {[
              ["individual", "Bireysel"],
              ["corporate", "Kurumsal"],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() =>
                  setForm((current) => ({
                    ...current,
                    invoiceType: value as FormState["invoiceType"],
                  }))
                }
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  form.invoiceType === value ? "bg-white text-slate-950 shadow-sm" : "text-slate-500"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <label className="text-sm font-medium text-slate-700 md:col-span-3">
          Adres
          <textarea rows={3} value={form.address} onChange={set("address")} className={`${inputCls} mt-2`} />
        </label>
        <label className="text-sm font-medium text-slate-700">
          İl
          <input value={form.city} onChange={set("city")} className={`${inputCls} mt-2`} />
        </label>
        <label className="text-sm font-medium text-slate-700">
          İlçe
          <input value={form.district} onChange={set("district")} className={`${inputCls} mt-2`} />
        </label>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <label className="text-sm font-medium text-slate-700">
          Firma / Unvan
          <input value={form.company} onChange={set("company")} className={`${inputCls} mt-2`} />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Vergi Dairesi
          <input value={form.taxOffice} onChange={set("taxOffice")} className={`${inputCls} mt-2`} />
        </label>
        <label className="text-sm font-medium text-slate-700">
          Vergi / T.C. No
          <input value={form.taxNumber} onChange={set("taxNumber")} className={`${inputCls} mt-2`} />
        </label>
      </div>

      {message ? <p className="mt-4 text-sm font-medium text-emerald-700">{message}</p> : null}
      {error ? <p className="mt-4 text-sm font-medium text-red-600">{error}</p> : null}
    </form>
  );
}
