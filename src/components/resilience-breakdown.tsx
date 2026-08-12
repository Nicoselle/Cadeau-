import type { ResilienceComponent } from "@/lib/resilience";

export function ResilienceBreakdown({
  components,
}: {
  components: ResilienceComponent[];
}) {
  return (
    <dl className="space-y-3">
      {components.map((c) => (
        <div key={c.key}>
          <div className="flex items-baseline justify-between gap-3 text-sm">
            <dt className="font-medium">
              {c.label}{" "}
              <span className="text-xs font-normal text-muted-foreground">
                ({Math.round(c.weight * 100)}%)
              </span>
            </dt>
            <dd className="tabular-nums text-muted-foreground">
              {c.score}/100
            </dd>
          </div>
          <div
            className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted"
            role="img"
            aria-label={`${c.label}: ${c.score} van 100`}
          >
            <div
              className="h-full rounded-full bg-accent"
              style={{ width: `${c.score}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{c.detail}</p>
        </div>
      ))}
    </dl>
  );
}
