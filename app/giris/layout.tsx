import type { Metadata } from "next";
import { noIndexRobots } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Giriş Yap | Spektrotek",
  robots: noIndexRobots,
};

export default function GirisLayout({ children }: { children: React.ReactNode }) {
  return children;
}
