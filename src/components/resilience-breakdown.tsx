import type { ResilienceComponent } from "@/lib/resilience";

export function ResilienceBreakdown({
  components,
}: {
  components: ResilienceComponent[];
}) {
  return (
    <dl className="space-y-3">
      {components.map((c) => {
        const isPenalty = c.maxPoints <= 0;
        const width = isPenalty
          ? 0
          : Math.max(0, Math.min(100, (c.points / c.maxPoints) * 100));
        const sign = c.points > 0 ? "+" : "";
        return (
          <div key={c.key}>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <dt className="font-medium">
                {c.label}{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  ({isPenalty ? "penalty" : `max ${c.maxPoints} pt`})
                </span>
              </dt>
              <dd className="tabular-nums text-muted-foreground">
                {sign}
                {c.points} pt
              </dd>
            </div>
            {!isPenalty && (
              <div
                className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted"
                role="img"
                aria-label={`${c.label}: ${c.points} van ${c.maxPoints} punten`}
              >
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${width}%` }}
                />
              </div>
            )}
            <p className="mt-1 text-xs text-muted-foreground">{c.detail}</p>
          </div>
        );
      })}
    </dl>
  );
}
