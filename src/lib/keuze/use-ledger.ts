"use client";

import { useCallback, useEffect, useState } from "react";
import { seedTraces } from "@/data/keuze/traces";
import type { DecisionTrace } from "./types";
import { LEDGER_STORAGE_KEY, parseStoredLedger, sortLedger } from "./ledger";

export function useLedger() {
  const [local, setLocal] = useState<DecisionTrace[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLocal(parseStoredLedger(window.localStorage.getItem(LEDGER_STORAGE_KEY)));
    setReady(true);
  }, []);

  const persist = useCallback((next: DecisionTrace[]) => {
    setLocal(next);
    window.localStorage.setItem(LEDGER_STORAGE_KEY, JSON.stringify(next));
  }, []);

  const traces = sortLedger(mergeById(seedTraces, local));

  const upsert = useCallback(
    (trace: DecisionTrace) => {
      persist(mergeById(local, [trace]));
    },
    [local, persist],
  );

  return { traces, upsert, ready };
}

function mergeById(
  base: DecisionTrace[],
  extra: DecisionTrace[],
): DecisionTrace[] {
  const map = new Map<string, DecisionTrace>();
  for (const trace of base) map.set(trace.id, trace);
  for (const trace of extra) map.set(trace.id, trace);
  return [...map.values()];
}
