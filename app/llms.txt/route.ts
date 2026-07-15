import { legacyPages } from "@/data/legacyPages";
import { legacyPosts } from "@/data/legacyPosts";
import { organization, siteUrl, staticSeoPages } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const corePages = staticSeoPages
    .filter((page) => !["giris", "kayit", "sepet", "odeme-sonuc"].includes(page.path))
    .map((page) => `- ${page.title}: ${siteUrl}/${page.path}`.replace(/\/$/, ""));

  const legacy = legacyPages
    .slice(0, 20)
    .map((page) => `- ${page.title}: ${siteUrl}/${page.path}`);

  const posts = legacyPosts.map((post) => `- ${post.title}: ${siteUrl}${post.href}`);

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

## Distribütörlük ve Markalar
${organization.brands.map((brand) => `- ${brand}`).join("\n")}

## Önemli Sayfalar
${corePages.join("\n")}

## Teknik İçerikler ve Kaynaklar
${[...posts, ...legacy].join("\n")}

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
