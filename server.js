// cPanel (Phusion Passenger) başlangıç dosyası.
// cPanel → "Setup Node.js App" → "Application startup file" = server.js
//
// Passenger, PORT ortam değişkenini sağlar; Next.js üretim yapısını (.next) sunar.
// Önce `npm run build` çalıştırılmış olmalıdır.
const { createServer } = require("node:http");
const next = require("next");

const port = process.env.PORT || 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`Spektrotek üretim sunucusu ${port} portunda hazır`);
  });
});
