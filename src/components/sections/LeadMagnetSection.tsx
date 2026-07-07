const BENEFITS = [
  "Omówimy szczegóły Twojego projektu",
  "Odpowiem na wszystkie pytania",
  "Wycena bez zobowiązań",
];

const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

export default function LeadMagnetSection() {
  const href = calendlyUrl ?? "#formularz";
  const isExternal = href.startsWith("http");

  return (
    <section id="konsultacja" className="py-24 relative overflow-hidden" style={{ background: "#060A14" }}>
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-2xl mx-auto px-6 text-center">
        <h2
          className="font-heading font-bold text-white mb-6 leading-tight"
          style={{
            fontSize: "clamp(1.75rem, 3.5vw + 0.5rem, 2.75rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Porozmawiajmy o Twoim projekcie
        </h2>

        <ul className="inline-flex flex-col gap-3 mb-10 text-left">
          {BENEFITS.map((b) => (
            <li key={b} className="flex items-center gap-3">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)" }}
              >
                <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path
                    d="M2 6L5 9L10 3"
                    stroke="#C9A84C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-slate-300">{b}</span>
            </li>
          ))}
        </ul>

        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="btn-gold inline-block text-lg px-10 py-4 rounded-[14px]"
        >
          Umów bezpłatną konsultację →
        </a>

        <p className="mt-4 text-slate-600 text-sm">Czas trwania: 30 minut · Całkowicie bezpłatnie</p>
      </div>
    </section>
  );
}
