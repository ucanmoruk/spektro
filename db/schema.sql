-- Spektrotek Market — MySQL 8 şeması
-- Karakter seti: utf8mb4 (Türkçe karakter ve emoji desteği), motor: InnoDB (foreign key).
--
-- Kurulum:
--   mysql -u <user> -p < db/schema.sql
--   mysql -u <user> -p <db_adi> < db/seed.sql
--
-- Not: Fiyatlar DECIMAL(12,2) — kayan nokta yuvarlama hatalarından kaçınmak için.

SET NAMES utf8mb4;
SET time_zone = '+00:00';

-- Veritabanını da burada oluşturmak isterseniz aşağıdaki iki satırı açın:
-- CREATE DATABASE IF NOT EXISTS spektrotek CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE spektrotek;

-- ---------------------------------------------------------------------------
-- Kullanıcılar (müşteri + admin, role ile ayrışır)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id              BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email           VARCHAR(190) NOT NULL,
  password_hash   VARCHAR(255) NOT NULL,
  full_name       VARCHAR(160) NOT NULL,
  phone           VARCHAR(40)  NULL,
  company         VARCHAR(160) NULL,
  tax_office      VARCHAR(120) NULL,          -- vergi dairesi (kurumsal)
  tax_number      VARCHAR(40)  NULL,          -- vergi/TC no
  role            ENUM('customer','admin') NOT NULL DEFAULT 'customer',
  is_active       TINYINT(1) NOT NULL DEFAULT 1,
  created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Oturumlar (httpOnly cookie ile ilişkili, iptal edilebilir)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sessions (
  id           CHAR(64) NOT NULL,             -- token'ın SHA-256 özeti (ham token yalnızca cookie'de)
  user_id      BIGINT UNSIGNED NOT NULL,
  user_agent   VARCHAR(255) NULL,
  ip           VARCHAR(64) NULL,
  expires_at   DATETIME NOT NULL,
  created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_sessions_user (user_id),
  KEY idx_sessions_expires (expires_at),
  CONSTRAINT fk_sessions_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Markalar
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS brands (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name       VARCHAR(120) NOT NULL,
  slug       VARCHAR(140) NOT NULL,
  logo_url   VARCHAR(500) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_brands_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Kategoriler (parent_id ile hiyerarşik)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS categories (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name       VARCHAR(120) NOT NULL,
  slug       VARCHAR(140) NOT NULL,
  parent_id  BIGINT UNSIGNED NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_categories_slug (slug),
  KEY idx_categories_parent (parent_id),
  CONSTRAINT fk_categories_parent FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Ürünler
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
  id                BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  slug              VARCHAR(180) NOT NULL,
  name              VARCHAR(220) NOT NULL,
  brand_id          BIGINT UNSIGNED NULL,
  category_id       BIGINT UNSIGNED NULL,
  sku               VARCHAR(80)  NULL,
  short_description VARCHAR(400) NULL,
  description       MEDIUMTEXT   NULL,          -- zengin metin (HTML)
  shipping_info     MEDIUMTEXT   NULL,          -- stok & kargo açıklaması
  price             DECIMAL(12,2) NULL,       -- NULL => "Fiyat için danışın"
  discounted_price  DECIMAL(12,2) NULL,
  currency          CHAR(3) NOT NULL DEFAULT 'EUR',
  stock             INT NOT NULL DEFAULT 0,
  is_direct_sale    TINYINT(1) NOT NULL DEFAULT 1,  -- 1: sepete ekle/öde, 0: teklif iste
  is_active         TINYINT(1) NOT NULL DEFAULT 1,
  seo_title         VARCHAR(220) NULL,
  seo_description   VARCHAR(400) NULL,
  seo_keywords      VARCHAR(400) NULL,
  created_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_products_slug (slug),
  UNIQUE KEY uq_products_sku (sku),
  KEY idx_products_brand (brand_id),
  KEY idx_products_category (category_id),
  KEY idx_products_active (is_active),
  CONSTRAINT fk_products_brand FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE SET NULL,
  CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Ürün görselleri (bir ürün için birden çok)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS product_images (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  product_id BIGINT UNSIGNED NOT NULL,
  url        VARCHAR(500) NOT NULL,
  alt        VARCHAR(220) NULL,
  sort_order INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  KEY idx_product_images_product (product_id),
  CONSTRAINT fk_product_images_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Ürün teknik özellikleri (parametreli — sabit slug + değer; filtre/karşılaştırma için)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS product_specs (
  id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  product_id BIGINT UNSIGNED NOT NULL,
  spec_slug  VARCHAR(120) NOT NULL,           -- sabit slug (ör. "akis-hizi")
  label      VARCHAR(160) NOT NULL,           -- görünen ad (ör. "Akış Hızı")
  value      VARCHAR(400) NOT NULL,           -- değer (ör. "0.01–10 mL/dk")
  sort_order INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  KEY idx_product_specs_product (product_id),
  KEY idx_product_specs_slug (spec_slug),
  CONSTRAINT fk_product_specs_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Siparişler
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
  id                BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  order_number      VARCHAR(24) NOT NULL,     -- insan-okur referans: SPK-2026-000123
  user_id           BIGINT UNSIGNED NULL,     -- misafir sipariş için NULL olabilir
  status            ENUM('pending','paid','processing','shipped','completed','cancelled','refunded')
                      NOT NULL DEFAULT 'pending',
  currency          CHAR(3) NOT NULL DEFAULT 'EUR',
  subtotal          DECIMAL(12,2) NOT NULL DEFAULT 0,
  shipping_total    DECIMAL(12,2) NOT NULL DEFAULT 0,
  tax_total         DECIMAL(12,2) NOT NULL DEFAULT 0,
  total             DECIMAL(12,2) NOT NULL DEFAULT 0,
  -- Müşteri/teslimat bilgileri (sipariş anındaki snapshot)
  customer_name     VARCHAR(160) NOT NULL,
  customer_email    VARCHAR(190) NOT NULL,
  customer_phone    VARCHAR(40)  NULL,
  company           VARCHAR(160) NULL,
  shipping_address  VARCHAR(500) NULL,
  shipping_city     VARCHAR(120) NULL,
  shipping_country  VARCHAR(120) NULL DEFAULT 'Türkiye',
  notes             VARCHAR(1000) NULL,
  payment_provider  VARCHAR(40) NULL,         -- 'manual' | 'iyzico' | 'stripe'
  payment_status    ENUM('unpaid','pending','paid','failed','refunded') NOT NULL DEFAULT 'unpaid',
  created_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_orders_number (order_number),
  KEY idx_orders_user (user_id),
  KEY idx_orders_status (status),
  KEY idx_orders_created (created_at),
  CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Sipariş kalemleri (ürün bilgisini snapshot'lar — ürün sonradan değişse de sipariş sabit)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS order_items (
  id          BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  order_id    BIGINT UNSIGNED NOT NULL,
  product_id  BIGINT UNSIGNED NULL,
  name        VARCHAR(220) NOT NULL,
  sku         VARCHAR(80) NULL,
  unit_price  DECIMAL(12,2) NOT NULL,
  quantity    INT NOT NULL DEFAULT 1,
  line_total  DECIMAL(12,2) NOT NULL,
  PRIMARY KEY (id),
  KEY idx_order_items_order (order_id),
  KEY idx_order_items_product (product_id),
  CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Ödeme kayıtları (sağlayıcı bazlı; iyzico/stripe/manual)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS payments (
  id           BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  order_id     BIGINT UNSIGNED NOT NULL,
  provider     VARCHAR(40) NOT NULL,          -- 'manual' | 'iyzico' | 'stripe'
  provider_ref VARCHAR(191) NULL,             -- sağlayıcı işlem/oturum kimliği
  amount       DECIMAL(12,2) NOT NULL,
  currency     CHAR(3) NOT NULL DEFAULT 'EUR',
  status       ENUM('created','pending','succeeded','failed','refunded') NOT NULL DEFAULT 'created',
  raw          JSON NULL,                      -- sağlayıcı ham yanıtı (denetim için)
  created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_payments_order (order_id),
  KEY idx_payments_ref (provider_ref),
  CONSTRAINT fk_payments_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------------
-- Teklif talepleri (is_direct_sale = 0 ürünler için)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS quote_requests (
  id           BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id      BIGINT UNSIGNED NULL,
  name         VARCHAR(160) NOT NULL,
  email        VARCHAR(190) NOT NULL,
  phone        VARCHAR(40) NULL,
  company      VARCHAR(160) NULL,
  message      VARCHAR(2000) NULL,
  status       ENUM('new','contacted','quoted','won','lost') NOT NULL DEFAULT 'new',
  created_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_quote_requests_user (user_id),
  KEY idx_quote_requests_status (status),
  CONSTRAINT fk_quote_requests_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS quote_request_items (
  id               BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  quote_request_id BIGINT UNSIGNED NOT NULL,
  product_id       BIGINT UNSIGNED NULL,
  name             VARCHAR(220) NOT NULL,
  brand            VARCHAR(120) NULL,
  quantity         INT NOT NULL DEFAULT 1,
  PRIMARY KEY (id),
  KEY idx_quote_items_request (quote_request_id),
  CONSTRAINT fk_quote_items_request FOREIGN KEY (quote_request_id) REFERENCES quote_requests(id) ON DELETE CASCADE,
  CONSTRAINT fk_quote_items_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
