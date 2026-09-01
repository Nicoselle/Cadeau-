import type { Metadata } from "next";
import { ALLOCATION, ALLOCATION_MANIFEST } from "@/data/allocation";
import { TAPE_AS_OF, TAPE_NOTES } from "@/data/tape-notes";
import { WATCHLIST } from "@/data/watchlist";
import { formatNlDate } from "@/lib/newspaper";
import { fetchWatchBoard } from "@/lib/quotes";
import { formatTapeChange, formatTapePrice } from "@/lib/quotes";

export const metadata: Metadata = {
  title: "Safe Capital",
  description:
    "Gesloten clientlaag. Allocatie A–G en volglijst. Vertrouwelijk, eigen gebruik. Geen financieel advies.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function SafePage() {
  const board = await fetchWatchBoard();
  const peil = board.asOf.slice(0, 10);

  return (
    <div className="container py-10">
      <p className="kicker">Safe Capital · gesloten</p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-[-0.025em] sm:text-5xl">
        {ALLOCATION_MANIFEST.title}
      </h1>
      <p className="mt-4 max-w-2xl font-serif text-lg text-muted-foreground">
        {ALLOCATION_MANIFEST.lead} {ALLOCATION_MANIFEST.doctrine}
        {Number.isNaN(Date.parse(peil)) ? "" : ` Peil ${formatNlDate(peil)}.`}
      </p>

      <section id="allocatie" className="mt-10 max-w-3xl border-t-2 border-foreground pt-8">
        <p className="kicker">Weging</p>
        <ol className="mt-4 space-y-4">
          {ALLOCATION.map((sleeve) => (
            <li key={sleeve.id} className="rule-story">
              <p className="kicker">
                {sleeve.id} · {sleeve.band}
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold tracking-[-0.02em]">
                {sleeve.label}
              </h2>
              <p className="mt-2 font-serif leading-relaxed text-muted-foreground">
                {sleeve.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section id="volglijst" className="mt-12">
        <p className="kicker">Volglijst</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-[-0.02em]">
          Tickers, geen extra product
        </h2>
        <p className="mt-3 max-w-3xl font-serif leading-relaxed text-muted-foreground">
          {board.okCount} noteringen binnen · {board.failCount} stil. Tape{" "}
          {formatNlDate(TAPE_AS_OF)}. CSE:ACM is Allied; NYSE:ACM is AECOM.
          GRAM is Ton. SKY is Sky Protocol, niet NYSE:SKY.
        </p>
        <div className="mt-6 overflow-x-auto border border-hairline">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="bg-[hsl(36_22%_88%)] text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-medium">Naam</th>
                <th className="px-3 py-2 font-medium">Ticker</th>
                <th className="px-3 py-2 font-medium">Beurs</th>
                <th className="px-3 py-2 font-medium">Koers</th>
                <th className="px-3 py-2 font-medium">Dag</th>
                <th className="px-3 py-2 font-medium">Noot</th>
              </tr>
            </thead>
            <tbody>
              {board.rows.map((row) => (
                <tr key={row.item.id} className="border-t border-hairline">
                  <td className="px-3 py-2.5 font-medium">{row.item.name}</td>
                  <td className="px-3 py-2.5 font-mono text-xs">
                    {row.item.listedAs}
                  </td>
                  <td className="px-3 py-2.5 text-[12px] uppercase tracking-[0.08em] text-muted-foreground">
                    {row.item.exchange}
                  </td>
                  <td className="px-3 py-2.5 tabular-nums">
                    {formatTapePrice(row.quote.price, row.quote.currency)}
                  </td>
                  <td className="px-3 py-2.5 tabular-nums">
                    {formatTapeChange(row.quote.changePct)}
                  </td>
                  <td className="px-3 py-2.5 font-serif text-[13px] leading-snug text-muted-foreground">
                    {row.quote.ok ? row.item.note : row.quote.error ?? row.item.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          {WATCHLIST.length} namen op de lijst.
        </p>
      </section>

      <section id="tape" className="mt-12 max-w-3xl">
        <p className="kicker">Tape 1 september</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-[-0.02em]">
          Wat wij zagen — en wat niet
        </h2>
        <ul className="mt-6 space-y-4">
          {TAPE_NOTES.map((note) => (
            <li key={note.id} className="rule-story">
              <p className="kicker">
                {note.kind === "feit" ? "Feit" : "Niet gezien"} · {note.listedAs} ·{" "}
                {note.asOf}
              </p>
              <p className="mt-2 font-serif leading-relaxed">{note.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <aside className="mt-14 max-w-3xl border-t border-hairline pt-8 font-serif text-sm leading-relaxed text-muted-foreground">
        {ALLOCATION_MANIFEST.disclaimer}
      </aside>
    </div>
  );
}
