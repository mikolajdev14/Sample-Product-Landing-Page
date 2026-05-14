"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

/**
 * CustomCursor
 *
 * Three-layer cursor:
 *  - Glow trail   — soft blurred radial gradient that lags behind the cursor.
 *  - Inner dot    — instant follow, brand gradient (purple → blue → cyan).
 *  - Outer ring   — spring-smoothed, expands and fills on interactive elements.
 *
 * States:
 *  - default            → small dot + ring outline
 *  - hover (clickable)  → ring grows, gets filled, dot hides; optional "click" label
 *  - text (input)       → ring becomes a vertical I-beam
 *  - pressed            → both layers shrink (tap feedback)
 *
 * Disabled on touch / coarse-pointer devices and when the user prefers
 * reduced motion. While active, the native OS cursor is hidden via the
 * `.custom-cursor-active` class added to <html> from `globals.css`.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [mode, setMode] = useState<"default" | "hover" | "text">("default");
  const [label, setLabel] = useState<string | null>(null);

  // Raw pointer coordinates (used by inner dot — feels snappy).
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Smoothed coordinates (used by ring + glow). Tight spring keeps the gap
  // between the inner dot and the ring small while still feeling fluid.
  const ringX = useSpring(x, { stiffness: 700, damping: 35, mass: 0.35 });
  const ringY = useSpring(y, { stiffness: 700, damping: 35, mass: 0.35 });

  // Detect capability once on mount.
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setEnabled(finePointer && !reduced);
  }, []);

  // Track movement, clicks and element type under pointer.
  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const textField = target.closest(
        'input:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"]), textarea, [contenteditable="true"]',
      );
      const interactive = target.closest(
        'a, button, [role="button"], [data-cursor="hover"], summary, label[for], select',
      );

      if (textField) {
        setMode("text");
        setLabel(null);
      } else if (interactive) {
        setMode("hover");
        const explicit = (interactive as HTMLElement).dataset.cursorLabel;
        setLabel(explicit ?? null);
      } else {
        setMode("default");
        setLabel(null);
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    document.documentElement.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [enabled, visible, x, y]);

  if (!enabled) return null;

  const isHover = mode === "hover";
  const isText = mode === "text";

  return (
    <>
      {/* Glow trail — soft blurred halo, follows with spring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: visible ? 0.55 : 0 }}
        transition={{ duration: 0.25 }}
      >
        <span
          className="block h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.85), rgba(99,102,241,0.45) 45%, rgba(6,182,212,0.25) 70%, transparent 80%)",
          }}
        />
      </motion.div>

      {/* Outer ring — spring follow, animates size/shape with state.
        *
        * Centering trick: the wrapper has zero size and `place-items: center`,
        * so the inner span is geometrically centred around (x, y) regardless of
        * the transforms Framer Motion sets while animating `scale` etc.
        * (Plain Tailwind `-translate-x-1/2 -translate-y-1/2` would be
        * overwritten by Framer's transform string and cause the ring to jump.)
        */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] grid h-0 w-0 place-items-center"
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ opacity: { duration: 0.15 } }}
      >
        <motion.span
          className="block transition-colors duration-200"
          animate={{
            width: isText ? 3 : isHover ? 56 : 34,
            height: isText ? 28 : isHover ? 56 : 34,
            borderRadius: isText ? 2 : 9999,
            scale: pressed ? 0.85 : 1,
          }}
          transition={{
            width: { type: "spring", stiffness: 320, damping: 24 },
            height: { type: "spring", stiffness: 320, damping: 24 },
            borderRadius: { duration: 0.2 },
            scale: { type: "spring", stiffness: 500, damping: 20 },
          }}
          style={{
            background: isHover
              ? "linear-gradient(135deg, rgba(168,85,247,0.95), rgba(99,102,241,0.95) 50%, rgba(6,182,212,0.95))"
              : isText
                ? "white"
                : "transparent",
            border:
              isHover || isText ? "0" : "1.5px solid rgba(255,255,255,0.85)",
            boxShadow: isHover
              ? "0 0 30px -4px rgba(139,92,246,0.85), 0 0 0 1px rgba(255,255,255,0.25) inset"
              : "0 0 18px -4px rgba(139,92,246,0.5)",
            mixBlendMode: isHover || isText ? "normal" : "difference",
          }}
        />
      </motion.div>

      {/* Inner dot — instant follow, brand-gradient bead */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x, y }}
        animate={{
          opacity: visible && !isHover && !isText ? 1 : 0,
          scale: pressed ? 0.5 : 1,
        }}
        transition={{
          opacity: { duration: 0.15 },
          scale: { type: "spring", stiffness: 500, damping: 20 },
        }}
      >
        <span className="block h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-brand-purple via-brand-blue to-brand-cyan shadow-[0_0_18px_3px_rgba(139,92,246,0.65)]" />
      </motion.div>

      {/* Contextual label (set via data-cursor-label on the hovered element).
        *
        * IMPORTANT: the outer wrapper only carries the position motion values
        * (`x`, `y` = ringX/ringY). The entrance animation lives on an inner
        * <motion.span> so its own `y` keyframes don't fight the motion value
        * that tracks the pointer (which previously made the label fly to the
        * top of the viewport).
        */}
      <AnimatePresence>
        {label && isHover && (
          <motion.div
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-[9999]"
            style={{ x: ringX, y: ringY }}
          >
            <motion.span
              initial={{ opacity: 0, y: 4, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.9 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="absolute left-7 top-7 whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-black shadow-lg"
            >
              {label}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
