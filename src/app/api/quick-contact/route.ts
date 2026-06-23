import { z } from "zod";
import { sendEmail } from "@/lib/mailer";

const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const maxRequests = 5;
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < windowMs);
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

const quickContactSchema = z.object({
  name: z.string().min(2, "Imię musi mieć min. 2 znaki").max(100),
  phone: z
    .string()
    .regex(/^(\+48[\s]?)?(\d{3}[\s-]?\d{3}[\s-]?\d{3})$/, "Podaj prawidłowy numer telefonu"),
  honeypot: z.string().max(0).optional(),
});

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

  const result = quickContactSchema.safeParse(body);
  if (!result.success) {
    return Response.json({ error: "Invalid data" }, { status: 400 });
  }

  const { name, phone, honeypot } = result.data;

  if (honeypot && honeypot.length > 0) {
    return Response.json({ error: "Invalid submission" }, { status: 400 });
  }

  const toEmail = process.env.RESEND_TO_EMAIL;
  if (toEmail) {
    await sendEmail({
      to: toEmail,
      subject: `Szybki kontakt: ${name}`,
      text: [`Imię: ${name}`, `Telefon: ${phone}`, "", "Źródło: modal exit-intent"].join("\n"),
    });
  }

  return Response.json({ ok: true });
}
