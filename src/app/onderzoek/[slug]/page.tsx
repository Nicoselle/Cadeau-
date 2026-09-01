import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ASSET_NOTES,
  DOSSIERS,
  assetsInDossier,
  getDossier,
} from "@/data/dossiers";
import { getMarketBoard } from "@/data/markets";
import { PYRAMID_MANIFEST, WATCHLIST } from "@/data/watchlist";
import { searchChannel } from "@/lib/macro-news";
import { formatNlDate } from "@/lib/newspaper";
import { fetchWatchBoard } from "@/lib/quotes";
import { formatTapeChange, formatTapePrice } from "@/lib/quotes";
import { isSmcUniverse } from "@/data/smc-universe";
import { readSmcBoard } from "@/lib/smc-board";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return DOSSIERS.map((dossier) => ({ slug: dossier.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dossier = getDossier(slug);
  if (!dossier) return { title: "Dossier" };
  return { title: dossier.title, description: dossier.dek };
}

export const dynamic = "force-dynamic";

export default async function DossierPage({ params }: Props) {
  const { slug } = await params;
  const dossier = getDossier(slug);
  if (!dossier) notFound();

  const board = getMarketBoard();
  const tape = await fetchWatchBoard(
    WATCHLIST.filter((item) => dossier.assetIds.includes(item.id)),
  );
  const news = await searchChannel(dossier.channelId);
  const names = assetsInDossier(dossier);
  const smc = await readSmcBoard(dossier.assetIds.filter(isSmcUniverse));

  return (
    <div className="container py-10">
      <p className="text-[11px] uppercase tracking-[0.18em] text-accent">
        {dossier.kicker}
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
        {dossier.title}
      </h1>
      <p className="mt-4 max-w-2xl font-serif text-lg text-muted-foreground">
        {dossier.dek}
      </p>
      <p className="mt-3 text-sm text-muted-foreground">
        <Link href="/safe" className="underline hover:text-accent">
          Alle dossiers
        </Link>
        {" · "}
        <Link href="/safe" className="underline hover:text-accent">
          Piramide
        </Link>
        {" · "}
        <Link href="/markten" className="underline hover:text-accent">
          Datavloer
        </Link>
      </p>

      <section className="mt-10 max-w-3xl space-y-4 font-serif text-[1.05rem] leading-[1.7]">
        {dossier.body.map((paragraph) => (
          <p
            key={paragraph}
            className={
              paragraph.startsWith("Duiding")
                ? "duiding border-l-2 border-[hsl(var(--gold))] pl-4"
                : undefined
            }
          >
            {paragraph}
          </p>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold">Namen in dit dossier</h2>
        <div className="mt-5 overflow-x-auto border border-hairline">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="bg-[hsl(36_22%_88%)] text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-medium">Naam</th>
                <th className="px-3 py-2 font-medium">Print</th>
                <th className="px-3 py-2 font-medium">Dag</th>
                <th className="px-3 py-2 font-medium">Wat we volgen</th>
              </tr>
            </thead>
            <tbody>
              {names.map((item) => {
                const row = tape.rows.find((entry) => entry.item.id === item.id);
                const note = ASSET_NOTES.find((entry) => entry.id === item.id);
                return (
                  <tr key={item.id} className="border-t border-hairline align-top">
                    <td className="px-3 py-3">
                      <p className="font-medium">{item.name}</p>
                      <p className="font-mono text-[11px] text-muted-foreground">
                        {item.listedAs} · {item.yahoo}
                      </p>
                    </td>
                    <td className="px-3 py-3 tabular-nums">
                      {formatTapePrice(
                        row?.quote.price ?? null,
                        row?.quote.currency ?? null,
                      )}
                    </td>
                    <td className="px-3 py-3 tabular-nums">
                      {formatTapeChange(row?.quote.changePct ?? null)}
                    </td>
                    <td className="px-3 py-3 font-serif text-[13px] leading-snug text-muted-foreground">
                      {note?.watch ?? item.note}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-2">
        {names.map((item) => {
          const note = ASSET_NOTES.find((entry) => entry.id === item.id);
          if (!note) return null;
          return (
            <article key={item.id} className="border border-hairline bg-card p-4">
              <p className="text-[11px] uppercase tracking-[0.14em] text-accent">
                {item.listedAs} · {item.role}
              </p>
              <h3 className="mt-1 font-display text-xl font-semibold">{item.name}</h3>
              <p className="mt-2 font-serif text-sm leading-relaxed">{note.what}</p>
              <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
                <span className="text-foreground">Duiding. </span>
                {note.duiding}
              </p>
            </article>
          );
        })}
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold">
          Macro van de datavloer
        </h2>
        <ul className="mt-4 max-w-3xl space-y-3 font-serif leading-relaxed">
          {dossier.drivers.map((driver) => {
            const tile = board.tiles.find((item) => item.id === driver.tileId);
            return (
              <li key={driver.tileId} className="border-b border-hairline pb-3">
                <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  {tile?.label ?? driver.tileId}
                  {tile ? ` · ${tile.value} · ${formatNlDate(tile.asOf)}` : ""}
                </p>
                <p className="mt-1">{driver.relation}</p>
              </li>
            );
          })}
        </ul>
      </section>

      {smc.length > 0 ? (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">
            Koerslezing van deze titels
          </h2>
          <p className="mt-2 max-w-3xl font-serif text-muted-foreground">
            Raming.{" "}
            <Link href="/safe" className="underline hover:text-accent">
              Methode en alle lezingen
            </Link>
            .
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {smc.map((card) => (
              <article key={card.item.id} className="border border-hairline bg-card p-4">
                <p className="text-[11px] uppercase tracking-[0.14em] text-accent">
                  {card.reading.bias}
                  {card.reading.lastEvent
                    ? ` · ${card.reading.lastEvent.kind.toUpperCase()}`
                    : ""}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold">
                  {card.item.name}
                </h3>
                <p className="mt-2 font-serif text-sm leading-relaxed">
                  {card.reading.narrative}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-12 border border-foreground p-5">
        <p className="text-[11px] uppercase tracking-[0.16em] text-accent">
          Steenman
        </p>
        <p className="mt-2 font-serif leading-relaxed">
          {dossier.steenman.objection}
        </p>
        <p className="mt-3 font-serif leading-relaxed text-muted-foreground">
          {dossier.steenman.antwoord}
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold">
          Koppen die dit dossier raken
        </h2>
        {news.error ? (
          <p className="mt-3 font-serif text-sm text-accent">Stil: {news.error}</p>
        ) : null}
        <ul className="mt-4 space-y-3">
          {news.headlines.length === 0 ? (
            <li className="font-serif text-muted-foreground">
              Geen kop die de keywords van dit dossier raakt.
            </li>
          ) : (
            news.headlines.map((item) => (
              <li key={item.id} className="border-b border-hairline pb-3">
                <p className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                  {item.source} · {item.published}
                </p>
                <a href={item.url} className="mt-1 block font-serif text-lg hover:text-accent">
                  {item.title}
                </a>
              </li>
            ))
          )}
        </ul>
      </section>

      <aside className="mt-14 max-w-3xl font-serif text-sm leading-relaxed text-muted-foreground">
        {PYRAMID_MANIFEST.disclaimer}
      </aside>
    </div>
  );
}
