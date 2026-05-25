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
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          background: "rgba(6,10,20,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 py-2.5 flex items-center justify-between">
          <Image
            src="/logo.png"
            alt="Studio Code Art"
            width={160}
            height={64}
            className="h-20 w-auto"
          />
          <a
            href="#formularz"
            className="btn-gold text-sm px-5 py-2.5 rounded-xl"
          >
            Chcę więcej klientów →
          </a>
        </div>
      </header>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Przewiń do góry"
        className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{
          background: "linear-gradient(135deg, #C9A84C, #F0D060)",
          color: "#060A14",
          boxShadow: "0 4px 20px rgba(201,168,76,0.3)",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
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
