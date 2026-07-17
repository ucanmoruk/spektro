# cPanel Production Deploy

Bu proje cPanel Node.js App ile `/home/spektrotek/spektrotek.com` altında çalışacak şekilde hazırlanmıştır.

## cPanel Node.js App Ayarları

- Node.js version: `20.20.2`
- Application mode: `production`
- Application root: `/home/spektrotek/spektrotek.com`
- Application URL: `spektrotek.com`
- Application startup file: `server.js`

## Environment

cPanel Node.js App ortam değişkenleri ekranı bu sunucuda güvenilir çalışmadığı için env değerleri dosyadan okunur.

`/home/spektrotek/spektrotek.com/.env.production` dosyasını cPanel File Manager üzerinden gerçek bilgilerle doldurun:

```env
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://spektrotek.com
DB_HOST=localhost
DB_PORT=3306
DB_USER=...
DB_PASSWORD=...
DB_NAME=...
DB_SSL=false
```

`server.js`, başlangıçta `.env.production` dosyasını otomatik yükler. Ödeme veya SMTP gibi ek servisler aktif edilecekse ilgili env değerleri de aynı dosyaya eklenmelidir.

## Local Hazırlık

Yüklemeden önce lokal makinede:

```bash
npm install
npm run lint
rm -rf .next
npm run build
```

## Standalone Zip İçeriği

cPanel File Manager ile `/home/spektrotek/spektrotek.com` içine açılacak standalone zip içinde şunlar olmalı:

```text
server.js
.env.production
node_modules/
.next/
public/
package.json
```

Şunlar zip'e eklenmemeli:

```text
.git/
.env.local
package-lock.json
```

> Not: cPanel disk kotası ve `npm install` hataları nedeniyle standalone deploy kullanılır. Bu pakette gerekli runtime `node_modules` zaten vardır. cPanel'de `Run NPM Install` çalıştırmayın.

## cPanel Üzerinde

1. Zip dosyasını `/home/spektrotek/spektrotek.com` içine yükle ve aç.
2. `.env.production` dosyasını gerçek canlı bilgilerle düzenle.
3. Node.js App ekranında startup file `server.js` olduğundan emin ol.
4. `Run NPM Install` çalıştırma.
5. `Restart App` yap.
6. Siteyi canlı domain üzerinden kontrol et.

## Yayın Sonrası Kontrol

Şu URL'ler mutlaka açılmalı:

```text
/
/market
/kampanya/knauer-azura-hplc
/admin
/sitemap.xml
/robots.txt
/llms.txt
/google-merchant.xml
/manifest.webmanifest
```

Google Analytics kontrolü için sayfa kaynağında `G-94QBVKYVM0` görünmelidir.
