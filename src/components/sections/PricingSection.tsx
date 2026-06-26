"use client";

import { TiltCard } from "@/components/ui/TiltCard";

type PricingTier = {
  name: string;
  price: string;
  priceNote: string;
  description: string;
  features: string[];
  cta: string;
  ctaHref: string;
  highlighted: boolean;
  badge?: string;
};

const TIERS: PricingTier[] = [
  {
    name: "Basic",
    price: "od 1 500 zł",
    priceNote: "netto",
    description: "Dla firm które chcą zacząć pozyskiwać klientów przez internet.",
    features: [
      "1-stronnicowy landing page",
      "Custom design (nie szablon)",
      "Responsywny, mobile-first",
      "Formularz kontaktowy + e-mail",
      "SEO: meta tagi, sitemap, Open Graph",
      "Realizacja do 14 dni",
      "2 rundy poprawek",
    ],
    cta: "Zamów Basic",
    ctaHref: "#formularz",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "od 3 000 zł",
    priceNote: "netto",
    description: "Dla firm które traktują stronę jako główny kanał pozyskiwania klientów.",
    features: [
      "Do 5 podstron",
      "Wszystko z pakietu Basic",
      "Google Analytics 4 + Search Console",
      "Meta Pixel (Facebook/Instagram)",
      "Animacje i zaawansowany UX",
      "Blog / aktualności (opcja)",
      "3 rundy poprawek",
      "30 dni opieki technicznej",
      "Realizacja do 21 dni",
    ],
    cta: "Zamów Premium",
    ctaHref: "#formularz",
    highlighted: true,
    badge: "Najpopularniejszy",
  },
  {
    name: "Custom",
    price: "Wycena",
    priceNote: "po konsultacji",
    description: "Sklepy, CRM, aplikacje webowe, platformy i integracje.",
    features: [
      "Sklep internetowy (e-commerce)",
      "System rezerwacji / CRM",
      "Aplikacja webowa",
      "Integracje z zewnętrznymi API",
      "Migracje i modernizacje",
      "Zakres i czas ustalane indywidualnie",
    ],
    cta: "Umów konsultację",
    ctaHref: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "#formularz",
    highlighted: false,
  },
];

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 shrink-0 mt-0.5"
      style={{ color: "#C9A84C" }}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8L6.5 11.5L13 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PricingSection() {
  return (
    <section id="cennik" className="py-24" style={{ background: "#060A14" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="divider-gold mb-16" />
          <span className="section-label">Cennik</span>
          <h2
            className="font-heading font-bold text-white mb-5 leading-tight"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw + 0.5rem, 2.75rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Przejrzyste pakiety. Zero niespodzianek.
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Każdy projekt jest wyceniany uczciwie - płacisz za efekt, nie za godziny.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {TIERS.map((tier) => (
            <TiltCard key={tier.name} depth={tier.highlighted ? 6 : 8}>
              <div
                className="relative flex flex-col h-full rounded-2xl p-7"
                style={
                  tier.highlighted
                    ? {
                        background: "rgba(201,168,76,0.06)",
                        border: "1px solid rgba(201,168,76,0.45)",
                        boxShadow: "0 0 40px rgba(201,168,76,0.08)",
                      }
                    : {
                        background: "rgba(255,255,255,0.028)",
                        border: "1px solid rgba(201,168,76,0.14)",
                      }
                }
              >
                {/* Badge */}
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span
                      className="inline-block text-xs font-bold px-4 py-1.5 rounded-full"
                      style={{
                        background: "linear-gradient(135deg, #C9A84C 0%, #F0D060 50%, #C9A84C 100%)",
                        color: "#060A14",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {tier.badge}
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="mb-6">
                  <p
                    className="text-sm font-semibold uppercase tracking-widest mb-3"
                    style={{ color: "#C9A84C", letterSpacing: "0.15em" }}
                  >
                    {tier.name}
                  </p>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span
                      className="font-heading font-bold leading-none"
                      style={{
                        fontSize: "clamp(1.5rem, 2.5vw + 0.5rem, 2rem)",
                        color: tier.highlighted ? "#F0D060" : "#E2E8F0",
                      }}
                    >
                      {tier.price}
                    </span>
                    <span className="text-slate-500 text-sm">{tier.priceNote}</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{tier.description}</p>
                </div>

                {/* Divider */}
                <div
                  className="mb-6"
                  style={{
                    height: "1px",
                    background: tier.highlighted
                      ? "rgba(201,168,76,0.25)"
                      : "rgba(255,255,255,0.06)",
                  }}
                />

                {/* Features */}
                <ul className="space-y-3 flex-1 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <CheckIcon />
                      <span className="text-slate-300 text-sm leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={tier.ctaHref}
                  target={tier.ctaHref.startsWith("http") ? "_blank" : undefined}
                  rel={tier.ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={tier.highlighted ? "btn-gold block text-center py-3.5 rounded-[12px] font-semibold" : "block text-center py-3.5 rounded-[12px] font-semibold transition-colors duration-200"}
                  style={
                    tier.highlighted
                      ? {}
                      : {
                          border: "1px solid rgba(201,168,76,0.35)",
                          color: "#C9A84C",
                          background: "transparent",
                        }
                  }
                  onMouseEnter={
                    tier.highlighted
                      ? undefined
                      : (e) => {
                          (e.currentTarget as HTMLAnchorElement).style.background =
                            "rgba(201,168,76,0.06)";
                        }
                  }
                  onMouseLeave={
                    tier.highlighted
                      ? undefined
                      : (e) => {
                          (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                        }
                  }
                >
                  {tier.cta}
                </a>
              </div>
            </TiltCard>
          ))}
        </div>

        <p className="text-center mt-8 text-slate-600 text-sm">
          Wszystkie ceny są cenami netto. Do ceny doliczany jest VAT 23%.
        </p>
      </div>
    </section>
  );
}
