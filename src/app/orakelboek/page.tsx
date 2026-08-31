import type { Metadata } from "next";
import { EditionFigure } from "@/components/krant/edition-figure";
import { ORAKEL_IMAGE } from "@/data/page-images";
import { oracles } from "@/data/oracles";
import { formatNlDate } from "@/lib/newspaper";

export const metadata: Metadata = {
  title: "Orakelboek",
  description:
    "Toetsbare uitspraken van de Kapitaalkrant, met vervaldag. Uitkomsten worden bijgeschreven, nooit weggewist.",
};

const OUTCOME: Record<string, string> = {
  open: "Open",
  goed: "Goed",
  fout: "Fout",
  deels: "Deels",
};

export default function OraclePage() {
  return (
    <div className="container py-10">
      <p className="kicker">
        Register
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-[-0.025em] sm:text-5xl">
        Orakelboek
      </h1>
      <p className="mt-4 max-w-2xl font-serif text-lg text-muted-foreground">
        Zeven uitspraken die later goed of fout kunnen blijken. Uitspraken van
        het Planbureau toetsen de bron. Uitspraken van de krant toetsen de
        krant.
      </p>
      <EditionFigure
        image={ORAKEL_IMAGE}
        ratio="still"
        className="mt-8 max-w-md"
      />

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-y-2 border-foreground">
              {["#", "Uitspraak", "Herkomst", "Vervaldag", "Toets", "Stand"].map(
                (header) => (
                  <th
                    key={header}
                    className="py-2 pr-4 font-sans text-[11px] font-medium uppercase tracking-[0.12em]"
                  >
                    {header}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {oracles.map((claim) => (
              <tr key={claim.id} className="border-b border-hairline align-top">
                <td className="py-4 pr-4 font-display text-xl font-semibold">
                  {claim.id}
                </td>
                <td className="max-w-xl py-4 pr-4 font-serif leading-relaxed">
                  {claim.statement}
                  {claim.notes ? (
                    <span className="mt-2 block text-[13px] text-muted-foreground">
                      {claim.notes}
                    </span>
                  ) : null}
                </td>
                <td className="py-4 pr-4 text-muted-foreground">
                  {claim.origin}
                </td>
                <td className="py-4 pr-4 tabular-nums">
                  {formatNlDate(claim.expires, "short")}
                </td>
                <td className="py-4 pr-4 tabular-nums">
                  {formatNlDate(claim.testDate, "short")}
                </td>
                <td className="py-4 pr-4">
                  <span className="uppercase tracking-[0.12em]">
                    {OUTCOME[claim.outcome]}
                  </span>
                  <span className="mt-1 block text-[12px] text-muted-foreground">
                    {claim.confidence} vertrouwen
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
