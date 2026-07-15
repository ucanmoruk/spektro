import type { Metadata } from "next";
import { metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor("hakkimizda");

export default function HakkimizdaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
