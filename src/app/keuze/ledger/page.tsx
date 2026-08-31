import { KeuzeNav } from "@/components/keuze/keuze-nav";
import { TraceList } from "@/components/keuze/trace-list";

export default function LedgerPage() {
  return (
    <div className="container py-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium text-accent">Beslissingsgeheugen</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Ledger</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Elke evaluatie wordt een spoor: inputs, vuurende regels, actor,
            autoriteit en — als die er is — de werkelijke uitkomst. Nieuwe
            evaluaties blijven in deze browser staan; de zaadsporen zijn het
            institutionele geheugen van de demo.
          </p>
        </div>
        <KeuzeNav current="/keuze/ledger" />
      </div>
      <div className="mt-8">
        <TraceList />
      </div>
    </div>
  );
}
