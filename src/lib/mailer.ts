interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
  scheduledAt?: string;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) return;

  const fromEmail = process.env.FROM_EMAIL ?? "kontakt@studiocodeart.pl";

  const body: Record<string, unknown> = {
    sender: { email: fromEmail, name: "Konrad | Studio Code Art" },
    to: [{ email: options.to }],
    subject: options.subject,
    textContent: options.text,
    ...(options.html && { htmlContent: options.html }),
  };

  if (options.scheduledAt) {
    body.scheduledAt = options.scheduledAt;
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Brevo API error ${response.status}: ${errorText}`);
  }
}

export function buildClientConfirmationEmail(name: string): { text: string; html: string } {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://studiocodeart.pl";

  const text = [
    `Cześć ${name},`,
    "",
    "Dziękuję za kontakt. Odezwę się w ciągu 24 godzin z wyceną i odpowiedziami na pytania.",
    "",
    "Konrad Bauer",
    "Studio Code Art",
    siteUrl,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="pl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <!-- Logo header -->
        <tr>
          <td align="center" style="padding-bottom:24px;">
            <a href="${siteUrl}" style="text-decoration:none;">
              <img src="${siteUrl}/logo.png" alt="Studio Code Art" width="160" style="display:block;height:auto;" />
            </a>
          </td>
        </tr>

        <!-- Card -->
        <tr>
          <td style="background:#060A14;border-radius:16px;padding:40px 36px;border:1px solid rgba(201,168,76,0.15);">

            <!-- Greeting -->
            <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#F0D060;">Cześć, ${name}! 👋</p>
            <p style="margin:0 0 28px;font-size:15px;color:#94A3B8;line-height:1.6;">
              Dziękuję za kontakt. Już pracuję nad Twoją sprawą i odezwę się w ciągu <strong style="color:#E2E8F0;">24 godzin</strong> z wyceną dopasowaną do Twojego projektu.
            </p>

            <!-- Divider -->
            <div style="height:1px;background:rgba(201,168,76,0.15);margin:0 0 28px;"></div>

            <!-- Co dalej -->
            <p style="margin:0 0 16px;font-size:13px;font-weight:600;color:#C9A84C;letter-spacing:0.08em;text-transform:uppercase;">Co dalej?</p>
            <table cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="padding:0 0 14px;">
                  <span style="display:inline-block;width:24px;height:24px;background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.3);border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;color:#C9A84C;vertical-align:middle;margin-right:10px;">1</span>
                  <span style="font-size:14px;color:#CBD5E1;vertical-align:middle;">Analizuję Twój projekt i przygotowuję wycenę</span>
                </td>
              </tr>
              <tr>
                <td style="padding:0 0 14px;">
                  <span style="display:inline-block;width:24px;height:24px;background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.3);border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;color:#C9A84C;vertical-align:middle;margin-right:10px;">2</span>
                  <span style="font-size:14px;color:#CBD5E1;vertical-align:middle;">Oddzwaniam lub odpisuję w ciągu 24 godzin</span>
                </td>
              </tr>
              <tr>
                <td>
                  <span style="display:inline-block;width:24px;height:24px;background:rgba(201,168,76,0.12);border:1px solid rgba(201,168,76,0.3);border-radius:50%;text-align:center;line-height:24px;font-size:12px;font-weight:700;color:#C9A84C;vertical-align:middle;margin-right:10px;">3</span>
                  <span style="font-size:14px;color:#CBD5E1;vertical-align:middle;">Zaczynamy pracę nad Twoją stroną</span>
                </td>
              </tr>
            </table>

            <!-- CTA -->
            <div style="margin-top:32px;text-align:center;">
              <a href="${siteUrl}" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#C9A84C,#F0D060);color:#060A14;font-weight:700;font-size:14px;border-radius:12px;text-decoration:none;">
                Zobacz nasze realizacje &rarr;
              </a>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:28px 0 0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" style="padding-bottom:16px;">
                  <img src="${siteUrl}/avatar.png" alt="Konrad Bauer" width="56" height="56" style="border-radius:50%;display:block;margin:0 auto 10px;border:2px solid rgba(201,168,76,0.4);" />
                  <p style="margin:0;font-size:14px;font-weight:600;color:#475569;">Konrad Bauer</p>
                  <p style="margin:4px 0 0;font-size:12px;color:#64748B;">Studio Code Art &bull; <a href="${siteUrl}" style="color:#C9A84C;text-decoration:none;">${siteUrl.replace("https://", "")}</a></p>
                </td>
              </tr>
              <tr>
                <td align="center">
                  <p style="margin:0;font-size:11px;color:#94A3B8;">Wysłałeś(-aś) formularz kontaktowy na stronie ${siteUrl.replace("https://", "")}.<br>Jeśli to pomyłka, możesz zignorować tę wiadomość.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { text, html };
}

function buildFooter(siteUrl: string): string {
  return `
        <tr>
          <td style="padding:28px 0 0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" style="padding-bottom:16px;">
                  <img src="${siteUrl}/avatar.png" alt="Konrad Bauer" width="56" height="56" style="border-radius:50%;display:block;margin:0 auto 10px;border:2px solid rgba(201,168,76,0.4);" />
                  <p style="margin:0;font-size:14px;font-weight:600;color:#475569;">Konrad Bauer</p>
                  <p style="margin:4px 0 0;font-size:12px;color:#64748B;">Studio Code Art &bull; <a href="${siteUrl}" style="color:#C9A84C;text-decoration:none;">${siteUrl.replace("https://", "")}</a></p>
                </td>
              </tr>
            </table>
          </td>
        </tr>`;
}

export function buildReminderEmail(name: string, day: 1 | 3): { subject: string; text: string; html: string } {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://studiocodeart.pl";

  const isDay1 = day === 1;

  const subject = isDay1
    ? `${name}, czy masz chwilę na rozmowę?`
    : `${name}, ostatnia szansa na bezpłatną wycenę`;

  const bodyText = isDay1
    ? `Cześć ${name},\n\nChciałem upewnić się, że moja poprzednia wiadomość dotarła. Jestem gotowy omówić Twój projekt i przygotować bezpłatną wycenę.\n\nOdpisz na tego maila albo zadzwoń.\n\nKonrad Bauer\nStudio Code Art\n${siteUrl}`
    : `Cześć ${name},\n\nTo moja ostatnia wiadomość w tej sprawie. Jeśli zmieniły się Twoje plany, rozumiem. Oferta jest nadal aktualna - możesz wrócić kiedy będziesz gotowy.\n\nKonrad Bauer\nStudio Code Art\n${siteUrl}`;

  const cardText = isDay1
    ? {
        headline: `${name}, czy dotarła moja wiadomość?`,
        body: `Chciałem się upewnić, że otrzymałeś(-aś) moje potwierdzenie. Jestem gotowy omówić Twój projekt i przygotować <strong style="color:#E2E8F0;">bezpłatną wycenę</strong> bez zobowiązań.`,
        cta: "Odpowiedz teraz &rarr;",
      }
    : {
        headline: `${name}, to moja ostatnia wiadomość`,
        body: "Jeśli zmieniły się Twoje plany, rozumiem. Moja oferta jest nadal aktualna i możesz wrócić kiedy będziesz gotowy. Życzę powodzenia!",
        cta: "Wróć kiedy będziesz gotowy &rarr;",
      };

  const html = `<!DOCTYPE html>
<html lang="pl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
        <tr>
          <td align="center" style="padding-bottom:24px;">
            <a href="${siteUrl}"><img src="${siteUrl}/logo.png" alt="Studio Code Art" width="160" style="display:block;height:auto;" /></a>
          </td>
        </tr>
        <tr>
          <td style="background:#060A14;border-radius:16px;padding:40px 36px;border:1px solid rgba(201,168,76,0.15);">
            <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#F0D060;">${cardText.headline}</p>
            <p style="margin:0 0 28px;font-size:15px;color:#94A3B8;line-height:1.6;">${cardText.body}</p>
            <div style="text-align:center;">
              <a href="${siteUrl}" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#C9A84C,#F0D060);color:#060A14;font-weight:700;font-size:14px;border-radius:12px;text-decoration:none;">${cardText.cta}</a>
            </div>
          </td>
        </tr>
        ${buildFooter(siteUrl)}
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject, text: bodyText, html };
}

export function scheduleAt(daysFromNow: number): string {
  const d = new Date(Date.now() + daysFromNow * 24 * 60 * 60 * 1000);
  return d.toISOString().replace(/\.\d{3}Z$/, "+00:00");
}
