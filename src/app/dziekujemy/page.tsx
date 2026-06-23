import Link from "next/link";
import type {Metadata} from "next";
import ThankYouPixelEvent from "@/components/ui/ThankYouPixelEvent";

export const metadata: Metadata = {
    title: "Dziękuję za kontakt",
    robots: {index: false, follow: false},
};

export default function ThankYouPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-slate-900 px-6 text-center py-16">
            <ThankYouPixelEvent/>
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
                    Dziękuję! Formularz dotarł.
                </h1>

                <p className="text-slate-300 text-lg leading-relaxed mb-10">
                    Oddzwonię do Ciebie w ciągu 24 godzin. Przygotuj się na krótką
                    rozmowę o Twoim projekcie.
                </p>

                {/* Co dalej */}
                <div className="text-left rounded-2xl p-6 mb-8"
                    style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(201,168,76,0.15)",
                    }}
                >
                    <p className="text-sm font-semibold uppercase tracking-widest text-amber-400 mb-4">Co się dzieje dalej?</p>
                    <ol className="space-y-3">
                        {[
                            "Sprawdzam Twoje zgłoszenie i zapoznaję się z branżą",
                            "Dzwonię w ciągu 24h - krótka rozmowa o projekcie i celach",
                            "Przygotowuję wycenę i harmonogram bez zobowiązań",
                        ].map((step, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center mt-0.5"
                                    style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C" }}>
                                    {i + 1}
                                </span>
                                <span className="text-slate-300 text-sm leading-relaxed">{step}</span>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/#portfolio"
                        className="inline-block rounded-xl bg-amber-400 px-8 py-3 font-semibold text-slate-900 transition-opacity duration-200 hover:opacity-90"
                    >
                        Zobacz realizacje →
                    </Link>
                    <Link
                        href="/"
                        className="inline-block rounded-xl border border-slate-700 px-8 py-3 font-semibold text-slate-400 transition-colors duration-200 hover:border-slate-600 hover:text-slate-300"
                    >
                        Wróć na stronę główną
                    </Link>
                </div>
            </div>
        </main>
    );
}
