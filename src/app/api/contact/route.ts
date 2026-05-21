import { Resend } from "resend";
import { contactSchema } from "@/lib/schemas";

// In-memory rate limiter — resets on cold start (acceptable for low-traffic landing page)
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const maxRequests = 5;

  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < windowMs
  );

  if (timestamps.length >= maxRequests) return true;

  requestLog.set(ip, [...timestamps, now]);
  return false;
}

function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(request: Request) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return Response.json({ error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return Response.json({ error: "Invalid data" }, { status: 400 });
  }

  const { name, phone, industry, budget, honeypot } = result.data;

  if (honeypot && honeypot.length > 0) {
    return Response.json({ error: "Invalid submission" }, { status: 400 });
  }

  if (process.env.RESEND_API_KEY && process.env.RESEND_TO_EMAIL) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "formularz@twoja-domena.pl",
      to: process.env.RESEND_TO_EMAIL,
      subject: `Nowy lead: ${name} (${industry})`,
      text: [
        `Imie: ${name}`,
        `Telefon: ${phone}`,
        `Branza: ${industry}`,
        `Budzet: ${budget}`,
      ].join("\n"),
    });
  }

  return Response.json({ ok: true });
}
