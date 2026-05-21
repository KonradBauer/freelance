export default function PortfolioCTASection() {
  return (
    <section className="bg-slate-900 py-16 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white mb-4">
          Twoja firma zasługuje na taką samą stronę
        </h2>
        <p className="text-slate-400 text-lg mb-8">
          Bezpłatna wycena w ciągu 24 godzin. Bez zobowiązań.
        </p>
        <a
          href="#formularz"
          className="inline-block bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-lg px-8 py-4 rounded-xl transition-colors duration-200 shadow-lg"
        >
          Chcę więcej klientów →
        </a>
      </div>
    </section>
  );
}
