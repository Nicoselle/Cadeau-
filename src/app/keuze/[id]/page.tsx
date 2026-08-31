import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DecisionGraph } from "@/components/keuze/decision-graph";
import { DecisionTableView } from "@/components/keuze/decision-table-view";
import { EvaluateWorkspace } from "@/components/keuze/evaluate-workspace";
import { KeuzeNav } from "@/components/keuze/keuze-nav";
import { ModeBadge } from "@/components/keuze/mode-badge";
import { getDecision, listDecisions } from "@/data/keuze/catalog";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return listDecisions().map((decision) => ({ id: decision.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const decision = getDecision(id);
  if (!decision) return { title: "Beslissing niet gevonden" };
  return {
    title: decision.name,
    description: decision.summary,
  };
}

export default async function DecisionPage({ params }: Props) {
  const { id } = await params;
  const decision = getDecision(id);
  if (!decision) notFound();

  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            <Link href="/keuze" className="hover:underline">
              Keuze
            </Link>{" "}
            / {decision.domain}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            {decision.name}
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {decision.summary}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <ModeBadge mode={decision.mode} />
            <span className="text-sm text-muted-foreground">
              v{decision.version} · {decision.owner}
            </span>
          </div>
        </div>
        <KeuzeNav />
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Decision Requirements Diagram</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Inputs, kennisbronnen, causale knopen en beslissingstabellen — de
          semantische kaart van deze keuze.
        </p>
        <div className="mt-4 rounded-lg border border-border bg-card p-4">
          <DecisionGraph definition={decision} />
        </div>
      </section>

      <section className="mt-10 space-y-6">
        <h2 className="text-lg font-semibold">Beslissingstabellen</h2>
        {decision.tables.map((table) => (
          <div key={table.id} className="rounded-lg border border-border bg-card p-4">
            <DecisionTableView table={table} />
          </div>
        ))}
      </section>

      {decision.knowledge.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-lg font-semibold">Kennisbronnen</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {decision.knowledge.map((source) => (
              <Card key={source.id}>
                <CardHeader>
                  <CardTitle>{source.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {source.kind} · {source.citation}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-10">
        <h2 className="mb-4 text-lg font-semibold">Uitvoeren</h2>
        <EvaluateWorkspace definition={decision} />
      </section>
    </div>
  );
}
