import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import "./globals.css";
import { CartToast } from "@/components/CartToast";
import JsonLd from "@/components/JsonLd";
import { metadataFor, organizationJsonLd, siteUrl, websiteJsonLd } from "@/lib/seo";

const interTight = Inter_Tight({
  variable: "--font-tight",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
});

const homeMetadata = metadataFor("");

export const metadata: Metadata = {
  ...homeMetadata,
  metadataBase: new URL(siteUrl),
  title: {
    default: "Spektrotek | HPLC, NMR ve Laboratuvar Teknolojileri",
    template: "%s",
  },
  applicationName: "Spektrotek",
  authors: [{ name: "Spektrotek" }],
  creator: "Spektrotek",
  publisher: "Spektrotek",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${interTight.variable} ${instrumentSerif.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        {children}
        <CartToast />
      </body>
    </html>
  );
}
