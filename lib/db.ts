import "server-only";
import mysql from "mysql2/promise";

// -----------------------------------------------------------------------------
// MySQL bağlantı havuzu (connection pool).
// Vercel/Fluid Compute üzerinde fonksiyon örnekleri yeniden kullanıldığı için
// havuz global'de saklanır; her istekte yeni bağlantı açılmaz.
// -----------------------------------------------------------------------------

declare global {
  var __spektroPool: mysql.Pool | undefined;
}

function buildPool(): mysql.Pool {
  const url = process.env.DATABASE_URL;

  const common = {
    waitForConnections: true,
    connectionLimit: Number(process.env.DB_POOL_LIMIT ?? 10),
    queueLimit: 0,
    charset: "utf8mb4",
    // DATETIME kolonlarını UTC string olarak alıp uygulama tarafında biçimlendiriyoruz.
    dateStrings: true as const,
    timezone: "Z",
    ssl:
      process.env.DB_SSL === "true"
        ? { rejectUnauthorized: false }
        : undefined,
  };

  if (url) {
    return mysql.createPool({ uri: url, ...common });
  }

  return mysql.createPool({
    host: process.env.DB_HOST ?? "127.0.0.1",
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER ?? "root",
    password: process.env.DB_PASSWORD ?? "",
    database: process.env.DB_NAME ?? "spektrotek",
    ...common,
  });
}

export function getPool(): mysql.Pool {
  if (!global.__spektroPool) {
    global.__spektroPool = buildPool();
  }
  return global.__spektroPool;
}

/** SELECT sorgusu — satır dizisi döndürür. */
// mysql2'nin ExecuteValues tipi geniş; parametreleri buradaki dar tip üzerinden geçiriyoruz.
type SqlParam = string | number | boolean | Date | null;

export async function query<T = Record<string, unknown>>(
  sql: string,
  params: unknown[] = [],
): Promise<T[]> {
  const [rows] = await getPool().execute(sql, params as SqlParam[]);
  return rows as T[];
}

/** Tek satır döndürür (yoksa null). */
export async function queryOne<T = Record<string, unknown>>(
  sql: string,
  params: unknown[] = [],
): Promise<T | null> {
  const rows = await query<T>(sql, params);
  return rows[0] ?? null;
}

/** INSERT/UPDATE/DELETE — ResultSetHeader (insertId, affectedRows) döndürür. */
export async function execute(
  sql: string,
  params: unknown[] = [],
): Promise<mysql.ResultSetHeader> {
  const [result] = await getPool().execute(sql, params as SqlParam[]);
  return result as mysql.ResultSetHeader;
}

/** Transaction yardımcı fonksiyonu. */
export async function withTransaction<T>(
  fn: (conn: mysql.PoolConnection) => Promise<T>,
): Promise<T> {
  const conn = await getPool().getConnection();
  try {
    await conn.beginTransaction();
    const result = await fn(conn);
    await conn.commit();
    return result;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}
