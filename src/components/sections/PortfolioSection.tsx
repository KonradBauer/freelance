"use client";

import Image from "next/image";
import { useState, useCallback, useEffect, useRef } from "react";
import { PORTFOLIO_ITEMS } from "@/lib/constants";

function getVisible() {
  if (typeof window === "undefined") return 3;
  return window.innerWidth < 768 ? 1 : 3;
}

export default function PortfolioSection() {
  const [startIndex, setStartIndex] = useState(0);
  const [visible, setVisible] = useState(3);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = PORTFOLIO_ITEMS.length;
  const maxStart = Math.max(0, total - visible);

  useEffect(() => {
    const update = () => {
      const v = getVisible();
      setVisible(v);
      setStartIndex((i) => Math.min(i, Math.max(0, total - v)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [total]);

  // Auto-advance every 4s, wraps around, pauses on hover
  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => {
      setStartIndex((i) => {
        const next = i + visible;
        return next > maxStart ? 0 : next;
      });
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, visible, maxStart]);

  const resetAndGo = useCallback((newIndex: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setStartIndex(newIndex);
  }, []);

  const prev = useCallback(() => {
    resetAndGo(Math.max(0, startIndex - visible));
  }, [startIndex, visible, resetAndGo]);

  const next = useCallback(() => {
    resetAndGo(Math.min(maxStart, startIndex + visible));
  }, [startIndex, visible, maxStart, resetAndGo]);

  const canPrev = startIndex > 0;
  const canNext = startIndex < maxStart;

  const pageCount = Math.ceil(total / visible);
  const currentPage = startIndex === maxStart ? pageCount - 1 : Math.floor(startIndex / visible);

  return (
    <section id="portfolio" className="py-24 overflow-hidden" style={{ background: "#060A14" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14 text-center">
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

        {/* Slider viewport */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="overflow-hidden">
            {/*
              Inner track width = total / visible * 100% of outer.
              translateX formula: -startIndex * (100% / total) moves exactly one card.
              100% here = inner track width, so 1 card = 100%/total of inner.
            */}
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                width: `calc(${total} / ${visible} * 100%)`,
                transform: `translateX(calc(-${startIndex} * 100% / ${total}))`,
              }}
            >
              {PORTFOLIO_ITEMS.map((item) => (
                <div
                  key={item.id}
                  style={{ width: `calc(100% / ${total})` }}
                  className="px-2.5"
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300"
                    style={{
                      background: "rgba(255,255,255,0.028)",
                      border: "1px solid rgba(201,168,76,0.12)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(201,168,76,0.32)";
                      e.currentTarget.style.boxShadow = "0 8px 32px rgba(201,168,76,0.1)";
                      e.currentTarget.style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(201,168,76,0.12)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {/* Screenshot */}
                    <div className="relative aspect-video overflow-hidden">
                      {item.imageSrc ? (
                        <Image
                          src={item.imageSrc}
                          alt={item.imageAlt}
                          fill
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div
                          className="absolute inset-0 flex items-center justify-center"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(201,168,76,0.08), rgba(88,80,236,0.05))",
                          }}
                        >
                          <span className="text-slate-600 text-sm font-medium">Wkrótce</span>
                        </div>
                      )}
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to bottom, transparent 50%, rgba(6,10,20,0.6) 100%)",
                        }}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <p
                        className="font-heading font-bold text-white text-lg mb-2 leading-snug"
                        style={{ letterSpacing: "-0.01em" }}
                      >
                        {item.name}
                      </p>
                      <span
                        className="inline-block self-start text-xs font-semibold px-3 py-1 rounded-full mb-3"
                        style={{
                          background: "rgba(201,168,76,0.1)",
                          color: "#C9A84C",
                          border: "1px solid rgba(201,168,76,0.2)",
                        }}
                      >
                        {item.industry}
                      </span>
                      <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 flex-1">
                        {item.result}
                      </p>
                      <p
                        className="mt-4 text-sm font-semibold transition-colors duration-200"
                        style={{ color: "#C9A84C" }}
                      >
                        Zobacz projekt →
                      </p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              disabled={!canPrev}
              aria-label="Poprzedni projekt"
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed"
              style={{
                background: canPrev ? "rgba(201,168,76,0.1)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${canPrev ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.06)"}`,
                color: canPrev ? "#C9A84C" : "#334155",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Page dots */}
            <div className="flex gap-2" role="tablist" aria-label="Strony portfolio">
              {Array.from({ length: pageCount }).map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === currentPage}
                  aria-label={`Strona ${i + 1}`}
                  onClick={() => resetAndGo(Math.min(i * visible, maxStart))}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === currentPage ? "24px" : "8px",
                    height: "8px",
                    background:
                      i === currentPage ? "#C9A84C" : "rgba(201,168,76,0.25)",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={!canNext}
              aria-label="Następny projekt"
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed"
              style={{
                background: canNext ? "rgba(201,168,76,0.1)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${canNext ? "rgba(201,168,76,0.4)" : "rgba(255,255,255,0.06)"}`,
                color: canNext ? "#C9A84C" : "#334155",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path
                  d="M7.5 5L12.5 10L7.5 15"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Counter */}
          <p className="text-center mt-3 text-slate-600 text-sm">
            {startIndex + 1}–{Math.min(startIndex + visible, total)} z {total} projektów
          </p>
        </div>
      </div>
    </section>
  );
}
