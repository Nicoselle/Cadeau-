import Link from "next/link";
import { DOSSIERS } from "@/data/dossiers";
import { getMarketBoard } from "@/data/markets";
import { searchAllChannels } from "@/lib/macro-news";
import { formatNlDate } from "@/lib/newspaper";
import { macroImpact } from "@/lib/research";

export async function ResearchSections() {
  const board = getMarketBoard();
  const impact = macroImpact(board);
  const news = await searchAllChannels();

  return (
    <div id="dossiers" className="scroll-mt-8">
      <section>
        <h2 className="font-display text-2xl font-semibold">
          Cijfers die de piramide raken
        </h2>
        <p className="mt-2 max-w-3xl font-serif text-muted-foreground">
          Cijfers uit de datavloer, gekoppeld aan dossiers. Geen algemene
          nieuwskrant. Peil {formatNlDate(board.asOf)}.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {impact.map((row) => (
            <article key={row.tile.id} className="rule-story">
              <p className="kicker text-muted-foreground">
                {row.tile.label}
              </p>
              <p className="mt-1 font-display text-3xl font-bold tabular-nums">
                {row.tile.value}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {row.tile.seriesFile} · {row.tile.asOf}
              </p>
              <ul className="mt-3 space-y-2 font-serif text-sm leading-relaxed">
                {row.hits.map((hit) => (
                  <li key={`${row.tile.id}-${hit.slug}`}>
                    <Link
                      href={`/onderzoek/${hit.slug}`}
                      className="font-medium underline hover:text-accent"
                    >
                      {hit.title}
                    </Link>
                    <span className="text-muted-foreground"> — {hit.relation}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold">Dossiers</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {DOSSIERS.map((dossier) => (
            <article key={dossier.slug} className="rule-story">
              <p className="kicker">{dossier.kicker}</p>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-[-0.02em]">
                <Link href={`/onderzoek/${dossier.slug}`} className="hover:text-accent">
                  {dossier.title}
                </Link>
              </h3>
              <p className="mt-2 font-serif leading-relaxed text-muted-foreground">
                {dossier.dek}
              </p>
              <p className="mt-3 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                {dossier.assetIds.length} namen ·{" "}
                <Link href="/safe" className="underline hover:text-accent">
                  SMC
                </Link>
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold">
          Koppen die de namen raken
        </h2>
        <p className="mt-2 max-w-3xl font-serif text-muted-foreground">
          Titel, bron, verwijzing. Geen nabewerkte reportage. Leeg als de bron
          zwijgt of de kop de trefwoorden mist.
        </p>
        {Object.keys(news.errors).length > 0 ? (
          <p className="mt-3 font-serif text-sm text-accent">
            Stil: {Object.entries(news.errors).map(([id, error]) => `${id} (${error})`).join(" · ")}
          </p>
        ) : null}
        <ul className="mt-6 space-y-3">
          {news.headlines.length === 0 ? (
            <li className="font-serif text-muted-foreground">
              Geen kop die de volglijst raakt.
            </li>
          ) : (
            news.headlines.slice(0, 24).map((item) => (
              <li key={item.id} className="border-b border-hairline pb-3">
                <p className="text-[11px] uppercase tracking-[0.12em] text-accent">
                  {item.dossier} · {item.source} · {item.published}
                </p>
                <a
                  href={item.url}
                  className="mt-1 block font-serif text-lg leading-snug hover:text-accent"
                >
                  {item.title}
                </a>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}
