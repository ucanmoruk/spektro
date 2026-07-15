import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import LegacyModernPage from "@/components/LegacyModernPage";
import Navbar from "@/components/Navbar";
import { getLegacyPage, legacyPages } from "@/data/legacyPages";
import { legacyPosts } from "@/data/legacyPosts";
import { absoluteUrl, breadcrumbJsonLd, siteUrl } from "@/lib/seo";

type PageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

function pathFromSlug(slug: string[]) {
  return slug.join("/");
}

function truncateDescription(input: string) {
  const text = input.replace(/\s+/g, " ").trim();
  if (text.length <= 160) return text;
  return `${text.slice(0, 157).replace(/\s+\S*$/, "")}...`;
}

export function generateStaticParams() {
  return legacyPages.map((page) => ({
    slug: page.path.split("/"),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLegacyPage(pathFromSlug(slug));

  if (!page) {
    return {};
  }

  return {
    title: `${page.title} | Spektrotek`,
    description: page.description ? truncateDescription(page.description) : undefined,
    alternates: {
      canonical: `/${page.path}`,
    },
    openGraph: {
      title: `${page.title} | Spektrotek`,
      description: page.description ? truncateDescription(page.description) : undefined,
      url: absoluteUrl(page.path),
      siteName: "Spektrotek",
      locale: "tr_TR",
      type: "article",
      images: [
        {
          url: `${siteUrl}/brand/spektrotek-logo.png`,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.title} | Spektrotek`,
      description: page.description ? truncateDescription(page.description) : undefined,
      images: [`${siteUrl}/brand/spektrotek-logo.png`],
    },
  };
}

export default async function LegacyPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getLegacyPage(pathFromSlug(slug));

  if (!page) {
    notFound();
  }

  const post = legacyPosts.find((item) => item.slug === page.path);
  const structuredData = [
    breadcrumbJsonLd([
      { name: "Anasayfa", path: "" },
      { name: page.title, path: page.path },
    ]),
    {
      "@context": "https://schema.org",
      "@type": post ? "Article" : "WebPage",
      headline: page.title,
      description: page.description,
      url: absoluteUrl(page.path),
      image: post?.image || `${siteUrl}/brand/spektrotek-logo.png`,
      datePublished: post?.date,
      author: {
        "@type": "Organization",
        name: "Spektrotek",
      },
      publisher: {
        "@type": "Organization",
        name: "Spektrotek",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/brand/spektrotek-logo.png`,
        },
      },
    },
  ];

  return (
    <main className="bg-white text-slate-900">
      <JsonLd data={structuredData} />
      <Navbar />
      <LegacyModernPage page={page} />
      <Footer />
    </main>
  );
}
