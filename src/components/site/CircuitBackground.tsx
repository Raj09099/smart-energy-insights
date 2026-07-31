/** Animated electricity-circuit background used across the app. */
export function CircuitBackground({ dense = false }: { dense?: boolean }) {
  const paths = [
    "M0 120 H140 V60 H320 V200 H520 V110 H760",
    "M0 300 H90 V380 H300 V260 H540 V360 H760",
    "M60 0 V90 H240 V30 H460 V150 H700 V0",
    "M40 440 V340 H210 V420 H430 V300 H720 V440",
  ];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-40" />
      <svg
        viewBox="0 0 760 440"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        {paths.map((d, i) => (
          <g key={d}>
            <path
              d={d}
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              className={i % 2 ? "text-accent/25" : "text-secondary/20"}
            />
            <path
              d={d}
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeDasharray="46 340"
              className={
                i % 2
                  ? "animate-spark text-accent"
                  : "animate-spark text-secondary"
              }
              style={{ animationDelay: `${i * 0.7}s` }}
            />
          </g>
        ))}
        {[
          [140, 60],
          [320, 200],
          [520, 110],
          [300, 380],
          [540, 260],
          [240, 90],
          [460, 30],
          [430, 420],
        ].map(([cx, cy], i) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={dense ? 4 : 3}
            className="animate-pulse-glow fill-accent"
            style={{ animationDelay: `${i * 0.35}s` }}
          />
        ))}
      </svg>
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
      <div className="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
    </div>
  );
}
