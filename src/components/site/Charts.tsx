import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/** Shared chart theming so every graph matches the design system. */
const axisProps = {
  stroke: "var(--muted-foreground)",
  tick: { fill: "var(--muted-foreground)", fontSize: 11 },
  tickLine: false,
  axisLine: false,
} as const;

const tooltipStyle = {
  contentStyle: {
    background: "var(--popover)",
    border: "1px solid var(--border)",
    borderRadius: "12px",
    color: "var(--popover-foreground)",
    fontSize: 12,
  },
  labelStyle: { color: "var(--muted-foreground)" },
} as const;

export interface Metric {
  key: string;
  color: string;
  name: string;
}

export function MiniAreaChart({
  data,
  dataKey,
  color,
}: {
  data: readonly object[];
  dataKey: string;
  color: string;
}) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.55} />
            <stop offset="100%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="var(--border)" vertical={false} />
        <XAxis dataKey="label" {...axisProps} />
        <YAxis {...axisProps} width={44} />
        <Tooltip {...tooltipStyle} />
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          fill={`url(#grad-${dataKey})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function MultiLineChart({
  data,
  metrics,
  height = 300,
}: {
  data: readonly object[];
  metrics: Metric[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: -14, bottom: 0 }}>
        <CartesianGrid stroke="var(--border)" vertical={false} />
        <XAxis dataKey="label" {...axisProps} />
        <YAxis {...axisProps} width={46} />
        <Tooltip {...tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        {metrics.map((m) => (
          <Line
            key={m.key}
            type="monotone"
            dataKey={m.key}
            name={m.name}
            stroke={m.color}
            strokeWidth={2.2}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export function GroupedBarChart({
  data,
  metrics,
  height = 300,
}: {
  data: readonly object[];
  metrics: Metric[];
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -14, bottom: 0 }}>
        <CartesianGrid stroke="var(--border)" vertical={false} />
        <XAxis dataKey="label" {...axisProps} />
        <YAxis {...axisProps} width={46} />
        <Tooltip {...tooltipStyle} cursor={{ fill: "var(--muted)", opacity: 0.4 }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        {metrics.map((m) => (
          <Bar
            key={m.key}
            dataKey={m.key}
            name={m.name}
            fill={m.color}
            radius={[6, 6, 0, 0]}
            maxBarSize={38}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

const PIE_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export function CategoryPieChart({
  data,
  height = 300,
}: {
  data: Array<{ name: string; value: number }>;
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Tooltip {...tooltipStyle} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius="52%"
          outerRadius="80%"
          paddingAngle={3}
          stroke="var(--background)"
          strokeWidth={2}
        >
          {data.map((entry, i) => (
            <Cell key={entry.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
