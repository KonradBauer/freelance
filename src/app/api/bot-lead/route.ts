import { z } from "zod";
import { Resend } from "resend";

const emailLog = new Map<string, number>();

function isEmailRateLimited(email: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const last = emailLog.get(email);
  if (last && now - last < windowMs) return true;
  emailLog.set(email, now);
  return false;
}

const botLeadSchema = z.object({
  purpose: z.string().max(200),
  hasWebsite: z.string().max(200).optional(),
  businessType: z.string().max(200).optional(),
  goal: z.string().max(200).optional(),
  budget: z.string().max(200).optional(),
  timeline: z.string().max(200).optional(),
  email: z.string().email(),
  gdprTimestamp: z.string().max(100).optional(),
  secret: z.string(),
});

type BotLeadData = z.infer<typeof botLeadSchema>;

function buildKonradEmail(data: BotLeadData): string {
  return [
    "Nowy lead z chatbota",
    "",
    `Email: ${data.email}`,
    `Cel: ${data.purpose}`,
    `Strona: ${data.hasWebsite ?? "-"}`,
    `Biznes: ${data.businessType ?? "-"}`,
    `Goal: ${data.goal ?? "-"}`,
    `Budżet: ${data.budget ?? "-"}`,
    `Timeline: ${data.timeline ?? "-"}`,
    `GDPR: ${data.gdprTimestamp ?? "-"}`,
    "",
    "Calendly: https://calendly.com/konradbauer94/30min",
  ].join("\n");
}

function buildConfirmationEmail(goal: string): string {
  const goalLine = goal ? `Na podstawie tego co powiedziałeś (${goal}) - to brzmi jak projekt w mojej specjalizacji.` : "To brzmi jak projekt w mojej specjalizacji.";
  return [
    "Cześć!",
    "",
    "Odebrałem Twoje zgłoszenie.",
    goalLine,
    "",
    "Odezwę się w ciągu 24 godzin z kilkoma przykładami z portfolio.",
    "",
    "Jeśli chcesz przyspieszyć - możesz od razu umówić 30-minutową rozmowę:",
    "https://calendly.com/konradbauer94/30min",
    "",
    "Konrad",
    "studiocodeart.pl | +48 781 573 274",
  ].join("\n");
}

function buildReminder1Email(): string {
  return [
    "Cześć,",
    "",
    "Wyobrażasz sobie jak Twoja strona powinna wyglądać? (kolory firmy, przykłady stron które lubisz?)",
    "",
    "Takie info przyspiesza wycenę 3-krotnie. Odpowiedz mailem lub umów rozmowę:",
    "https://calendly.com/konradbauer94/30min",
    "",
    "Konrad",
    "studiocodeart.pl",
  ].join("\n");
}

function buildReminder2Email(): string {
  return [
    "Cześć,",
    "",
    "Ostatnia wiadomość ode mnie - jeśli to nie ten moment, spoko.",
    "",
    "Odezwij się gdy będziesz gotowy - moje portfolio: https://www.studiocodeart.pl/#portfolio",
    "",
    "Konrad",
    "studiocodeart.pl",
  ].join("\n");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = botLeadSchema.safeParse(body);
  if (!result.success) {
    return Response.json({ error: "Invalid data" }, { status: 400 });
  }

  const data = result.data;

  const expectedSecret = process.env.BOT_WEBHOOK_SECRET;
  if (!expectedSecret || data.secret !== expectedSecret) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (isEmailRateLimited(data.email)) {
    return Response.json({ error: "Already processed" }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.RESEND_TO_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  if (apiKey && toEmail) {
    const resend = new Resend(apiKey);
    const twoDays = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString();
    const sevenDays = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    await Promise.allSettled([
      resend.emails.send({
        from: fromEmail,
        to: toEmail,
        subject: `Nowy lead z chatbota: ${data.purpose}`,
        text: buildKonradEmail(data),
      }),
      resend.emails.send({
        from: fromEmail,
        to: data.email,
        subject: "Odebrałem Twoje zgłoszenie - Konrad",
        text: buildConfirmationEmail(data.goal ?? ""),
      }),
      resend.emails.send({
        from: fromEmail,
        to: data.email,
        subject: "Masz jeszcze pytania o projekt?",
        text: buildReminder1Email(),
        scheduledAt: twoDays,
      }),
      resend.emails.send({
        from: fromEmail,
        to: data.email,
        subject: "Ostatnia wiadomość ode mnie",
        text: buildReminder2Email(),
        scheduledAt: sevenDays,
      }),
    ]);
  }

  return Response.json({ ok: true });
}
