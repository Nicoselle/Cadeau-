import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KeuzeNav } from "@/components/keuze/keuze-nav";
import { ModeBadge } from "@/components/keuze/mode-badge";
import { decisions, KEUZE_UPDATED } from "@/data/keuze/catalog";
import { LastUpdated } from "@/components/last-updated";

const LAYERS = [
  { id: "L1", name: "Signalen", text: "Verse, herleidbare inputs — geen stille stale data." },
  { id: "L2", name: "Kennis", text: "DMN-tabellen, beleid en bronnen als first-class asset." },
  { id: "L3", name: "Oorzaak", text: "Causale pijlen en counterfactuals, niet alleen correlatie." },
  { id: "L4", name: "Uitvoering", text: "Composeerbare beslissingsdiensten met hit policies." },
  { id: "L5", name: "Contract", text: "Support, augment of automate — met escalatie." },
  { id: "L6", name: "Ledger", text: "Elke beslissing blijft: wie, waarom, wat erna." },
];

export default function KeuzeHomePage() {
  return (
    <>
      <section className="border-b border-border bg-card">
        <div className="container py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-accent">Keuze · Decision Intelligence</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                De architectuur van keuzes
              </h1>
              <p className="mt-3 text-muted-foreground">
                Een werkend bouwplan voor volgende-generatie besluitvormingssoftware:
                beslissingen als herbruikbaar bedrijfsmiddel, causale duiding in plaats
                van blinde correlatie, en een ledger die amnesie onmogelijk maakt.
              </p>
            </div>
            <KeuzeNav current="/keuze" />
          </div>
          <LastUpdated
            date={KEUZE_UPDATED}
            className="mt-6 text-sm text-muted-foreground"
          />
        </div>
      </section>

      <section className="container py-10">
        <h2 className="text-lg font-semibold">Zes lagen, drie werkende beslissingen</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {LAYERS.map((layer) => (
            <div
              key={layer.id}
              className="rounded-lg border border-border bg-card p-4"
            >
              <p className="text-xs font-medium text-accent">{layer.id}</p>
              <p className="mt-1 font-medium">{layer.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{layer.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container pb-12">
        <div className="mb-4 flex items-end justify-between gap-4">
          <h2 className="text-lg font-semibold">Beslissingscatalogus</h2>
          <Link
            href="/keuze/architectuur"
            className="text-sm font-medium text-primary hover:underline"
          >
            Lees het onderzoeksrapport →
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {decisions.map((decision) => (
            <Card key={decision.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle>{decision.name}</CardTitle>
                  <ModeBadge mode={decision.mode} />
                </div>
                <p className="text-xs text-muted-foreground">{decision.domain}</p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <p className="flex-1 text-sm text-muted-foreground">
                  {decision.summary}
                </p>
                <p className="mt-3 text-xs text-muted-foreground">
                  v{decision.version} · {decision.owner} · {decision.inputs.length}{" "}
                  inputs
                </p>
                <Link
                  href={`/keuze/${decision.id}`}
                  className="mt-4 text-sm font-medium text-primary hover:underline"
                >
                  Open workspace →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
