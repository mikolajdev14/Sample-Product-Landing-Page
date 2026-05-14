"use client";

import { motion } from "framer-motion";
import {
  Bot,
  BarChart3,
  Sparkles,
  Users,
  Activity,
  Plug,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SplitText from "./SplitText";

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
  /** Accent class used by the icon container + glow */
  accent: string;
};

const FEATURES: Feature[] = [
  {
    title: "AI Automation",
    description:
      "Spin up self-learning agents that handle multi-step workflows across every tool your team already uses.",
    icon: Bot,
    accent: "from-brand-purple to-brand-violet",
  },
  {
    title: "Smart Analytics",
    description:
      "Turn raw activity into board-ready insights. Drill from a KPI all the way down to a single customer in seconds.",
    icon: BarChart3,
    accent: "from-brand-blue to-brand-sky",
  },
  {
    title: "Predictive Insights",
    description:
      "Forecast churn, demand and pipeline health with on-device models that adapt as your business changes.",
    icon: Sparkles,
    accent: "from-brand-cyan to-brand-sky",
  },
  {
    title: "Team Collaboration",
    description:
      "Real-time co-editing, threaded comments and approvals — built for hybrid, async, global teams.",
    icon: Users,
    accent: "from-fuchsia-500 to-brand-purple",
  },
  {
    title: "Real-Time Reports",
    description:
      "Live dashboards that stream from your data warehouse without scheduled refreshes or stale numbers.",
    icon: Activity,
    accent: "from-emerald-400 to-brand-cyan",
  },
  {
    title: "API Integrations",
    description:
      "Connect 200+ tools out of the box — and build anything else in minutes with our typed SDK and webhooks.",
    icon: Plug,
    accent: "from-indigo-400 to-brand-blue",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Features() {
  return (
    <section
      id="features"
      className="relative py-24 sm:py-32"
      aria-labelledby="features-heading"
    >
      <div className="container-px mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="badge"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-cyan" />
            Built for modern teams
          </motion.span>
          <SplitText
            as="h2"
            id="features-heading"
            className="section-title mt-5"
          >
            Everything you need to{" "}
            <span className="text-gradient-brand">ship faster</span>.
          </SplitText>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 text-white/65"
          >
            A unified platform that replaces a dozen brittle tools — automate
            anything, measure everything, scale to millions of operations a day.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.article
              key={f.title}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              custom={i}
              whileHover={{ y: -6, rotate: -0.4 }}
              className="group relative overflow-hidden rounded-2xl glass p-6 transition-shadow duration-300 hover:shadow-glow"
            >
              {/* Spotlight on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(168,85,247,0.18), transparent 40%)",
                }}
              />

              {/* Icon */}
              <div
                className={`relative inline-grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br ${f.accent} shadow-glow-soft transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110`}
              >
                <f.icon className="h-5 w-5 text-white drop-shadow" />
                <span className="absolute -inset-1 -z-10 rounded-2xl bg-white/10 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-60" />
              </div>

              <h3 className="mt-5 text-lg font-semibold tracking-tight">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                {f.description}
              </p>

              {/* Bottom shine line */}
              <span className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
