const REVIEWS = [
  {
    author: "Krzysztof S.",
    initials: "KS",
    rating: 5,
    text: "Konrad wykonał dla nas stronę w ekspresowym tempie i z pełnym zaangażowaniem. Efekt przerósł oczekiwania - strona wygląda profesjonalnie i już przynosi zapytania od nowych klientów.",
    time: "miesiąc temu",
  },
  {
    author: "Marta W.",
    initials: "MW",
    rating: 5,
    text: "Polecam z czystym sumieniem. Strona powstała szybko, cena uczciwa, a Konrad jest dostępny na każde pytanie nawet po wdrożeniu. Bardzo dobra współpraca.",
    time: "2 miesiące temu",
  },
  {
    author: "Tomasz B.",
    initials: "TB",
    rating: 5,
    text: "Profesjonalizm na każdym etapie. Konrad zaproponował rozwiązania, o których sami byśmy nie pomyśleli. Strona działa świetnie i jest dobrze pozycjonowana w Google.",
    time: "3 miesiące temu",
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Ocena ${rating} na 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4"
          viewBox="0 0 16 16"
          fill={i < rating ? "#FBBF24" : "none"}
          stroke={i < rating ? "#FBBF24" : "#334155"}
          strokeWidth="1.2"
          aria-hidden="true"
        >
          <path d="M8 1.5l1.75 3.5 3.87.56-2.81 2.74.66 3.87L8 10.25l-3.47 1.82.66-3.87L2.38 5.56l3.87-.56L8 1.5z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ initials }: { initials: string }) {
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
      style={{
        background: "linear-gradient(135deg, #C9A84C 0%, #F0D060 100%)",
        color: "#060A14",
      }}
    >
      {initials}
    </div>
  );
}

export default function GoogleReviewsSection() {
  return (
    <section id="opinie" className="py-24" style={{ background: "#060A14" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="divider-gold mb-16" />
          <span className="section-label">Opinie</span>
          <h2
            className="font-heading font-bold text-white mb-4 leading-tight"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw + 0.5rem, 2.75rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Co mówią klienci
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {REVIEWS.map((r) => (
            <figure
              key={r.author}
              className="flex flex-col rounded-2xl p-6"
              style={{
                background: "rgba(255,255,255,0.028)",
                border: "1px solid rgba(201,168,76,0.12)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Avatar initials={r.initials} />
                <div className="min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{r.author}</p>
                  <p className="text-slate-600 text-xs">{r.time}</p>
                </div>
              </div>
              <Stars rating={r.rating} />
              <blockquote className="mt-3 flex-1">
                <p className="text-slate-400 text-sm leading-relaxed">{r.text}</p>
              </blockquote>
            </figure>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-label="Google">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          <span className="text-slate-600 text-xs">Opinie z Google</span>
        </div>
      </div>
    </section>
  );
}
