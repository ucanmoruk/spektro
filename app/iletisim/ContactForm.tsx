"use client";

import type { FormEvent } from "react";
import { useState } from "react";

type SubmitState = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("ad_soyad") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("telefon") ?? ""),
      company: String(formData.get("firma") ?? ""),
      message: String(formData.get("mesaj") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Mesaj gönderilemedi.");
      }
      event.currentTarget.reset();
      setState("success");
      setMessage("Mesajınız alındı. Ekibimiz en kısa sürede sizinle iletişime geçecek.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Mesaj gönderilemedi.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-7 space-y-4">
      <input name="ad_soyad" type="text" placeholder="Ad Soyad*" required className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-spektro-blue/20 transition focus:ring-4" />
      <input name="email" type="email" placeholder="E-mail*" required className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-spektro-blue/20 transition focus:ring-4" />
      <input name="telefon" type="tel" placeholder="Telefon*" required className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-spektro-blue/20 transition focus:ring-4" />
      <input name="firma" type="text" placeholder="Firma" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-spektro-blue/20 transition focus:ring-4" />
      <textarea name="mesaj" placeholder="Mesajınız.." rows={5} required className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none ring-spektro-blue/20 transition focus:ring-4" />
      <button
        type="submit"
        disabled={state === "loading"}
        className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-wait disabled:opacity-70"
      >
        {state === "loading" ? "Gönderiliyor..." : "Gönder"}
      </button>
      {message ? (
        <p className={`text-sm ${state === "success" ? "text-emerald-700" : "text-red-600"}`}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
