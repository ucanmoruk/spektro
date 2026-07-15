"use client";

import { useEffect, useRef } from "react";
import {
  Bold,
  Italic,
  Link2,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Underline,
  Eraser,
} from "lucide-react";

type Props = {
  value: string;
  onChange: (html: string) => void;
};

/**
 * Hafif zengin metin editörü (contentEditable + execCommand).
 * Çıktı HTML'dir; ürün açıklaması alanında kullanılır.
 * Not: execCommand tarayıcılarca hâlâ desteklenir; admin aracı için yeterlidir.
 */
export function RichTextEditor({ value, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // Dışarıdan gelen değer (ör. başka ürün seçildi) editör içeriğinden farklıysa güncelle.
  useEffect(() => {
    const el = ref.current;
    if (el && el.innerHTML !== value) {
      el.innerHTML = value || "";
    }
  }, [value]);

  const exec = (command: string, arg?: string) => {
    ref.current?.focus();
    document.execCommand(command, false, arg);
    if (ref.current) onChange(ref.current.innerHTML);
  };

  const addLink = () => {
    const url = prompt("Bağlantı adresi (https://...)");
    if (url) exec("createLink", url);
  };

  const btn =
    "inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-600 hover:bg-white hover:text-slate-900";

  return (
    <div className="rounded-xl border border-slate-200">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-slate-200 bg-slate-50 p-1.5">
        <button type="button" onClick={() => exec("bold")} className={btn} title="Kalın">
          <Bold className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => exec("italic")} className={btn} title="İtalik">
          <Italic className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => exec("underline")} className={btn} title="Altı çizili">
          <Underline className="h-4 w-4" />
        </button>
        <span className="mx-1 h-5 w-px bg-slate-200" />
        <button type="button" onClick={() => exec("formatBlock", "<h2>")} className={btn} title="Başlık 2">
          <Heading2 className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => exec("formatBlock", "<h3>")} className={btn} title="Başlık 3">
          <Heading3 className="h-4 w-4" />
        </button>
        <span className="mx-1 h-5 w-px bg-slate-200" />
        <button type="button" onClick={() => exec("insertUnorderedList")} className={btn} title="Madde listesi">
          <List className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => exec("insertOrderedList")} className={btn} title="Numaralı liste">
          <ListOrdered className="h-4 w-4" />
        </button>
        <button type="button" onClick={addLink} className={btn} title="Bağlantı ekle">
          <Link2 className="h-4 w-4" />
        </button>
        <span className="mx-1 h-5 w-px bg-slate-200" />
        <button type="button" onClick={() => exec("removeFormat")} className={btn} title="Biçimi temizle">
          <Eraser className="h-4 w-4" />
        </button>
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => onChange((e.target as HTMLDivElement).innerHTML)}
        className="legacy-content min-h-40 max-w-none px-4 py-3 text-sm outline-none [&_h2]:mt-3 [&_h2]:text-lg [&_h3]:mt-2 [&_h3]:text-base [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
      />
    </div>
  );
}
