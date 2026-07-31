import { createFileRoute } from "@tanstack/react-router";
import {
  BrainCircuit,
  Database,
  GitBranch,
  Layers,
  LineChart,
  Rocket,
  ShieldCheck,
  Target,
} from "lucide-react";
import { PageHeader, SiteShell } from "@/components/site/SiteShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Project — VoltSense AI" },
      {
        name: "description",
        content:
          "Project overview, objectives, AI technologies and the machine learning workflow behind the electricity detection system.",
      },
      { property: "og:title", content: "About the Project — VoltSense AI" },
      {
        property: "og:description",
        content:
          "How the AI electricity detection and analysis system is designed and trained.",
      },
    ],
  }),
  component: AboutPage,
});

const objectives = [
  "Detect electrical faults early using supervised learning on sensor telemetry.",
  "Give operators a single live view of voltage, current, power and thermal data.",
  "Quantify consumption so energy waste can be located and eliminated.",
  "Estimate billing impact and efficiency for every reporting cycle.",
  "Make insights accessible through natural-language conversation.",
];

const technologies = [
  { icon: BrainCircuit, name: "Scikit-learn / XGBoost", text: "Fault classification on tabular sensor features." },
  { icon: LineChart, name: "LSTM forecasting", text: "Short-horizon load and demand prediction." },
  { icon: Database, name: "Pandas + NumPy", text: "Feature engineering and signal cleaning pipeline." },
  { icon: Layers, name: "Flask REST API", text: "Serving inference endpoints to this frontend." },
  { icon: ShieldCheck, name: "Isolation Forest", text: "Unsupervised anomaly detection for unseen faults." },
  { icon: Rocket, name: "Chart.js style dashboards", text: "Real-time visual analytics for operators." },
];

const workflow = [
  { step: "01", title: "Data Collection", text: "Smart meters stream voltage, current, power, frequency and temperature samples." },
  { step: "02", title: "Preprocessing", text: "Missing values imputed, outliers clipped, features scaled and windowed." },
  { step: "03", title: "Feature Engineering", text: "Rolling statistics, power factor, harmonic ratios and thermal gradients." },
  { step: "04", title: "Model Training", text: "Gradient-boosted trees plus anomaly models, tuned with cross-validation." },
  { step: "05", title: "Evaluation", text: "Precision/recall on fault classes, confusion matrix and drift monitoring." },
  { step: "06", title: "Deployment", text: "Model served through Flask endpoints and consumed by this dashboard." },
];

const benefits = [
  "Prevents downtime by flagging degradation before failure.",
  "Reduces energy bills through measurable optimisation.",
  "Improves safety by catching overheating and overload conditions.",
  "Creates an auditable history of grid behaviour.",
];

function AboutPage() {
  return (
    <SiteShell>
      <PageHeader
        eyebrow="About"
        title="An AI system built for electrical reliability"
        subtitle="VoltSense combines sensor telemetry, machine learning and clear visual analytics so electrical faults are found early and energy is used deliberately."
      />

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="reveal glass p-7">
            <h2 className="text-xl font-semibold">Project Overview</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Electrical faults rarely appear without warning — they announce
              themselves as small deviations in voltage, current draw, frequency
              and temperature. VoltSense continuously ingests those signals,
              scores them with trained models, and translates the output into a
              simple Normal / Warning / Critical verdict alongside consumption
              analytics and an AI assistant for follow-up questions.
            </p>
          </article>

          <article className="reveal glass p-7">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Target className="h-5 w-5 text-accent" /> Objectives
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              {objectives.map((o) => (
                <li key={o} className="flex gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                  {o}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <h2 className="reveal mt-14 text-2xl font-semibold">AI Technologies Used</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((t, i) => (
            <article
              key={t.name}
              className="reveal glass glass-hover p-6"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-gradient">
                <t.icon className="h-5 w-5 text-primary-foreground" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{t.name}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{t.text}</p>
            </article>
          ))}
        </div>

        <h2 className="reveal mt-14 flex items-center gap-2 text-2xl font-semibold">
          <GitBranch className="h-6 w-6 text-accent" /> Machine Learning Workflow
        </h2>
        <ol className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {workflow.map((w, i) => (
            <li
              key={w.step}
              className="reveal glass relative overflow-hidden p-6"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="absolute right-4 top-3 text-3xl font-bold text-muted/70">
                {w.step}
              </span>
              <h3 className="text-base font-semibold">{w.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{w.text}</p>
            </li>
          ))}
        </ol>

        <div className="reveal glass mt-14 p-8">
          <h2 className="text-2xl font-semibold">Benefits of the System</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {benefits.map((b) => (
              <p
                key={b}
                className="flex gap-3 rounded-2xl border border-border bg-muted/30 p-4 text-sm text-muted-foreground"
              >
                <ShieldCheck className="h-5 w-5 shrink-0 text-secondary" />
                {b}
              </p>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
