interface EmailOptions {
  to: string;
  subject: string;
  text: string;
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
