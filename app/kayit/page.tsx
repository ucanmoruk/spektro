"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error ?? "Kayıt başarısız.");
        return;
      }
      router.push("/hesabim");
      router.refresh();
    } catch {
      setError("Bağlantı hatası.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-spektro-blue/30 focus:ring-4 focus:ring-spektro-blue/10";

  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900">
      <Navbar />
      <section className="flex flex-1 items-center bg-slate-50 px-6 pb-16 pt-32">
        <form
          onSubmit={submit}
          className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">Üyelik</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Hesap Oluştur</h1>
          <p className="mt-1 text-sm text-slate-500">
            Sipariş ve tekliflerinizi tek panelden yönetin.
          </p>

          <label className="mt-6 block text-sm font-medium text-slate-700">Ad Soyad</label>
          <input required value={form.fullName} onChange={set("fullName")} className={inputCls} />

          <label className="mt-4 block text-sm font-medium text-slate-700">E-posta</label>
          <input type="email" required value={form.email} onChange={set("email")} className={inputCls} />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mt-4 block text-sm font-medium text-slate-700">Telefon</label>
              <input value={form.phone} onChange={set("phone")} className={inputCls} />
            </div>
            <div>
              <label className="mt-4 block text-sm font-medium text-slate-700">Firma</label>
              <input value={form.company} onChange={set("company")} className={inputCls} />
            </div>
          </div>

          <label className="mt-4 block text-sm font-medium text-slate-700">Şifre</label>
          <input
            type="password"
            required
            minLength={8}
            value={form.password}
            onChange={set("password")}
            className={inputCls}
          />
          <p className="mt-1 text-xs text-slate-400">En az 8 karakter.</p>

          {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-spektro-blue px-4 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Oluşturuluyor..." : "Hesap Oluştur"}
          </button>

          <p className="mt-5 text-center text-sm text-slate-500">
            Zaten hesabınız var mı?{" "}
            <Link href="/giris" className="font-medium text-spektro-blue hover:underline">
              Giriş yapın
            </Link>
          </p>
        </form>
      </section>
      <Footer />
    </main>
  );
}
