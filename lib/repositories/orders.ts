import "server-only";
import type { PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { execute, query, queryOne, withTransaction } from "../db";
import type { Order, OrderItem, OrderStatus } from "../types";

type OrderRow = {
  id: number;
  order_number: string;
  user_id: number | null;
  status: OrderStatus;
  currency: string;
  subtotal: string;
  shipping_total: string;
  tax_total: string;
  total: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  invoice_type: "individual" | "corporate";
  company: string | null;
  tax_office: string | null;
  tax_number: string | null;
  shipping_address: string | null;
  shipping_city: string | null;
  shipping_country: string | null;
  notes: string | null;
  payment_provider: string | null;
  payment_status: Order["paymentStatus"];
  created_at: string;
  updated_at: string;
};

type ItemRow = {
  id: number;
  product_id: number | null;
  name: string;
  sku: string | null;
  unit_price: string;
  quantity: number;
  line_total: string;
};

function mapItem(r: ItemRow): OrderItem {
  return {
    id: r.id,
    productId: r.product_id,
    name: r.name,
    sku: r.sku,
    unitPrice: Number(r.unit_price),
    quantity: r.quantity,
    lineTotal: Number(r.line_total),
  };
}

function mapOrder(r: OrderRow, items: OrderItem[] = []): Order {
  return {
    id: r.id,
    orderNumber: r.order_number,
    userId: r.user_id,
    status: r.status,
    currency: r.currency,
    subtotal: Number(r.subtotal),
    shippingTotal: Number(r.shipping_total),
    taxTotal: Number(r.tax_total),
    total: Number(r.total),
    customerName: r.customer_name,
    customerEmail: r.customer_email,
    customerPhone: r.customer_phone,
    invoiceType: r.invoice_type ?? "individual",
    company: r.company,
    taxOffice: r.tax_office,
    taxNumber: r.tax_number,
    shippingAddress: r.shipping_address,
    shippingCity: r.shipping_city,
    shippingCountry: r.shipping_country,
    notes: r.notes,
    paymentProvider: r.payment_provider,
    paymentStatus: r.payment_status,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
    items,
  };
}

export type NewOrderInput = {
  userId: number | null;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  invoiceType?: "individual" | "corporate";
  company?: string | null;
  taxOffice?: string | null;
  taxNumber?: string | null;
  shippingAddress?: string | null;
  shippingCity?: string | null;
  shippingCountry?: string | null;
  notes?: string | null;
  paymentProvider: string;
  items: { productId: number; name: string; sku: string | null; unitPrice: number; quantity: number }[];
};

/**
 * Siparişi kalemleriyle birlikte tek transaction içinde oluşturur.
 * Fiyatlar çağıran taraftan değil, güvenilir kaynaktan (DB ürünü) gelmelidir —
 * bu fonksiyonu çağıran checkout katmanı fiyatları DB'den okuyup geçirir.
 */
export async function createOrder(input: NewOrderInput): Promise<Order> {
  return withTransaction(async (conn: PoolConnection) => {
    const subtotal = input.items.reduce((s, it) => s + it.unitPrice * it.quantity, 0);
    const total = subtotal; // kargo/vergi bu fazda 0

    const [res] = await conn.execute<ResultSetHeader>(
      `INSERT INTO orders
        (order_number, user_id, status, currency, subtotal, total,
         customer_name, customer_email, customer_phone, invoice_type, company,
         tax_office, tax_number, shipping_address, shipping_city, shipping_country, notes,
         payment_provider, payment_status)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        "PENDING", input.userId, "pending", input.currency, subtotal, total,
        input.customerName, input.customerEmail, input.customerPhone ?? null,
        input.invoiceType ?? "individual", input.company ?? null,
        input.taxOffice ?? null, input.taxNumber ?? null,
        input.shippingAddress ?? null, input.shippingCity ?? null, input.shippingCountry ?? "Türkiye",
        input.notes ?? null, input.paymentProvider, "unpaid",
      ],
    );
    const orderId = res.insertId;

    const year = new Date().getUTCFullYear();
    const orderNumber = `SPK-${year}-${String(orderId).padStart(6, "0")}`;
    await conn.execute(`UPDATE orders SET order_number = ? WHERE id = ?`, [orderNumber, orderId]);

    for (const it of input.items) {
      await conn.execute(
        `INSERT INTO order_items (order_id, product_id, name, sku, unit_price, quantity, line_total)
         VALUES (?,?,?,?,?,?,?)`,
        [orderId, it.productId, it.name, it.sku, it.unitPrice, it.quantity, it.unitPrice * it.quantity],
      );
    }

    const [orderRows] = await conn.execute<RowDataPacket[]>(
      `SELECT * FROM orders WHERE id = ?`,
      [orderId],
    );
    const [itemRows] = await conn.execute<RowDataPacket[]>(
      `SELECT * FROM order_items WHERE order_id = ?`,
      [orderId],
    );
    return mapOrder(
      orderRows[0] as OrderRow,
      (itemRows as ItemRow[]).map(mapItem),
    );
  });
}

async function attachItems(orders: OrderRow[]): Promise<Order[]> {
  if (orders.length === 0) return [];
  const ids = orders.map((o) => o.id);
  const items = await query<ItemRow & { order_id: number }>(
    `SELECT * FROM order_items WHERE order_id IN (${ids.map(() => "?").join(",")})`,
    ids,
  );
  const byOrder = new Map<number, OrderItem[]>();
  for (const it of items) {
    const list = byOrder.get(it.order_id) ?? [];
    list.push(mapItem(it));
    byOrder.set(it.order_id, list);
  }
  return orders.map((o) => mapOrder(o, byOrder.get(o.id) ?? []));
}

export async function listOrdersByUser(userId: number): Promise<Order[]> {
  const rows = await query<OrderRow>(
    `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
    [userId],
  );
  return attachItems(rows);
}

export async function listAllOrders(): Promise<Order[]> {
  const rows = await query<OrderRow>(`SELECT * FROM orders ORDER BY created_at DESC LIMIT 500`);
  return attachItems(rows);
}

export async function getOrderById(id: number): Promise<Order | null> {
  const row = await queryOne<OrderRow>(`SELECT * FROM orders WHERE id = ?`, [id]);
  if (!row) return null;
  return (await attachItems([row]))[0];
}

export async function getOrderForUser(id: number, userId: number): Promise<Order | null> {
  const row = await queryOne<OrderRow>(`SELECT * FROM orders WHERE id = ? AND user_id = ?`, [
    id,
    userId,
  ]);
  if (!row) return null;
  return (await attachItems([row]))[0];
}

export async function updateOrderStatus(id: number, status: OrderStatus): Promise<void> {
  await execute(`UPDATE orders SET status = ? WHERE id = ?`, [status, id]);
}

export async function updateOrderPayment(
  id: number,
  paymentStatus: Order["paymentStatus"],
  provider?: string,
): Promise<void> {
  if (provider) {
    await execute(`UPDATE orders SET payment_status = ?, payment_provider = ? WHERE id = ?`, [
      paymentStatus,
      provider,
      id,
    ]);
  } else {
    await execute(`UPDATE orders SET payment_status = ? WHERE id = ?`, [paymentStatus, id]);
  }
}
