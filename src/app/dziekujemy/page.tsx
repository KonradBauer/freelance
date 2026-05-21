import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dziekujemy za kontakt",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-900 px-6 text-center">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-amber-400 mx-auto mb-8">
          <svg
            aria-hidden="true"
            className="w-10 h-10 text-slate-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
          {/* TODO: naglowek strony dziekujemy */}
          Dziekujemy! Formularz dotarl.
        </h1>

        <p className="text-slate-300 text-lg leading-relaxed mb-8">
          {/* TODO: wiadomosc potwierdzajaca */}
          Oddzwonimy do Ciebie w ciagu 24 godzin. Przygotuj sie na krotka
          rozmowe o Twoim projekcie.
        </p>

        <Link
          href="/"
          className="inline-block rounded-xl border-2 border-amber-400 px-8 py-3 font-semibold text-amber-400 transition-colors duration-200 hover:bg-amber-400 hover:text-slate-900"
        >
          Wróc na strone glowna
        </Link>
      </div>
    </main>
  );
}
