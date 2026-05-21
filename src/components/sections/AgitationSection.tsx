const PAIN_POINTS = [
  {
    id: 1,
    title: "Tracisz klientów na rzecz konkurencji",
    description:
      "Ktoś szuka w Google usługi którą oferujesz. Trafia na stronę konkurenta, bo Ciebie tam nie ma. Zamówienie ląduje u nich.",
  },
  {
    id: 2,
    title: "Nie wyglądasz poważnie bez strony",
    description:
      "Klient pyta o wizytówkę albo stronę. Gdy jej nie ma, wzrusza ramionami i dzwoni do kogoś innego. Pierwsze wrażenie decyduje w 7 sekund.",
  },
  {
    id: 3,
    title: "Polecenia przestają wystarczać",
    description:
      "Sam z siebie nie możesz kontrolować ile poleceń dostaniesz w tym miesiącu. Bez strony nie masz stałego napływu klientów.",
  },
];

function WarningIcon() {
  return (
    <svg
      aria-hidden="true"
      className="w-8 h-8 text-red-500 mb-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
      />
    </svg>
  );
}

export default function AgitationSection() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Co tracisz każdego dnia bez profesjonalnej strony
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            To nie jest teoria. To codzienność firm, które nie mają strony lub
            mają taką, która nie działa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PAIN_POINTS.map((point) => (
            <div
              key={point.id}
              className="bg-slate-50 rounded-2xl p-8 border border-slate-100"
            >
              <WarningIcon />
              <h3 className="font-heading font-bold text-xl text-slate-900 mb-3">
                {point.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
