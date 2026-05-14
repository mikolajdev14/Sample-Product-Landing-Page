"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";
import { useRef, type ElementType, type ReactNode } from "react";

/**
 * MagneticButton
 *
 * Wraps an anchor / button so that when the cursor approaches, the element
 * is "pulled" toward it with a spring. On leave, it springs gently back to
 * its rest position.
 *
 * Disabled on coarse-pointer devices via the surrounding CustomCursor logic
 * (those users won't have a pointer to attract).
 */
type MagneticButtonProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Max pixels the element shifts toward the cursor */
  strength?: number;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
} & Omit<HTMLMotionProps<"a">, "ref" | "children">;

export default function MagneticButton({
  as = "a",
  children,
  className,
  strength = 16,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Outer spring (container) — slower, lower stiffness for a heavier feel.
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });
  // Inner spring (label/icon contents) — snappier, follows ahead slightly.
  const isx = useSpring(x, { stiffness: 350, damping: 20, mass: 0.3 });
  const isy = useSpring(y, { stiffness: 350, damping: 20, mass: 0.3 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    // Normalise pointer offset (-1..1) and scale by strength
    const dx = ((e.clientX - cx) / (r.width / 2)) * strength;
    const dy = ((e.clientY - cy) / (r.height / 2)) * strength;
    x.set(dx);
    y.set(dy);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = motion[as as "a"] ?? motion.a;

  return (
    <Tag
      ref={ref as never}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
      {...rest}
    >
      {/* Inner wrapper moves slightly more, so the contents lead the surface
          and create a subtle parallax inside the button itself.              */}
      <motion.span
        style={{ x: isx, y: isy }}
        className="pointer-events-none inline-flex items-center gap-2"
      >
        {children}
      </motion.span>
    </Tag>
  );
}
