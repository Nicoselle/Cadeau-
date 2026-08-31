import type { Metadata } from "next";
import Link from "next/link";
import { WatchBoardView } from "@/components/krant/watch-board";
import { PYRAMID_MANIFEST } from "@/data/watchlist";
import { fetchWatchBoard } from "@/lib/quotes";
import { formatNlDate } from "@/lib/newspaper";

export const metadata: Metadata = {
  title: "Piramide",
  description:
    "De investeringspiramide van SafeCapital: 40 % edelmetalen, 30 % liquide cash, 20 % publieke aandelen, 10 % crypto. Educatief, geen beleggingsadvies.",
};

export const dynamic = "force-dynamic";

export default async function PyramidPage() {
  const board = await fetchWatchBoard();
  const peil = board.asOf.slice(0, 10);

  return (
    <div className="container py-10">
      <p className="text-[11px] uppercase tracking-[0.18em] text-accent">
        SafeCapital · methode
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
        De investeringspiramide
      </h1>
      <p className="mt-4 max-w-2xl font-serif text-lg text-muted-foreground">
        {PYRAMID_MANIFEST.lead}
        {Number.isNaN(Date.parse(peil)) ? "" : ` Peil ${formatNlDate(peil)}.`}
      </p>

      <div className="mt-8 max-w-3xl space-y-4 font-serif text-[1.05rem] leading-[1.7]">
        <p>
          De basis bestaat uit <strong>40 % edelmetalen</strong>. Daarboven
          ligt <strong>30 % puur liquide cash</strong> — daarvan 50 % EUR, 40 %
          USD, 5 % CHF en 5 % NOK. Pas wanneer die fundamenten stevig staan,
          komen <strong>publieke aandelen (20 %)</strong>. Ten slotte{" "}
          <strong>crypto (10 %)</strong>: Bitcoin, Monero en Gram
          (Toncoin).
        </p>
        <p className="duiding border-l-2 border-[hsl(var(--gold))] pl-4">
          Hieronder de namen die we de moeite waard vinden, en de huidige stand
          voor goud, zilver, cash en crypto. Prints zijn de publieke tape,
          geen broker.
        </p>
      </div>

      <section className="mt-10 max-w-3xl border-t-2 border-foreground pt-8">
        <h2 className="font-display text-2xl font-semibold">Huisregels</h2>
        <ul className="mt-4 space-y-3 font-serif leading-relaxed">
          {PYRAMID_MANIFEST.houseRules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ul>
      </section>

      <p className="mt-8 text-sm text-muted-foreground">
        {board.okCount} prints binnen · {board.failCount} stil · bron{" "}
        <a
          href="https://finance.yahoo.com/"
          className="underline hover:text-accent"
        >
          Yahoo Finance chart
        </a>
        .{" "}
        <Link href="/methode" className="underline hover:text-accent">
          Methode
        </Link>
        .
      </p>

      <div className="mt-10">
        <WatchBoardView initial={board} />
      </div>

      <aside className="mt-14 max-w-3xl border-t border-hairline pt-8 font-serif text-sm leading-relaxed text-muted-foreground">
        {PYRAMID_MANIFEST.disclaimer}
      </aside>
    </div>
  );
}
