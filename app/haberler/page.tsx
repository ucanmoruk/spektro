import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { legacyPosts } from "@/data/legacyPosts";
import { metadataFor } from "@/lib/seo";

export const metadata: Metadata = metadataFor("haberler");

const formatter = new Intl.DateTimeFormat("tr-TR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export default function HaberlerPage() {
  return (
    <main className="bg-white text-slate-900">
      <Navbar />

      <section className="border-b border-slate-100 bg-slate-950 pb-12 pt-32 text-white">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-cyan-200">Spektrotek</p>
          <h1 className="mt-2 font-heading">Haberler</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
            Hakkımızdaki son gelişmelerden, teknik yazılardan ve laboratuvar teknolojileri içeriklerinden haberdar olun.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10 md:py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {legacyPosts.map((post) => (
            <article
              key={post.slug}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
            >
              <Link href={post.href} className="block bg-slate-100">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={900}
                    height={506}
                    className="aspect-[16/9] w-full object-cover"
                  />
                ) : (
                  <div className="aspect-[16/9] w-full bg-slate-100" />
                )}
              </Link>
              <div className="p-6">
                <time className="text-xs font-semibold uppercase tracking-[0.12em] text-spektro-blue">
                  {formatter.format(new Date(post.date))}
                </time>
                <h2 className="mt-3 text-2xl font-semibold leading-tight text-slate-950">
                  <Link href={post.href} className="transition hover:text-spektro-blue">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>
                <Link
                  href={post.href}
                  className="mt-5 inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
                >
                  Devam
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
