"use client";

import { useState } from "react";
import { ProductThumb } from "../../_components/ProductThumb";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? null;

  return (
    <div>
      <ProductThumb
        src={main}
        alt={name}
        className="aspect-square w-full rounded-2xl border border-slate-200"
      />
      {images.length > 1 ? (
        <div className="mt-3 grid grid-cols-5 gap-2">
          {images.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActive(i)}
              className={`overflow-hidden rounded-lg border ${
                i === active ? "border-spektro-blue" : "border-slate-200"
              }`}
            >
              <ProductThumb src={img} alt={`${name} ${i + 1}`} className="aspect-square w-full" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
