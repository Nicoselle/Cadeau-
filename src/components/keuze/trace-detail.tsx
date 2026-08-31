"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { formatFeel } from "@/lib/keuze";
import { useLedger } from "@/lib/keuze/use-ledger";

export function TraceDetail({ id }: { id: string }) {
  const { traces, ready } = useLedger();
  if (!ready) {
    return <p className="text-sm text-muted-foreground">Spoor laden…</p>;
  }
  const trace = traces.find((item) => item.id === id);
  if (!trace) {
    return (
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Spoor niet gevonden</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Dit ledger-id bestaat niet in de zaadsporen of in deze browser.
        </p>
        <p className="mt-4 text-sm">
          <Link href="/keuze/ledger" className="font-medium text-primary hover:underline">
            Terug naar het ledger
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">
          <Link href="/keuze/ledger" className="hover:underline">
            Ledger
          </Link>{" "}
          / {trace.id}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          {trace.decisionName}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {formatDate(trace.timestamp)} · versie {trace.version} · {trace.actor}{" "}
          · {trace.authority}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge>{trace.status}</Badge>
          {trace.requiresReview ? <Badge variant="outline">review</Badge> : null}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2 text-sm">
              {Object.entries(trace.inputs).map(([key, value]) => (
                <div key={key} className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{key}</dt>
                  <dd>{formatFeel(value)}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Outputs</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2 text-sm">
              {Object.entries(trace.outputs).map(([key, value]) => (
                <div key={key} className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{key}</dt>
                  <dd className="font-medium">{formatFeel(value)}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
      </div>

      {trace.note ? (
        <p className="text-sm">
          <span className="font-medium">Notitie: </span>
          {trace.note}
        </p>
      ) : null}

      {trace.outcome ? (
        <Card>
          <CardHeader>
            <CardTitle>Outcome-lus</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            Verwacht {trace.outcome.expected}, werkelijk {trace.outcome.actual} —{" "}
            {trace.outcome.matched ? "overeenkomst" : "afwijking"} op{" "}
            {formatDate(trace.outcome.recordedAt)}.
          </CardContent>
        </Card>
      ) : null}

      <p className="text-sm">
        <Link
          href={`/keuze/${trace.decisionId}`}
          className="font-medium text-primary hover:underline"
        >
          Open het beslissingsmodel →
        </Link>
      </p>
    </div>
  );
}
