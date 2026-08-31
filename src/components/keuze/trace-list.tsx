"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { formatFeel, ledgerStats, type DecisionTrace } from "@/lib/keuze";
import { useLedger } from "@/lib/keuze/use-ledger";

export function TraceList() {
  const { traces, ready } = useLedger();
  const [filter, setFilter] = useState("all");
  const visible = useMemo(
    () =>
      traces.filter((trace) =>
        filter === "all" ? true : trace.decisionId === filter,
      ),
    [filter, traces],
  );
  const stats = ledgerStats(traces);
  const decisions = [...new Set(traces.map((trace) => trace.decisionId))];

  if (!ready) {
    return <p className="text-sm text-muted-foreground">Ledger laden…</p>;
  }

  return (
    <div className="space-y-6">
      <dl className="grid gap-3 sm:grid-cols-4">
        <Stat label="Sporen" value={String(stats.total)} />
        <Stat label="Vastgelegd" value={String(stats.committed)} />
        <Stat label="Met outcome" value={String(stats.withOutcome)} />
        <Stat
          label="Hit-rate"
          value={
            stats.hitRate === null
              ? "—"
              : `${Math.round(stats.hitRate * 100)}%`
          }
        />
      </dl>

      <div className="flex flex-wrap gap-2">
        <FilterChip
          active={filter === "all"}
          onClick={() => setFilter("all")}
          label="Alles"
        />
        {decisions.map((id) => (
          <FilterChip
            key={id}
            active={filter === id}
            onClick={() => setFilter(id)}
            label={id}
          />
        ))}
      </div>

      <div className="space-y-3">
        {visible.map((trace) => (
          <TraceRow key={trace.id} trace={trace} />
        ))}
      </div>
    </div>
  );
}

function TraceRow({ trace }: { trace: DecisionTrace }) {
  const primary = Object.entries(trace.outputs)[0];
  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href={`/keuze/ledger/${trace.id}`}
            className="font-medium hover:underline"
          >
            {trace.decisionName}
          </Link>
          <p className="text-sm text-muted-foreground">
            {formatDate(trace.timestamp)} · {trace.actor} · {trace.authority}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {primary ? (
            <span className="text-sm">
              {primary[0]}:{" "}
              <strong>{formatFeel(primary[1])}</strong>
            </span>
          ) : null}
          <Badge variant={trace.outcome?.matched ? "accent" : "outline"}>
            {trace.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-2xl font-semibold tabular-nums">{value}</dd>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
          : "rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground"
      }
    >
      {label}
    </button>
  );
}
