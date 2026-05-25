"use client";

import Image from "next/image";
import { useState } from "react";
import { PORTFOLIO_ITEMS } from "@/lib/constants";

export default function PortfolioSection() {
  const [paused, setPaused] = useState(false);

  const items = [...PORTFOLIO_ITEMS, ...PORTFOLIO_ITEMS];

  return (
    <section id="portfolio" className="py-24 overflow-hidden" style={{ background: "#060A14" }}>
      <div className="max-w-5xl mx-auto px-6 mb-14 text-center">
        <div className="divider-gold mb-16" />
        <span className="section-label">Portfolio</span>
        <h2
          className="font-heading font-bold text-white mb-5 leading-tight"
          style={{
            fontSize: "clamp(1.75rem, 3.5vw + 0.5rem, 2.75rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Zrealizowane projekty
        </h2>
        <p className="text-slate-500 text-lg max-w-xl mx-auto">
          Każda strona zaprojektowana pod konkretną branżę i jej klientów
        </p>
      </div>

      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Fade edges */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10"
          style={{
            background: "linear-gradient(to right, #060A14, transparent)",
          }}
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10"
          style={{
            background: "linear-gradient(to left, #060A14, transparent)",
          }}
        />

        <div
          className="flex gap-5"
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
              className="group flex-shrink-0 w-72 rounded-2xl overflow-hidden block transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.028)",
                border: "1px solid rgba(201,168,76,0.12)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,168,76,0.32)";
                e.currentTarget.style.boxShadow =
                  "0 8px 32px rgba(201,168,76,0.1)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,168,76,0.12)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div className="relative aspect-video overflow-hidden">
                {item.imageSrc ? (
                  <Image
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="288px"
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(201,168,76,0.08), rgba(88,80,236,0.05))",
                    }}
                  >
                    <span className="text-slate-600 text-sm font-medium">
                      Wkrótce
                    </span>
                  </div>
                )}
                {/* Overlay gradient on image */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 50%, rgba(6,10,20,0.6) 100%)",
                  }}
                />
              </div>

              <div className="p-5">
                <span
                  className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3"
                  style={{
                    background: "rgba(201,168,76,0.1)",
                    color: "#C9A84C",
                    border: "1px solid rgba(201,168,76,0.2)",
                  }}
                >
                  {item.industry}
                </span>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                  {item.result}
                </p>
                <p
                  className="mt-3 text-sm font-semibold transition-colors duration-200"
                  style={{ color: "#C9A84C" }}
                >
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
