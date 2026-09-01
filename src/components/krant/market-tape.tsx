import Link from "next/link";
import type { MarketTile } from "@/types/newspaper";

export function MarketTape({ tiles }: { tiles: MarketTile[] }) {
  const tape = tiles.filter((tile) =>
    ["m2", "cpi-us", "hicp-ez", "cpi-be", "dff", "dgs10", "spx", "vix"].includes(
      tile.id,
    ),
  );

  return (
    <div className="no-print overflow-hidden border-b border-hairline bg-foreground text-[hsl(40_38%_93%)]">
      <div className="container flex flex-wrap items-center gap-x-6 gap-y-2 py-2.5 text-[12px] tracking-wide">
        <Link
          href="/markten"
          className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-[hsl(40_30%_72%)] hover:text-white"
        >
          Datavloer
        </Link>
        {tape.map((tile) => (
          <div key={tile.id} className="flex items-baseline gap-2">
            <span className="uppercase tracking-[0.12em] text-[hsl(40_30%_72%)]">
              {tile.label}
            </span>
            <span className="font-medium tabular-nums">{tile.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
