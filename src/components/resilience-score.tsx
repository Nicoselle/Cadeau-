import { cn } from "@/lib/utils";

function scoreColor(score: number): string {
  if (score >= 80) return "hsl(var(--accent))";
  if (score >= 60) return "hsl(214 58% 40%)";
  return "hsl(28 70% 45%)";
}

export function ResilienceScore({
  score,
  size = "md",
  showLabel = true,
}: {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}) {
  const dimensions = {
    sm: { box: 40, stroke: 4, font: "text-[11px]" },
    md: { box: 56, stroke: 5, font: "text-sm" },
    lg: { box: 84, stroke: 7, font: "text-xl" },
  }[size];

  const radius = (dimensions.box - dimensions.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, score));
  const offset = circumference - (clamped / 100) * circumference;
  const color = scoreColor(clamped);

  return (
    <div className="flex items-center gap-2">
      <div
        className="relative shrink-0"
        style={{ width: dimensions.box, height: dimensions.box }}
        role="img"
        aria-label={`Resilience Score ${clamped} van 100`}
      >
        <svg
          width={dimensions.box}
          height={dimensions.box}
          viewBox={`0 0 ${dimensions.box} ${dimensions.box}`}
        >
          <circle
            cx={dimensions.box / 2}
            cy={dimensions.box / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={dimensions.stroke}
          />
          <circle
            cx={dimensions.box / 2}
            cy={dimensions.box / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={dimensions.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${dimensions.box / 2} ${dimensions.box / 2})`}
          />
        </svg>
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center font-semibold tabular-nums",
            dimensions.font,
          )}
        >
          {clamped}
        </span>
      </div>
      {showLabel ? (
        <div className="leading-tight">
          <div className="text-xs font-medium">Resilience</div>
          <div className="text-xs text-muted-foreground">Score / 100</div>
        </div>
      ) : null}
    </div>
  );
}
