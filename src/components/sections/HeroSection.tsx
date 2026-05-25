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
          "radial-gradient(ellipse at 60% 50%, rgba(251,191,36,0.12) 0%, transparent 60%), #0f172a",
      }}
    >
      <div className="max-w-4xl mx-auto w-full px-6 py-20 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item} className="flex justify-center mb-10">
            <Image
              src="/logo.png"
              alt="Studio Code Art"
              width={200}
              height={80}
              priority
              className="h-32 w-auto"
            />
          </motion.div>

          <motion.span
            variants={item}
            className="inline-block text-amber-400 text-sm font-semibold tracking-widest uppercase mb-6"
          >
            Strony internetowe dla firm
          </motion.span>

          <motion.h1
            variants={item}
            className="font-heading font-bold text-white leading-tight mb-6"
            style={{ fontSize: "clamp(1.5rem, 5.5vw + 0.25rem, 3.75rem)" }}
          >
            Twoi klienci szukają Cię w internecie.{" "}
            <span className="text-amber-400">I wybierają konkurencję.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
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
      </div>
    </section>
  );
}
