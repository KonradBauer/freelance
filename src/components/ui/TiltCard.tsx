"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Max tilt angle in degrees */
  depth?: number;
}

export function TiltCard({ children, className = "", style, depth = 12 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const spring = { stiffness: 260, damping: 26 };
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [depth, -depth]), spring);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-depth, depth]), spring);
  const scale = useSpring(1, { stiffness: 300, damping: 30 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current || !glareRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const relX = (e.clientX - left) / width;
    const relY = (e.clientY - top) / height;
    mx.set(relX - 0.5);
    my.set(relY - 0.5);
    glareRef.current.style.background = `radial-gradient(circle at ${relX * 100}% ${relY * 100}%, rgba(255,255,255,0.13) 0%, transparent 55%)`;
    glareRef.current.style.opacity = "1";
  }

  function onMouseEnter() {
    scale.set(1.02);
  }

  function onMouseLeave() {
    mx.set(0);
    my.set(0);
    scale.set(1);
    if (glareRef.current) glareRef.current.style.opacity = "0";
  }

  return (
    <div style={{ perspective: "900px" }}>
      <motion.div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d", ...style }}
        className={`relative ${className}`}
      >
        {children}
        {/* Glare overlay */}
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{ opacity: 0, transition: "opacity 0.2s ease" }}
          aria-hidden="true"
        />
      </motion.div>
    </div>
  );
}
