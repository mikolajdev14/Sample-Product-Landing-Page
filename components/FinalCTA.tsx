"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import SplitText from "./SplitText";
import MagneticButton from "./MagneticButton";

export default function FinalCTA() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="relative py-24 sm:py-32"
    >
      <div className="container-px mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[2rem] glass-strong p-8 sm:p-14"
        >
          {/* Intense gradient background */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-90"
            style={{
              background:
                "radial-gradient(80% 80% at 50% 0%, rgba(168,85,247,0.55) 0%, rgba(99,102,241,0.35) 35%, rgba(6,182,212,0.35) 70%, transparent 100%)",
            }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-brand-purple/30 blur-3xl"
          />
          {/* Grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-grid-pattern [background-size:42px_42px] opacity-[0.25]"
            style={{
              maskImage:
                "radial-gradient(ellipse at 50% 0%, black 30%, transparent 70%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at 50% 0%, black 30%, transparent 70%)",
            }}
          />

          <div className="relative text-center">
            <span className="badge mx-auto">
              <Sparkles className="h-3.5 w-3.5 text-brand-cyan" />
              Ready when you are
            </span>
            <SplitText
              as="h2"
              id="cta-heading"
              className="section-title mt-6 mx-auto max-w-3xl block"
            >
              Stop managing tools.{" "}
              <span className="text-gradient-brand">
                Start scaling outcomes.
              </span>
            </SplitText>
            <p className="mx-auto mt-5 max-w-xl text-white/75">
              Spin up your first AI workflow in under 10 minutes. No credit
              card, no sales call required.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <MagneticButton
                href="#"
                className="btn-primary animate-pulse-glow"
                data-cursor-label="Try it"
              >
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton
                href="#dashboard"
                className="btn-ghost"
                strength={10}
              >
                Book a demo
              </MagneticButton>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-white/65">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                SOC 2 · ISO 27001
              </span>
              <span>•</span>
              <span>14-day free trial</span>
              <span>•</span>
              <span>Cancel anytime</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
