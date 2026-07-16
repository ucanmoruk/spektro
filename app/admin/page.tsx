import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { LogoutButton } from "@/components/LogoutButton";
import { getCurrentUser } from "@/lib/auth";
import { listProductsForAdmin } from "@/lib/repositories/products";
import { listAllOrders } from "@/lib/repositories/orders";
import { listQuoteRequests } from "@/lib/repositories/quotes";
import { listBrands, listCategories } from "@/lib/repositories/taxonomy";
import { AdminDashboard } from "./_components/AdminDashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Paneli | Spektrotek",
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ productId?: string; product?: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/giris?next=/admin");
  if (user.role !== "admin") redirect("/hesabim");
  const { productId, product } = await searchParams;

  const [products, orders, quotes, brands, categories] = await Promise.all([
    listProductsForAdmin(),
    listAllOrders(),
    listQuoteRequests(),
    listBrands(),
    listCategories(),
  ]);

  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900">
      <Navbar />

      <section className="border-b border-slate-100 bg-slate-50 pb-8 pt-28">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-6 md:px-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-spektro-blue">
              Admin Paneli
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              Mağaza Yönetimi
            </h1>
          </div>
          <LogoutButton />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl flex-1 px-6 py-8 md:px-10">
        <AdminDashboard
          products={products}
          orders={orders}
          quotes={quotes}
          brands={brands}
          categories={categories}
          initialProductId={productId ? Number(productId) : null}
          initialNewProduct={product === "new"}
        />
      </section>
      <Footer />
    </main>
  );
}
