"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import SplitText from "./SplitText";

type Plan = {
  name: string;
  tagline: string;
  monthly: number;
  yearly: number; // per month when billed yearly
  features: string[];
  cta: string;
  highlighted?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Starter",
    tagline: "For solo builders and small teams getting started.",
    monthly: 19,
    yearly: 15,
    features: [
      "Up to 5 workspaces",
      "10,000 automation runs / mo",
      "Basic analytics",
      "Community support",
      "Email integrations",
    ],
    cta: "Start free",
  },
  {
    name: "Pro",
    tagline: "Everything growing teams need to scale operations.",
    monthly: 49,
    yearly: 39,
    features: [
      "Unlimited workspaces",
      "250,000 automation runs / mo",
      "Predictive analytics & forecasts",
      "Priority support · 4h SLA",
      "All 200+ integrations",
      "Role-based access",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    tagline: "Security, scale and custom contracts for global orgs.",
    monthly: 149,
    yearly: 119,
    features: [
      "Unlimited automation runs",
      "Dedicated success manager",
      "SAML SSO & SCIM",
      "Audit logs & data residency",
      "99.99% uptime SLA",
      "Custom AI model training",
    ],
    cta: "Talk to sales",
  },
];

export default function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <section
      id="pricing"
      className="relative py-24 sm:py-32"
      aria-labelledby="pricing-heading"
    >
      <div className="container-px mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="badge"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-cyan" />
            Simple, transparent pricing
          </motion.span>
          <SplitText
            as="h2"
            id="pricing-heading"
            className="section-title mt-5"
          >
            Pricing that{" "}
            <span className="text-gradient-brand">scales with you</span>.
          </SplitText>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 text-white/65"
          >
            14-day free trial on every plan. No credit card required.
          </motion.p>
        </div>

        {/* Toggle */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <span
            className={`text-sm transition ${yearly ? "text-white/55" : "text-white"}`}
          >
            Monthly
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={yearly}
            aria-label="Toggle yearly billing"
            onClick={() => setYearly((v) => !v)}
            className={`relative h-7 w-12 rounded-full border border-white/10 transition-colors ${
              yearly
                ? "bg-gradient-to-r from-brand-purple to-brand-cyan"
                : "bg-white/10"
            }`}
          >
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`absolute top-0.5 grid h-5 w-5 place-items-center rounded-full bg-white shadow-md ${
                yearly ? "left-[calc(100%-1.375rem)]" : "left-0.5"
              }`}
            />
          </button>
          <span
            className={`flex items-center gap-2 text-sm transition ${
              yearly ? "text-white" : "text-white/55"
            }`}
          >
            Yearly
            <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
              Save 20%
            </span>
          </span>
        </div>

        {/* Plans */}
        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`relative overflow-hidden rounded-2xl p-6 sm:p-7 ${
                plan.highlighted
                  ? "glass-strong grad-border shadow-glow"
                  : "glass"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                  <Sparkles className="h-3 w-3" />
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="mt-1 text-sm text-white/60">{plan.tagline}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-sm text-white/65">$</span>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={yearly ? `${plan.name}-y` : `${plan.name}-m`}
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-5xl font-bold tracking-tight"
                  >
                    {yearly ? plan.yearly : plan.monthly}
                  </motion.span>
                </AnimatePresence>
                <span className="ml-1 text-sm text-white/55">/ month</span>
              </div>
              <p className="mt-1 text-xs text-white/45">
                {yearly ? "Billed annually" : "Billed monthly"} · USD
              </p>

              <ul className="mt-6 space-y-2.5 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span
                      className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full ${
                        plan.highlighted
                          ? "bg-gradient-to-br from-brand-purple to-brand-cyan"
                          : "bg-white/10"
                      }`}
                    >
                      <Check className="h-2.5 w-2.5 text-white" />
                    </span>
                    <span className="text-white/80">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#cta"
                className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  plan.highlighted
                    ? "btn-primary"
                    : "btn-ghost"
                }`}
              >
                {plan.cta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
