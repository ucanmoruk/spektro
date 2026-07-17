import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { errorResponse } from "@/lib/api-guard";
import { updateUserProfile } from "@/lib/repositories/users";

function clean(value: unknown) {
  const text = String(value ?? "").trim();
  return text || null;
}

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    const body = await request.json();
    const fullName = String(body.fullName ?? "").trim();
    const invoiceType = body.invoiceType === "corporate" ? "corporate" : "individual";

    if (fullName.length < 2) {
      throw new Error("Ad soyad zorunludur.");
    }
    if (invoiceType === "corporate" && !clean(body.company)) {
      throw new Error("Kurumsal fatura için firma/unvan bilgisi zorunludur.");
    }

    await updateUserProfile(user.id, {
      fullName,
      phone: clean(body.phone),
      invoiceType,
      company: clean(body.company),
      taxOffice: clean(body.taxOffice),
      taxNumber: clean(body.taxNumber),
      address: clean(body.address),
      city: clean(body.city),
      district: clean(body.district),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    return errorResponse(err);
  }
}
