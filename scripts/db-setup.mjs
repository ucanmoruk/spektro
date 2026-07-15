/**
 * Veritabanı kurulum script'i.
 * `.env.local` (yoksa `.env`) içindeki bağlantı bilgilerini kullanarak
 * MySQL'e bağlanır, veritabanını (yoksa) oluşturur ve db/schema.sql + db/seed.sql
 * dosyalarını çalıştırır. `mysql` client'ı kurmaya gerek yoktur (mysql2 kullanır).
 *
 * Çalıştırma:  npm run db:setup
 * Tekrar çalıştırmak güvenlidir (şema IF NOT EXISTS, seed ON DUPLICATE KEY kullanır).
 */
import fs from "node:fs";
import path from "node:path";
import mysql from "mysql2/promise";

// --- .env.local / .env dosyasını basitçe yükle -------------------------------
function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    const p = path.join(process.cwd(), file);
    if (!fs.existsSync(p)) continue;
    const text = fs.readFileSync(p, "utf8");
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).replace(/^export\s+/, "").trim();
      let val = trimmed.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = val;
    }
  }
}

function resolveConfig() {
  const url = process.env.DATABASE_URL;
  if (url) {
    const u = new URL(url);
    return {
      host: u.hostname,
      port: Number(u.port || 3306),
      user: decodeURIComponent(u.username),
      password: decodeURIComponent(u.password),
      database: u.pathname.replace(/^\//, ""),
    };
  }
  return {
    host: process.env.DB_HOST ?? "127.0.0.1",
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER ?? "root",
    password: process.env.DB_PASSWORD ?? "",
    database: process.env.DB_NAME ?? "spektrotek",
  };
}

async function main() {
  loadEnv();
  const cfg = resolveConfig();
  if (!cfg.database) {
    console.error("HATA: Veritabanı adı bulunamadı (DB_NAME veya DATABASE_URL).");
    process.exit(1);
  }

  const ssl =
    process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined;

  console.log(`→ Bağlanılıyor: ${cfg.user}@${cfg.host}:${cfg.port} (db: ${cfg.database})`);

  // Önce veritabanı olmadan bağlan, gerekiyorsa oluştur.
  const conn = await mysql.createConnection({
    host: cfg.host,
    port: cfg.port,
    user: cfg.user,
    password: cfg.password,
    multipleStatements: true,
    ssl,
  });

  try {
    // Paylaşımlı hostingde (cPanel vb.) CREATE DATABASE yetkisi olmayabilir;
    // bu durumda veritabanı zaten panelden oluşturulmuştur — hatayı yut ve devam et.
    try {
      await conn.query(
        `CREATE DATABASE IF NOT EXISTS \`${cfg.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`,
      );
    } catch (e) {
      console.log(`  (CREATE DATABASE atlandı: ${e.code || e.message} — mevcut DB kullanılacak)`);
    }
    await conn.query(`USE \`${cfg.database}\`;`);

    const schema = fs.readFileSync(path.join(process.cwd(), "db", "schema.sql"), "utf8");
    console.log("→ Şema yükleniyor (db/schema.sql)...");
    await conn.query(schema);

    const seed = fs.readFileSync(path.join(process.cwd(), "db", "seed.sql"), "utf8");
    console.log("→ Başlangıç verisi yükleniyor (db/seed.sql)...");
    await conn.query(seed);

    const [tables] = await conn.query("SHOW TABLES;");
    console.log(`✓ Tamam. ${tables.length} tablo hazır.`);
    console.log("  Admin girişi: admin@spektrotek.com / spektrotek123");
  } finally {
    await conn.end();
  }
}

main().catch((err) => {
  console.error("\n✗ Kurulum başarısız:", err.code || "", err.message);
  if (err.code === "ECONNREFUSED") {
    console.error(
      "  MySQL sunucusuna ulaşılamıyor. .env.local içindeki DB_HOST/DB_PORT değerlerini kontrol edin.",
    );
  } else if (err.code === "ER_ACCESS_DENIED_ERROR") {
    console.error("  Kullanıcı adı/şifre hatalı (DB_USER/DB_PASSWORD).");
  }
  process.exit(1);
});
