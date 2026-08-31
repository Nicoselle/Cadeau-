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
    return <p className="text-base text-muted-foreground">Even geduld…</p>;
  }

  if (!result) {
    return (
      <div className="mx-auto max-w-lg space-y-5 py-8">
        <h1 className="font-serif text-4xl font-medium tracking-tight">We hebben je nog niet gezien</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Vul je naam, datum en plaats in. Daarna staat hier jouw schets.
        </p>
        <Link
          href="/#intake"
          className="inline-flex h-12 items-center rounded-full bg-primary px-7 text-base font-medium text-primary-foreground"
        >
          Terug naar het begin
        </Link>
      </div>
    );
  }

  return <BriefingReport result={result} />;
}
