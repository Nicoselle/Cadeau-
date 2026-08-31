import { DOSSIERS } from "@/data/dossiers";
import type { MarketBoard } from "@/data/markets";
import type { MarketTile } from "@/types/newspaper";

export type ImpactRow = {
  tile: MarketTile;
  hits: Array<{ slug: string; title: string; relation: string }>;
};

export function macroImpact(board: MarketBoard): ImpactRow[] {
  return board.tiles
    .map((tile) => {
      const hits = DOSSIERS.flatMap((dossier) =>
        dossier.drivers
          .filter((driver) => driver.tileId === tile.id)
          .map((driver) => ({
            slug: dossier.slug,
            title: dossier.title,
            relation: driver.relation,
          })),
      );
      return { tile, hits };
    })
    .filter((row) => row.hits.length > 0);
}
