import type { Metadata } from "next";
import Link from "next/link";
import { dossierForAsset } from "@/data/dossiers";
import { PYRAMID_MANIFEST } from "@/data/watchlist";
import { readSmcBoard } from "@/lib/smc-board";

export const metadata: Metadata = {
  title: "SMC",
  description:
    "Smart Money Concept op de gevolgde tapes van de SafeCapital-onderzoeksgroep: BOS, CHOCH, FVG, orderblok, liquiditeitsveeg. Raming, geen advies.",
};

export const dynamic = "force-dynamic";

export default async function SmcPage() {
  const board = await readSmcBoard();

  return (
    <div className="container py-10">
      <p className="text-[11px] uppercase tracking-[0.18em] text-accent">
        Onderzoeksgroep · raming
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
        Smart Money Concept
      </h1>
      <p className="mt-4 max-w-2xl font-serif text-lg text-muted-foreground">
        Dezelfde publieke tape, gelezen als structuur: swing, breuk (BOS),
        karakterwissel (CHOCH), onevenwicht (FVG), orderblok, liquiditeitsveeg.
        Herleidbaar, getest, geen TradingView-import. Geen order.
      </p>

      <div className="mt-8 max-w-3xl space-y-4 font-serif text-[1.05rem] leading-[1.7]">
        <p>
          De groep werkt al met TA, specifiek SMC. In de repo lag geen layout;
          deze desk is de huis-lens, zodat de krant dezelfde taal spreekt als
          de analysedesk. Dagkaarten, zes maanden, alleen de zwaardere tapes
          (allocatie plus een paar seniors).
        </p>
        <p className="duiding border-l-2 border-[hsl(var(--gold))] pl-4">
          Duiding / raming. Een open FVG is geen koop. Een CHOCH is geen
          verkoop. De piramide blijft de weging; SMC zegt alleen hoe de tape
          nu staat.
        </p>
      </div>

      <section className="mt-10 border border-foreground p-5 max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.16em] text-accent">
          Steenman
        </p>
        <p className="mt-2 font-serif leading-relaxed">
          SMC is een school, geen meetlat. Twee analisten tekenen andere
          swings. Deze code kiest strength 2 en sluiting voorbij het swing —
          dat is één conventie.
        </p>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          Daarom blijft de datavloer de CSV, en blijft elke lezing een raming
          met datum. Wie een andere conventie wil, past de test aan, niet de
          piramide.
        </p>
      </section>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {board.map((card) => {
          const dossier = dossierForAsset(card.item.id);
          return (
            <article key={card.item.id} className="border border-hairline bg-card p-5">
              <p className="text-[11px] uppercase tracking-[0.14em] text-accent">
                {card.item.layer} · {card.reading.bias}
                {card.reading.lastEvent
                  ? ` · ${card.reading.lastEvent.kind.toUpperCase()}`
                  : ""}
              </p>
              <h2 className="mt-1 font-display text-2xl font-semibold">
                {card.item.name}
              </h2>
              <p className="font-mono text-[11px] text-muted-foreground">
                {card.item.listedAs} · {card.item.yahoo} · {card.candleCount} kaarsen
              </p>
              {card.error ? (
                <p className="mt-2 font-serif text-sm text-accent">{card.error}</p>
              ) : null}
              <p className="mt-3 font-serif text-sm leading-relaxed">
                {card.reading.narrative}
              </p>
              {dossier ? (
                <Link
                  href={`/onderzoek/${dossier.slug}`}
                  className="mt-3 inline-block text-[11px] uppercase tracking-[0.12em] hover:text-accent"
                >
                  Dossier {dossier.title}
                </Link>
              ) : null}
            </article>
          );
        })}
      </div>

      <aside className="mt-14 max-w-3xl font-serif text-sm leading-relaxed text-muted-foreground">
        {PYRAMID_MANIFEST.disclaimer}
      </aside>
    </div>
  );
}
