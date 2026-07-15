import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor("iletisim");

export default function IletisimLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Anasayfa", path: "" },
          { name: "İletişim", path: "iletisim" },
        ])}
      />
      {children}
    </>
  );
}
