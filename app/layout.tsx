import type { Metadata } from "next";
import { Instrument_Serif, Inter_Tight } from "next/font/google";
import Script from "next/script";
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
  category: "Laboratuvar teknolojileri",
  authors: [{ name: "Spektrotek" }],
  creator: "Spektrotek",
  publisher: "Spektrotek",
  manifest: "/manifest.webmanifest",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-94QBVKYVM0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-94QBVKYVM0');
          `}
        </Script>
      </body>
    </html>
  );
}
