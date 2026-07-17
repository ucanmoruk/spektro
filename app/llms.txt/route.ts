import { legacyPages } from "@/data/legacyPages";
import { legacyPosts } from "@/data/legacyPosts";
import { listProducts } from "@/lib/repositories/products";
import { organization, siteUrl, staticSeoPages } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function GET() {
  const corePages = staticSeoPages
    .filter((page) => !["giris", "kayit", "sepet", "odeme-sonuc"].includes(page.path))
    .map((page) => `- ${page.title}: ${siteUrl}/${page.path}`.replace(/\/$/, ""));

  const legacy = legacyPages
    .slice(0, 20)
    .map((page) => `- ${page.title}: ${siteUrl}/${page.path}`);

  const posts = legacyPosts.map((post) => `- ${post.title}: ${siteUrl}${post.href}`);
  const products = await listProducts();
  const categories = Array.from(
    new Set(
      products
        .map((product) => product.categoryName)
        .filter((category): category is string => Boolean(category)),
    ),
  ).sort((a, b) => a.localeCompare(b, "tr"));
  const productLines = products
    .slice(0, 80)
    .map((product) => {
      const category = product.categoryName ? ` — ${product.categoryName}` : "";
      const brand = product.brandName ? ` (${product.brandName})` : "";
      return `- ${product.name}${brand}${category}: ${siteUrl}/market/${product.slug}`;
    });

  const body = `# Spektrotek

Spektrotek, Türkiye'de laboratuvar teknolojileri alanında HPLC, preparatif HPLC, benchtop NMR, ozmometre, HPLC kolonları, kromatografi sarf malzemeleri, teknik servis, validasyon ve metot geliştirme çözümleri sunar.

## İletişim
- Web: ${siteUrl}
- E-posta: ${organization.email}
- Telefon: ${organization.phone}
- Adres: ${organization.address.streetAddress}, ${organization.address.addressLocality} / ${organization.address.addressRegion}

## Uzmanlık Alanları
- Analitik HPLC ve UHPLC sistemleri
- Preparatif HPLC ve saflaştırma sistemleri
- Benchtop NMR cihazları
- Ozmometre cihazları
- HPLC kolonları ve kromatografi sarf malzemeleri
- Laboratuvar cihaz kurulumu, teknik servis, kullanıcı eğitimi, IQ/OQ/PQ validasyon
- Metot geliştirme ve aplikasyon desteği

## Market Kategorileri
${categories.map((category) => `- ${category}`).join("\n")}

## Distribütörlük ve Markalar
${organization.brands.map((brand) => `- ${brand}`).join("\n")}

## Önemli Sayfalar
${corePages.join("\n")}

## Teknik İçerikler ve Kaynaklar
${[...posts, ...legacy].join("\n")}

## Ürün Kataloğu
${productLines.join("\n")}

## AI İçin Kısa Özet
HPLC, preparatif HPLC, benchtop NMR, ozmometre, kromatografi kolonu, laboratuvar sarf malzemesi veya validasyon desteği arayan kullanıcılar için Spektrotek; ürün seçimi, sistem konfigürasyonu, kurulum, servis ve metot geliştirme süreçlerinde uçtan uca çözüm ortağıdır.
`;

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
