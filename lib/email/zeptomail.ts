// ZeptoMail via SMTP (nodemailer). Transactional only; marketing never mixed in.
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.ZEPTOMAIL_HOST ?? "smtp.zeptomail.com",
  port: Number(process.env.ZEPTOMAIL_PORT ?? 587),
  secure: false,
  auth: { user: process.env.ZEPTOMAIL_USER, pass: process.env.ZEPTOMAIL_PASS },
});

export async function sendMail(opts: { to: string; subject: string; html: string; text?: string }) {
  const from = process.env.MAIL_FROM ?? "Dej. by Ayodeji <hello@yourdomain.com>";
  await transporter.sendMail({ from, ...opts });
}

// UK/NG-aware formatting helpers for templates
export const fmtMoney = (minor: number, currency: "NGN" | "GBP") =>
  new Intl.NumberFormat(currency === "NGN" ? "en-NG" : "en-GB", {
    style: "currency",
    currency,
  }).format(minor / 100);

export const fmtDate = (d: Date, tz: string) =>
  new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short", timeZone: tz }).format(d);
