import type { Metadata } from "next";
import { metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor("bilgi-toplumu-hizmetleri");

export default function BilgiToplumuLayout({ children }: { children: React.ReactNode }) {
  return children;
}
