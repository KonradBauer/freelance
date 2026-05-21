const TESTIMONIALS = [
  {
    quote:
      "Strona gotowa w 12 dni. Pierwsze zapytanie od nowego klienta dostałem tydzień po uruchomieniu. Polecam każdemu kto chce zaistnieć w internecie.",
    name: "Marek Wiśniewski",
    company: "MW Budownictwo",
  },
  {
    quote:
      "Profesjonalne podejście i zero stresu z mojej strony. Konrad zadbał o wszystko - od projektu po uruchomienie. Strona wygląda dokładnie tak jak chciałam.",
    name: "Anna Kowalska",
    company: "Studio Urody Ania",
  },
];

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
            <div
              key={t.name}
              className="bg-slate-50 rounded-2xl p-8 border border-slate-100 flex flex-col"
            >
              <span className="font-heading text-6xl leading-none text-amber-400 mb-4 select-none">
                &ldquo;
              </span>
              <p className="text-slate-700 text-lg leading-relaxed flex-1 mb-6">
                {t.quote}
              </p>
              <div>
                <p className="font-semibold text-slate-900">{t.name}</p>
                <p className="text-slate-500 text-sm">{t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
