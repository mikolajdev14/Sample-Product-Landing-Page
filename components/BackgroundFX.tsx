"use client";

import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Global decorative background:
 *  - Soft animated colour blobs (purple → indigo → cyan)
 *  - Subtle grid pattern with radial fade
 *  - Top radial glow
 *
 * The blobs are parallaxed by scroll progress (each at a different speed)
 * so the page feels deeper as the user moves through it. The autonomous
 * `animate-blob` keyframes still run on top of the scroll transform.
 *
 * Rendered once in `app/page.tsx` so every section shares the same
 * atmosphere. Sits behind everything via `pointer-events-none` + `-z-10`.
 */
export default function BackgroundFX() {
  const { scrollYProgress } = useScroll();

  // Each blob translates a different amount over the entire scroll length.
  // Different signs make blobs move in opposite directions for parallax depth.
  const blob1Y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const blob3Y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base radial glow at the top */}
      <div className="absolute inset-x-0 top-[-20%] h-[80vh] bg-radial-fade" />

      {/* Animated blobs — combine the keyframe drift with scroll parallax */}
      <motion.div
        style={{ y: blob1Y }}
        className="absolute -top-32 -left-32 h-[40rem] w-[40rem] rounded-full bg-brand-violet/30 blur-[120px] animate-blob"
      />
      <motion.div
        style={{ y: blob2Y, animationDelay: "-6s" }}
        className="absolute top-1/3 -right-40 h-[36rem] w-[36rem] rounded-full bg-brand-cyan/25 blur-[120px] animate-blob"
      />
      <motion.div
        style={{ y: blob3Y, animationDelay: "-12s" }}
        className="absolute bottom-[-10%] left-1/4 h-[34rem] w-[34rem] rounded-full bg-brand-blue/25 blur-[120px] animate-blob"
      />

      {/* Grid pattern with radial mask + slow vertical parallax */}
      <motion.div
        style={{
          y: gridY,
          maskImage:
            "radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 30%, black 30%, transparent 75%)",
        }}
        className="absolute inset-0 bg-grid-pattern [background-size:48px_48px] opacity-[0.35]"
      />

      {/* Top vignette to deepen the dark theme */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink-950 to-transparent" />
      {/* Bottom vignette */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent" />
    </div>
  );
}
