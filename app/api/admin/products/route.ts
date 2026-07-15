import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { errorResponse } from "@/lib/api-guard";
import { createProduct } from "@/lib/repositories/products";
import { findOrCreateBrand, findOrCreateCategory } from "@/lib/repositories/taxonomy";
import { parseProductInput } from "@/lib/product-input";

export async function POST(request: Request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const input = parseProductInput(body);
    if (body.newBrand) input.brandId = await findOrCreateBrand(String(body.newBrand));
    if (body.newCategory) input.categoryId = await findOrCreateCategory(String(body.newCategory));
    const id = await createProduct(input);
    return NextResponse.json({ ok: true, id });
  } catch (err) {
    return errorResponse(err);
  }
}
