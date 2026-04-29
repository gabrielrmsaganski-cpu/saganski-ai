"use client";

import * as React from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });
  const glow = useTransform(scaleX, (v) => 0.35 + v * 0.65);

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-gradient-to-r from-brand-electric via-brand-cyan to-brand-violet"
        style={{ scaleX, opacity: glow }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none fixed inset-x-0 top-0 z-[55] h-[2px] origin-left blur-[6px] bg-gradient-to-r from-brand-electric via-brand-cyan to-brand-violet"
        style={{ scaleX, opacity: glow }}
        aria-hidden
      />
    </>
  );
}
