const AFTER_POINTS = [
  // TODO: właściciel — zmień na konkretne korzyści po zbudowaniu strony
  "Klienci znajdują Cię w Google i na Facebooku — zamiast konkurencji",
  "Strona sprzedaje za Ciebie 24/7, nawet gdy śpisz",
  "Wyglądasz profesjonalnie — klienci mają do Ciebie zaufanie od pierwszej sekundy",
  "Masz stały napływ zapytań, nie tylko polecenia",
];

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-6 h-6 text-amber-400 shrink-0 mt-0.5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export default function TransformationSection() {
  return (
    <section className="bg-slate-900 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block text-amber-400 text-sm font-semibold tracking-widest uppercase mb-4">
            {/* TODO: eyebrow — opcjonalny, np. "Jak to wygląda po" */}
            Wyobraź sobie
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            {/* TODO: nagłówek transformacji — stan "po", konkretny i emocjonalny */}
            Twoja firma widoczna, wiarygodna i gotowa na klientów
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            {/* TODO: sub-nagłówek — obietnica zmiany */}
            Profesjonalna strona to nie koszt — to inwestycja, która zwraca się
            przy pierwszym nowym kliencie.
          </p>
        </div>

        <ul className="max-w-2xl mx-auto space-y-5">
          {AFTER_POINTS.map((point, i) => (
            <li key={i} className="flex items-start gap-4">
              <CheckIcon />
              <span className="text-slate-200 text-lg leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>

        <div className="text-center mt-12">
          <a
            href="#formularz"
            className="inline-block bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-lg px-8 py-4 rounded-xl transition-colors duration-200 shadow-lg"
          >
            {/* TODO: tekst CTA #2 */}
            Zrób to teraz — bezpłatna konsultacja →
          </a>
        </div>
      </div>
    </section>
  );
}
