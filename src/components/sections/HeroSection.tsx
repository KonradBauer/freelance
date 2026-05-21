export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center bg-slate-900 px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <span className="inline-block text-amber-400 text-sm font-semibold tracking-widest uppercase mb-6">
          {/* TODO: eyebrow — opcjonalny, np. "Strony internetowe dla małych firm" */}
          Strony internetowe dla małych firm
        </span>

        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          {/* TODO: główny nagłówek bólu — maks. 10 słów, konkretny problem klienta */}
          Twoi klienci szukają Cię w internecie.{" "}
          <span className="text-amber-400">I wybierają konkurencję.</span>
        </h1>

        <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          {/* TODO: sub-nagłówek — rozwinięcie bólu + obietnica, maks. 2 zdania */}
          Bez profesjonalnej strony tracisz zlecenia każdego dnia. Zbuduję Ci
          stronę, która pracuje na Ciebie 24/7 i zamienia odwiedzających w
          klientów.
        </p>

        <a
          href="#formularz"
          className="inline-block bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-lg px-8 py-4 rounded-xl transition-colors duration-200 shadow-lg"
        >
          {/* TODO: tekst CTA — czasownik + korzyść, np. "Chcę więcej klientów →" */}
          Chcę więcej klientów →
        </a>

        <p className="text-slate-500 text-sm mt-4">
          {/* TODO: micro-copy pod CTA — usuń obiekcje, np. "Bezpłatna konsultacja · Bez zobowiązań" */}
          Bezpłatna konsultacja · Bez zobowiązań
        </p>
      </div>
    </section>
  );
}
