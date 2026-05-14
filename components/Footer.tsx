"use client";

import { Sparkles, Twitter, Github, Linkedin, Youtube } from "lucide-react";

const COLUMNS = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Integrations", "Changelog", "Roadmap"],
  },
  {
    title: "Company",
    links: ["About", "Customers", "Careers", "Press", "Contact"],
  },
  {
    title: "Resources",
    links: ["Docs", "API reference", "Guides", "Status", "Security"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Cookies", "DPA", "Sub-processors"],
  },
];

const SOCIAL = [
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 pt-16 pb-10">
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <a href="#top" className="inline-flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand-purple via-brand-blue to-brand-cyan shadow-glow">
                <Sparkles className="h-4 w-4 text-white" />
              </span>
              <span className="text-base font-semibold tracking-tight">
                FlowSync<span className="ml-1 text-gradient-brand">AI</span>
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm text-white/55">
              The AI workflow automation platform powering 10,000+ teams
              worldwide. Built with care in San Francisco.
            </p>

            {/* Newsletter */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-5 flex max-w-sm items-center gap-2 rounded-full glass p-1.5"
              aria-label="Subscribe to newsletter"
            >
              <input
                type="email"
                required
                placeholder="you@company.com"
                className="flex-1 bg-transparent px-3 text-sm text-white placeholder:text-white/40 focus:outline-none"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90"
              >
                Subscribe
              </button>
            </form>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-xs uppercase tracking-wider text-white/45">
                {col.title}
              </p>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} FlowSync AI, Inc. All rights reserved.
          </p>
          <ul className="flex items-center gap-2">
            {SOCIAL.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/75 transition hover:scale-110 hover:bg-white/10 hover:text-white"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
