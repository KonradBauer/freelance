"use client";

import { PROCESS_STEPS } from "@/lib/constants";
import { TiltCard } from "@/components/ui/TiltCard";

export default function ProcessSection() {
  return (
    <section id="proces" className="py-24 px-6" style={{ background: "#060A14" }}>
      <div className="max-w-5xl mx-auto">
        <div className="divider-gold mb-16" />

        <div className="text-center mb-16">
          <span className="section-label">Proces</span>
          <h2
            className="font-heading font-bold text-white mb-5 leading-tight"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw + 0.5rem, 2.75rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Jak wygląda współpraca
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Prosty i przejrzysty proces od pierwszego kontaktu do gotowej strony
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROCESS_STEPS.map((item, idx) => (
            <TiltCard
              key={item.step}
              depth={8}
              style={{
                background: "rgba(255,255,255,0.028)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(201,168,76,0.14)",
                borderRadius: "16px",
                padding: "2rem",
              }}
            >
              <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
                {/* Step number + connector */}
                <div className="flex items-center gap-4 mb-6">
                  <span
                    className="flex items-center justify-center w-12 h-12 rounded-xl font-heading font-bold text-xl shrink-0"
                    style={
                      idx === 0
                        ? {
                            background: "linear-gradient(135deg, #C9A84C, #F0D060)",
                            color: "#060A14",
                          }
                        : {
                            background: "rgba(201,168,76,0.08)",
                            border: "1px solid rgba(201,168,76,0.25)",
                            color: "#C9A84C",
                          }
                    }
                  >
                    {item.step}
                  </span>
                  {idx < PROCESS_STEPS.length - 1 && (
                    <div
                      className="hidden md:block flex-1"
                      style={{
                        height: "1px",
                        background:
                          "linear-gradient(90deg, rgba(201,168,76,0.35), rgba(201,168,76,0.05))",
                      }}
                    />
                  )}
                </div>

                <h3
                  className="font-heading font-bold text-white mb-3 leading-tight"
                  style={{ fontSize: "1.1rem", letterSpacing: "-0.01em" }}
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
