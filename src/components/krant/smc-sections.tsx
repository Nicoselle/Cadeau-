import Link from "next/link";
import { dossierForAsset } from "@/data/dossiers";
import { readSmcBoard } from "@/lib/smc-board";

export async function SmcSections() {
  const board = await readSmcBoard();

  return (
    <div id="smc" className="scroll-mt-8">
      <h2 className="font-display text-2xl font-semibold">
        Smart Money Concept
      </h2>
      <p className="mt-2 max-w-3xl font-serif leading-relaxed text-muted-foreground">
        Dezelfde openbare notering, gelezen als structuur: zwaai, breuk,
        karakterwissel, onevenwicht, orderblok, veeg van liquiditeit.
        Herleidbaar, beproefd, geen ingevoerde grafiek. Geen order.
      </p>

      <div className="mt-6 max-w-3xl space-y-4 font-serif text-[1.05rem] leading-[1.7]">
        <p className="duiding border-l-2 border-[hsl(var(--gold))] pl-4">
          Duiding en raming. Een open onevenwicht is geen koop. Een
          karakterwissel is geen verkoop. De piramide blijft de weging; deze
          lezing zegt alleen hoe de koers nu staat.
        </p>
      </div>

      <section className="mt-8 border border-foreground p-5 max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.16em] text-accent">
          Steenman
        </p>
        <p className="mt-2 font-serif leading-relaxed">
          Dit is een school, geen meetlat. Twee analisten tekenen andere
          zwaaien. Deze conventie kiest sterkte 2 en sluiting voorbij de zwaai.
        </p>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          Daarom blijft de datavloer de CSV, en blijft elke lezing een raming
          met datum. Wie een andere conventie wil, past de test aan, niet de
          piramide.
        </p>
      </section>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
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
              <h3 className="mt-1 font-display text-2xl font-semibold">
                {card.item.name}
              </h3>
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
    </div>
  );
}
