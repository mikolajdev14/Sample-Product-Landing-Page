"use client";

import { motion } from "framer-motion";

/**
 * LogoCloud
 *
 * Infinite-marquee of stylised wordmarks. The track contains the same set
 * of logos twice and animates `x: 0 → -50%`, which is the exact width of
 * the duplicated half — so the loop is seamless.
 *
 * Hovering the section pauses the animation; a fade-to-edge mask hides the
 * cut-off logos at the ends of the rail.
 */

const LOGOS = [
  {
    name: "Google",
    render: () => (
      <span className="select-none text-[1.65rem] font-medium tracking-tight">
        <span style={{ color: "#4285F4" }}>G</span>
        <span style={{ color: "#EA4335" }}>o</span>
        <span style={{ color: "#FBBC05" }}>o</span>
        <span style={{ color: "#4285F4" }}>g</span>
        <span style={{ color: "#34A853" }}>l</span>
        <span style={{ color: "#EA4335" }}>e</span>
      </span>
    ),
  },
  {
    name: "Microsoft",
    render: () => (
      <span className="flex items-center gap-2 select-none">
        <span className="grid grid-cols-2 gap-[2px]">
          <span className="h-3 w-3 bg-[#F25022]" />
          <span className="h-3 w-3 bg-[#7FBA00]" />
          <span className="h-3 w-3 bg-[#00A4EF]" />
          <span className="h-3 w-3 bg-[#FFB900]" />
        </span>
        <span className="text-[1.4rem] font-semibold tracking-tight text-white/85">
          Microsoft
        </span>
      </span>
    ),
  },
  {
    name: "Shopify",
    render: () => (
      <span
        className="select-none text-[1.5rem] font-bold tracking-tight"
        style={{ color: "#95BF47" }}
      >
        shopify
      </span>
    ),
  },
  {
    name: "Uber",
    render: () => (
      <span className="select-none text-[1.6rem] font-black tracking-tighter text-white">
        Uber
      </span>
    ),
  },
  {
    name: "Airbnb",
    render: () => (
      <span
        className="flex items-center gap-1.5 select-none"
        style={{ color: "#FF5A5F" }}
      >
        <svg
          viewBox="0 0 32 32"
          width="22"
          height="22"
          fill="currentColor"
          aria-hidden
        >
          <path d="M16 3c2.6 0 4.6 1.3 5.9 3.6 1.2 2.1 2.1 4.4 4 9.3 1.6 4.1 2 5.5 2 7.3 0 3-2.2 5.3-5.3 5.3-1.6 0-3.1-.6-5-2-1.4-1-2.5-2-1.6-2 .8 0 1.7-.4 2.5-1.1 1.6-1.4 1.9-3.5 1-5.4-.9-1.8-2.5-2.7-4.5-2.7s-3.6.9-4.5 2.7c-.9 1.9-.6 4 1 5.4.8.7 1.7 1.1 2.5 1.1.9 0-.2 1-1.6 2-1.9 1.4-3.4 2-5 2C4.2 28.5 2 26.2 2 23.2c0-1.8.4-3.2 2-7.3 1.9-4.9 2.8-7.2 4-9.3C9.4 4.3 11.4 3 14 3h2zm0 8.5c-1.5 0-2.6.9-2.6 2.4 0 1.4 1.1 2.3 2.6 2.3s2.6-.9 2.6-2.3c0-1.5-1.1-2.4-2.6-2.4z" />
        </svg>
        <span className="text-[1.4rem] font-bold tracking-tight">airbnb</span>
      </span>
    ),
  },
  {
    name: "Stripe",
    render: () => (
      <span
        className="select-none text-[1.55rem] italic font-bold tracking-tight"
        style={{ color: "#635BFF" }}
      >
        stripe
      </span>
    ),
  },
  {
    name: "Spotify",
    render: () => (
      <span
        className="select-none text-[1.5rem] font-bold tracking-tight"
        style={{ color: "#1DB954" }}
      >
        Spotify
      </span>
    ),
  },
  {
    name: "Notion",
    render: () => (
      <span className="select-none text-[1.5rem] font-bold tracking-tight text-white/85">
        Notion
      </span>
    ),
  },
];

// Duplicate the list so the marquee can loop seamlessly.
const MARQUEE = [...LOGOS, ...LOGOS];

export default function LogoCloud() {
  return (
    <section
      aria-label="Trusted by leading companies"
      className="relative py-14 sm:py-20"
    >
      <div className="container-px mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs uppercase tracking-[0.2em] text-white/45"
        >
          Powering teams at the world&rsquo;s most ambitious companies
        </motion.p>

        {/* Marquee */}
        <div
          className="group relative mt-10 overflow-hidden"
          style={{
            // Soft fade at both ends of the rail
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <motion.ul
            className="flex w-max items-center gap-14 pr-14 will-change-transform group-hover:[animation-play-state:paused]"
            // Each "page" of the marquee is the original LOGOS length, so we
            // shift by -50% to land on the duplicated copy and loop seamlessly.
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 28,
              ease: "linear",
              repeat: Infinity,
            }}
            aria-hidden
          >
            {MARQUEE.map((logo, i) => (
              <li
                key={`${logo.name}-${i}`}
                className="shrink-0 grayscale opacity-60 transition-all duration-500 hover:grayscale-0 hover:opacity-100 hover:scale-110"
              >
                {logo.render()}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Hidden, accessible list of the brand names for screen readers */}
        <ul className="sr-only">
          {LOGOS.map((l) => (
            <li key={l.name}>{l.name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
