import type { Metadata } from "next";
import Link from "next/link";
import { ResearchSections } from "@/components/krant/research-sections";
import { SmcSections } from "@/components/krant/smc-sections";
import { WatchBoardView } from "@/components/krant/watch-board";
import { PYRAMID_MANIFEST } from "@/data/watchlist";
import { fetchWatchBoard } from "@/lib/quotes";
import { formatNlDate } from "@/lib/newspaper";

export const metadata: Metadata = {
  title: "Piramide",
  description:
    "De investeringspiramide van SafeCapital: weging, standen, dossiers en een lezing van de koers. Ter lering, geen beleggingsadvies.",
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

      <nav className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[12px] uppercase tracking-[0.14em]">
        <a href="#allocatie" className="hover:text-accent">
          Weging
        </a>
        <a href="#dossiers" className="hover:text-accent">
          Dossiers
        </a>
        <a href="#smc" className="hover:text-accent">
          SMC
        </a>
      </nav>

      <div className="mt-8 max-w-3xl space-y-4 font-serif text-[1.05rem] leading-[1.7]">
        <p>
          De basis bestaat uit <strong>40 procent edelmetalen</strong>.
          Daarboven ligt <strong>30 procent zuiver liquide middelen</strong> —
          daarvan 50 procent euro, 40 procent dollar, 5 procent Zwitserse frank
          en 5 procent Noorse kroon. Pas wanneer die fundamenten stevig staan,
          komen <strong>beursgenoteerde aandelen (20 procent)</strong>. Ten
          slotte <strong>crypto (10 procent)</strong>: Bitcoin, Monero en Gram
          (Toncoin).
        </p>
        <p className="duiding border-l-2 border-[hsl(var(--gold))] pl-4">
          Hieronder de namen die wij de moeite waard vinden, de stand van deze
          editie, de dossiers en de koerslezing. De noteringen komen van de
          openbare koers, niet van een bank of makelaar.
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
        {board.okCount} noteringen binnen · {board.failCount} stil · bron{" "}
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

      <div id="allocatie" className="mt-10 scroll-mt-8">
        <WatchBoardView initial={board} />
      </div>

      <div className="mt-16 border-t-2 border-foreground pt-10">
        <ResearchSections />
      </div>

      <div className="mt-16 border-t-2 border-foreground pt-10">
        <SmcSections />
      </div>

      <aside className="mt-14 max-w-3xl border-t border-hairline pt-8 font-serif text-sm leading-relaxed text-muted-foreground">
        {PYRAMID_MANIFEST.disclaimer}
      </aside>
    </div>
  );
}
