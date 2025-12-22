// FILE: src/lib/email.ts
import nodemailer from "nodemailer";

const host  = process.env.SMTP_HOST!;
const port  = Number(process.env.SMTP_PORT || 587);
const user  = process.env.SMTP_USER!;
const pass  = process.env.SMTP_PASS!;
const from  = process.env.FROM_EMAIL || user;
const to    = process.env.TO_EMAIL!;

if (!host || !user || !pass || !to) {
  console.warn("[email] Missing SMTP or TO_EMAIL env vars");
}

export const transporter = nodemailer.createTransport({
  host, port, secure: false, auth: { user, pass },
});

export async function verifySmtp() {
  try { await transporter.verify(); return true; }
  catch (e) { console.error("[email] SMTP verify FAILED:", (e as Error).message); throw e; }
}

export async function sendContactMail(payload: {
  fullName: string; email: string; phone?: string; service?: string; message: string;
}) {
  await transporter.verify();
  const subject = `Νέο μήνυμα — ${payload.service || "Επικοινωνία"}`;
  const text =
    `Όνομα: ${payload.fullName}\n` +
    `Email: ${payload.email}\n` +
    `Τηλέφωνο: ${payload.phone || "-"}\n` +
    `Υπηρεσία: ${payload.service || "-"}\n\n` +
    `${payload.message}\n`;

  return transporter.sendMail({
    from, to, replyTo: payload.email, subject, text,
  });
}
