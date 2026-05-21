import Image from "next/image";
import { PORTFOLIO_ITEMS } from "@/lib/constants";

export default function PortfolioSection() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            {/* TODO: nagłówek sekcji portfolio */}
            Zrealizowane projekty
          </h2>
          <p className="text-slate-600 text-lg max-w-xl mx-auto">
            {/* TODO: sub-nagłówek portfolio */}
            Kazda strona zaprojektowana pod konkretna brance i jej klientow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PORTFOLIO_ITEMS.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="relative aspect-video bg-slate-100">
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {item.industry}
                </span>
                <p className="text-slate-700 leading-relaxed">{item.result}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
