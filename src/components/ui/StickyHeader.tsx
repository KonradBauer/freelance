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
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
        <Image
          src="/logo.png"
          alt="Studio Code Art"
          width={120}
          height={48}
          className="h-10 w-auto"
        />
        <a
          href="#formularz"
          className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm px-5 py-2.5 rounded-xl transition-colors duration-200"
        >
          Chcę więcej klientów →
        </a>
      </div>
    </header>
  );
}
