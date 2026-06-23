"use client";

import { useEffect, useState } from "react";

export default function StickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("formularz");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (visible) document.body.classList.add("sticky-bar-visible");
    else document.body.classList.remove("sticky-bar-visible");
    return () => document.body.classList.remove("sticky-bar-visible");
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[45]"
      style={{
        background: "rgba(6,10,20,0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(201,168,76,0.2)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <p className="text-sm font-medium" style={{ color: "#94A3B8" }}>
          Chcesz stronę, która sprzedaje?
        </p>
        <a
          href="#formularz"
          className="btn-gold text-sm px-5 py-2.5 rounded-xl shrink-0"
        >
          Bezpłatna wycena →
        </a>
      </div>
    </div>
  );
}
