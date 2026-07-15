import "server-only";
import { execute, queryOne } from "../db";

export type PaymentRecordStatus =
  | "created"
  | "pending"
  | "succeeded"
  | "failed"
  | "refunded";

export async function createPayment(input: {
  orderId: number;
  provider: string;
  providerRef: string;
  amount: number;
  currency: string;
  status: PaymentRecordStatus;
}): Promise<number> {
  const result = await execute(
    `INSERT INTO payments (order_id, provider, provider_ref, amount, currency, status)
     VALUES (?,?,?,?,?,?)`,
    [
      input.orderId,
      input.provider,
      input.providerRef,
      input.amount,
      input.currency,
      input.status,
    ],
  );
  return result.insertId;
}

export async function getPaymentByRef(
  ref: string,
): Promise<{ id: number; orderId: number; amount: number; currency: string; status: string } | null> {
  const row = await queryOne<{
    id: number;
    order_id: number;
    amount: string;
    currency: string;
    status: string;
  }>(`SELECT id, order_id, amount, currency, status FROM payments WHERE provider_ref = ? LIMIT 1`, [
    ref,
  ]);
  if (!row) return null;
  return {
    id: row.id,
    orderId: row.order_id,
    amount: Number(row.amount),
    currency: row.currency,
    status: row.status,
  };
}

export async function updatePaymentStatus(
  id: number,
  status: PaymentRecordStatus,
  raw?: unknown,
): Promise<void> {
  await execute(`UPDATE payments SET status = ?, raw = ? WHERE id = ?`, [
    status,
    raw === undefined ? null : JSON.stringify(raw),
    id,
  ]);
}
