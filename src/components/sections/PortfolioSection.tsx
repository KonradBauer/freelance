"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { PORTFOLIO_ITEMS } from "@/lib/constants";

export default function PortfolioSection() {
  const [paused, setPaused] = useState(false);

  const items = [...PORTFOLIO_ITEMS, ...PORTFOLIO_ITEMS];

  return (
    <section id="portfolio" className="bg-white py-20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 mb-12 text-center">
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
          Zrealizowane projekty
        </h2>
        <p className="text-slate-600 text-lg max-w-xl mx-auto">
          Każda strona zaprojektowana pod konkretną branżę i jej klientów
        </p>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent" />

        <div
          className="flex gap-6"
          style={{
            animation: `carousel-scroll 40s linear infinite`,
            animationPlayState: paused ? "paused" : "running",
            width: "max-content",
          }}
        >
          {items.map((item, idx) => (
            <a
              key={`${item.id}-${idx}`}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-shrink-0 w-72 rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200 block"
            >
              <div className="relative aspect-video bg-slate-100">
                {item.imageSrc ? (
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    className="object-cover object-top"
                    sizes="288px"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-200 to-slate-100">
                    <span className="text-slate-400 text-sm font-medium">Wkrótce</span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  {item.industry}
                </span>
                <p className="text-slate-700 text-sm leading-relaxed line-clamp-3">{item.result}</p>
                <p className="mt-3 text-sm font-semibold text-amber-600 group-hover:text-amber-500 transition-colors duration-200">
                  Zobacz projekt →
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
