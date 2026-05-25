const AFTER_POINTS = [
  "Klienci znajdują Cię w Google i na Facebooku, nie konkurencję",
  "Strona sprzedaje za Ciebie 24/7, nawet gdy śpisz",
  "Wyglądasz profesjonalnie. Klienci mają do Ciebie zaufanie od pierwszej sekundy",
  "Masz stały napływ zapytań, nie tylko polecenia",
];

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-4 h-4 shrink-0"
      style={{ color: "#060A14" }}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export default function TransformationSection() {
  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "#060A14" }}
    >
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(201,168,76,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="divider-gold mb-16" />

        <div className="text-center mb-14">
          <span className="section-label">Rozwiązanie</span>
          <h2
            className="font-heading font-bold text-white mb-5 leading-tight"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw + 0.5rem, 2.75rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Twoja firma widoczna,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #C9A84C 0%, #F0D060 50%, #C9A84C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              wiarygodna i gotowa
            </span>{" "}
            na klientów
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Profesjonalna strona to nie koszt, to inwestycja, która zwraca się
            przy pierwszym nowym kliencie.
          </p>
        </div>

        <ul className="max-w-2xl mx-auto space-y-4">
          {AFTER_POINTS.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-4 p-5 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(201,168,76,0.1)",
              }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{
                  background: "linear-gradient(135deg, #C9A84C, #F0D060)",
                }}
              >
                <CheckIcon />
              </div>
              <span className="text-slate-200 text-base leading-relaxed">
                {point}
              </span>
            </li>
          ))}
        </ul>

        <div className="text-center mt-12">
          <a
            href="#formularz"
            className="btn-gold inline-block text-lg px-10 py-4 rounded-[14px]"
          >
            Chcę więcej klientów →
          </a>
        </div>
      </div>
    </section>
  );
}
