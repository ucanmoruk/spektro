# Spektrotek Market — Kurulum

Market bölümü artık gerçek bir e-ticaret altyapısıyla çalışıyor: MySQL veritabanı,
üyelik/oturum sistemi, sipariş & teklif yönetimi ve admin paneli.

## 1) Veritabanını oluştur

MySQL 8 sunucunuzda bir veritabanı açın ve şema + başlangıç verisini yükleyin:

```bash
# Veritabanı (bir kez)
mysql -u root -p -e "CREATE DATABASE spektrotek CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Tablolar
mysql -u root -p spektrotek < db/schema.sql

# Başlangıç verisi (admin kullanıcı + örnek ürünler)
mysql -u root -p spektrotek < db/seed.sql
```

## 2) Ortam değişkenleri

`.env.example` dosyasını `.env.local` olarak kopyalayıp doldurun:

```bash
cp .env.example .env.local
```

En az şunları girin:

- `DATABASE_URL` **veya** `DB_HOST/DB_PORT/DB_USER/DB_PASSWORD/DB_NAME`
- `SESSION_SECRET` → `openssl rand -hex 32` ile üretin
- `PAYMENT_PROVIDER=manual` (ödeme entegrasyonu bağlanana kadar)

## 3) Çalıştır

```bash
npm run dev      # geliştirme
npm run build && npm start   # prod
```

## Veritabanı tablolarını oluşturma (mysql client olmadan)

`mysql` komut satırı kurmaya gerek yok — `.env.local`'deki bilgileri kullanan hazır script:

```bash
npm run db:setup
```

Bu, veritabanına bağlanır, (yetki varsa) veritabanını oluşturur ve
`db/schema.sql` + `db/seed.sql`'i yükler. Tekrar çalıştırmak güvenlidir.

> Paylaşımlı hosting (cPanel) notu: DB'yi cPanel'den oluşturun, kullanıcıyı DB'ye
> ALL PRIVILEGES ile ekleyin. Uzak bilgisayardan bağlanacaksanız cPanel → **Remote
> MySQL**'e kendi IP'nizi ekleyin.

## cPanel'de yayına alma (Passenger / Node.js App)

Görsel yükleme ve dosya sistemi cPanel'de kalıcı çalışır (Vercel'in aksine).

1. **Yerelde derleyin** (paylaşımlı hostingde `next build` belleği zorlayabilir):
   ```bash
   npm run build
   ```
2. Proje dosyalarını uygulama köküne yükleyin — `.next/`, `public/`, `server.js`,
   `package.json`, `db/`, `next.config.ts` dahil. `node_modules` yüklemeyin.
3. cPanel → **Setup Node.js App** → **Create Application**:
   - Node.js sürümü: **20.x** (18+)
   - Application root: yüklediğiniz klasör
   - Application startup file: **`server.js`**
