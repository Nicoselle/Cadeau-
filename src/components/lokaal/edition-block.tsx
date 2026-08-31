import Link from "next/link";
import type { EntrepreneurStory, FoundStory, PlaceEdition } from "@/types/local";

export function EditionBlock({ edition }: { edition: PlaceEdition }) {
  const empty =
    edition.gevonden.length === 0 &&
    edition.verhalen.length === 0 &&
    !edition.searchError;

  return (
    <section className="border-t-2 border-foreground pt-8">
      <p className="text-[11px] uppercase tracking-[0.16em] text-accent">
        Lokaal · {edition.plaats.country} · {edition.plaats.province}
      </p>
      <h2 className="mt-2 font-display text-3xl font-semibold">
        <Link href={`/lokaal/${edition.plaats.slug}`} className="hover:text-accent">
          {edition.plaats.name}
        </Link>
      </h2>
      <p className="mt-2 font-serif text-sm text-muted-foreground">
        Gevraagd door abonnees. {edition.vraag} {edition.vraag === 1 ? "vraag" : "vragen"} op deze desk.
      </p>

      {edition.searchError ? (
        <p className="mt-4 border border-hairline bg-card px-4 py-3 font-serif text-sm">
          De zoekbron was even onbereikbaar ({edition.searchError}). Eigen verhalen
          blijven staan.
        </p>
      ) : null}

      {empty ? (
        <p className="mt-6 max-w-xl font-serif text-muted-foreground">
          Nog geen treffers voor {edition.plaats.name}. De desk blijft afluisteren.
          Een ondernemer kan{" "}
          <Link href="/lokaal/verhaal" className="underline hover:text-accent">
            hier zijn verhaal insturen
          </Link>
          .
        </p>
      ) : null}

      {edition.verhalen.length > 0 ? (
        <div className="mt-8">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            Eigen verhalen
          </p>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            {edition.verhalen.map((story) => (
              <EntrepreneurCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      ) : null}

      {edition.gevonden.length > 0 ? (
        <div className="mt-8">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            Automatisch gevonden
          </p>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            {edition.gevonden.map((story) => (
              <FoundCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function FoundCard({ story }: { story: FoundStory }) {
  return (
    <article className="border-t border-hairline pt-4">
      <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
        {story.source} · {story.published}
      </p>
      <h3 className="mt-1 font-display text-xl font-semibold leading-tight">
        <a href={story.url} className="hover:text-accent" rel="noreferrer">
          {story.title}
        </a>
      </h3>
      <p className="mt-2 font-serif text-sm leading-relaxed text-muted-foreground">
        {story.dek}
      </p>
    </article>
  );
}

function EntrepreneurCard({ story }: { story: EntrepreneurStory }) {
  return (
    <article className="border border-foreground bg-card p-5">
      <p className="text-[11px] uppercase tracking-[0.14em] text-accent">
        Eigen verhaal · {story.company}
      </p>
      <h3 className="mt-2 font-display text-2xl font-semibold leading-tight">
        {story.title}
      </h3>
      <p className="mt-3 font-serif leading-relaxed">{story.dek}</p>
      <p className="mt-4 font-serif text-sm leading-relaxed whitespace-pre-wrap">
        {story.body}
      </p>
      <p className="mt-4 text-[12px] text-muted-foreground">
        {story.author}, {story.plaatsName}
        {story.website ? (
          <>
            {" · "}
            <a href={story.website} className="underline" rel="noreferrer">
              site
            </a>
          </>
        ) : null}
      </p>
    </article>
  );
}
