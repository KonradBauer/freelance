const STATS = [
  { value: "12+", label: "zrealizowanych projektów" },
  { value: "5", label: "lat doświadczenia" },
  { value: "14 dni", label: "czas realizacji" },
];

export default function StatsSection() {
  return (
    <section className="bg-slate-900 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <p className="font-heading text-5xl sm:text-6xl font-bold text-amber-400 mb-2">
                {stat.value}
              </p>
              <p className="text-slate-400 text-base uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
