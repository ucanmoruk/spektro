import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, metadataFor, serviceJsonLd } from "@/lib/seo";

export const metadata: Metadata = metadataFor("benchtop-nmr");

export default function BenchtopNmrLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Anasayfa", path: "" },
            { name: "Benchtop NMR", path: "benchtop-nmr" },
          ]),
          serviceJsonLd(
            "Benchtop NMR Cihazları",
            "Nanalysis benchtop NMR cihazları için eğitim, kalite kontrol, proses izleme ve hızlı moleküler analiz çözümleri.",
            "benchtop-nmr",
          ),
        ]}
      />
      {children}
    </>
  );
}
