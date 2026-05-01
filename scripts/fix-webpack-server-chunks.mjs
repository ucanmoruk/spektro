/**
 * Next.js 15.5.x (Webpack) can emit server webpack-runtime that does
 * `require("./" + chunkId + ".js")` from `.next/server/` while async
 * chunks live under `.next/server/chunks/`. Copy numeric chunk files
 * up one level so production `next start` / require() resolves them.
 *
 * Safe to run after every `next build`; idempotent for same content.
 */
import fs from "node:fs";
import path from "node:path";

const serverDir = path.join(process.cwd(), ".next", "server");
const chunksDir = path.join(serverDir, "chunks");

if (!fs.existsSync(chunksDir)) {
  console.warn("fix-webpack-server-chunks: no .next/server/chunks — skip");
  process.exit(0);
}

const numericJs = /^(\d+)\.js$/;
let copied = 0;

for (const name of fs.readdirSync(chunksDir)) {
  const m = name.match(numericJs);
  if (!m) continue;
  const from = path.join(chunksDir, name);
  const to = path.join(serverDir, name);
  if (!fs.statSync(from).isFile()) continue;
  fs.copyFileSync(from, to);
  copied += 1;
}

if (copied > 0) {
  console.log(`fix-webpack-server-chunks: copied ${copied} chunk(s) to .next/server`);
}
