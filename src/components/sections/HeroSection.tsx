"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

function itemVariants(reduce: boolean) {
  return {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.5, ease: "easeOut" as const },
    },
  };
}

export default function HeroSection() {
  const shouldReduce = useReducedMotion() ?? false;
  const item = itemVariants(shouldReduce);

  return (
    <section
      className="min-h-screen flex flex-col justify-center bg-slate-900"
      style={{
        background:
          "radial-gradient(ellipse at 70% 50%, rgba(251,191,36,0.10) 0%, transparent 60%), #0f172a",
      }}
    >
      <div className="max-w-6xl mx-auto w-full px-6 py-20 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
        {/* Lewa kolumna — tekst */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="text-center lg:text-left"
        >
          <motion.span
            variants={item}
            className="inline-block text-amber-400 text-sm font-semibold tracking-widest uppercase mb-6"
          >
            Strony internetowe dla małych firm
          </motion.span>

          <motion.h1
            variants={item}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            Twoi klienci szukają Cię w internecie.{" "}
            <span className="text-amber-400">I wybierają konkurencję.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed"
          >
            Bez profesjonalnej strony tracisz zlecenia każdego dnia. Zbuduję Ci
            stronę, która pracuje na Ciebie 24/7 i zamienia odwiedzających w
            klientów.
          </motion.p>

          <motion.div variants={item}>
            <a
              href="#formularz"
              className="inline-block bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-lg px-8 py-4 rounded-xl transition-colors duration-200 shadow-lg"
            >
              Chcę więcej klientów →
            </a>

            <p className="text-slate-500 text-sm mt-4">
              Bezpłatna konsultacja · Bez zobowiązań
            </p>
          </motion.div>
        </motion.div>

        {/* Prawa kolumna — browser mockup */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: shouldReduce ? 0 : 0.35,
            duration: shouldReduce ? 0 : 0.6,
            ease: "easeOut" as const,
          }}
          className="mt-12 lg:mt-0"
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <Image
              src="/portfolio/hero-animation.gif"
              alt="Przykładowa strona internetowa w akcji"
              width={800}
              height={500}
              priority
              unoptimized
              className="w-full h-auto"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
