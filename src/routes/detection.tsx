import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  OctagonAlert,
  Thermometer,
  Waves,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { MiniAreaChart } from "@/components/site/Charts";
import { PageHeader, SiteShell } from "@/components/site/SiteShell";
import { detectFault, mockLiveSeries, type Prediction, type Reading } from "@/lib/api";

export const Route = createFileRoute("/detection")({
  head: () => ({
    meta: [
      { title: "Fault Detection Dashboard — VoltSense AI" },
      {
        name: "description",
        content:
          "Enter voltage, current, power, frequency and temperature readings to get an AI fault prediction with live charts.",
      },
      { property: "og:title", content: "Fault Detection Dashboard — VoltSense AI" },
      {
        property: "og:description",
        content: "Run AI diagnostics on live electrical telemetry in seconds.",
      },
    ],
  }),
  component: DetectionPage,
});

const fields: Array<{
  name: keyof Reading;
  label: string;
  unit: string;
  step: string;
  placeholder: string;
}> = [
  { name: "voltage", label: "Voltage", unit: "V", step: "0.1", placeholder: "230" },
  { name: "current", label: "Current", unit: "A", step: "0.1", placeholder: "14.5" },
  { name: "power", label: "Power", unit: "W", step: "1", placeholder: "3300" },
  { name: "frequency", label: "Frequency", unit: "Hz", step: "0.01", placeholder: "50" },
  {
    name: "temperature",
    label: "Temperature",
    unit: "°C",
    step: "0.1",
    placeholder: "42",
  },
];

const statusMeta = {
  normal: {
    label: "Normal",
    icon: CheckCircle2,
    classes: "border-success/45 bg-success/12 text-success",
  },
  warning: {
    label: "Warning",
    icon: AlertTriangle,
    classes: "border-warning/45 bg-warning/12 text-warning",
  },
  critical: {
    label: "Critical",
    icon: OctagonAlert,
    classes: "border-destructive/50 bg-destructive/12 text-destructive",
  },
} as const;

function DetectionPage() {
  const [reading, setReading] = useState<Reading>({
    voltage: 230,
    current: 14.5,
    power: 3300,
    frequency: 50,
    temperature: 42,
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Prediction | null>(null);
  const series = useMemo(() => mockLiveSeries(), []);

  const handleDetect = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      // POST /api/detect on the Flask backend (dummy model until connected)
      const prediction = await detectFault(reading);
      await new Promise((r) => setTimeout(r, 900));
      setResult(prediction);
      toast[prediction.status === "normal" ? "success" : "warning"](
        `Prediction: ${statusMeta[prediction.status].label}`,
        { description: prediction.message },
      );
    } catch {
      toast.error("Detection failed", { description: "Could not reach the model." });
    } finally {
      setLoading(false);
    }
  };

  const meta = result ? statusMeta[result.status] : null;

  return (
    <SiteShell>
      <PageHeader
        eyebrow="Detection"
        title="AI Fault Detection Dashboard"
        subtitle="Feed real-time meter parameters into the model and receive a colour-coded verdict with actionable recommendations."
      />

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-6 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Input panel */}
        <form onSubmit={handleDetect} className="reveal glass p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-gradient">
              <Waves className="h-5 w-5 text-primary-foreground" />
            </span>
            <div>
              <h2 className="text-lg font-semibold">Sensor Input</h2>
              <p className="text-xs text-muted-foreground">
                Values from the smart meter or manual entry
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {fields.map((f) => (
              <div key={f.name} className={f.name === "temperature" ? "sm:col-span-2" : ""}>
                <label htmlFor={f.name} className="text-sm font-medium">
                  {f.label}{" "}
                  <span className="text-muted-foreground">({f.unit})</span>
                </label>
                <input
                  id={f.name}
                  type="number"
                  step={f.step}
                  required
                  placeholder={f.placeholder}
                  value={reading[f.name]}
                  onChange={(e) =>
                    setReading((prev) => ({
                      ...prev,
                      [f.name]: Number(e.target.value),
                    }))
                  }
                  className="mt-2 w-full rounded-xl border border-input bg-muted/40 px-4 py-3 text-sm outline-none transition-colors focus:border-accent/70 focus:ring-2 focus:ring-ring/40"
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gradient py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:scale-[1.02] disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Zap className="h-4 w-4" />
            )}
            {loading ? "Analysing telemetry…" : "Detect"}
          </button>
        </form>

        {/* Result panel */}
        <div className="reveal glass flex flex-col p-6 sm:p-8">
          <h2 className="text-lg font-semibold">AI Prediction Result</h2>
          <p className="text-xs text-muted-foreground">
            Colour-coded classification with confidence score
          </p>

          <div className="mt-6 flex-1">
            {loading && (
              <div className="grid h-full min-h-52 place-items-center text-center">
                <div>
                  <Loader2 className="mx-auto h-8 w-8 animate-spin text-accent" />
                  <p className="mt-3 text-sm text-muted-foreground">
                    Running inference on 5 features…
                  </p>
                </div>
              </div>
            )}

            {!loading && !result && (
              <div className="grid h-full min-h-52 place-items-center rounded-2xl border border-dashed border-border p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Submit readings to see the prediction. Green = Normal, Orange =
                  Warning, Red = Critical.
                </p>
              </div>
            )}

            {!loading && result && meta && (
              <div className="animate-fade-in-up">
                <div className={`rounded-2xl border p-6 ${meta.classes}`}>
                  <div className="flex items-center gap-3">
                    <meta.icon className="h-7 w-7" />
                    <div>
                      <p className="text-2xl font-semibold">{meta.label}</p>
                      <p className="text-xs opacity-80">
                        Confidence {result.confidence}%
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-foreground/90">{result.message}</p>
                </div>

                <h3 className="mt-6 text-sm font-semibold">Recommended actions</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {result.recommendations.map((r) => (
                    <li key={r} className="flex gap-2">
                      <Thermometer className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Live charts */}
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-3">
        {[
          { title: "Voltage (V)", key: "voltage", color: "var(--chart-1)" },
          { title: "Current (A)", key: "current", color: "var(--chart-2)" },
          { title: "Power (W)", key: "power", color: "var(--chart-3)" },
        ].map((c) => (
          <div key={c.key} className="reveal glass p-5">
            <h3 className="mb-2 text-sm font-semibold">{c.title}</h3>
            <MiniAreaChart data={series} dataKey={c.key} color={c.color} />
          </div>
        ))}
      </section>
    </SiteShell>
  );
}
