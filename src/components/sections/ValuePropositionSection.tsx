"use client";

import { TiltCard } from "@/components/ui/TiltCard";

const DIFFERENTIATORS = [
  {
    iconPath:
      "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
    title: "Poznaję problem, zanim narysuję pierwszy pixel",
    description:
      "Badam Twoją branżę, konkurencję i to, gdzie dokładnie tracisz klientów. Dostajesz rozwiązanie dopasowane do Twojego biznesu, nie szablon 'bo tak wygląda ładnie'.",
  },
  {
    iconPath:
      "M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941",
    title: "Każdy element ma jedno zadanie",
    description:
      "Układ, treści, przyciski - wszystko prowadzi do jednego celu: zamienić odwiedzającego w zapytanie. Sukces mierzę wynikiem, nie tym 'czy ładnie wygląda'.",
  },
  {
    iconPath:
      "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
    title: "Klienci Cię znajdą, zanim jeszcze zadzwonią",
    description:
      "Pełna optymalizacja techniczna od pierwszego dnia. Gdy ktoś szuka w Google usługi, którą oferujesz, trafia na Ciebie - nie na konkurenta obok.",
  },
  {
    iconPath:
      "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
    title: "Zero zgadywania po starcie",
    description:
      "Od pierwszego dnia widzisz dokładnie, skąd przychodzą klienci i ile kosztuje każde nowe zapytanie. Decyzje podejmujesz na podstawie danych, nie przeczucia.",
  },
  {
    iconPath:
      "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z",
    title: "Nie znikam po uruchomieniu",
    description:
      "Przez pierwszy miesiąc pracuję z Tobą nad tym, żeby wynik był jeszcze lepszy - poprawki i pytania bezpłatnie, bez czekania na 'kolejny etap'.",
  },
  {
    iconPath:
      "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
    title: "Za projekt odpowiada jedna osoba",
    description:
      "Piszesz bezpośrednio do mnie, nie do help desku czy konta w firmie. Ja projektuję, ja wdrażam, ja odpowiadam za wynik.",
  },
];

export default function ValuePropositionSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden" style={{ background: "#060A14" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(201,168,76,0.05) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="font-heading font-bold text-white mb-5 leading-tight"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw + 0.5rem, 2.75rem)",
              letterSpacing: "-0.02em",
            }}
          >
            To nie jest kolejna{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #C9A84C 0%, #F0D060 50%, #C9A84C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              &bdquo;strona internetowa&rdquo;
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            To rozwiązanie problemu, który już teraz kosztuje Cię klientów. Traktuję je jak inwestycję w Twój biznes, nie jak grafikę do przeglądarki.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {DIFFERENTIATORS.map((item, idx) => {
            const isFeatured = idx === 0;
            const spanClass =
              idx === 0
                ? "sm:col-span-2 lg:col-span-3 lg:row-span-2"
                : idx === 1 || idx === 2
                ? "lg:col-span-3"
                : "lg:col-span-2";

            return (
              <div key={item.title} className={spanClass}>
              <TiltCard
                depth={isFeatured ? 6 : 10}
                style={{
                  background: isFeatured
                    ? "rgba(201,168,76,0.07)"
                    : "rgba(255,255,255,0.028)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: isFeatured
                    ? "1px solid rgba(201,168,76,0.35)"
                    : "1px solid rgba(201,168,76,0.14)",
                  borderRadius: "16px",
                  padding: isFeatured ? "2.25rem" : "1.75rem",
                  height: "100%",
                }}
              >
                <div
                  className="flex flex-col h-full"
                  style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
                >
                  <div
                    className={isFeatured ? "w-14 h-14 rounded-xl flex items-center justify-center mb-6 shrink-0" : "w-11 h-11 rounded-xl flex items-center justify-center mb-5 shrink-0"}
                    style={{
                      background: "rgba(201,168,76,0.08)",
                      border: "1px solid rgba(201,168,76,0.2)",
                    }}
                    aria-hidden="true"
                  >
                    <svg
                      className={isFeatured ? "w-6 h-6" : "w-5 h-5"}
                      style={{ color: "#C9A84C" }}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.8}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.iconPath} />
                    </svg>
                  </div>
                  <h3
                    className="font-heading font-bold text-white mb-3 leading-tight"
                    style={{ fontSize: isFeatured ? "1.35rem" : "1.05rem", letterSpacing: "-0.01em" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>
              </TiltCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
