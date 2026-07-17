import type { Metadata } from "next";
import { noIndexRobots } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Güvenli Ödeme | Spektrotek",
  robots: noIndexRobots,
};

export default function PaytrPaymentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
