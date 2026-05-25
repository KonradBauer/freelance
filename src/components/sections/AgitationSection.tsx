"use client";

import { TiltCard } from "@/components/ui/TiltCard";

const PAIN_POINTS = [
  {
    id: 1,
    title: "Tracisz klientów na rzecz konkurencji",
    description:
      "Ktoś szuka w Google usługi którą oferujesz. Trafia na stronę konkurenta, bo Ciebie tam nie ma. Zamówienie ląduje u nich.",
  },
  {
    id: 2,
    title: "Nie wyglądasz poważnie bez strony",
    description:
      "Klient pyta o wizytówkę albo stronę. Gdy jej nie ma, wzrusza ramionami i dzwoni do kogoś innego. Pierwsze wrażenie decyduje w 7 sekund.",
  },
  {
    id: 3,
    title: "Polecenia przestają wystarczać",
    description:
      "Sam z siebie nie możesz kontrolować ile poleceń dostaniesz w tym miesiącu. Bez strony nie masz stałego napływu klientów.",
  },
];

function WarningIcon() {
  return (
    <div
      className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 shrink-0"
      style={{
        background: "rgba(239,68,68,0.09)",
        border: "1px solid rgba(239,68,68,0.22)",
      }}
    >
      <svg
        aria-hidden="true"
        className="w-5 h-5"
        style={{ color: "#EF4444" }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        />
      </svg>
    </div>
  );
}

export default function AgitationSection() {
  return (
    <section className="py-24 px-6" style={{ background: "#060A14" }}>
      <div className="max-w-5xl mx-auto">
        <div className="divider-gold mb-16" />

        <div className="text-center mb-16">
          <span className="section-label">Problem</span>
          <h2
            className="font-heading font-bold text-white mb-5 leading-tight"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw + 0.5rem, 2.75rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Co tracisz każdego dnia bez profesjonalnej strony
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed">
            To nie jest teoria. To codzienność firm, które nie mają strony lub
            mają taką, która nie działa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PAIN_POINTS.map((point) => (
            <TiltCard
              key={point.id}
              depth={10}
              style={{
                background: "rgba(255,255,255,0.028)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(201,168,76,0.14)",
                borderRadius: "16px",
                padding: "2rem",
              }}
            >
              {/* Elevated content layer */}
              <div style={{ transform: "translateZ(24px)", transformStyle: "preserve-3d" }}>
                <WarningIcon />
                <h3
                  className="font-heading font-bold text-white mb-3 leading-tight"
                  style={{ fontSize: "1.1rem", letterSpacing: "-0.01em" }}
                >
                  {point.title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {point.description}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
