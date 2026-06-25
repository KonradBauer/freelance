import Image from "next/image";

type Review = {
  author: string;
  photoUri: string | null;
  rating: number;
  text: string;
  relativeTime: string;
};

async function fetchReviews(): Promise<{ reviews: Review[]; placeRating?: number }> {
  try {
    const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const res = await fetch(`${base}/api/reviews`, { next: { revalidate: 3600 } });
    if (!res.ok) return { reviews: [] };
    return res.json();
  } catch {
    return { reviews: [] };
  }
}

function StarRating({ rating }: { rating: number }) {
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

function Avatar({ author, photoUri }: { author: string; photoUri: string | null }) {
  const initials = author
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  if (photoUri) {
    return (
      <Image
        src={photoUri}
        alt={author}
        width={40}
        height={40}
        className="rounded-full object-cover"
        unoptimized
      />
    );
  }

  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
      style={{
        background: "linear-gradient(135deg, #C9A84C 0%, #F0D060 100%)",
        color: "#060A14",
      }}
    >
      {initials || "?"}
    </div>
  );
}

export default async function GoogleReviewsSection() {
  const { reviews, placeRating } = await fetchReviews();

  if (reviews.length === 0) return null;

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
          {placeRating && (
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="font-heading font-bold text-2xl" style={{ color: "#F0D060" }}>
                {placeRating.toFixed(1)}
              </span>
              <StarRating rating={Math.round(placeRating)} />
              <span className="text-slate-500 text-sm">({reviews.length}+ opinii)</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.slice(0, 5).map((review, i) => (
            <figure
              key={i}
              className="flex flex-col rounded-2xl p-6"
              style={{
                background: "rgba(255,255,255,0.028)",
                border: "1px solid rgba(201,168,76,0.12)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Avatar author={review.author} photoUri={review.photoUri} />
                <div className="min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{review.author}</p>
                  {review.relativeTime && (
                    <p className="text-slate-600 text-xs">{review.relativeTime}</p>
                  )}
                </div>
              </div>
              <StarRating rating={review.rating} />
              <blockquote className="mt-3 flex-1">
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-4">{review.text}</p>
              </blockquote>
            </figure>
          ))}
        </div>

        {/* Google attribution — required by ToS */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <Image src="/google-logo.svg" alt="Google" width={18} height={18} />
          <span className="text-slate-600 text-xs">Opinie z Google</span>
        </div>
      </div>
    </section>
  );
}
