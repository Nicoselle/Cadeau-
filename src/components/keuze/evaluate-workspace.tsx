"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  coerceValue,
  commitTrace,
  evaluateDecision,
  formatFeel,
  recordOutcome,
  type ActorKind,
  type DecisionDefinition,
  type DecisionTrace,
  type FeelValue,
} from "@/lib/keuze";
import { useLedger } from "@/lib/keuze/use-ledger";

export function EvaluateWorkspace({
  definition,
}: {
  definition: DecisionDefinition;
}) {
  const { upsert } = useLedger();
  const [draft, setDraft] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      definition.inputs.map((input) => [
        input.id,
        stringify(definition.sampleInputs[input.id]),
      ]),
    ),
  );
  const [trace, setTrace] = useState<DecisionTrace | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [outcome, setOutcome] = useState("");

  const inputs = useMemo(() => {
    const parsed: Record<string, FeelValue> = {};
    for (const input of definition.inputs) {
      parsed[input.id] = coerceValue(draft[input.id] ?? "", input.type);
    }
    return parsed;
  }, [definition.inputs, draft]);

  function run() {
    const result = evaluateDecision(definition, inputs);
    setErrors(result.errors);
    setTrace(result.trace);
  }

  function save(actor: ActorKind, note?: string) {
    if (!trace) return;
    const next = commitTrace(trace, actor, definition.owner, note);
    setTrace(next);
    upsert(next);
  }

  function closeLoop() {
    if (!trace || !outcome.trim()) return;
    const next = recordOutcome(trace, outcome.trim(), formatFeel(trace.outputs[definition.outputs[definition.outputs.length - 1].id]));
    setTrace(next);
    upsert(next);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Evalueer deze beslissing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {definition.inputs.map((input) => (
              <label key={input.id} className="space-y-1.5 text-sm">
                <span className="font-medium">
                  {input.name}
                  {input.unit ? (
                    <span className="font-normal text-muted-foreground">
                      {" "}
                      ({input.unit})
                    </span>
                  ) : null}
                </span>
                <Input
                  value={draft[input.id] ?? ""}
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      [input.id]: event.target.value,
                    }))
                  }
                  inputMode={input.type === "number" ? "decimal" : "text"}
                />
                <span className="block text-xs text-muted-foreground">
                  {input.description}
                </span>
              </label>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" onClick={run}>
              Evalueer
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setDraft(
                  Object.fromEntries(
                    definition.inputs.map((input) => [
                      input.id,
                      stringify(definition.sampleInputs[input.id]),
                    ]),
                  ),
                );
                setTrace(null);
                setErrors([]);
              }}
            >
              Herstel voorbeeld
            </Button>
          </div>
          {errors.length > 0 ? (
            <ul className="list-disc space-y-1 pl-5 text-sm text-red-700">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          ) : null}
        </CardContent>
      </Card>

      {trace ? <TraceResult definition={definition} trace={trace} /> : null}

      {trace ? (
        <Card>
          <CardHeader>
            <CardTitle>Vastleggen — geen amnesie</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-muted-foreground">
              {trace.requiresReview
                ? trace.reviewReason
                : "Deze uitkomst mag automatisch worden vastgelegd. Je kunt alsnog overrulen."}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                onClick={() => save(trace.requiresReview ? "human" : "system")}
              >
                {trace.requiresReview ? "Bevestigen" : "Vastleggen in ledger"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => save("human-override", "Handmatige override")}
              >
                Overrulen
              </Button>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
              <label className="flex-1 space-y-1.5">
                <span className="font-medium">Werkelijke uitkomst</span>
                <Input
                  value={outcome}
                  onChange={(event) => setOutcome(event.target.value)}
                  placeholder="Wat gebeurde er echt?"
                />
              </label>
              <Button type="button" variant="secondary" onClick={closeLoop}>
                Outcome vastleggen
              </Button>
            </div>
            {trace.outcome ? (
              <p>
                Outcome {trace.outcome.matched ? "kwam overeen" : "week af"}:
                verwacht {trace.outcome.expected}, werkelijk {trace.outcome.actual}.
              </p>
            ) : null}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

function TraceResult({
  definition,
  trace,
}: {
  definition: DecisionDefinition;
  trace: DecisionTrace;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Uitkomst</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-2 text-sm">
            {definition.outputs.map((output) => (
              <div key={output.id} className="flex justify-between gap-4">
                <dt className="text-muted-foreground">{output.name}</dt>
                <dd className="font-medium">{formatFeel(trace.outputs[output.id])}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs text-muted-foreground">
            Versie {trace.version} · {trace.firedRules.length} regel(s) · status{" "}
            {trace.status}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Geëvalueerde regels</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {trace.firedRules.length === 0 ? (
            <p className="text-muted-foreground">Geen regel vuurde.</p>
          ) : (
            trace.firedRules.map((rule) => (
              <div key={`${rule.tableId}-${rule.ruleId}`}>
                <p className="font-medium">{rule.label}</p>
                <p className="text-xs text-muted-foreground">
                  {rule.tableId} · {rule.ruleId}
                  {rule.annotation ? ` — ${rule.annotation}` : ""}
                </p>
              </div>
            ))
          )}
          {trace.nearMisses.length > 0 ? (
            <div className="border-t border-border pt-3">
              <p className="mb-1 font-medium">Bijna-raak</p>
              {trace.nearMisses.map((miss) => (
                <p key={miss.ruleId} className="text-xs text-muted-foreground">
                  {miss.label} faalde op {miss.failedInputs.join(", ")}
                </p>
              ))}
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Causale duiding</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {trace.causal.drivers.map((driver) => (
            <div key={driver.linkId}>
              <p className="font-medium">
                {driver.cause}{" "}
                {driver.direction === "increases" ? "verhoogt" : "verlaagt"}{" "}
                {driver.effect}
              </p>
              <p className="text-xs text-muted-foreground">{driver.mechanism}</p>
            </div>
          ))}
          {trace.causal.warnings.map((warning) => (
            <p key={warning} className="text-xs text-amber-800">
              {warning}
            </p>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Counterfactuals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {trace.counterfactuals.slice(0, 4).map((item) => (
            <div key={item.label}>
              <p className="font-medium">{item.label}</p>
              <p className="text-xs text-muted-foreground">
                {item.deltas
                  .filter((delta) => formatFeel(delta.from) !== formatFeel(delta.to))
                  .map(
                    (delta) =>
                      `${delta.outputId}: ${formatFeel(delta.from)} → ${formatFeel(delta.to)}`,
                  )
                  .join(" · ") || "geen wijziging in de einduitkomst"}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function stringify(value: FeelValue | undefined): string {
  if (value === undefined || value === null) return "";
  if (typeof value === "boolean") return value ? "ja" : "nee";
  return String(value);
}
