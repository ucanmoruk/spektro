import type { Metadata } from "next";
import { metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor("market");

export default function MarketLayout({ children }: { children: React.ReactNode }) {
  return children;
}
