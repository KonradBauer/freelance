"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

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

const STATS = [
  { value: "12+", label: "projektów", delay: "0s" },
  { value: "14 dni", label: "realizacja", delay: "1.2s" },
  { value: "24/7", label: "wsparcie", delay: "2.4s" },
];

/** Wireframe rotating cube — pure CSS 3D */
function WireframeCube({
  size,
  speed,
  altSpin = false,
  opacity = 0.28,
}: {
  size: number;
  speed: string;
  altSpin?: boolean;
  opacity?: number;
}) {
  const half = size / 2;
  const face: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    border: `1px solid rgba(201,168,76,${opacity})`,
    background: `rgba(201,168,76,${opacity * 0.08})`,
  };

  return (
    <div style={{ perspective: "800px", width: size, height: size }}>
      <div
        style={{
          width: size,
          height: size,
          position: "relative",
          transformStyle: "preserve-3d",
          animation: `${altSpin ? "spin-cube-alt" : "spin-cube"} ${speed} linear infinite`,
        }}
      >
        <div style={{ ...face, transform: `translateZ(${half}px)` }} />
        <div style={{ ...face, transform: `translateZ(${-half}px) rotateY(180deg)` }} />
        <div style={{ ...face, transform: `rotateY(-90deg) translateZ(${half}px)` }} />
        <div style={{ ...face, transform: `rotateY(90deg) translateZ(${half}px)` }} />
        <div style={{ ...face, transform: `rotateX(90deg) translateZ(${half}px)` }} />
        <div style={{ ...face, transform: `rotateX(-90deg) translateZ(${half}px)` }} />
      </div>
    </div>
  );
}

export default function HeroSection() {
  const reduce = useReducedMotion() ?? false;
  const item = fade(reduce);

  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -60]);
  const orb1Y = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -120]);
  const orb2Y = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -80]);
  const cube1Y = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -90]);
  const cube2Y = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -50]);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "#060A14" }}
    >
      {/* Gradient orbs with parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <motion.div
          className="absolute rounded-full"
          style={{
            top: "15%",
            right: "10%",
            width: "min(55vw, 700px)",
            height: "min(55vw, 700px)",
            background:
              "radial-gradient(circle, rgba(201,168,76,0.11) 0%, transparent 65%)",
            filter: "blur(40px)",
            animation: "orb-drift 14s ease-in-out infinite",
            y: orb1Y,
          }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            bottom: "10%",
            left: "5%",
            width: "min(45vw, 600px)",
            height: "min(45vw, 600px)",
            background:
              "radial-gradient(circle, rgba(88,80,236,0.07) 0%, transparent 70%)",
            filter: "blur(60px)",
            animation: "orb-drift 18s ease-in-out infinite reverse",
            y: orb2Y,
          }}
        />
      </motion.div>

      {/* 3D wireframe cubes */}
      <motion.div
        className="absolute pointer-events-none hidden md:block"
        style={{ top: "22%", right: "7%", y: cube1Y }}
        aria-hidden="true"
      >
        <WireframeCube size={90} speed="13s" opacity={0.32} />
      </motion.div>
      <motion.div
        className="absolute pointer-events-none hidden md:block"
        style={{ bottom: "28%", left: "5%", y: cube2Y }}
        aria-hidden="true"
      >
        <WireframeCube size={55} speed="19s" altSpin opacity={0.22} />
      </motion.div>

      {/* Grain overlay */}
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

      {/* Main content with parallax */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto w-full px-6 py-28 text-center"
        style={{ y: contentY }}
      >
        <motion.div variants={stagger} initial="hidden" animate="show">
          {/* Logo */}
          <motion.div variants={item} className="flex justify-center mb-12">
            <Image
              src="/logo.png"
              alt="Studio Code Art"
              width={200}
              height={80}
              priority
              className="h-28 w-auto"
            />
          </motion.div>

          {/* Badge pill */}
          <motion.div variants={item} className="flex justify-center mb-8">
            <span
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-[0.7rem] font-semibold"
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(201,168,76,0.22)",
                color: "#C9A84C",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{
                  background: "#C9A84C",
                  boxShadow: "0 0 8px rgba(201,168,76,0.9)",
                  animation: "float 2s ease-in-out infinite",
                  display: "inline-block",
                }}
              />
              Strony internetowe dla firm
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="font-heading font-bold text-white leading-[1.06] mb-8"
            style={{
              fontSize: "clamp(2.1rem, 6vw + 0.5rem, 4.5rem)",
              letterSpacing: "-0.025em",
            }}
          >
            Twoi klienci szukają Cię{" "}
            <span className="hidden sm:inline">
              <br />
            </span>
            w internecie.{" "}
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #C9A84C 0%, #F0D060 45%, #C9A84C 100%)",
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
            className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Bez profesjonalnej strony tracisz zlecenia każdego dnia. Zbuduję Ci
            stronę, która pracuje na Ciebie 24/7 i zamienia odwiedzających w
            klientów.
          </motion.p>

          {/* CTA */}
          <motion.div variants={item} className="flex flex-col items-center gap-4">
            <a
              href="#formularz"
              className="btn-gold inline-block text-lg px-10 py-4 rounded-[14px]"
            >
              Chcę więcej klientów →
            </a>
            <p className="text-slate-600 text-sm tracking-wide">
              Bezpłatna konsultacja · Bez zobowiązań
            </p>
          </motion.div>

          {/* Floating stats */}
          <motion.div
            variants={item}
            className="flex flex-wrap justify-center gap-4 mt-16"
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className="px-6 py-3.5 rounded-xl text-center"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(201,168,76,0.12)",
                  animation: `float 3.5s ease-in-out ${s.delay} infinite`,
                }}
              >
                <p
                  className="font-heading font-bold text-lg leading-none mb-1"
                  style={{ color: "#C9A84C" }}
                >
                  {s.value}
                </p>
                <p
                  className="text-[0.65rem] uppercase tracking-widest"
                  style={{ color: "#475569" }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
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
