"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2 } from "lucide-react";

export function PasswordChange() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setDone(false);
    if (next !== confirm) {
      setError("Yeni şifreler eşleşmiyor.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/account/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: current, newPassword: next }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error ?? "Şifre değiştirilemedi.");
        return;
      }
      setDone(true);
      setCurrent("");
      setNext("");
      setConfirm("");
    } catch {
      setError("Bağlantı hatası.");
    } finally {
      setLoading(false);
    }
  };

  const input =
    "w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-spektro-blue/30 focus:ring-4 focus:ring-spektro-blue/10";

  return (
    <form onSubmit={submit} className="max-w-md rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-base font-semibold tracking-tight">Şifre Değiştir</h2>
      <p className="mt-1 text-sm text-slate-500">Hesabınızın giriş şifresini güncelleyin.</p>

      <label className="mt-5 block text-xs font-medium text-slate-600">Mevcut Şifre</label>
      <input type="password" required value={current} onChange={(e) => setCurrent(e.target.value)} className={`mt-1 ${input}`} />

      <label className="mt-4 block text-xs font-medium text-slate-600">Yeni Şifre</label>
      <input type="password" required minLength={8} value={next} onChange={(e) => setNext(e.target.value)} className={`mt-1 ${input}`} />

      <label className="mt-4 block text-xs font-medium text-slate-600">Yeni Şifre (Tekrar)</label>
      <input type="password" required minLength={8} value={confirm} onChange={(e) => setConfirm(e.target.value)} className={`mt-1 ${input}`} />

      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      {done ? (
        <p className="mt-3 flex items-center gap-2 text-sm text-emerald-600">
          <CheckCircle2 className="h-4 w-4" /> Şifreniz güncellendi.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-6 rounded-xl bg-spektro-blue px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Güncelleniyor..." : "Şifreyi Güncelle"}
      </button>
    </form>
  );
}
