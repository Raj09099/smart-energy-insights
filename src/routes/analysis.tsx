import { createFileRoute } from "@tanstack/react-router";
import {
  BatteryCharging,
  CircleDollarSign,
  Gauge,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useState } from "react";
import {
  CategoryPieChart,
  GroupedBarChart,
  MultiLineChart,
} from "@/components/site/Charts";
import { PageHeader, SiteShell } from "@/components/site/SiteShell";
import { consumptionByCategory, mockLiveSeries, mockUsage } from "@/lib/api";

export const Route = createFileRoute("/analysis")({
  head: () => ({
    meta: [
      { title: "Energy Analysis Dashboard — VoltSense AI" },
      {
        name: "description",
        content:
          "Analyse daily, weekly and monthly electricity usage with line, bar and pie charts plus efficiency and billing summaries.",
      },
      { property: "og:title", content: "Energy Analysis Dashboard — VoltSense AI" },
      {
        property: "og:description",
        content:
          "Consumption analytics, power factor, efficiency and estimated electricity bill in one view.",
      },
    ],
  }),
  component: AnalysisPage,
});

const ranges = ["daily", "weekly", "monthly"] as const;

const summary = [
  {
    icon: Zap,
    label: "Total Consumption",
    value: "8,412 kWh",
    delta: "+6.2% vs last month",
  },
  { icon: Gauge, label: "Average Voltage", value: "231.4 V", delta: "Stable ±2.1%" },
  { icon: TrendingUp, label: "Power Factor", value: "0.94", delta: "Target 0.98" },
  { icon: BatteryCharging, label: "Efficiency", value: "91.7%", delta: "+3.4 pts" },
  {
    icon: CircleDollarSign,
    label: "Estimated Bill",
    value: "₹72,840",
    delta: "Projected for cycle",
  },
];

function AnalysisPage() {
  const [range, setRange] = useState<(typeof ranges)[number]>("monthly");
  const usage = mockUsage[range];
  const live = mockLiveSeries(18);

  return (
    <SiteShell>
      <PageHeader
        eyebrow="Analysis"
        title="Energy Consumption Analytics"
        subtitle="Aggregated telemetry across every monitored device, with usage trends, load distribution and projected billing."
      />

      {/* Summary cards */}
      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-5">
        {summary.map((s, i) => (
          <article
            key={s.label}
            className="reveal glass glass-hover p-5"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-muted/40 text-accent">
              <s.icon className="h-4.5 w-4.5" />
            </span>
            <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">
              {s.label}
            </p>
            <p className="mt-1 text-xl font-semibold">{s.value}</p>
            <p className="mt-1 text-xs text-secondary">{s.delta}</p>
          </article>
        ))}
      </section>

      {/* Range switch + charts */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="reveal glass p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Usage vs Target</h2>
              <p className="text-xs text-muted-foreground">
                {range === "daily"
                  ? "Hourly consumption for today (kWh)"
                  : range === "weekly"
                    ? "Consumption per day this week (kWh)"
                    : "Consumption per month this year (kWh)"}
              </p>
            </div>
            <div className="flex gap-1 rounded-full border border-border bg-muted/40 p-1">
              {ranges.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRange(r)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium capitalize transition-colors ${
                    range === r
                      ? "bg-brand-gradient text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <GroupedBarChart
              data={usage}
              metrics={[
                { key: "usage", name: "Usage", color: "var(--chart-1)" },
                { key: "target", name: "Target", color: "var(--chart-2)" },
              ]}
            />
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="reveal glass p-6">
            <h2 className="text-lg font-semibold">Parameter Trend</h2>
            <p className="mb-4 text-xs text-muted-foreground">
              Voltage, current and power over the sampling window
            </p>
            <MultiLineChart
              data={live}
              metrics={[
                { key: "voltage", name: "Voltage (V)", color: "var(--chart-1)" },
                { key: "current", name: "Current (A)", color: "var(--chart-2)" },
                { key: "power", name: "Power (W)", color: "var(--chart-3)" },
              ]}
            />
          </div>

          <div className="reveal glass p-6">
            <h2 className="text-lg font-semibold">Load Distribution</h2>
            <p className="mb-4 text-xs text-muted-foreground">
              Share of consumption by category (%)
            </p>
            <CategoryPieChart data={consumptionByCategory} />
          </div>
        </div>

        {/* Breakdown table */}
        <div className="reveal glass mt-6 overflow-x-auto p-6">
          <h2 className="text-lg font-semibold">Period Breakdown</h2>
          <table className="mt-4 w-full min-w-[520px] text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="pb-3">Period</th>
                <th className="pb-3">Usage (kWh)</th>
                <th className="pb-3">Target (kWh)</th>
                <th className="pb-3">Variance</th>
              </tr>
            </thead>
            <tbody>
              {usage.map((u) => {
                const variance = Math.round(((u.usage - u.target) / u.target) * 1000) / 10;
                return (
                  <tr key={u.label} className="border-b border-border/50">
                    <td className="py-3 font-medium">{u.label}</td>
                    <td className="py-3 text-muted-foreground">{u.usage}</td>
                    <td className="py-3 text-muted-foreground">{u.target}</td>
                    <td
                      className={`py-3 font-medium ${
                        variance > 0 ? "text-destructive" : "text-secondary"
                      }`}
                    >
                      {variance > 0 ? "+" : ""}
                      {variance}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </SiteShell>
  );
}
