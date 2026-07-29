"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { CTA_TEXT } from "@/lib/constants";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fade = (reduce: boolean) => ({
  hidden: { opacity: 0, y: reduce ? 0 : 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: reduce ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] as const },
  },
});

export default function HeroSection() {
  const reduce = useReducedMotion() ?? false;
  const item = fade(reduce);
  const [videoReady, setVideoReady] = useState(false);

  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -55]);

  return (
    <section
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden"
      style={{ background: "#060A14" }}
    >

      {/* Video background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          onCanPlayThrough={() => setVideoReady(true)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: videoReady ? 0.35 : 0,
            mixBlendMode: "screen",
            transition: "opacity 1.2s ease",
          }}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          opacity: 0.032,
          mixBlendMode: "overlay",
        }}
        aria-hidden="true"
      />

      {/* ── Main content ── */}
      <motion.div
        className="relative z-10 w-full px-6 py-24"
        style={{ y: contentY }}
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <div className="w-full">
            <motion.div variants={stagger} initial="hidden" animate="show" className="w-full">

              {/* Logo */}
              <motion.div variants={item} className="flex justify-center mb-10">
                <Image
                  src="/logo.png"
                  alt="Studio Code Art"
                  width={200}
                  height={80}
                  priority
                  className="h-24 w-auto"
                />
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={item}
                className="font-heading font-bold text-white leading-[1.06] mb-7"
                style={{
                  fontSize: "clamp(2rem, 5.5vw + 0.5rem, 4rem)",
                  letterSpacing: "-0.025em",
                }}
              >
                Twoi klienci szukają Cię w internecie.{" "}
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #C9A84C 0%, #F0D060 45%, #C9A84C 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  I wybierają konkurencję.
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={item}
                className="text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed"
              >
                To nie jest kwestia gustu - to utracone zlecenia, które w tej
                chwili trafiają do kogoś innego. Pokażę Ci dokładnie, gdzie
                tracisz klientów, i zbuduję rozwiązanie, które od pierwszego
                dnia zaczyna ich odzyskiwać.
              </motion.p>

              {/* CTA */}
              <motion.div variants={item} className="flex flex-col items-center gap-4">
                <div className="flex flex-wrap justify-center gap-3">
                  <a
                    href={process.env.NEXT_PUBLIC_CALENDLY_URL ?? "#formularz"}
                    target={process.env.NEXT_PUBLIC_CALENDLY_URL ? "_blank" : undefined}
                    rel={process.env.NEXT_PUBLIC_CALENDLY_URL ? "noopener noreferrer" : undefined}
                    className="btn-gold inline-block text-lg px-10 py-4 rounded-[14px]"
                  >
                    {CTA_TEXT}
                  </a>
                </div>
                <p className="text-slate-600 text-sm">
                  30 minut · Bez zobowiązań · Konkretny plan dla Twojej branży
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, transparent, #060A14)" }}
        aria-hidden="true"
      />
    </section>
  );
}
