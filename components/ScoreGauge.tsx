import type { Verdict } from "@/lib/report";

const VERDICT_STYLES: Record<Verdict, { ring: string; text: string; badge: string }> = {
  Go: {
    ring: "#22c55e",
    text: "text-green-400",
    badge: "border-green-500/40 bg-green-500/10 text-green-300",
  },
  Caution: {
    ring: "#f59e0b",
    text: "text-amber-400",
    badge: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  },
  "No-Go": {
    ring: "#ef4444",
    text: "text-red-400",
    badge: "border-red-500/40 bg-red-500/10 text-red-300",
  },
};

export default function ScoreGauge({
  score,
  verdict,
  rationale,
}: {
  score: number;
  verdict: Verdict;
  rationale: string;
}) {
  const clamped = Math.max(0, Math.min(100, score));
  const style = VERDICT_STYLES[verdict] ?? VERDICT_STYLES.Caution;
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped / 100);

  return (
    <div className="flex flex-col items-center gap-6 rounded-2xl border border-edge bg-panel p-8 sm:flex-row sm:items-center sm:gap-8">
      <div className="relative h-36 w-36 shrink-0">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#26262c"
            strokeWidth="10"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={style.ring}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-semibold ${style.text}`}>
            {clamped}
          </span>
          <span className="text-xs text-zinc-500">/ 100</span>
        </div>
      </div>

      <div className="text-center sm:text-left">
        <span
          className={`inline-block rounded-full border px-3 py-1 text-sm font-semibold ${style.badge}`}
        >
          {verdict}
        </span>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-300">
          {rationale}
        </p>
      </div>
    </div>
  );
}
