import type { Metadata } from "next";
import { metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor("misyon-vizyon");

export default function MisyonVizyonLayout({ children }: { children: React.ReactNode }) {
  return children;
}
