// FILE: src/app/api/contact/route.ts
export const runtime = "nodejs"; // γιατί Nodemailer χρειάζεται Node runtime

import { NextResponse } from "next/server";
import { sendContactMail, verifySmtp } from  "@/app/lib/email"; // <-- 3 επίπεδα πίσω

const bad = (msg: string, code = 400) =>
  NextResponse.json({ ok: false, error: msg }, { status: code });

export async function GET() {
  try {
    await verifySmtp();
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "SMTP error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { fullName, email, phone, service, message } = await req.json();
    if (!fullName || !email || !message) return bad("Missing required fields.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad("Invalid email.");

    await sendContactMail({ fullName, email, phone, service, message });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    const dev = process.env.NODE_ENV !== "production";
    return NextResponse.json(
      { ok: false, error: dev ? e?.message : "Server error" },
      { status: 500 }
    );
  }
}
