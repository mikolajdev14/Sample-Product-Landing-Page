"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, HelpCircle } from "lucide-react";
import SplitText from "./SplitText";

const QA = [
  {
    q: "How is FlowSync AI different from other automation tools?",
    a: "Traditional automation platforms rely on rigid `if-this-then-that` rules. FlowSync AI uses self-learning agents that observe how your team works and adapt automatically — handling edge cases, exceptions and unstructured data without breaking.",
  },
  {
    q: "Will it work with the tools we already use?",
    a: "Yes. We ship 200+ first-party integrations covering CRM, helpdesk, comms, data warehouses, finance and dev tools. Anything else can be wired up in minutes with our typed SDK, webhooks and Zapier-compatible triggers.",
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. FlowSync AI is SOC 2 Type II, ISO 27001, and HIPAA compliant. All data is encrypted in transit and at rest, with optional regional residency (US, EU, AU). Customer data is never used to train shared models.",
  },
  {
    q: "How long does it take to get started?",
    a: "Most teams ship their first automation in under 10 minutes. Onboarding templates cover the 30 most common workflows out of the box — and our solutions team is happy to migrate you from Zapier, Make or n8n for free.",
  },
  {
    q: "Can I change or cancel my plan anytime?",
    a: "Yes. Upgrade, downgrade or cancel anytime from your billing dashboard. Yearly subscribers get a prorated refund within the first 30 days, no questions asked.",
  },
  {
    q: "Do you offer discounts for startups and non-profits?",
    a: "We do — qualifying startups get 50% off Pro for the first year, and non-profits get the same rate for as long as their status is valid. Contact our team to apply.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-24 sm:py-32"
      aria-labelledby="faq-heading"
    >
      <div className="container-px mx-auto max-w-4xl">
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="badge"
          >
            <HelpCircle className="h-3.5 w-3.5 text-brand-cyan" />
            Frequently asked
          </motion.span>
          <SplitText
            as="h2"
            id="faq-heading"
            className="section-title mt-5"
          >
            Questions, <span className="text-gradient-brand">answered</span>.
          </SplitText>
        </div>

        <ul className="mt-12 space-y-3">
          {QA.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.li
                key={item.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="glass overflow-hidden rounded-2xl"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.03]"
                >
                  <span className="text-base font-medium text-white">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/5 ring-1 ring-white/10"
                  >
                    <Plus className="h-4 w-4 text-white/80" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      id={`faq-panel-${i}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 pt-0 text-sm leading-relaxed text-white/70">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
