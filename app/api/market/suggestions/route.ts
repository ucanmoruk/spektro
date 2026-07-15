import { NextResponse } from "next/server";
import { listProducts } from "@/lib/repositories/products";
import { toStoreProduct } from "@/lib/store-view";

export const dynamic = "force-dynamic";

// Sepette çapraz satış için öne çıkan aktif ürünler.
export async function GET() {
  const products = await listProducts();
  const store = products
    .filter((p) => p.isDirectSale)
    .slice(0, 8)
    .map((p) => toStoreProduct(p));
  return NextResponse.json({ products: store });
}
