import type { Metadata } from "next";
import { noIndexRobots } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Admin Paneli | Spektrotek",
  robots: noIndexRobots,
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
