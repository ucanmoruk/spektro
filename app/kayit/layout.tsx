import type { Metadata } from "next";
import { noIndexRobots } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hesap Oluştur | Spektrotek",
  robots: noIndexRobots,
};

export default function KayitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
