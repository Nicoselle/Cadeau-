import type { Metadata } from "next";
import Link from "next/link";
import { EditionFigure } from "@/components/krant/edition-figure";
import { Sparkline } from "@/components/krant/sparkline";
import { MARKTEN_IMAGE } from "@/data/page-images";
import { getMarketBoard } from "@/data/markets";
import { formatNlDate } from "@/lib/newspaper";

export const metadata: Metadata = {
  title: "Markten",
  description:
    "De datavloer van de Kapitaalkrant: M2, inflatie, rente, spilindex en markten, herberekend uit opgeslagen reeksen.",
};

export default function MarketsPage() {
  const board = getMarketBoard();

  return (
    <div className="container py-10">
      <p className="text-[11px] uppercase tracking-[0.18em] text-accent">
        Datavloer
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
        Markten
      </h1>
      <p className="mt-4 max-w-2xl font-serif text-lg text-muted-foreground">
        Geen live-ticker. Elk cijfer komt uit een CSV die de redactie heeft
        opgehaald en bewaard. Peil {formatNlDate(board.asOf)}. De volglijst met
        extra aandacht — de piramide van SafeCapital — staat op de{" "}
        <Link href="/piramide" className="underline hover:text-accent">
          piramide
        </Link>
        ; dat is een laatste print, geen reeks.
      </p>
      <EditionFigure image={MARKTEN_IMAGE} className="mt-8 max-w-3xl" />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {board.tiles.map((tile) => (
          <article
            key={tile.id}
            className="border border-hairline bg-card p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {tile.label}
                </p>
                <p className="mt-1 font-display text-3xl font-semibold tabular-nums">
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
