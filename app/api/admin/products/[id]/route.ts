import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { errorResponse } from "@/lib/api-guard";
import { deleteProduct, updateProduct } from "@/lib/repositories/products";
import { findOrCreateBrand, findOrCreateCategory } from "@/lib/repositories/taxonomy";
import { parseProductInput } from "@/lib/product-input";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Ctx) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();
    const input = parseProductInput(body);
    if (body.newBrand) input.brandId = await findOrCreateBrand(String(body.newBrand));
    if (body.newCategory) input.categoryId = await findOrCreateCategory(String(body.newCategory));
    await updateProduct(Number(id), input);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return errorResponse(err);
  }
}

export async function DELETE(_request: Request, { params }: Ctx) {
  try {
    await requireAdmin();
    const { id } = await params;
    await deleteProduct(Number(id));
    return NextResponse.json({ ok: true });
  } catch (err) {
    return errorResponse(err);
  }
}
