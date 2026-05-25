import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polityka prywatności | Studio Code Art",
  robots: { index: false, follow: false },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-900 px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm mb-10 transition-colors duration-200"
        >
          <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Wróć na stronę główną
        </Link>

        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-8">
          Zasady ochrony prywatności
        </h1>

        <div className="space-y-6 text-slate-300 text-base leading-relaxed">
          <p>
            Twoje dane są używane wyłącznie do kontaktu w sprawie oferty.
          </p>
          <p>
            Nie sprzedajemy ani nie udostępniamy danych osobom trzecim.
          </p>
          <p>
            Możesz w każdej chwili zażądać ich usunięcia lub poprawienia —
            wystarczy napisać na{" "}
            <a
              href="mailto:kontakt@studiocodeart.pl"
              className="text-amber-400 hover:text-amber-300 transition-colors duration-200"
            >
              kontakt@studiocodeart.pl
            </a>
            .
          </p>
        </div>
      </div>
    </main>
  );
}
