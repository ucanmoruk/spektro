import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import type { LegacyPage } from "@/data/legacyPages";

type LegacyImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type LegacySection = {
  id: string;
  title: string;
  level: number;
  paragraphs: string[];
  points: string[];
  image?: LegacyImage;
  links: { href: string; label: string }[];
};

const entityMap: Record<string, string> = {
  amp: "&",
  quot: "\"",
  "#039": "'",
  lt: "<",
  gt: ">",
  nbsp: " ",
  hellip: "...",
  rsquo: "’",
  lsquo: "‘",
  rdquo: "”",
  ldquo: "“",
  ndash: "-",
  mdash: "-",
};

function decodeEntities(input: string) {
  return input
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&([a-z#0-9]+);/gi, (match, key) => entityMap[key] ?? match);
}

function stripTags(input: string) {
  return decodeEntities(
    input
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function getAttr(tag: string, attr: string) {
  const match = tag.match(new RegExp(`${attr}=["']([^"']*)["']`, "i"));
  return match ? decodeEntities(match[1]) : "";
}

function toId(input: string, index: number) {
  const id = input
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return id || `bolum-${index + 1}`;
}

function compact<T>(items: T[]) {
  return items.filter(Boolean) as NonNullable<T>[];
}

function extractImages(html: string): LegacyImage[] {
  const images = [...html.matchAll(/<img\b[^>]*>/gi)]
    .map((match) => {
      const tag = match[0];
      const src = getAttr(tag, "src");
      const width = Number(getAttr(tag, "width")) || 1200;
      const height = Number(getAttr(tag, "height")) || 800;
      const alt = getAttr(tag, "alt") || getAttr(tag, "title");

      const isAllowedSource =
        src.startsWith("https://www.spektrotek.com/") ||
        src.startsWith("https://sielc.com/") ||
        src.startsWith("https://www.knauer.net/") ||
        src.startsWith("https://images.unsplash.com/");

      if (!src || !isAllowedSource || width < 220 || height < 90) {
        return null;
      }

      return { src, alt, width, height };
    })
    .filter(Boolean) as LegacyImage[];

  const seen = new Set<string>();
  return images.filter((image) => {
    if (seen.has(image.src)) {
      return false;
    }
    seen.add(image.src);
    return true;
  });
}

function extractTexts(html: string, tag: "p" | "li") {
  return [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "gi"))]
    .map((match) => stripTags(match[1]))
    .filter((text) => text.length > 18 && !/^devam$/i.test(text));
}

function extractLinks(html: string) {
  const blockedInternal = /^(#|\/?(online-market|sepet|siparis-takip|karsilastirma|favorilerim|hesabim|odeme|magaza|urun|urun-kategori|urun-etiketi|marka|kategori|tag|woodmart_slider)(\/|$|\?))/;

  return [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)]
    .map((match) => ({
      href: decodeEntities(match[1]).replace(/^\/teklif-al\/?$/, "/iletisim"),
      label: stripTags(match[2]),
    }))
    .filter((link) => {
      if (!link.href || link.label.length < 3 || link.label.length > 70) {
        return false;
      }
      if (blockedInternal.test(link.href)) {
        return false;
      }
      return true;
    })
    .slice(0, 4);
}

function removeChrome(html: string) {
  return html
    .replace(/<div class="wd-prefooter[\s\S]*$/i, "")
    .replace(/<div class="wd-single-footer[\s\S]*$/i, "")
    .replace(/<div id="comments"[\s\S]*$/i, "")
    .replace(/<div class="comments-area[\s\S]*$/i, "")
    .replace(/<div class="page-title[\s\S]*?<!-- MAIN CONTENT AREA -->/i, "")
    .replace(/<div class="breadcrumbs[\s\S]*?<\/div><!-- \.breadcrumbs -->/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "");
}

function extractSections(page: LegacyPage) {
  const html = removeChrome(page.contentHtml);
  const images = extractImages(html);
  const headingRegex = /<h([2-4])\b[^>]*>([\s\S]*?)<\/h\1>/gi;
  const headings = [...html.matchAll(headingRegex)].map((match) => ({
    index: match.index ?? 0,
    length: match[0].length,
    level: Number(match[1]),
    title: stripTags(match[2]),
  }));

  if (headings.length === 0) {
    return [
      {
        id: "icerik",
        title: page.title,
        level: 2,
        paragraphs: extractTexts(html, "p"),
        points: extractTexts(html, "li"),
        image: images[0],
        links: extractLinks(html),
      },
    ];
  }

  return headings
    .map((heading, index) => {
      const next = headings[index + 1]?.index ?? html.length;
      const segment = html.slice(heading.index + heading.length, next);
      const sectionImages = extractImages(segment);
      return {
        id: toId(heading.title, index),
        title: heading.title,
        level: heading.level,
        paragraphs: extractTexts(segment, "p"),
        points: extractTexts(segment, "li"),
        image: sectionImages[0] ?? images[index + 1],
        links: extractLinks(segment),
      };
    })
    .filter((section) => section.title && (section.paragraphs.length || section.points.length || section.image || section.links.length));
}

function firstUsefulParagraph(page: LegacyPage, sections: LegacySection[]) {
  return (
    page.description ||
    sections.flatMap((section) => section.paragraphs).find((paragraph) => paragraph.length > 80) ||
    "Spektrotek kaynaklarından alınan içerik, yeni site deneyimine uygun biçimde düzenlendi."
  );
}

function eyebrowFor(page: LegacyPage) {
  if (page.path.startsWith("sielc")) return "SIELC Technologies";
  if (page.path.includes("nanalysis") || page.path.includes("nmr")) return "Benchtop NMR";
  if (page.path.includes("hplc") || page.path.includes("kolon")) return "Kromatografi";
  if (page.path.includes("kosullari") || page.path.includes("guvenlik") || page.path.includes("korunmasi")) return "Yasal Bilgilendirme";
  if (page.path.includes("haber") || page.path.includes("yilinda")) return "Bilgi Merkezi";
  return "Spektrotek";
}

function SectionImage({ image, title }: { image: LegacyImage; title: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
      <Image
        src={image.src}
        alt={image.alt || title}
        width={image.width}
        height={image.height}
        className="aspect-[4/3] h-full w-full object-cover"
      />
    </div>
  );
}

export default function LegacyModernPage({ page }: { page: LegacyPage }) {
  const sections = extractSections(page);
  const heroImage = compact(sections.map((section) => section.image))[0];
  const intro = firstUsefulParagraph(page, sections);
  const visibleSections = sections.slice(0, 18);

  return (
    <>
      <section className="border-b border-slate-100 bg-slate-50 pb-12 pt-32 md:pb-16 md:pt-36">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 md:px-10 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">{eyebrowFor(page)}</p>
            <h1 className="mt-4 font-heading max-w-4xl text-slate-950">{page.title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-slate-600">{intro}</p>
            {sections.length > 1 ? (
              <div className="mt-7 flex flex-wrap gap-2">
                {sections.slice(0, 4).map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-spektro-blue/30 hover:text-spektro-blue"
                  >
                    {section.title}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          {heroImage ? <SectionImage image={heroImage} title={page.title} /> : null}
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 md:px-10 lg:grid-cols-[260px_1fr]">
          {visibleSections.length > 2 ? (
            <aside className="hidden lg:block">
              <div className="sticky top-28 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <p className="px-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">İçindekiler</p>
                <nav className="mt-3 space-y-1">
                  {visibleSections.slice(0, 10).map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block rounded-lg px-2 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          ) : null}

          <div className={visibleSections.length > 2 ? "space-y-10" : "space-y-10 lg:col-start-2"}>
            {visibleSections.map((section, index) => (
              <section
                key={`${section.id}-${index}`}
                id={section.id}
                className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.05)] md:p-8"
              >
                <div className={section.image ? "grid gap-8 xl:grid-cols-[1fr_360px]" : undefined}>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-spektro-blue">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold leading-tight text-slate-950 md:text-3xl">{section.title}</h2>

                    <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-700">
                      {section.paragraphs.map((paragraph, paragraphIndex) => (
                        <p key={`${section.id}-p-${paragraphIndex}`}>{paragraph}</p>
                      ))}
                    </div>

                    {section.points.length ? (
                      <ul className="mt-6 grid gap-3 md:grid-cols-2">
                        {section.points.map((point, pointIndex) => (
                          <li key={`${section.id}-li-${pointIndex}`} className="flex gap-3 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-spektro-blue" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {section.links.length ? (
                      <div className="mt-6 flex flex-wrap gap-3">
                        {section.links.map((link) => (
                          <Link
                            key={`${link.href}-${link.label}`}
                            href={link.href}
                            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-800 transition hover:border-spektro-blue/30 hover:text-spektro-blue"
                          >
                            {link.label}
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  {section.image ? (
                    <div className="xl:pt-10">
                      <SectionImage image={section.image} title={section.title} />
                    </div>
                  ) : null}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
