"use client";

import { TiltCard } from "@/components/ui/TiltCard";

const DIFFERENTIATORS = [
  {
    icon: "🔍",
    title: "Analiza przed projektowaniem",
    description:
      "Zanim zacznę projektować, badam Twoją branżę i konkurencję. Projektuję pod Twoich klientów - nie pod trendy.",
  },
  {
    icon: "📈",
    title: "Projekt pod konwersje",
    description:
      "Układ, treści i CTA dobrane tak, żeby odwiedzający zamieniał się w telefon lub zapytanie - nie tylko przeglądał i wychodził.",
  },
  {
    icon: "🔎",
    title: "SEO od pierwszego dnia",
    description:
      "Pełna optymalizacja techniczna w cenie: meta tagi, sitemap, Core Web Vitals, dane strukturalne. Klienci Cię znajdą.",
  },
  {
    icon: "📊",
    title: "Analityka wbudowana",
    description:
      "GA4 i Google Search Console skonfigurowane od startu. Wiesz ile masz odwiedzin i które strony przynoszą zapytania.",
  },
  {
    icon: "🛡",
    title: "30 dni opieki",
    description:
      "Nie znikam po uruchomieniu. Przez miesiąc jestem dostępny na poprawki i pytania - bezpłatnie.",
  },
  {
    icon: "👤",
    title: "Jeden człowiek, pełna odpowiedzialność",
    description:
      "Piszesz do mnie bezpośrednio, nie do help desku. Jeden człowiek odpowiada za projekt od A do Z.",
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
        <div className="divider-gold mb-16" />

        <div className="text-center mb-16">
          <span className="section-label">Dlaczego my</span>
          <h2
            className="font-heading font-bold text-white mb-5 leading-tight"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw + 0.5rem, 2.75rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Dlaczego klienci płacą nam{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #C9A84C 0%, #F0D060 50%, #C9A84C 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              więcej niż innym
            </span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Strona to narzędzie sprzedaży, nie ozdoba. Tak do niej podchodzimy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DIFFERENTIATORS.map((item) => (
            <TiltCard
              key={item.title}
              depth={10}
              style={{
                background: "rgba(255,255,255,0.028)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(201,168,76,0.14)",
                borderRadius: "16px",
                padding: "1.75rem",
              }}
            >
              <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 text-xl shrink-0"
                  style={{
                    background: "rgba(201,168,76,0.08)",
                    border: "1px solid rgba(201,168,76,0.2)",
                  }}
                  aria-hidden="true"
                >
                  {item.icon}
                </div>
                <h3
                  className="font-heading font-bold text-white mb-3 leading-tight"
                  style={{ fontSize: "1.05rem", letterSpacing: "-0.01em" }}
                >
                  {item.title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
