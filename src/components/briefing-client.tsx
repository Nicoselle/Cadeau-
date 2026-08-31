"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { BriefingResponse } from "@/types/briefing";
import { BriefingReport } from "@/components/briefing-report";

export function BriefingClient() {
  const [result, setResult] = useState<BriefingResponse | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("azimut:briefing");
    if (raw) {
      setResult(JSON.parse(raw) as BriefingResponse);
    }
    setReady(true);
  }, []);

  if (!ready) {
    return <p className="text-sm text-muted-foreground">Dossier laden…</p>;
  }

  if (!result) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">Geen briefing in sessie</h1>
        <p className="text-muted-foreground">
          De berekening blijft lokaal in deze browser. Start opnieuw vanaf de intake.
        </p>
        <Link
          href="/#intake"
          className="inline-flex h-10 items-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground"
        >
          Naar intake
        </Link>
      </div>
    );
  }

  return <BriefingReport result={result} />;
}