4. **Run NPM Install** düğmesine basın (mysql2 ve bcryptjs saf JS'tir, derleme gerekmez).
5. **Environment variables** bölümüne (veya `.env.local` yükleyin) şunları girin —
   uygulama DB ile aynı sunucuda olduğu için **`DB_HOST=localhost`**:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=spektrotek_xpert
   DB_PASSWORD=...
   DB_NAME=spektrotek_xpert
   SESSION_SECRET=...            # openssl rand -hex 32
   PAYMENT_PROVIDER=paytr
   PAYTR_MERCHANT_ID=...
   PAYTR_MERCHANT_KEY=...
   PAYTR_MERCHANT_SALT=...
   PAYTR_TEST_MODE=0
   NEXT_PUBLIC_SITE_URL=https://spektrotek.com
   ```
6. **Restart** edin. PayTR panelinde Bildirim URL:
   `https://spektrotek.com/api/payments/paytr/callback`

> `DB_HOST=localhost` olduğunda Remote MySQL beyaz listesi uygulama için gerekmez;
> yalnızca yerel geliştirme makinenizden bağlanırken gerekir.

## Girişler

| Alan            | URL         | Not                                   |
| --------------- | ----------- | ------------------------------------- |
| Vitrin (market) | `/market`   | Liste görünümü, filtre, arama, sıralama |
| Ürün detayı     | `/market/<slug>` | Görsel galerisi + sepete/teklife ekle |
| Sepet & ödeme   | `/sepet`    | Sipariş oluşturma / teklif talebi     |
| Üye girişi      | `/giris`    | E-posta + şifre                       |
| Üye kaydı       | `/kayit`    | Yeni müşteri hesabı                   |
| Müşteri paneli  | `/hesabim`  | Kendi siparişlerini izler             |
| Admin paneli    | `/admin`    | Ürün/sipariş/teklif yönetimi          |

**Admin girişi (seed):** `admin@spektrotek.com` / `spektrotek123`
> İlk girişten sonra şifreyi değiştirin. (Şu an değiştirme ekranı yok; DB'den
> `password_hash` güncellenebilir veya bir profil ekranı eklenebilir.)

## Mimari özet

- **DB katmanı:** `lib/db.ts` (mysql2 havuzu), repository'ler `lib/repositories/*`
- **Auth:** `lib/auth.ts` + `lib/session.ts` — bcrypt şifre + httpOnly cookie oturum
  (ham token sadece cookie'de, DB'de SHA-256 özeti). Admin = `users.role='admin'`.
- **Ödeme:** `lib/payments/*` — sağlayıcı soyutlaması. Aktif: `manual`.
  `iyzico` ve `stripe` iskeletleri hazır; anahtarları girip `initiate()` içindeki
  TODO'ları tamamlayınca devreye girer (bkz. `lib/payments/iyzico.ts`).
- **Vitrin:** `/market` sunucu bileşeni DB'den okur, `force-dynamic`. Sepet client
  tarafında (zustand + localStorage), ödeme sunucuya POST edilir ve fiyatlar
  **DB'den yeniden doğrulanır** (client fiyatına güvenilmez).

## Ödeme — PayTR (aktif entegrasyon)

Entegrasyon hazır (`lib/payments/paytr.ts` + `app/api/payments/paytr/callback`).
Devreye almak için 3 gizli anahtarı **`.env.local`** dosyasına yazın (sohbete
yapıştırmayın):

```env
PAYMENT_PROVIDER=paytr
PAYTR_MERCHANT_ID=xxxxxx
PAYTR_MERCHANT_KEY=xxxxxxxxxxxx
PAYTR_MERCHANT_SALT=xxxxxxxxxxxx
PAYTR_TEST_MODE=1          # canlıda 0
NEXT_PUBLIC_SITE_URL=https://alanadınız.com
```

Anahtarlar: **PayTR Mağaza Paneli → Ayarlar → Mağaza Bilgileri**
(Mağaza No = MERCHANT_ID, Mağaza Parola/Key = MERCHANT_KEY, Mağaza Gizli Anahtar =
MERCHANT_SALT).

**PayTR panelinde yapılacak tek ayar — Bildirim URL:**
`https://alanadınız.com/api/payments/paytr/callback`

Akış: Sepette "Siparişi Tamamla" → sipariş oluşur → PayTR güvenli ödeme sayfasına
yönlendirme → ödeme sonrası PayTR sunucumuza bildirim gönderir (hash doğrulanır,
sipariş "Ödendi" olur) → kullanıcı `/odeme-sonuc` sayfasına döner.

> Not: Fiyatlarınız EUR. PayTR hesabınızda döviz (EUR) tahsilatı kapalıysa ya EUR'yu
> açtırın ya da ürün fiyatlarını TRY'ye çevirin (admin panelinden para birimi TL).

## Ürün görseli yükleme

Admin → Ürünler → "Görsel Yükle" ile dosya yüklenir; `public/uploads/products`
altına kaydedilir. **Yazılabilir dosya sistemi gerektirir** (kendi sunucu/VPS/Docker).
Vercel gibi serverless ortamda kalıcı olmaz — orada Vercel Blob/S3'e geçin
(`app/api/admin/upload/route.ts`).

## Şifre değiştirme

Admin → Ayarlar sekmesinden giriş şifresi değiştirilebilir
(`/api/account/password`, giriş yapmış her kullanıcı için çalışır).
