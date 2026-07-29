import { CTA_TEXT } from "@/lib/constants";

export default function PortfolioCTASection() {
  return (
    <section
      className="py-20 px-6 relative overflow-hidden"
      style={{ background: "#060A14" }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 65%)",
        }}
      />

      <div
        className="relative z-10 max-w-2xl mx-auto text-center py-14 px-8 rounded-3xl"
        style={{
          background: "rgba(255,255,255,0.025)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(201,168,76,0.18)",
          boxShadow: "0 0 80px rgba(201,168,76,0.06)",
        }}
      >
        <span className="section-label">Twoja kolej</span>
        <h2
          className="font-heading font-bold text-white mb-4 leading-tight"
          style={{
            fontSize: "clamp(1.5rem, 3vw + 0.5rem, 2.25rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Dołącz do firm, które już zdobywają klientów online
        </h2>
        <p className="text-slate-400 text-lg mb-8">
          12+ firm, które przestały tracić klientów na rzecz konkurencji. Bezpłatna konsultacja, konkretny plan w 24 godziny.
        </p>
        <a
          href="#formularz"
          className="btn-gold inline-block text-lg px-10 py-4 rounded-[14px]"
        >
          {CTA_TEXT}
        </a>
      </div>
    </section>
  );
}
