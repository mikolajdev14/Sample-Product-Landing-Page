"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Activity,
  Users,
  Zap,
  TrendingUp,
  ArrowUpRight,
  CircleDot,
} from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import SplitText from "./SplitText";

/**
 * Dashboard section
 *
 * A premium, interactive mockup with:
 *  - 3D tilt that follows the mouse
 *  - Animated counters
 *  - Pure CSS / SVG area chart, bar chart and stat tiles
 */
export default function Dashboard() {
  const tiltRef = useRef<HTMLDivElement | null>(null);

  // Tilt motion values
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 140, damping: 18 });
  const sy = useSpring(my, { stiffness: 140, damping: 18 });
  const rotateX = useTransform(sy, [-1, 1], [6, -6]);
  const rotateY = useTransform(sx, [-1, 1], [-8, 8]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  const onMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      id="dashboard"
      aria-labelledby="dashboard-heading"
      className="relative py-24 sm:py-32"
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
            <Activity className="h-3.5 w-3.5 text-brand-cyan" />
            Live dashboard
          </motion.span>
          <SplitText
            as="h2"
            id="dashboard-heading"
            className="section-title mt-5"
          >
            One workspace,{" "}
            <span className="text-gradient-brand">every signal</span>.
          </SplitText>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 text-white/65"
          >
            Pipelines, automations, revenue and team activity — all in a single,
            beautifully responsive control center.
          </motion.p>
        </div>

        {/* Stats row */}
        <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[
            {
              label: "Active automations",
              value: 1284,
              suffix: "",
              delta: "+12.4%",
              icon: Zap,
              accent: "from-brand-purple to-brand-violet",
            },
            {
              label: "Hours saved / month",
              value: 48230,
              suffix: "",
              delta: "+31.2%",
              icon: Activity,
              accent: "from-brand-blue to-brand-sky",
            },
            {
              label: "Teams onboarded",
              value: 10240,
              suffix: "+",
              delta: "+8.7%",
              icon: Users,
              accent: "from-brand-cyan to-emerald-300",
            },
            {
              label: "Avg. uptime",
              value: 99.99,
              suffix: "%",
              delta: "SLA",
              icon: TrendingUp,
              accent: "from-fuchsia-500 to-brand-purple",
              decimals: 2,
            },
          ].map((s, i) => (
            <motion.li
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="glass rounded-2xl p-5"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br ${s.accent}`}
                >
                  <s.icon className="h-4 w-4 text-white" />
                </span>
                <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                  {s.delta}
                </span>
              </div>
              <p className="mt-3 text-xs uppercase tracking-wider text-white/55">
                {s.label}
              </p>
              <AnimatedCounter
                to={s.value}
                suffix={s.suffix}
                decimals={s.decimals ?? 0}
                className="mt-1 block text-2xl font-bold tracking-tight"
              />
            </motion.li>
          ))}
        </ul>

        {/* The dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="mt-14 perspective-[1400px]"
          style={{ perspective: 1400 }}
        >
          <motion.div
            ref={tiltRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            className="relative mx-auto max-w-6xl"
          >
            {/* Glow behind mockup */}
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-brand-purple/40 via-brand-blue/20 to-brand-cyan/40 blur-3xl"
            />

            <div className="relative overflow-hidden rounded-[1.75rem] glass-strong shadow-glow-soft">
              {/* Window chrome */}
              <div className="flex items-center gap-3 border-b border-white/10 px-5 py-3">
                <span className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                </span>
                <div className="ml-2 hidden flex-1 items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-white/55 sm:flex">
                  <CircleDot className="h-3 w-3 text-emerald-400" />
                  app.flowsync.ai / dashboard
                </div>
                <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Live
                </span>
              </div>

              {/* Body */}
              <div className="grid grid-cols-1 gap-4 p-4 sm:p-6 lg:grid-cols-12">
                {/* Sidebar */}
                <aside className="hidden lg:col-span-3 lg:block">
                  <div className="glass h-full rounded-2xl p-4">
                    <p className="text-[11px] uppercase tracking-wider text-white/45">
                      Workspaces
                    </p>
                    <ul className="mt-3 space-y-1">
                      {[
                        { label: "Overview", active: true },
                        { label: "Automations" },
                        { label: "Pipelines" },
                        { label: "Analytics" },
                        { label: "Integrations" },
                        { label: "Team" },
                        { label: "Billing" },
                      ].map((m) => (
                        <li key={m.label}>
                          <button
                            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                              m.active
                                ? "bg-white/8 text-white"
                                : "text-white/65 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                m.active
                                  ? "bg-gradient-to-r from-brand-purple to-brand-cyan"
                                  : "bg-white/25"
                              }`}
                            />
                            {m.label}
                          </button>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-3">
                      <p className="text-xs text-white/65">Plan usage</p>
                      <p className="mt-1 text-sm font-semibold">
                        82,310 / 100,000 ops
                      </p>
                      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-brand-purple via-brand-blue to-brand-cyan"
                          style={{ width: "82%" }}
                        />
                      </div>
                    </div>
                  </div>
                </aside>

                {/* Main */}
                <div className="space-y-4 lg:col-span-9">
                  {/* Area chart */}
                  <div className="glass rounded-2xl p-5">
                    <div className="flex flex-wrap items-end justify-between gap-3">
                      <div>
                        <p className="text-[11px] uppercase tracking-wider text-white/55">
                          Workflow throughput
                        </p>
                        <p className="mt-1 text-2xl font-bold tracking-tight">
                          1.42M ops
                          <span className="ml-2 text-xs font-medium text-emerald-300">
                            +24.6%
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-white/55">
                        {["1D", "1W", "1M", "3M", "1Y"].map((t, i) => (
                          <button
                            key={t}
                            className={`rounded-full px-2.5 py-1 transition ${
                              i === 2
                                ? "bg-white/10 text-white"
                                : "hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* SVG chart */}
                    <AreaChart />
                  </div>

                  {/* Bottom row */}
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
                    {/* Bar chart */}
                    <div className="glass rounded-2xl p-5 lg:col-span-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">By department</p>
                        <ArrowUpRight className="h-4 w-4 text-white/45" />
                      </div>
                      <BarChart />
                    </div>

                    {/* Activity feed */}
                    <div className="glass rounded-2xl p-5 lg:col-span-2">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">Activity</p>
                        <span className="text-[11px] text-white/55">
                          live
                        </span>
                      </div>
                      <ul className="mt-3 space-y-3 text-sm">
                        {[
                          {
                            who: "Sales agent",
                            what: "closed 12 leads in pipeline",
                            when: "just now",
                            color: "bg-emerald-400",
                          },
                          {
                            who: "Finance agent",
                            what: "reconciled 482 transactions",
                            when: "1m ago",
                            color: "bg-brand-cyan",
                          },
                          {
                            who: "Support agent",
                            what: "resolved 38 tickets",
                            when: "4m ago",
                            color: "bg-brand-violet",
                          },
                          {
                            who: "Ops agent",
                            what: "synced inventory across 14 stores",
                            when: "9m ago",
                            color: "bg-fuchsia-400",
                          },
                        ].map((row, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span
                              className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${row.color}`}
                            />
                            <div className="min-w-0 flex-1">
                              <p className="text-white/85">
                                <span className="font-medium">{row.who}</span>{" "}
                                <span className="text-white/65">{row.what}</span>
                              </p>
                              <p className="text-[11px] text-white/45">
                                {row.when}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Charts                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Animated SVG area chart.
 *
 * On scroll-into-view:
 *  1. Gridlines fade in.
 *  2. The polyline draws itself left-to-right using `pathLength`.
 *  3. The filled gradient area fades in behind the now-finished line.
 *  4. The "current value" indicator pops in with a soft pulse.
 *  5. The floating tooltip slides in from the right.
 */
function AreaChart() {
  const ref = useRef<SVGSVGElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const points = [
    [0, 75], [40, 60], [80, 68], [120, 52], [160, 58], [200, 42],
    [240, 50], [280, 35], [320, 40], [360, 28], [400, 34], [440, 22],
    [480, 30], [520, 18], [560, 26], [600, 14],
  ];
  const width = 600;
  const height = 160;
  const path = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x},${y}`)
    .join(" ");
  const area = `${path} L ${width},${height} L 0,${height} Z`;

  return (
    <div className="relative mt-5">
      <svg
        ref={ref}
        viewBox={`0 0 ${width} ${height}`}
        className="h-44 w-full"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(168,85,247,0.55)" />
            <stop offset="60%" stopColor="rgba(99,102,241,0.18)" />
            <stop offset="100%" stopColor="rgba(6,182,212,0)" />
          </linearGradient>
          <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>

        {/* Horizontal gridlines */}
        {[40, 80, 120].map((y, i) => (
          <motion.line
            key={y}
            x1="0"
            y1={y}
            x2={width}
            y2={y}
            stroke="rgba(255,255,255,0.06)"
            strokeDasharray="4 6"
            initial={{ opacity: 0, pathLength: 0 }}
            animate={inView ? { opacity: 1, pathLength: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.1 + i * 0.05 }}
          />
        ))}

        {/* Filled area — fades in once the line is drawn */}
        <motion.path
          d={area}
          fill="url(#area)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 1.1 }}
        />

        {/* Stroke — draws itself left-to-right */}
        <motion.path
          d={path}
          fill="none"
          stroke="url(#line)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : {}}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        />

        {/* Indicator dot + halo — pops in after the line reaches it */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            duration: 0.4,
            delay: 1.4,
            type: "spring",
            stiffness: 280,
            damping: 14,
          }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <circle cx={520} cy={18} r="10" fill="rgba(6,182,212,0.25)">
            <animate
              attributeName="r"
              values="10;14;10"
              dur="2.4s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.4;0.1;0.4"
              dur="2.4s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx={520} cy={18} r="5" fill="#06b6d4" />
        </motion.g>
      </svg>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10, y: -4 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, delay: 1.55 }}
        className="pointer-events-none absolute right-[10%] top-2 hidden -translate-x-1/2 rounded-lg border border-white/10 bg-black/60 px-3 py-2 text-xs backdrop-blur-md sm:block"
      >
        <p className="text-white/55">Aug 12 · 14:00</p>
        <p className="font-semibold">128,402 ops / hr</p>
      </motion.div>
    </div>
  );
}

function BarChart() {
  const data = [
    { label: "Sales", value: 92 },
    { label: "Ops", value: 78 },
    { label: "Finance", value: 64 },
    { label: "Support", value: 88 },
    { label: "Marketing", value: 56 },
    { label: "HR", value: 38 },
    { label: "Eng", value: 96 },
  ];
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="mt-4 flex h-44 items-end gap-3">
      {data.map((d, i) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
          <div className="relative flex w-full flex-1 items-end">
            <motion.span
              initial={{ height: 0 }}
              whileInView={{ height: `${(d.value / max) * 100}%` }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.9,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="block w-full rounded-md bg-gradient-to-t from-brand-violet/40 via-brand-blue/60 to-brand-cyan"
            />
          </div>
          <span className="text-[10px] uppercase tracking-wider text-white/50">
            {d.label}
          </span>
        </div>
      ))}
    </div>
  );
}
