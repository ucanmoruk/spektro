import type { Metadata } from "next";
import { metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor("sss");

export default function SssLayout({ children }: { children: React.ReactNode }) {
  return children;
}
