import type { Metadata } from "next";
import Link from "next/link";
import { StoryCard } from "@/components/krant/story-card";
import { EDITIONS } from "@/data/edition";
import { articlesByEdition, formatNlDate } from "@/lib/newspaper";

export const metadata: Metadata = {
  title: "Archief",
  description: "Alle edities en stukken van de Kapitaalkrant.",
};

export default function ArchivePage() {
  const editions = [...EDITIONS].reverse();

  return (
    <div className="container py-10">
      <p className="kicker">
        Archief
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-[-0.025em] sm:text-5xl">
        Edities
      </h1>

      {editions.map((edition) => {
        const pieces = articlesByEdition(edition.number);
        return (
          <section
            key={edition.number}
            id={`editie-${edition.number}`}
            className="mt-10 border-t border-foreground pt-8"
          >
            <p className="kicker text-muted-foreground">
              {edition.folio} · {formatNlDate(edition.date)}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-[-0.02em]">
              {edition.name}
            </h2>
            <p className="mt-3 max-w-2xl font-serif text-muted-foreground">
              {edition.note}
            </p>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {pieces.map((article) => (
                <StoryCard key={article.slug} article={article} />
              ))}
            </div>
            {edition.number === editions[0]?.number ? (
              <p className="mt-8 text-sm">
                <Link href="/api/v1/krant" className="underline hover:text-accent">
                  Deze editie als JSON
                </Link>
              </p>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
