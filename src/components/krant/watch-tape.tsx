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
    <div className="no-print border-b border-hairline bg-background">
      <div className="container flex flex-wrap items-baseline gap-x-5 gap-y-1 py-2 text-[12px]">
        <Link href="/safe" className="kicker shrink-0 hover:text-foreground">
          Extra aandacht
        </Link>
        {prints.map((print) => (
          <div key={print.id} className="flex items-baseline gap-1.5">
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {print.name}
            </span>
            <span className="font-sans text-[13px] font-semibold tabular-nums">
              {print.price_label}
            </span>
            {print.change_label ? (
              <span
                className={`font-sans text-[12px] tabular-nums ${
                  (print.change_pct ?? 0) < 0
                    ? "text-markets-down"
                    : "text-markets-up"
                }`}
              >
                {print.change_label}
              </span>
            ) : null}
          </div>
        ))}
        <Link
          href="/safe"
          className="ml-auto font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground hover:text-accent"
        >
          {WATCHLIST.length} namen
        </Link>
      </div>
    </div>
  );
}
