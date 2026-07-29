import { PROCESS_STEPS } from "@/lib/constants";

export default function ProcessSection() {
  return (
    <section id="proces" className="py-24 px-6" style={{ background: "#060A14" }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
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

        <div className="flex flex-col">
          {PROCESS_STEPS.map((item, idx) => {
            const isLast = idx === PROCESS_STEPS.length - 1;
            return (
              <div key={item.step} className="flex gap-6">
                {/* Number + connecting line */}
                <div className="flex flex-col items-center">
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
                  {!isLast && (
                    <div
                      className="w-px flex-1 my-2"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(201,168,76,0.35), rgba(201,168,76,0.05))",
                      }}
                    />
                  )}
                </div>

                {/* Content */}
                <div className={isLast ? "flex-1" : "flex-1 pb-10"}>
                  <h3
                    className="font-heading font-bold text-white mb-2 leading-tight pt-2"
                    style={{ fontSize: "1.1rem", letterSpacing: "-0.01em" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-slate-500 leading-relaxed text-sm mb-4">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-3.5 h-3.5 shrink-0"
                        style={{ color: "#475569" }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-xs font-medium" style={{ color: "#64748B" }}>
                        {item.timeline}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-3.5 h-3.5 shrink-0"
                        style={{ color: "#C9A84C" }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="text-xs font-semibold" style={{ color: "#C9A84C" }}>
                        {item.deliverable}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
