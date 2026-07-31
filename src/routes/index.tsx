import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  BotMessageSquare,
  FileBarChart,
  Gauge,
  Leaf,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import heroImage from "@/assets/hero-ai-electricity.jpg";
import { CircuitBackground } from "@/components/site/CircuitBackground";
import { SiteShell } from "@/components/site/SiteShell";
import { useCounter } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VoltSense AI — AI Electricity Detection & Analysis System" },
      {
        name: "description",
        content:
          "Detect electrical faults, monitor live telemetry and analyse energy consumption with an AI-powered electricity intelligence platform.",
      },
      {
        property: "og:title",
        content: "VoltSense AI — AI Electricity Detection & Analysis System",
      },
      {
        property: "og:description",
        content:
          "AI fault detection, live dashboards, smart reports and an energy assistant in one system.",
      },
    ],
  }),
  component: Home,
});

const features = [
  {
    icon: ShieldCheck,
    title: "AI Fault Detection",
    text: "A trained classifier scores voltage, current, power, frequency and temperature signatures in milliseconds.",
  },
  {
    icon: BarChart3,
    title: "Energy Consumption Analysis",
    text: "Daily, weekly and monthly breakdowns with anomaly highlighting and load attribution per category.",
  },
  {
    icon: Gauge,
    title: "Live Dashboard",
    text: "Streaming telemetry with rolling charts so operators see deviations the moment they appear.",
  },
  {
    icon: FileBarChart,
    title: "Smart Reports",
    text: "Auto-generated summaries covering efficiency, power factor and estimated billing impact.",
  },
  {
    icon: BotMessageSquare,
    title: "AI Chatbot",
    text: "Ask questions in plain language and get grounded answers from your own telemetry history.",
  },
  {
    icon: Zap,
    title: "Secure User Login",
    text: "Token-based authentication ready to plug into the Flask backend with role-aware access.",
  },
];

const stats = [
  { icon: Activity, label: "Devices Monitored", value: 12480, suffix: "+" },
  { icon: ShieldCheck, label: "Faults Detected", value: 3627, suffix: "" },
  { icon: Leaf, label: "Energy Saved (MWh)", value: 918, suffix: "" },
  { icon: Users, label: "Active Users", value: 5240, suffix: "+" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const { ref, value: current } = useCounter(value);
  return (
    <span ref={ref} className="text-3xl font-semibold tracking-tight sm:text-4xl">
      {current.toLocaleString()}
      {suffix}
    </span>
  );
}

function Home() {
  return (
    <SiteShell>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden">
        <CircuitBackground dense />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-1.5 text-xs font-medium text-accent">
              <Sparkles className="h-3.5 w-3.5" />
              Machine learning · Smart energy
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              AI Electricity <span className="text-gradient">Detection</span> and
              Analysis System
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              A unified platform that reads live electrical telemetry, classifies
              fault conditions with machine learning, and turns raw consumption
              data into decisions that cut energy waste and prevent downtime.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/detection"
                className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:scale-105"
              >
                <Zap className="h-4 w-4" /> Start Detection
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:text-accent"
              >
                Learn More
              </Link>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 text-sm">
              {[
                ["98.6%", "Model accuracy"],
                ["<120ms", "Inference time"],
                ["24/7", "Monitoring"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="text-lg font-semibold text-accent">{v}</dt>
                  <dd className="text-xs text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative animate-float">
            <div className="glass overflow-hidden rounded-3xl p-2">
              <img
                src={heroImage}
                alt="AI neural network connected to power lines, smart meters and energy dashboards"
                width={1280}
                height={1024}
                className="w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Features ---------------- */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="reveal max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            Capabilities
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything you need to keep the grid healthy
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <article
              key={f.title}
              className="reveal glass glass-hover p-6"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-gradient">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ---------------- Statistics ---------------- */}
      <section className="relative overflow-hidden py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="glass grid gap-8 p-8 sm:grid-cols-2 lg:grid-cols-4 lg:p-10">
            {stats.map((s) => (
              <div key={s.label} className="reveal text-center">
                <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl border border-border bg-muted/40 text-accent">
                  <s.icon className="h-5 w-5" />
                </span>
                <p className="mt-4">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
        <div className="reveal glass relative overflow-hidden p-10 text-center">
          <CircuitBackground />
          <div className="relative">
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Run your first AI diagnosis in under a minute
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              Enter live meter readings and the model returns a Normal, Warning or
              Critical verdict with recommended actions.
            </p>
            <Link
              to="/detection"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-gradient px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-105"
            >
              <Zap className="h-4 w-4" /> Open Detection Dashboard
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
