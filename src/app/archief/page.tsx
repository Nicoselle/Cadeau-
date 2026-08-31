import type { Metadata } from "next";
import Link from "next/link";
import { EDITIONS } from "@/data/edition";
import {
  formatNlDate,
  formatWeekday,
  leadOfEdition,
  newsOfEdition,
  opinionsOfEdition,
} from "@/lib/newspaper";

export const metadata: Metadata = {
  title: "Archief",
  description:
    "Alle genummerde edities van de Kapitaalkrant, volledig en nazienbaar. Elk nummer heeft zijn eigen pagina.",
};

export default function ArchiveIndexPage() {
  const editions = [...EDITIONS].reverse();

  return (
    <div className="container py-10">
      <p className="kicker">Archief</p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-[-0.025em] sm:text-5xl">
        Alle edities
      </h1>
      <p className="mt-4 max-w-2xl font-serif text-lg text-muted-foreground">
        Elk nummer staat hier volledig: voorpagina, de stukken van die editie,
        de mening van die dag. Geen samenvatting achteraf. Het nummer zoals
        het verscheen, met de vloer van die peildatum.
      </p>
      <p className="mt-4 text-sm">
        <Link href="/api/v1/archief" className="underline hover:text-accent">
          Alle edities als JSON
        </Link>
      </p>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-y-2 border-foreground">
              {["Nummer", "Datum", "Titel", "Voorpagina", "Stukken", ""].map(
                (header) => (
                  <th
                    key={header || "lees"}
                    className="py-2 pr-4 font-sans text-[11px] font-medium uppercase tracking-[0.12em]"
                  >
                    {header}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {editions.map((edition) => {
              const lead = leadOfEdition(edition.number);
              const news = newsOfEdition(edition.number);
              const opinions = opinionsOfEdition(edition.number);
              return (
                <tr key={edition.number} className="border-b border-hairline align-top">
                  <td className="py-3 pr-4 font-medium">{edition.folio}</td>
                  <td className="py-3 pr-4">
                    <p className="tabular-nums">{formatNlDate(edition.date)}</p>
                    <p className="text-[12px] capitalize text-muted-foreground">
                      {formatWeekday(edition.date)}
                    </p>
                  </td>
                  <td className="py-3 pr-4">
                    <Link
                      href={`/archief/${edition.number}`}
                      className="font-display text-lg font-semibold leading-tight hover:text-accent"
                    >
                      {edition.name}
                    </Link>
                    <p className="mt-1 max-w-sm font-serif text-[13px] leading-relaxed text-muted-foreground">
                      {edition.note}
                    </p>
                  </td>
                  <td className="py-3 pr-4">
                    <Link
                      href={`/stuk/${lead.slug}`}
                      className="underline hover:text-accent"
                    >
                      {lead.title}
                    </Link>
                  </td>
                  <td className="py-3 pr-4 tabular-nums">
                    {news.length}{" "}
                    {news.length === 1 ? "stuk" : "stukken"}
                    {opinions.length > 0
                      ? ` · ${opinions.length} ${opinions.length === 1 ? "mening" : "meningen"}`
                      : ""}
                  </td>
                  <td className="py-3 pr-0 text-right">
                    <Link
                      href={`/archief/${edition.number}`}
                      className="text-[12px] font-semibold uppercase tracking-[0.12em] hover:text-accent"
                    >
                      Lees het nummer
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <section className="mt-14 border-t border-foreground pt-8">
        <p className="kicker text-muted-foreground">De mening</p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-[-0.02em]">
          Augustus 2026, dag voor dag
        </h2>
        <p className="mt-3 max-w-2xl font-serif text-muted-foreground">
          De dagelijkse mening hoort bij de nummers, maar heeft haar eigen
          kalender. Elk cijfer is de laatste waarneming op of vóór die dag.
        </p>
        <p className="mt-5 text-sm">
          <Link href="/nazien" className="underline hover:text-accent">
            Nazien met datum en bestand
          </Link>
          {" · "}
          <Link href="/desk/opinie" className="underline hover:text-accent">
            Alle meningen
          </Link>
        </p>
      </section>
    </div>
  );
}
