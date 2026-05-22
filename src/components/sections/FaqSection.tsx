"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/components/ui/JsonLd";

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-slate-50 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Najczęstsze pytania
          </h2>
          <p className="text-slate-600 text-lg">
            Odpowiedzi na pytania, które słyszę najczęściej przed współpracą
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                aria-expanded={open === idx}
              >
                <span className="font-heading font-semibold text-slate-900 text-base sm:text-lg">
                  {item.question}
                </span>
                <span
                  className={`text-amber-400 text-2xl leading-none shrink-0 transition-transform duration-200 ${
                    open === idx ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {open === idx && (
                <div className="px-6 pb-6">
                  <p className="text-slate-600 leading-relaxed">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
