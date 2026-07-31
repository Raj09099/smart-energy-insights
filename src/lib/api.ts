/**
 * Central API layer.
 *
 * Every function here is written so it can talk to a Python Flask backend
 * (REST) without touching the UI. Set VITE_API_BASE_URL to enable it; while it
 * is unset, dummy data is returned so the frontend works standalone.
 */

const BASE_URL = import.meta.env["VITE_API_BASE_URL"] as string | undefined;

async function request<T>(path: string, init?: RequestInit): Promise<T | null> {
  if (!BASE_URL) return null; // no backend yet -> caller uses dummy data
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`);
  return (await res.json()) as T;
}

/* ------------------------------ Types ------------------------------ */

export type Status = "normal" | "warning" | "critical";

export interface Reading {
  voltage: number;
  current: number;
  power: number;
  frequency: number;
  temperature: number;
}

export interface Prediction {
  status: Status;
  confidence: number;
  message: string;
  recommendations: string[];
}

/* --------------------------- Detection ---------------------------- */

/** POST /api/detect -> { status, confidence, message, recommendations } */
export async function detectFault(reading: Reading): Promise<Prediction> {
  const remote = await request<Prediction>("/api/detect", {
    method: "POST",
    body: JSON.stringify(reading),
  });
  if (remote) return remote;
  return mockPredict(reading);
}

/** Deterministic rule-based stand-in for the ML model. */
export function mockPredict(r: Reading): Prediction {
  const issues: string[] = [];
  let score = 0;

  if (r.voltage < 200 || r.voltage > 250) {
    score += r.voltage < 180 || r.voltage > 265 ? 2 : 1;
    issues.push("Voltage outside the safe 200–250 V window");
  }
  if (r.current > 25) {
    score += r.current > 40 ? 2 : 1;
    issues.push("Current draw above rated load");
  }
  if (r.temperature > 60) {
    score += r.temperature > 80 ? 2 : 1;
    issues.push("Component temperature trending hot");
  }
  if (r.frequency < 49 || r.frequency > 51) {
    score += 1;
    issues.push("Grid frequency drifting from 50 Hz");
  }
  if (r.power > 6000) {
    score += 1;
    issues.push("Instantaneous power spike detected");
  }

  const status: Status = score >= 3 ? "critical" : score >= 1 ? "warning" : "normal";
  const confidence = Math.min(99, 78 + score * 5 + (status === "normal" ? 16 : 0));

  return {
    status,
    confidence,
    message:
      status === "normal"
        ? "All monitored parameters are within nominal operating range."
        : status === "warning"
          ? "Early-stage anomaly detected. Schedule an inspection."
          : "Critical fault signature detected. Immediate action required.",
    recommendations:
      issues.length > 0
        ? issues
        : [
            "Keep the current maintenance schedule",
            "Continue live monitoring for load spikes",
          ],
  };
}

/* ------------------------- Chart / analytics ------------------------ */

export interface SeriesPoint {
  label: string;
  voltage: number;
  current: number;
  power: number;
}

/** GET /api/readings?range=live -> SeriesPoint[] */
export async function getLiveSeries(): Promise<SeriesPoint[]> {
  const remote = await request<SeriesPoint[]>("/api/readings?range=live");
  return remote ?? mockLiveSeries();
}

export function mockLiveSeries(points = 14): SeriesPoint[] {
  return Array.from({ length: points }, (_, i) => {
    const t = i / points;
    return {
      label: `${String(i * 5).padStart(2, "0")}s`,
      voltage: Math.round(228 + Math.sin(t * 9) * 9 + (i % 3)),
      current: Math.round((14 + Math.cos(t * 7) * 4) * 10) / 10,
      power: Math.round(3200 + Math.sin(t * 5) * 620),
    };
  });
}

export interface UsagePoint {
  label: string;
  usage: number;
  target: number;
}

/** GET /api/usage?range=daily|weekly|monthly */
export async function getUsage(
  range: "daily" | "weekly" | "monthly",
): Promise<UsagePoint[]> {
  const remote = await request<UsagePoint[]>(`/api/usage?range=${range}`);
  return remote ?? mockUsage[range];
}

export const mockUsage: Record<"daily" | "weekly" | "monthly", UsagePoint[]> = {
  daily: [
    "00h",
    "04h",
    "08h",
    "12h",
    "16h",
    "20h",
  ].map((label, i) => ({ label, usage: [8, 6, 19, 26, 31, 22][i], target: 24 })),
  weekly: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((label, i) => ({
    label,
    usage: [142, 158, 131, 176, 189, 121, 104][i],
    target: 160,
  })),
  monthly: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ].map((label, i) => ({
    label,
    usage: [610, 585, 640, 702, 780, 845, 910, 890, 760, 690, 640, 620][i],
    target: 750,
  })),
};

export const consumptionByCategory = [
  { name: "HVAC", value: 38 },
  { name: "Lighting", value: 19 },
  { name: "Machinery", value: 27 },
  { name: "Appliances", value: 11 },
  { name: "Standby", value: 5 },
];

/* ----------------------------- Chatbot ----------------------------- */

/** POST /api/chat -> { reply } */
export async function askAssistant(message: string): Promise<string> {
  const remote = await request<{ reply: string }>("/api/chat", {
    method: "POST",
    body: JSON.stringify({ message }),
  });
  return remote?.reply ?? mockReply(message);
}

export function mockReply(message: string): string {
  const q = message.toLowerCase();
  if (q.includes("high") || q.includes("consumption"))
    return "Your consumption climbed 18% versus last week. The biggest driver is HVAC running between 14:00–18:00 while ambient temperature peaks. Shifting the setpoint by 1.5 °C and staggering compressor start-up should recover roughly 92 kWh per month.";
  if (q.includes("fault") || q.includes("detect"))
    return "Running the detection model on the last 500 samples: no critical signature found. One warning pattern appears on Feeder B — voltage dips to 206 V for ~400 ms during motor start-up, which points to loose terminal contact. I recommend a thermal scan of that panel.";
  if (q.includes("saving") || q.includes("tips"))
    return "Top energy-saving actions for your profile:\n1. Correct power factor to 0.98 with capacitor banks (~6% billing reduction).\n2. Move deferrable loads to off-peak hours.\n3. Replace remaining fluorescent fixtures with LED.\n4. Enable standby cut-off on idle machinery after 15 minutes.";
  if (q.includes("voltage") || q.includes("fluctuation"))
    return "Voltage fluctuation is a short-term deviation from nominal supply, usually caused by sudden inductive load switching, unbalanced phases or long feeder lines. Sustained deviation beyond ±10% shortens equipment life; the system flags it as a warning and logs the timestamped waveform for you.";
  return "I analysed the live telemetry stream. Everything is nominal right now: 231 V, 14.6 A, power factor 0.94, 42 °C. Ask me about faults, consumption patterns or savings and I will dig into the data.";
}
