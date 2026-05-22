import { PROCESS_STEPS } from "@/lib/constants";

export default function ProcessSection() {
  return (
    <section id="proces" className="bg-slate-50 py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Jak wygląda współpraca
          </h2>
          <p className="text-slate-600 text-lg max-w-xl mx-auto">
            Prosty i przejrzysty proces od pierwszego kontaktu do gotowej strony
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PROCESS_STEPS.map((item) => (
            <div key={item.step} className="relative">
              <div className="flex items-center gap-4 mb-4">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-400 text-slate-900 font-heading font-bold text-xl shrink-0">
                  {item.step}
                </span>
                {item.step < PROCESS_STEPS.length && (
                  <div className="hidden md:block flex-1 h-0.5 bg-amber-200" />
                )}
              </div>
              <h3 className="font-heading font-bold text-xl text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
