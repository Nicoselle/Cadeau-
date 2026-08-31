import Link from "next/link";
import type { MarketTile } from "@/types/newspaper";

export function MarketTape({ tiles }: { tiles: MarketTile[] }) {
  const tape = tiles.filter((tile) =>
    ["m2", "cpi-us", "hicp-ez", "cpi-be", "dff", "dgs10", "brent", "spx"].includes(
      tile.id,
    ),
  );

  return (
    <div className="no-print border-y border-hairline bg-background">
      <div className="container flex flex-wrap items-baseline gap-x-5 gap-y-1 py-2 text-[12px]">
        <Link
          href="/markten"
          className="kicker shrink-0 hover:text-foreground"
        >
          Datavloer
        </Link>
        {tape.map((tile) => (
          <div key={tile.id} className="flex items-baseline gap-1.5">
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {tile.label}
            </span>
            <span className="font-sans text-[13px] font-semibold tabular-nums">
              {tile.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
