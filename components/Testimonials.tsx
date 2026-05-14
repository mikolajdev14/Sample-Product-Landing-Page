"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import SplitText from "./SplitText";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
};

const ITEMS: Testimonial[] = [
  {
    name: "Maya Patel",
    role: "VP of Operations",
    company: "Northwind Labs",
    avatar: "https://i.pravatar.cc/160?img=47",
    quote:
      "FlowSync replaced four tools for us in a single quarter. The agents handle work we used to outsource — and they get smarter every week.",
  },
  {
    name: "Daniel Kim",
    role: "Head of Growth",
    company: "Loop Studios",
    avatar: "https://i.pravatar.cc/160?img=12",
    quote:
      "Our team ships 3× faster. The predictive insights flagged a churn spike two weeks before it showed up in our dashboards.",
  },
  {
    name: "Elena Vasquez",
    role: "CTO",
    company: "Mintly",
    avatar: "https://i.pravatar.cc/160?img=32",
    quote:
      "From signup to first automation in under 10 minutes. The integration story is the cleanest I've seen in the category.",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-24 sm:py-32"
      aria-labelledby="testimonials-heading"
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
            <Star className="h-3.5 w-3.5 text-amber-300" />
            Loved by teams everywhere
          </motion.span>
          <SplitText
            as="h2"
            id="testimonials-heading"
            className="section-title mt-5"
          >
            What our customers <span className="text-gradient-brand">say</span>.
          </SplitText>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -6, rotate: 0.3 }}
              className="group relative overflow-hidden rounded-2xl glass p-6 transition-shadow duration-300 hover:shadow-glow"
            >
              <Quote
                aria-hidden
                className="absolute -right-2 -top-2 h-20 w-20 text-white/[0.04]"
              />
              <div className="flex items-center gap-1 text-amber-300">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-[15px] leading-relaxed text-white/85">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="relative inline-block h-11 w-11 overflow-hidden rounded-full ring-2 ring-white/10">
                  <Image
                    src={t.avatar}
                    alt={`Portrait of ${t.name}`}
                    width={88}
                    height={88}
                    className="h-full w-full object-cover"
                  />
                </span>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-white/55">
                    {t.role} · {t.company}
                  </p>
                </div>
              </figcaption>
              {/* Hover gradient ring */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 ring-1 ring-inset transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  boxShadow:
                    "inset 0 0 0 1px rgba(168,85,247,0.35), 0 0 40px -10px rgba(6,182,212,0.4)",
                }}
              />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
