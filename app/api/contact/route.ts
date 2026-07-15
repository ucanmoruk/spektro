import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  message: string;
  createdAt: string;
};

const storagePath = path.join(process.cwd(), "data", "contact-submissions.json");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const company = String(body.company ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { ok: false, error: "Ad soyad, e-posta, telefon ve mesaj zorunludur." },
        { status: 400 },
      );
    }

    await mkdir(path.dirname(storagePath), { recursive: true });

    let submissions: ContactSubmission[] = [];
    try {
      const raw = await readFile(storagePath, "utf8");
      submissions = JSON.parse(raw) as ContactSubmission[];
    } catch {
      submissions = [];
    }

    submissions.unshift({
      id: randomUUID(),
      name,
      email,
      phone,
      company: company || null,
      message,
      createdAt: new Date().toISOString(),
    });

    await writeFile(storagePath, `${JSON.stringify(submissions.slice(0, 500), null, 2)}\n`, "utf8");

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("contact form error", error);
    return NextResponse.json(
      { ok: false, error: "Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin." },
      { status: 500 },
    );
  }
}
