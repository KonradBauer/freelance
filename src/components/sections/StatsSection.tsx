"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const STATS = [
  { value: "12+", label: "zrealizowanych projektów" },
  { value: "14 dni", label: "czas realizacji" },
];

function CounterStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1]) : 0;
  const suffix = match ? match[2] : value;

  useEffect(() => {
    if (!isInView) return;
    const duration = 1400;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(`${Math.round(eased * target)}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, target, suffix]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-heading text-5xl sm:text-6xl font-bold text-amber-400 mb-2">
        {display}
      </p>
      <p className="text-slate-400 text-base uppercase tracking-widest">
        {label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="bg-slate-900 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-10 sm:gap-20">
          {STATS.map((stat) => (
            <CounterStat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
