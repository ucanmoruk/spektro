import { NextResponse } from "next/server";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { requireAdmin } from "@/lib/auth";
import { errorResponse } from "@/lib/api-guard";

export const runtime = "nodejs";

const ALLOWED: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/svg+xml": "svg",
  "image/avif": "avif",
};
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

// Ürün görseli yükler ve public/uploads/products altına kaydeder; erişilebilir URL döner.
//
// NOT: Yazılabilir dosya sistemi gerektirir (kendi sunucunuz / VPS / Docker).
// Vercel gibi salt-okunur/serverless ortamda kalıcı olmaz — orada Vercel Blob veya
// S3 gibi bir depolama kullanın (bu route'u ona göre değiştirin).
export async function POST(request: Request) {
  try {
    await requireAdmin();
    const form = await request.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      throw new Error("Dosya bulunamadı.");
    }
    const ext = ALLOWED[file.type];
    if (!ext) {
      throw new Error("Desteklenmeyen dosya türü. (jpg, png, webp, gif, svg, avif)");
    }
    if (file.size > MAX_BYTES) {
      throw new Error("Dosya boyutu 5 MB'ı aşamaz.");
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const name = `${crypto.randomBytes(12).toString("hex")}.${ext}`;
    const dir = path.join(process.cwd(), "public", "uploads", "products");
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(path.join(dir, name), bytes);

    return NextResponse.json({ ok: true, url: `/uploads/products/${name}` });
  } catch (err) {
    return errorResponse(err);
  }
}
