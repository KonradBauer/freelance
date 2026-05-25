"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function StickyHeader() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="max-w-5xl mx-auto px-6 py-2 flex items-center justify-between">
          <Image
            src="/logo.png"
            alt="Studio Code Art"
            width={160}
            height={64}
            className="h-14 w-auto"
          />
          <a
            href="#formularz"
            className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm px-5 py-2.5 rounded-xl transition-colors duration-200"
          >
            Chcę więcej klientów →
          </a>
        </div>
      </header>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Przewiń do góry"
        className={`fixed bottom-6 right-6 z-50 w-11 h-11 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </>
  );
}
