const TESTIMONIALS = [
  {
    quote:
      "Strona gotowa w 12 dni. Pierwsze zapytanie od nowego klienta dostałem tydzień po uruchomieniu. Polecam każdemu kto chce zaistnieć w internecie.",
    name: "Marek Wiśniewski",
    company: "MW Budownictwo",
  },
  {
    quote:
      "Profesjonalne podejście i zero stresu z mojej strony. Konrad zadbał o wszystko — od projektu po uruchomienie. Strona wygląda dokładnie tak jak chciałam.",
    name: "Anna Kowalska",
    company: "Studio Urody Ania",
  },
];

function StarRating() {
  return (
    <div className="flex gap-1 mb-4" aria-label="Ocena 5 na 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Co mówią klienci
          </h2>
          <p className="text-slate-600 text-lg max-w-xl mx-auto">
            Opinie osób, które zdecydowały się na współpracę
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="bg-slate-50 rounded-2xl p-8 border border-slate-100 flex flex-col"
            >
              <StarRating />
              <blockquote className="text-slate-700 text-lg leading-relaxed flex-1 mb-6">
                <p>{t.quote}</p>
              </blockquote>
              <figcaption>
                <p className="font-semibold text-slate-900">{t.name}</p>
                <p className="text-slate-500 text-sm">{t.company}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
