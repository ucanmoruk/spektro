/**
 * Idempotent migration'lar (mevcut şemaya güvenli ekleme).
 * `.env.local` bağlantısını kullanır. Çalıştırma:  npm run db:migrate
 */
import fs from "node:fs";
import path from "node:path";
import mysql from "mysql2/promise";

function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    const p = path.join(process.cwd(), file);
    if (!fs.existsSync(p)) continue;
    for (const line of fs.readFileSync(p, "utf8").split("\n")) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const eq = t.indexOf("=");
      if (eq === -1) continue;
      const k = t.slice(0, eq).replace(/^export\s+/, "").trim();
      let v = t.slice(eq + 1).trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'")))
        v = v.slice(1, -1);
      if (!(k in process.env)) process.env[k] = v;
    }
  }
}

async function columnExists(conn, db, table, column) {
  const [rows] = await conn.query(
    `SELECT 1 FROM information_schema.COLUMNS WHERE TABLE_SCHEMA=? AND TABLE_NAME=? AND COLUMN_NAME=?`,
    [db, table, column],
  );
  return rows.length > 0;
}

async function main() {
  loadEnv();
  const db = process.env.DB_NAME;
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: db,
    multipleStatements: true,
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
  });

  try {
    // 1) products.shipping_info
    if (!(await columnExists(conn, db, "products", "shipping_info"))) {
      await conn.query(
        `ALTER TABLE products ADD COLUMN shipping_info MEDIUMTEXT NULL AFTER description`,
      );
      console.log("✓ products.shipping_info eklendi");
    } else {
      console.log("• products.shipping_info zaten var");
    }

    // 2) product_specs tablosu
    await conn.query(`
      CREATE TABLE IF NOT EXISTS product_specs (
        id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
        product_id BIGINT UNSIGNED NOT NULL,
        spec_slug  VARCHAR(120) NOT NULL,
        label      VARCHAR(160) NOT NULL,
        value      VARCHAR(400) NOT NULL,
        sort_order INT NOT NULL DEFAULT 0,
        PRIMARY KEY (id),
        KEY idx_product_specs_product (product_id),
        KEY idx_product_specs_slug (spec_slug),
        CONSTRAINT fk_product_specs_product FOREIGN KEY (product_id)
          REFERENCES products(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    console.log("✓ product_specs tablosu hazır");

    const addColumn = async (table, column, ddl) => {
      if (!(await columnExists(conn, db, table, column))) {
        await conn.query(`ALTER TABLE ${table} ADD COLUMN ${ddl}`);
        console.log(`✓ ${table}.${column} eklendi`);
      } else {
        console.log(`• ${table}.${column} zaten var`);
      }
    };

    await addColumn(
      "users",
      "invoice_type",
      "invoice_type ENUM('individual','corporate') NOT NULL DEFAULT 'individual' AFTER phone",
    );
    await addColumn("users", "address", "address VARCHAR(500) NULL AFTER tax_number");
    await addColumn("users", "city", "city VARCHAR(120) NULL AFTER address");
    await addColumn("users", "district", "district VARCHAR(120) NULL AFTER city");

    await addColumn(
      "orders",
      "invoice_type",
      "invoice_type ENUM('individual','corporate') NOT NULL DEFAULT 'individual' AFTER customer_phone",
    );
    await addColumn("orders", "tax_office", "tax_office VARCHAR(120) NULL AFTER company");
    await addColumn("orders", "tax_number", "tax_number VARCHAR(40) NULL AFTER tax_office");

    console.log("Migration tamamlandı.");
  } finally {
    await conn.end();
  }
}

main().catch((err) => {
  console.error("✗ Migration hatası:", err.code || "", err.message);
  process.exit(1);
});
