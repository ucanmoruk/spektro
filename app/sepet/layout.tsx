import type { Metadata } from "next";
import { noIndexRobots } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sepetim ve Teklif Listem | Spektrotek",
  robots: noIndexRobots,
};

export default function SepetLayout({ children }: { children: React.ReactNode }) {
  return children;
}
