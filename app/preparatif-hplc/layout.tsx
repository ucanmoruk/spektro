import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, metadataFor, serviceJsonLd } from "@/lib/seo";

export const metadata: Metadata = metadataFor("preparatif-hplc");

export default function PreparatifHplcLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Anasayfa", path: "" },
            { name: "Preparatif HPLC", path: "preparatif-hplc" },
          ]),
          serviceJsonLd(
            "Preparatif HPLC Sistemleri",
            "Preparatif HPLC ve saflaştırma sistemleri için laboratuvar ölçeğinden pilot ölçeğe cihaz konfigürasyonu ve aplikasyon desteği.",
            "preparatif-hplc",
          ),
        ]}
      />
      {children}
    </>
  );
}
