import { contactSchema } from "@/lib/schemas";
import { buildClientConfirmationEmail, sendEmail } from "@/lib/mailer";

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

  const { projectType, name, phone, industry, budget, clientEmail, projectDescription, honeypot } = result.data;

  if (honeypot && honeypot.length > 0) {
    return Response.json({ error: "Invalid submission" }, { status: 400 });
  }

  const toEmail = process.env.RESEND_TO_EMAIL;
  if (toEmail) {
    try {
      await sendEmail({
        to: toEmail,
        subject: `Nowy lead: ${name} - ${projectType}`,
        text: [
          `Typ projektu: ${projectType}`,
          `Imię: ${name}`,
          `Telefon: ${phone}`,
          `Branża: ${industry}`,
          `Budżet: ${budget}`,
          ...(projectDescription ? [`\nOpis projektu:\n${projectDescription}`] : []),
        ].join("\n"),
      });
    } catch (err) {
      console.error("[contact] sendEmail failed:", err);
      return Response.json({ error: "Email delivery failed" }, { status: 500 });
    }
  } else {
    console.warn("[contact] RESEND_TO_EMAIL not set — email skipped");
  }

  if (clientEmail) {
    try {
      const { text, html } = buildClientConfirmationEmail(name);
      await sendEmail({ to: clientEmail, subject: "Dziekuje za kontakt! Odezwe sie wkrotce", text, html });
    } catch (err) {
      console.error("[contact] client confirmation email failed:", err);
    }
  }

  return Response.json({ ok: true });
}
