"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  Play,
  Sparkles,
  BarChart3,
  DollarSign,
  Bot,
  Star,
  TrendingUp,
} from "lucide-react";
import { useEffect, useRef } from "react";
import MagneticButton from "./MagneticButton";

/**
 * Hero
 *
 * Full-screen hero with:
 *  - Staggered, line-by-line text animation
 *  - Pulsing primary CTA + shine effect
 *  - Right-side image with glow, floating UI cards
 *  - Subtle parallax that follows the mouse
 *  - Gentle continuous floating (CSS keyframes)
 */
export default function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);

  // Track mouse for parallax. Use spring for smoothness.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });

  // Different parallax intensities for layered depth
  const imgX = useTransform(sx, (v) => v * 14);
  const imgY = useTransform(sy, (v) => v * 14);
  const cardAX = useTransform(sx, (v) => v * -26);
  const cardAY = useTransform(sy, (v) => v * -26);
  const cardBX = useTransform(sx, (v) => v * 22);
  const cardBY = useTransform(sy, (v) => v * 22);
  const cardCX = useTransform(sx, (v) => v * -18);
  const cardCY = useTransform(sy, (v) => v * 30);
  const glowX = useTransform(sx, (v) => v * 8);
  const glowY = useTransform(sy, (v) => v * 8);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      // Normalise to -1..1 relative to the hero's centre
      const x = ((e.clientX - r.left) / r.width) * 2 - 1;
      const y = ((e.clientY - r.top) / r.height) * 2 - 1;
      mx.set(x);
      my.set(y);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section
      id="top"
      ref={ref}
      // `100svh` keeps the hero inside the *visible* viewport (excludes the
      // mobile browser chrome that `100vh` ignores). Extra bottom padding
      // gives the floating cards + image breathing room so nothing gets
      // clipped on first paint.
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16 md:pt-20 md:pb-12"
    >
      {/* Hero-local glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-hero-glow"
      />

      <div className="container-px mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        {/* LEFT — Copy */}
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="badge">
              <Sparkles className="h-3.5 w-3.5 text-brand-cyan" />
              AI Workflow Automation
              <span className="ml-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/80">
                New
              </span>
            </span>
          </motion.div>

          <h1 className="hero-title mt-5">
            {[
              { text: "Automate Your", className: "text-white" },
              { text: "Entire Business", className: "text-white" },
              { text: "With AI.", className: "text-gradient-brand" },
            ].map((line, i) => (
              <motion.span
                key={line.text}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.85,
                  delay: 0.15 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`block ${line.className}`}
              >
                {line.text}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
          >
            FlowSync AI replaces brittle, manual workflows with self-learning
            agents that orchestrate every department — from sales pipelines to
            finance reports — in real time, securely, at scale.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <MagneticButton
              href="#cta"
              className="btn-primary group animate-pulse-glow"
              data-cursor-label="Try it"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton
              href="#dashboard"
              className="btn-ghost group"
              data-cursor-label="Play"
              strength={10}
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 transition-transform group-hover:scale-110">
                <Play className="h-3.5 w-3.5 fill-current" />
              </span>
              Watch Demo
            </MagneticButton>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <div className="flex -space-x-2">
              {[12, 32, 47, 65, 22].map((seed, i) => (
                <span
                  key={seed}
                  className="relative inline-block h-9 w-9 overflow-hidden rounded-full ring-2 ring-ink-950"
                  style={{ zIndex: 10 - i }}
                >
                  <Image
                    src={`https://i.pravatar.cc/72?img=${seed}`}
                    alt=""
                    width={72}
                    height={72}
                    className="h-full w-full object-cover"
                  />
                </span>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-300">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
                <span className="ml-2 text-xs text-white/60">4.9 · 2.4k reviews</span>
              </div>
              <p className="mt-0.5 text-sm text-white/70">
                Trusted by{" "}
                <span className="font-semibold text-white">10,000+ teams</span>{" "}
                worldwide
              </p>
            </div>
          </motion.div>
        </div>

        {/* RIGHT — Visual */}
        <div className="lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-[4/3] w-full max-w-xl lg:max-w-none lg:aspect-[5/4]"
          >
            {/* Pulsing glow behind image */}
            <motion.div
              aria-hidden
              style={{ x: glowX, y: glowY }}
              className="pointer-events-none absolute -inset-10 -z-10"
            >
              <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-brand-purple/40 via-brand-blue/30 to-brand-cyan/40 blur-3xl animate-pulse-glow" />
            </motion.div>

            {/* The hero image (clipped, with subtle float + parallax) */}
            <motion.div
              style={{ x: imgX, y: imgY }}
              className="relative h-full w-full"
            >
              <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-glow animate-float-slow">
                <Image
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80"
                  alt="Futuristic AI workflow dashboard with a focused team collaborating"
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                {/* Gradient overlay to blend with the dark theme */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink-950/60 via-ink-950/10 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink-950/70" />

                {/* Decorative corner badge */}
                <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[11px] backdrop-blur-md ring-1 ring-white/10">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  Live workspace
                </div>
              </div>
            </motion.div>

            {/* Floating card: Analytics */}
            <motion.div
              style={{ x: cardAX, y: cardAY }}
              className="absolute -left-4 top-6 z-10 w-[14rem] sm:-left-10 sm:top-10 sm:w-[16rem]"
            >
              <div className="glass-strong animate-float rounded-2xl p-4 shadow-glow-soft">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-violet/20 ring-1 ring-brand-violet/40">
                      <BarChart3 className="h-4 w-4 text-brand-violet" />
                    </span>
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-white/55">
                        Analytics
                      </p>
                      <p className="text-sm font-semibold">Active users</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                    +18%
                  </span>
                </div>
                <div className="mt-3 text-2xl font-bold tracking-tight">
                  24,892
                </div>
                {/* Mini bar chart */}
                <div className="mt-2 flex h-10 items-end gap-1">
                  {[28, 42, 36, 55, 49, 62, 71, 58, 76, 84].map((h, i) => (
                    <span
                      key={i}
                      className="flex-1 rounded-sm bg-gradient-to-t from-brand-violet/30 to-brand-cyan/80"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating card: Revenue */}
            <motion.div
              style={{ x: cardBX, y: cardBY }}
              className="absolute -right-3 top-1/3 z-10 w-[12.5rem] sm:-right-8 sm:w-[14rem]"
            >
              <div
                className="glass-strong animate-float rounded-2xl p-4 shadow-glow-soft"
                style={{ animationDelay: "-1.5s" }}
              >
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-400/15 ring-1 ring-emerald-400/40">
                    <DollarSign className="h-4 w-4 text-emerald-300" />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-white/55">
                      Revenue
                    </p>
                    <p className="text-sm font-semibold">This month</p>
                  </div>
                </div>
                <div className="mt-2 text-2xl font-bold tracking-tight">
                  $284,310
                </div>
                <div className="mt-1 inline-flex items-center gap-1 text-[11px] text-emerald-300">
                  <TrendingUp className="h-3 w-3" /> +24.6% vs last month
                </div>
              </div>
            </motion.div>

            {/* Floating card: Automation */}
            <motion.div
              style={{ x: cardCX, y: cardCY }}
              className="absolute -bottom-2 left-6 z-10 w-[15rem] sm:-bottom-4 sm:left-10 sm:w-[17rem]"
            >
              <div
                className="glass-strong animate-float rounded-2xl p-4 shadow-glow-soft"
                style={{ animationDelay: "-3s" }}
              >
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-cyan/15 ring-1 ring-brand-cyan/40">
                    <Bot className="h-4 w-4 text-brand-cyan" />
                  </span>
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-white/55">
                      Automation
                    </p>
                    <p className="text-sm font-semibold">Tasks completed today</p>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-bold tracking-tight">1,284</span>
                  <span className="text-[11px] text-white/55">/ 1,500</span>
                </div>
                <div className="relative mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-purple via-brand-blue to-brand-cyan"
                    style={{ width: "85%" }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-xs text-white/40 sm:block"
      >
        <span className="inline-flex items-center gap-2">
          <span className="block h-6 w-px bg-gradient-to-b from-white/40 to-transparent" />
          Scroll to explore
        </span>
      </motion.div>
    </section>
  );
}
