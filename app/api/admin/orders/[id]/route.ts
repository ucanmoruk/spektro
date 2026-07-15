import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { errorResponse } from "@/lib/api-guard";
import { updateOrderPayment, updateOrderStatus } from "@/lib/repositories/orders";
import type { OrderStatus, PaymentStatus } from "@/lib/types";

const ORDER_STATUSES: OrderStatus[] = [
  "pending", "paid", "processing", "shipped", "completed", "cancelled", "refunded",
];
const PAYMENT_STATUSES: PaymentStatus[] = ["unpaid", "pending", "paid", "failed", "refunded"];

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, { params }: Ctx) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await request.json();

    if (body.status) {
      if (!ORDER_STATUSES.includes(body.status)) {
        throw new Error("Geçersiz sipariş durumu.");
      }
      await updateOrderStatus(Number(id), body.status);
    }
    if (body.paymentStatus) {
      if (!PAYMENT_STATUSES.includes(body.paymentStatus)) {
        throw new Error("Geçersiz ödeme durumu.");
      }
      await updateOrderPayment(Number(id), body.paymentStatus);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    return errorResponse(err);
  }
}
