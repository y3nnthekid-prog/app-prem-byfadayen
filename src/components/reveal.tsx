"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Jarak geser awal (px). 0 = cuma fade. */
  y?: number;
  /** Tag yang dirender — pakai "li" kalau langsung di dalam ol/ul. */
  as?: "div" | "li";
};

/** Muncul saat masuk viewport, sekali saja, dan tahu diri kalau user minta reduced motion. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 22,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = as === "li" ? motion.li : motion.div;

  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
