import "server-only";
import type { PoolConnection, ResultSetHeader } from "mysql2/promise";
import { execute, query, withTransaction } from "../db";
import type { QuoteRequest, QuoteStatus } from "../types";

type QuoteRow = {
  id: number;
  user_id: number | null;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string | null;
  status: QuoteStatus;
  created_at: string;
};

type QuoteItemRow = {
  id: number;
  quote_request_id: number;
  name: string;
  brand: string | null;
  quantity: number;
};

export type NewQuoteInput = {
  userId: number | null;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  message?: string | null;
  items: { productId: number | null; name: string; brand: string | null; quantity: number }[];
};

export async function createQuoteRequest(input: NewQuoteInput): Promise<number> {
  return withTransaction(async (conn: PoolConnection) => {
    const [res] = await conn.execute<ResultSetHeader>(
      `INSERT INTO quote_requests (user_id, name, email, phone, company, message)
       VALUES (?,?,?,?,?,?)`,
      [input.userId, input.name, input.email, input.phone ?? null, input.company ?? null, input.message ?? null],
    );
    const quoteId = res.insertId;
    for (const it of input.items) {
      await conn.execute(
        `INSERT INTO quote_request_items (quote_request_id, product_id, name, brand, quantity)
         VALUES (?,?,?,?,?)`,
        [quoteId, it.productId, it.name, it.brand, it.quantity],
      );
    }
    return quoteId;
  });
}

function mapQuote(r: QuoteRow, items: QuoteRequest["items"]): QuoteRequest {
  return {
    id: r.id,
    userId: r.user_id,
    name: r.name,
    email: r.email,
    phone: r.phone,
    company: r.company,
    message: r.message,
    status: r.status,
    createdAt: r.created_at,
    items,
  };
}

export async function listQuoteRequests(): Promise<QuoteRequest[]> {
  const rows = await query<QuoteRow>(`SELECT * FROM quote_requests ORDER BY created_at DESC LIMIT 500`);
  if (rows.length === 0) return [];
  const ids = rows.map((r) => r.id);
  const items = await query<QuoteItemRow>(
    `SELECT * FROM quote_request_items WHERE quote_request_id IN (${ids.map(() => "?").join(",")})`,
    ids,
  );
  const byQuote = new Map<number, QuoteRequest["items"]>();
  for (const it of items) {
    const list = byQuote.get(it.quote_request_id) ?? [];
    list.push({ id: it.id, name: it.name, brand: it.brand, quantity: it.quantity });
    byQuote.set(it.quote_request_id, list);
  }
  return rows.map((r) => mapQuote(r, byQuote.get(r.id) ?? []));
}

export async function updateQuoteStatus(id: number, status: QuoteStatus): Promise<void> {
  await execute(`UPDATE quote_requests SET status = ? WHERE id = ?`, [status, id]);
}
