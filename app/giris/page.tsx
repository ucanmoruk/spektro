"use client";

import { FormEvent, Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error ?? "Giriş başarısız.");
        return;
      }
      router.push(next || (data.user.role === "admin" ? "/admin" : "/hesabim"));
      router.refresh();
    } catch {
      setError("Bağlantı hatası.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-1 items-center bg-slate-50 px-6 pb-16 pt-32">
        <form
          onSubmit={submit}
          className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">
            Üyelik
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">Giriş Yap</h1>
          <p className="mt-1 text-sm text-slate-500">
            Siparişlerinizi takip etmek için hesabınıza giriş yapın.
          </p>

          <label className="mt-6 block text-sm font-medium text-slate-700">E-posta</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-spektro-blue/30 focus:ring-4 focus:ring-spektro-blue/10"
          />

          <label className="mt-4 block text-sm font-medium text-slate-700">Şifre</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-spektro-blue/30 focus:ring-4 focus:ring-spektro-blue/10"
          />

          {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-spektro-blue px-4 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>

          <p className="mt-5 text-center text-sm text-slate-500">
            Hesabınız yok mu?{" "}
            <Link href="/kayit" className="font-medium text-spektro-blue hover:underline">
              Kayıt olun
            </Link>
          </p>
        </form>
    </section>
  );
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900">
      <Navbar />
      <Suspense fallback={<div className="flex-1 bg-slate-50" />}>
        <LoginForm />
      </Suspense>
      <Footer />
    </main>
  );
}
