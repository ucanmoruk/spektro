import type { Metadata } from "next";
import { noIndexRobots } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Hesabım | Spektrotek",
  robots: noIndexRobots,
};

export default function HesabimLayout({ children }: { children: React.ReactNode }) {
  return children;
}
