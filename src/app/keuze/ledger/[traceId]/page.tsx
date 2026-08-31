import { KeuzeNav } from "@/components/keuze/keuze-nav";
import { TraceDetail } from "@/components/keuze/trace-detail";

type Props = { params: Promise<{ traceId: string }> };

export default async function TracePage({ params }: Props) {
  const { traceId } = await params;
  return (
    <div className="container py-10">
      <div className="mb-6 flex justify-end">
        <KeuzeNav current="/keuze/ledger" />
      </div>
      <TraceDetail id={traceId} />
    </div>
  );
}
