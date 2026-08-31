"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { WATCHLIST } from "@/data/watchlist";

const TAPE_IDS = ["goud", "zilver", "btc", "aem", "pltr"];

type TapePrint = {
  id: string;
  name: string;
  price_label: string;
  change_label: string;
  change_pct: number | null;
};

type ApiBody = {
  data?: {
    rows?: TapePrint[];
  };
};

export function WatchTape() {
  const [prints, setPrints] = useState<TapePrint[]>(
    TAPE_IDS.map((id) => {
      const item = WATCHLIST.find((entry) => entry.id === id);
      return {
        id,
        name: item?.name ?? id,
        price_label: "…",
        change_label: "",
        change_pct: null,
      };
    }),
  );

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/v1/volgen", { cache: "no-store" });
        if (!response.ok) return;
        const body = (await response.json()) as ApiBody;
        const rows = body.data?.rows ?? [];
        if (cancelled) return;
        setPrints(
          TAPE_IDS.map((id) => {
            const row = rows.find((item) => item.id === id);
            const item = WATCHLIST.find((entry) => entry.id === id);
            return {
              id,
              name: item?.name ?? id,
              price_label: row?.price_label ?? "—",
              change_label: row?.change_label ?? "—",
              change_pct: row?.change_pct ?? null,
            };
          }),
        );
      } catch {
        /* namen blijven staan */
      }
    }

    void load();
    const timer = window.setInterval(load, 120_000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  return (
    <div className="no-print overflow-hidden border-b border-hairline bg-[hsl(0_42%_18%)] text-[hsl(40_38%_93%)]">
      <div className="container flex flex-wrap items-center gap-x-6 gap-y-2 py-2.5 text-[12px] tracking-wide">
        <Link
          href="/piramide"
          className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-[hsl(12_40%_72%)] hover:text-white"
        >
          Extra aandacht
        </Link>
        {prints.map((print) => (
          <div key={print.id} className="flex items-baseline gap-2">
            <span className="uppercase tracking-[0.12em] text-[hsl(12_30%_72%)]">
              {print.name}
            </span>
            <span className="font-medium tabular-nums">{print.price_label}</span>
            {print.change_label ? (
              <span
                className={`tabular-nums ${
                  (print.change_pct ?? 0) < 0
                    ? "text-[hsl(12_40%_72%)]"
                    : "text-[hsl(40_38%_88%)]"
                }`}
              >
                {print.change_label}
              </span>
            ) : null}
          </div>
        ))}
        <Link
          href="/piramide"
          className="ml-auto text-[10px] uppercase tracking-[0.16em] text-[hsl(12_40%_72%)] hover:text-white"
        >
          {WATCHLIST.length} namen · piramide
        </Link>
      </div>
    </div>
  );
}
