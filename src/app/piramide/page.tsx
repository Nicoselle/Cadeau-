import type { Metadata } from "next";
import Link from "next/link";
import { WatchBoardView } from "@/components/krant/watch-board";
import { WATCHLIST } from "@/data/watchlist";
import { fetchWatchBoard } from "@/lib/quotes";
import { formatNlDate } from "@/lib/newspaper";

export const metadata: Metadata = {
  title: "Piramide",
  description:
    "Uitleg van de investeringspiramide en de volglijst van de Kapitaalkrant: edelmetalen, producenten, kasstroom, thema en de punt. Geen beleggingsadvies.",
};

export const dynamic = "force-dynamic";

export default async function PyramidPage() {
  const board = await fetchWatchBoard();
  const peil = board.asOf.slice(0, 10);

  return (
    <div className="container py-10">
      <p className="text-[11px] uppercase tracking-[0.18em] text-accent">
        Volglijst · extra aandacht
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
        De investeringspiramide
      </h1>
      <p className="mt-4 max-w-2xl font-serif text-lg text-muted-foreground">
        Een taxonomie om namen te groeperen, geen modelportefeuille. Onderop
        wat bewaard, bovenaan wat kantelt. {WATCHLIST.length} namen met extra
        aandacht. Laatste print van de publieke tape
        {Number.isNaN(Date.parse(peil)) ? "" : ` · peil ${formatNlDate(peil)}`}.
      </p>

      <div className="mt-8 max-w-3xl space-y-4 font-serif text-[1.05rem] leading-[1.7]">
        <p>
          De piramide is een oud redactioneel schema, geen wet. De bodem is
          breed en saai: edelmetalen als meetlat. Daarboven wie het metaal wint
          of er een royalty op int. Dan kasstroom uit olie, zee en energie. Dan
          technologie die een verhaal heeft. De punt is smal: crypto en de
          kleinste, meest kantelbare namen.
        </p>
        <p className="duiding border-l-2 border-[hsl(var(--gold))] pl-4">
          Duiding, geen advies. Extra aandacht betekent: deze namen staan op de
          volglijst van de redactie. Het is geen koop, geen verkoop, geen
          weging. De datavloer blijft de CSV; dit is de tape ernaast.
        </p>
        <p>
          Tickers worden herleid tot wat de publieke tape echt kent.{" "}
          <em>xrm</em> is Monero (XMR). <em>Sky</em> is niet Champion Homes.
          <em> ACM</em> is de CSE-notering, niet het gedeliste ACM.V.{" "}
          <em>GCU</em> staat in Toronto; GCU.V op Yahoo is een ander
          instrument. <em>PBR.A</em> schrijft de tape als PBR-A.
        </p>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {board.okCount} prints binnen · {board.failCount} stil · bron{" "}
        <a
          href="https://finance.yahoo.com/"
          className="underline hover:text-accent"
        >
          Yahoo Finance chart
        </a>
        , geen broker.{" "}
        <Link href="/methode" className="underline hover:text-accent">
          Methode
        </Link>
        .
      </p>

      <div className="mt-10">
        <WatchBoardView initial={board} />
      </div>
    </div>
  );
}
