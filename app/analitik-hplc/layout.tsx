import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, metadataFor, serviceJsonLd } from "@/lib/seo";

export const metadata: Metadata = metadataFor("analitik-hplc");

export default function AnalitikHplcLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Anasayfa", path: "" },
            { name: "Analitik HPLC", path: "analitik-hplc" },
          ]),
          serviceJsonLd(
            "Analitik HPLC Sistemleri",
            "KNAUER AZURA analitik HPLC, UHPLC ve ULDC sistemleri için modüler cihaz konfigürasyonu, kurulum, validasyon ve metot geliştirme desteği.",
            "analitik-hplc",
          ),
        ]}
      />
      {children}
    </>
  );
}
