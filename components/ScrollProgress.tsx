"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgress
 *
 * Thin brand-gradient bar pinned to the very top of the viewport. Its
 * `scaleX` is driven by the document scroll progress (0 → 1) and smoothed
 * with a spring so it feels weighty rather than twitchy.
 *
 * Sits above everything (z-[60]) but below the custom cursor (z-[9998+]).
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand-purple via-brand-blue to-brand-cyan shadow-[0_0_18px_rgba(139,92,246,0.7)]"
    />
  );
}
