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
          Twoja firma zasługuje na taką samą stronę
        </h2>
        <p className="text-slate-400 text-lg mb-8">
          Bezpłatna wycena w ciągu 24 godzin. Bez zobowiązań.
        </p>
        <a
          href="#formularz"
          className="btn-gold inline-block text-lg px-10 py-4 rounded-[14px]"
        >
          Chcę więcej klientów →
        </a>
      </div>
    </section>
  );
}
