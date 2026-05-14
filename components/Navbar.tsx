"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, ArrowRight } from "lucide-react";

const links = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQ" },
];

/**
 * Sticky, blur-on-scroll navigation with desktop & mobile variants.
 * - Becomes more opaque + adds shadow after scrolling past 16px
 * - Mobile menu uses a slide-down panel with stagger animation
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu after navigating
  const handleNavClick = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-2"
          : "py-4"
      }`}
    >
      <nav
        aria-label="Primary"
        className={`container-px mx-auto max-w-7xl transition-all duration-300`}
      >
        <div
          className={`flex items-center justify-between rounded-2xl px-4 py-2 transition-all duration-300 ${
            scrolled
              ? "glass-strong shadow-[0_8px_30px_-10px_rgba(0,0,0,0.5)]"
              : "bg-transparent border border-transparent"
          }`}
        >
          {/* Logo */}
          <a
            href="#top"
            className="group flex items-center gap-2.5"
            aria-label="FlowSync AI home"
          >
            <span
              aria-hidden
              className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-purple via-brand-blue to-brand-cyan shadow-glow"
            >
              <Sparkles className="h-4 w-4 text-white" />
              <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
            </span>
            <span className="text-base font-semibold tracking-tight">
              FlowSync
              <span className="ml-1 text-gradient-brand">AI</span>
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative rounded-full px-3.5 py-2 text-sm text-white/75 transition-colors hover:text-white"
                >
                  {l.label}
                  <span className="pointer-events-none absolute inset-x-3 -bottom-0.5 h-px scale-x-0 bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-2">
            <a
              href="#cta"
              className="btn-primary hidden md:inline-flex !py-2 !px-4 text-sm"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="md:hidden grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 backdrop-blur transition hover:bg-white/10"
            >
              {open ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="md:hidden overflow-hidden"
            >
              <ul className="glass-strong mt-2 rounded-2xl p-3">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.25 }}
                  >
                    <a
                      href={l.href}
                      onClick={handleNavClick}
                      className="block rounded-xl px-4 py-3 text-base text-white/80 transition hover:bg-white/5 hover:text-white"
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.25 }}
                  className="mt-2"
                >
                  <a
                    href="#cta"
                    onClick={handleNavClick}
                    className="btn-primary w-full"
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
