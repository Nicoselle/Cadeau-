import type { Metadata } from "next";
import { EditionFigure } from "@/components/krant/edition-figure";
import { Sparkline } from "@/components/krant/sparkline";
import { MARKTEN_IMAGE } from "@/data/page-images";
import { getMarketBoard } from "@/data/markets";
import { formatNlDate } from "@/lib/newspaper";

export const metadata: Metadata = {
  title: "Markten",
  description:
    "De datavloer van de Kapitaalkrant: M2, inflatie, rente, olie, koper, uranium en de overige reeksen, herberekend uit opgeslagen bestanden.",
};

export default function MarketsPage() {
  const board = getMarketBoard();

  return (
    <div className="container py-10">
      <p className="kicker">Datavloer</p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-[-0.025em] sm:text-5xl">
        Markten
      </h1>
      <p className="mt-4 max-w-2xl font-serif text-lg text-muted-foreground">
        Geen live-ticker. Elk cijfer komt uit een CSV die de redactie heeft
        opgehaald en bewaard. Peildatum publicatie: {formatNlDate(board.asOf)}.
        Per reeks de laatste waarneming; die datums lopen niet gelijk.
        Afgeleide cijfers alleen op de laatste gemeenschappelijke datum.
      </p>
      <EditionFigure image={MARKTEN_IMAGE} className="mt-8 max-w-3xl" />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {board.tiles.map((tile) => (
          <article
            key={tile.id}
            className="rule-story"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="kicker text-muted-foreground">{tile.label}</p>
                <p className="mt-1 font-display text-3xl font-bold tabular-nums">
                  {tile.value}
                </p>
              </div>
              <Sparkline values={tile.spark} />
            </div>
            <p className="mt-3 font-serif text-sm leading-relaxed text-muted-foreground">
              {tile.detail}
            </p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              {tile.seriesFile} · {tile.asOf}
            </p>
          </article>
        ))}
      </div>

      <ul className="mt-10 max-w-2xl space-y-2 font-serif text-sm text-muted-foreground">
        {board.notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </div>
  );
}
