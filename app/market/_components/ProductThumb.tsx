"use client";

import { useEffect, useState } from "react";
import { FlaskConical } from "lucide-react";

type Props = {
  src: string | null;
  alt: string;
  className?: string;
};

/**
 * Ürün görseli. Admin serbest URL girebildiği için next/image yerine sade <img>
 * kullanılır; görsel yoksa veya yüklenemezse marka-uyumlu bir yer tutucu gösterilir.
 */
export function ProductThumb({ src, alt, className = "" }: Props) {
  const [failed, setFailed] = useState(false);
  // Görsel kaynağı değişince hata durumunu sıfırla (yeni görsel yeniden denenir).
  useEffect(() => setFailed(false), [src]);
  const showFallback = !src || failed;

  return (
    <div
      className={`flex items-center justify-center overflow-hidden bg-slate-50 ${className}`}
    >
      {showFallback ? (
        <FlaskConical className="h-1/3 w-1/3 text-slate-300" strokeWidth={1.5} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-contain"
        />
      )}
    </div>
  );
}
