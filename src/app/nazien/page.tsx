import type { Metadata } from "next";
import Link from "next/link";
import {
  augustPieceFor,
  buildAugustLedger,
  printById,
} from "@/lib/as-of";
import { formatNlDate, formatWeekday, getArticle } from "@/lib/newspaper";

export const metadata: Metadata = {
  title: "Nazien — augustus 2026",
  description:
    "Elke weekdag van augustus 2026, met de laatste waarneming op of vóór die dag. Geen vooruitkijken. Elk cijfer heeft een bestand en een datum.",
};

export default function AuditPage() {
  const days = buildAugustLedger();

  return (
    <div className="container py-10">
      <p className="kicker">Register</p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-[-0.025em] sm:text-5xl">
        Nazien
      </h1>
      <p className="mt-4 max-w-2xl font-serif text-lg text-muted-foreground">
        Augustus 2026, weekdag voor weekdag. Peil = laatste waarneming op of
        vóór die dag. Geen weekend verzonnen. Geen cijfer van na de
        publicatiedatum. De H.6 van 25 augustus zet juli-M2 in de vintage;
        de editievloer van juni blijft 23.155,2 en +5,53 procent.
      </p>
      <p className="mt-4 max-w-2xl font-serif text-sm leading-relaxed text-muted-foreground">
        Rekenblad:{" "}
        <Link href="/api/v1/nazien" className="underline hover:text-accent">
          JSON
        </Link>
        {" · "}
        <span className="font-mono text-[13px]">redactie/mening/2026-08-ledger.json</span>
        {" · "}
        <Link href="/desk/opinie" className="underline hover:text-accent">
          alle meningen
        </Link>
        .
      </p>

      <section className="mt-10 max-w-3xl font-serif text-sm leading-relaxed">
        <h2 className="font-display text-2xl font-semibold">Hoe u controleert</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5">
          <li>
            Open een dag. De tabel in het stuk noemt waarde, waarnemingsdatum
            en CSV-bestand.
          </li>
          <li>
            Open dat bestand in <span className="font-mono text-[13px]">redactie/data</span>.
            De rij moet dezelfde datum en hetzelfde getal hebben, of — bij
            maandreeksen — de laatste maand op of vóór de peildatum.
          </li>
          <li>
            De uitgelijnde reële tienjaars is DGS10 minus T10YIE op{" "}
            <em>dezelfde</em> datum. Geen twee dagen van elkaar aftrekken.
          </li>
          <li>
            Tot en met 24 augustus geldt de M2-editievloer (juni). Vanaf 25
            augustus de vintage van 31 augustus (juli, H.6). Juni in de
            editievloer wordt niet overschreven.
          </li>
        </ol>
      </section>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[64rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-y-2 border-foreground">
              {[
                "Dag",
                "M2",
                "Vintage",
                "Reële 10j",
                "10-jaars",
                "Brent",
                "S&P",
                "VIX",
                "Stuk",
              ].map((header) => (
                <th
                  key={header}
                  className="py-2 pr-4 font-sans text-[11px] font-medium uppercase tracking-[0.12em]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day) => {
              const piece = augustPieceFor(day.date);
              const article = getArticle(piece.slug);
              const m2 = printById(day, "m2");
              const dgs = printById(day, "dgs10");
              const brent = printById(day, "brent");
              const spx = printById(day, "spx");
              const vix = printById(day, "vix");
              return (
                <tr key={day.date} className="border-b border-hairline align-top">
                  <td className="py-2.5 pr-4">
                    <p className="font-medium tabular-nums">{formatNlDate(day.date)}</p>
                    <p className="text-[12px] capitalize text-muted-foreground">
                      {formatWeekday(day.date)}
                    </p>
                  </td>
                  <td className="py-2.5 pr-4 tabular-nums">
                    {m2?.display ?? "—"}
                    <span className="block text-[11px] text-muted-foreground">
                      {m2?.date}
                    </span>
                  </td>
                  <td className="py-2.5 pr-4 text-[12px] text-muted-foreground">
                    {day.m2Vintage === "editie" ? "editievloer" : "H.6 25-08"}
                  </td>
                  <td className="py-2.5 pr-4 tabular-nums">
                    {day.real10y?.display ?? "—"}
                    <span className="block text-[11px] text-muted-foreground">
                      {day.real10y?.date}
                    </span>
                  </td>
                  <td className="py-2.5 pr-4 tabular-nums">
                    {dgs?.display ?? "—"}
                    <span className="block text-[11px] text-muted-foreground">
                      {dgs?.date}
                    </span>
                  </td>
                  <td className="py-2.5 pr-4 tabular-nums">
                    {brent?.display ?? "—"}
                    <span className="block text-[11px] text-muted-foreground">
                      {brent?.date}
                    </span>
                  </td>
                  <td className="py-2.5 pr-4 tabular-nums">
                    {spx?.display ?? "—"}
                    <span className="block text-[11px] text-muted-foreground">
                      {spx?.date}
                    </span>
                  </td>
                  <td className="py-2.5 pr-4 tabular-nums">
                    {vix?.display ?? "—"}
                    <span className="block text-[11px] text-muted-foreground">
                      {vix?.date}
                    </span>
                  </td>
                  <td className="py-2.5 pr-4">
                    <Link href={piece.href} className="underline hover:text-accent">
                      {article?.title ?? piece.title}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-6 max-w-2xl font-serif text-sm text-muted-foreground">
        Maandag 31 augustus houdt het bestaande stuk. De andere twintig
        weekdagen zijn terugwerkend gezet uit dezelfde vloer, zonder cijfers
        van later dan die dag.
      </p>
    </div>
  );
}
