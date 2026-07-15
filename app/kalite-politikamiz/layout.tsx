import type { Metadata } from "next";
import { metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor("kalite-politikamiz");

export default function KalitePolitikamizLayout({ children }: { children: React.ReactNode }) {
  return children;
}
