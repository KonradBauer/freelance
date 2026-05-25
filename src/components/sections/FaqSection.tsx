"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FAQ_ITEMS } from "@/components/ui/JsonLd";

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-6" style={{ background: "#060A14" }}>
      <div className="max-w-3xl mx-auto">
        <div className="divider-gold mb-16" />

        <div className="text-center mb-14">
          <span className="section-label">FAQ</span>
          <h2
            className="font-heading font-bold text-white mb-5 leading-tight"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw + 0.5rem, 2.75rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Najczęstsze pytania
          </h2>
          <p className="text-slate-500 text-lg">
            Odpowiedzi na pytania, które słyszę najczęściej przed współpracą
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = open === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  background: isOpen
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(255,255,255,0.022)",
                  border: isOpen
                    ? "1px solid rgba(201,168,76,0.28)"
                    : "1px solid rgba(201,168,76,0.1)",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-heading font-semibold text-base sm:text-lg leading-snug"
                    style={{ color: isOpen ? "#E2E8F0" : "#94A3B8" }}
                  >
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="shrink-0 text-2xl leading-none font-light"
                    style={{ color: "#C9A84C" }}
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-6 pb-6">
                        <div
                          className="w-full mb-4"
                          style={{
                            height: "1px",
                            background: "rgba(201,168,76,0.1)",
                          }}
                        />
                        <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
