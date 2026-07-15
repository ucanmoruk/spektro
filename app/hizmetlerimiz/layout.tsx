import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, metadataFor, serviceJsonLd } from "@/lib/seo";

export const metadata: Metadata = metadataFor("hizmetlerimiz");

export default function HizmetlerimizLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Anasayfa", path: "" },
            { name: "Hizmetlerimiz", path: "hizmetlerimiz" },
          ]),
          serviceJsonLd(
            "Laboratuvar Teknik Servis ve Validasyon Hizmetleri",
            "Laboratuvar cihazları için teknik servis, kullanıcı eğitimi, IQ/OQ/PQ validasyon, bakım ve aplikasyon desteği.",
            "hizmetlerimiz",
          ),
        ]}
      />
      {children}
    </>
  );
}
