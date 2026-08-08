import type { ValidationReport } from "@/lib/report";
import ScoreGauge from "@/components/ScoreGauge";

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-edge bg-panel p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      {subtitle ? <p className="mt-1 text-sm text-zinc-500">{subtitle}</p> : null}
      <div className="mt-5">{children}</div>
    </section>
  );
}

const STRENGTH_COLOR: Record<string, string> = {
  strong: "text-green-400",
  moderate: "text-amber-400",
  weak: "text-zinc-500",
};

const SEVERITY_STYLE: Record<string, string> = {
  high: "border-red-500/40 bg-red-500/10 text-red-300",
  medium: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  low: "border-zinc-600/50 bg-zinc-600/10 text-zinc-400",
};

function barColor(score: number) {
  if (score >= 70) return "#22c55e";
  if (score >= 45) return "#f59e0b";
  return "#ef4444";
}

export default function ReportView({ report }: { report: ValidationReport }) {
  return (
    <div className="space-y-5">
      <div>
        <p className="mb-4 text-sm text-zinc-400">
          <span className="text-zinc-500">Idea:</span> {report.ideaSummary}
        </p>
        <ScoreGauge
          score={report.viabilityScore}
          verdict={report.verdict}
          rationale={report.verdictRationale}
        />
      </div>

      {/* Sub-factors */}
      <Section title="Score breakdown" subtitle="The six factors behind the verdict.">
        <div className="space-y-4">
          {report.subFactors.map((f) => (
            <div key={f.name}>
              <div className="mb-1 flex items-baseline justify-between gap-4">
                <span className="text-sm font-medium text-zinc-200">
                  {f.name}
                </span>
                <span className="font-mono text-sm text-zinc-400">
                  {f.score}
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-edge">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.max(0, Math.min(100, f.score))}%`,
                    backgroundColor: barColor(f.score),
                  }}
                />
              </div>
              <p className="mt-1.5 text-xs text-zinc-500">{f.note}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Market sizing */}
      <Section title="Market sizing" subtitle="Bottom-up TAM / SAM / SOM.">
        <div className="grid gap-4 sm:grid-cols-3">
          {(["tam", "sam", "som"] as const).map((k) => (
            <div key={k} className="rounded-xl border border-edge bg-ink p-5">
              <div className="text-xs uppercase tracking-wide text-zinc-500">
                {k}
              </div>
              <div className="mt-1 text-2xl font-semibold text-white">
                {report.market[k].value}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                {report.market[k].methodology}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Competitors */}
      <Section
        title="Competitor intel"
        subtitle={`${report.competitors.length} competitors mapped.`}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-edge text-left text-xs uppercase tracking-wide text-zinc-500">
                <th className="py-2 pr-4 font-medium">Company</th>
                <th className="py-2 pr-4 font-medium">Positioning</th>
                <th className="py-2 pr-4 font-medium">Funding</th>
                <th className="py-2 pr-4 font-medium">Pricing</th>
                <th className="py-2 pr-4 font-medium">Weak spot</th>
              </tr>
            </thead>
            <tbody>
              {report.competitors.map((c) => (
                <tr
                  key={c.name}
                  className="border-b border-edge/60 align-top text-zinc-300"
                >
                  <td className="py-3 pr-4">
                    <div className="font-medium text-white">{c.name}</div>
                    <div className="mt-0.5 text-xs text-zinc-600">
                      {c.source}
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-zinc-400">{c.positioning}</td>
                  <td className="py-3 pr-4 text-zinc-400">{c.funding}</td>
                  <td className="py-3 pr-4 text-zinc-400">{c.pricing}</td>
                  <td className="py-3 pr-4 text-zinc-400">{c.weakness}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Demand signals */}
      <Section title="Demand signals" subtitle="Where the pain is already showing up.">
        <ul className="space-y-3">
          {report.demandSignals.map((d, i) => (
            <li
              key={i}
              className="flex flex-col gap-1 border-l-2 border-edge pl-4 sm:flex-row sm:items-baseline sm:gap-3"
            >
              <span className="shrink-0 text-sm font-medium text-zinc-200">
                {d.channel}
              </span>
              <span className="text-sm text-zinc-400">{d.signal}</span>
              <span
                className={`shrink-0 text-xs font-medium uppercase ${STRENGTH_COLOR[d.strength] ?? "text-zinc-500"} sm:ml-auto`}
              >
                {d.strength}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Risks */}
      <Section title="Blind spots & risks" subtitle="What could kill it, most severe first.">
        <div className="space-y-3">
          {report.risks.map((r, i) => (
            <div key={i} className="rounded-xl border border-edge bg-ink p-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-medium text-white">{r.title}</h3>
                <span
                  className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium uppercase ${SEVERITY_STYLE[r.severity] ?? SEVERITY_STYLE.low}`}
                >
                  {r.severity}
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">
                {r.detail}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Pivots */}
      <Section title="Smart pivots" subtitle="Three ways to raise your score.">
        <div className="grid gap-4 sm:grid-cols-3">
          {report.pivots.map((p, i) => (
            <div key={i} className="rounded-xl border border-edge bg-ink p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-white">{p.title}</h3>
                <span className="font-mono text-sm text-green-400">
                  {p.scoreLift}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {p.detail}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
