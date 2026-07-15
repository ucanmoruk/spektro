import type { Metadata } from "next";
import { noIndexRobots } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Ödeme Sonucu | Spektrotek",
  robots: noIndexRobots,
};

export default function OdemeSonucLayout({ children }: { children: React.ReactNode }) {
  return children;
}
