import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, metadataFor, serviceJsonLd } from "@/lib/seo";

export const metadata: Metadata = metadataFor("ozmometre");

export default function OzmometreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Anasayfa", path: "" },
            { name: "Ozmometre", path: "ozmometre" },
          ]),
          serviceJsonLd(
            "Ozmometre Cihazları",
            "KNAUER freezing point ozmometre cihazları için klinik, farmasötik ve kalite kontrol laboratuvarlarına ölçüm çözümleri.",
            "ozmometre",
          ),
        ]}
      />
      {children}
    </>
  );
}
