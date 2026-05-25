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
    <div ref={ref} className="text-center py-10 px-12">
      <p
        className="font-heading font-bold leading-none mb-3"
        style={{
          fontSize: "clamp(3rem, 7vw, 5rem)",
          letterSpacing: "-0.03em",
          background:
            "linear-gradient(135deg, #C9A84C 0%, #F0D060 50%, #C9A84C 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {display}
      </p>
      <p
        className="text-xs uppercase tracking-[0.18em] font-medium"
        style={{ color: "#475569" }}
      >
        {label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-8 px-6" style={{ background: "#060A14" }}>
      <div className="max-w-3xl mx-auto">
        <div
          className="flex flex-col sm:flex-row justify-center items-stretch rounded-[20px]"
          style={{
            background: "rgba(255,255,255,0.022)",
            border: "1px solid rgba(201,168,76,0.12)",
          }}
        >
          <div className="flex-1">
            <CounterStat value={STATS[0].value} label={STATS[0].label} />
          </div>
          <div
            className="w-full sm:w-px h-px sm:h-auto self-stretch"
            style={{ background: "rgba(201,168,76,0.1)" }}
          />
          <div className="flex-1">
            <CounterStat value={STATS[1].value} label={STATS[1].label} />
          </div>
        </div>
      </div>
    </section>
  );
}
