import { REVIEWS } from "@/lib/constants";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 mb-4" role="img" aria-label={`Ocena: ${rating} z 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="w-4 h-4"
          fill={i < rating ? "#fbbf24" : "rgba(255,255,255,0.15)"}
        >
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.9l-5.2 2.61.99-5.79-4.21-4.1 5.82-.85z" />
        </svg>
      ))}
    </div>
  );
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function GoogleReviewsSection() {
  return (
    <section id="opinie" className="py-24" style={{ background: "#060A14" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div
              key={review.author}
              className="rounded-2xl p-6 flex flex-col h-full"
              style={{ background: "rgba(255,255,255,0.05)" }}
            >
              <StarRating rating={review.rating} />
              <p className="text-white/80 text-sm leading-relaxed mb-6 line-clamp-5">{review.text}</p>
              <div className="flex items-center gap-3 mt-auto">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                  style={{ background: "rgba(251,191,36,0.2)" }}
                >
                  {getInitials(review.author)}
                </div>
                <span className="text-white text-sm font-medium">{review.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
