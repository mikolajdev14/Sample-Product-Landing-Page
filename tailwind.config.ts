import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx,mdx}",
    "./components/**/*.{ts,tsx,js,jsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        // Brand accent palette: purple → blue → cyan
        brand: {
          purple: "#a855f7",
          violet: "#8b5cf6",
          blue: "#3b82f6",
          sky: "#0ea5e9",
          cyan: "#06b6d4",
        },
        ink: {
          950: "#05060a",
          900: "#0a0b14",
          800: "#0f1120",
          700: "#15182b",
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(ellipse at top, rgba(139,92,246,0.18), transparent 60%)",
        "hero-glow":
          "radial-gradient(60% 60% at 50% 40%, rgba(139,92,246,0.35) 0%, rgba(6,182,212,0.15) 45%, transparent 75%)",
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(139,92,246,0.55)",
        "glow-cyan": "0 0 60px -10px rgba(6,182,212,0.55)",
        "glow-soft":
          "0 10px 40px -10px rgba(139,92,246,0.45), 0 0 0 1px rgba(255,255,255,0.06) inset",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3.5s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        shine: "shine 2.2s linear infinite",
        "gradient-x": "gradientX 8s ease infinite",
        blob: "blob 18s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        pulseGlow: {
          "0%, 100%": {
            opacity: "0.6",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "1",
            transform: "scale(1.05)",
          },
        },
        shine: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(40px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-30px, 30px) scale(0.95)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
