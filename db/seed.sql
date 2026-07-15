-- Spektrotek Market — başlangıç (seed) verisi
-- Çalıştırma: mysql -u <user> -p <db_adi> < db/seed.sql
--
-- Admin girişi:  admin@spektrotek.com  /  spektrotek123
-- (Şifreyi ilk girişten sonra değiştirin. Hash bcrypt cost=10 ile üretildi.)

SET NAMES utf8mb4;

-- --- Admin kullanıcısı ---------------------------------------------------
INSERT INTO users (email, password_hash, full_name, role, company)
VALUES (
  'admin@spektrotek.com',
  '$2b$10$VLWB416tybKyIddclCNvBuNytcm9yBzjpEvw9D.Z9t7xiJcR98AMe',
  'Spektrotek Yönetici',
  'admin',
  'Spektrotek'
)
ON DUPLICATE KEY UPDATE email = email;

-- --- Markalar ------------------------------------------------------------
INSERT INTO brands (name, slug) VALUES
  ('Knauer', 'knauer'),
  ('SIELC', 'sielc'),
  ('PreXpert', 'prexpert')
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- --- Kategoriler ---------------------------------------------------------
INSERT INTO categories (name, slug, sort_order) VALUES
  ('Sistemler', 'sistemler', 1),
  ('Kolonlar', 'kolonlar', 2),
  ('Yedek Parçalar', 'yedek-parcalar', 3)
ON DUPLICATE KEY UPDATE name = VALUES(name);

-- --- Ürünler -------------------------------------------------------------
INSERT INTO products
  (slug, name, brand_id, category_id, sku, short_description, description,
   price, discounted_price, currency, stock, is_direct_sale, is_active,
   seo_title, seo_description, seo_keywords)
VALUES
  ('knauer-azura-hplc', 'Knauer AZURA HPLC',
    (SELECT id FROM brands WHERE slug='knauer'),
    (SELECT id FROM categories WHERE slug='sistemler'),
    'KNA-AZU-HPLC-001',
    'Modüler analitik HPLC platformu',
    'Yüksek doğruluk ve esnek modüler mimari sunan AZURA HPLC sistemi; kalite kontrol ve Ar-Ge laboratuvarları için idealdir. İhtiyaca göre pompa, dedektör ve otomatik örnekleyici modülleriyle yapılandırılabilir.',
    NULL, NULL, 'EUR', 0, 0, 1,
    'Knauer AZURA HPLC | Spektrotek', 'Modüler Knauer AZURA HPLC sistemleri hakkında ürün ve teklif bilgileri.', 'knauer,hplc,azura,analitik cihaz'),

  ('knauer-uhplc-pompa-modulu', 'Knauer UHPLC Pompa Modülü',
    (SELECT id FROM brands WHERE slug='knauer'),
    (SELECT id FROM categories WHERE slug='sistemler'),
    'KNA-UHPLC-PMP-002',
    'Yüksek basınçlı UHPLC pompa modülü',
    'AZURA platformuyla tam uyumlu, 1000 bar''a kadar dayanıklı UHPLC pompa modülü. Yüksek akış doğruluğu ve düşük dalgalanma sağlar.',
    NULL, NULL, 'EUR', 0, 0, 1,
    'Knauer UHPLC Pompa Modülü | Spektrotek', 'Knauer UHPLC pompa modülü teknik özellikleri ve teklif bilgisi.', 'knauer,uhplc,pompa,modül'),

  ('sielc-primesep-kolon', 'SIELC Primesep Kolon',
    (SELECT id FROM brands WHERE slug='sielc'),
    (SELECT id FROM categories WHERE slug='kolonlar'),
    'SIE-PRI-COL-001',
    'Mixed-mode HPLC kolon',
    'İyonik ve non-polar bileşiklerde güçlü ayrım kabiliyeti sağlayan SIELC Primesep mixed-mode kolon serisi. Zor ayrımlar için yüksek seçicilik.',
    850.00, NULL, 'EUR', 12, 1, 1,
    'SIELC Primesep Kolon | Spektrotek', 'SIELC Primesep kolon ürün detayları, fiyat ve teknik özellikler.', 'sielc,primesep,kolon,hplc'),

  ('sielc-obelisc-n', 'SIELC Obelisc N Kolon',
    (SELECT id FROM brands WHERE slug='sielc'),
    (SELECT id FROM categories WHERE slug='kolonlar'),
    'SIE-OBE-N-001',
    'Liquid Separation Cell teknolojili kolon',
    'SIELC Obelisc N; polar ve iyonik analitlerin eş zamanlı ayrımı için Liquid Separation Cell teknolojisi sunar. Tekrarlanabilir ve dayanıklı.',
    990.00, 890.00, 'EUR', 8, 1, 1,
    'SIELC Obelisc N Kolon | Spektrotek', 'SIELC Obelisc N kolon fiyat ve teknik detayları.', 'sielc,obelisc,kolon,hplc'),

  ('hplc-septa-kit', 'HPLC Septa & Kapak Kiti',
    (SELECT id FROM brands WHERE slug='prexpert'),
    (SELECT id FROM categories WHERE slug='yedek-parcalar'),
    'PRX-SEPTA-KIT-001',
    'Vial septa ve kapak seti (100 adet)',
    'HPLC otomatik örnekleyicileri için uyumlu septa ve kapak kiti. Düşük ekstraksiyon, yüksek sızdırmazlık.',
    120.00, NULL, 'EUR', 150, 1, 1,
    'HPLC Septa & Kapak Kiti | Spektrotek', 'HPLC septa ve kapak kiti fiyat ve stok bilgisi.', 'hplc,septa,vial,kapak,sarf'),

  ('autosampler-seal-kit', 'Autosampler Seal Kit',
    (SELECT id FROM brands WHERE slug='knauer'),
    (SELECT id FROM categories WHERE slug='yedek-parcalar'),
    'KNA-AS-SEAL-001',
    'Otomatik örnekleyici sızdırmazlık kiti',
    'Knauer otomatik örnekleyiciler için orijinal sızdırmazlık (seal) yedek kiti. Periyodik bakım için önerilir.',
    180.00, NULL, 'EUR', 40, 1, 1,
    'Autosampler Seal Kit | Spektrotek', 'Knauer autosampler seal kit fiyat ve stok bilgisi.', 'knauer,autosampler,seal,yedek parça')
ON DUPLICATE KEY UPDATE name = VALUES(name);
