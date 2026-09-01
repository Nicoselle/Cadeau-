import type { Metadata } from "next";
import Link from "next/link";
import { StoryCard } from "@/components/krant/story-card";
import { articles } from "@/data/articles";
import { EDITION } from "@/data/edition";
import { formatNlDate } from "@/lib/newspaper";

export const metadata: Metadata = {
  title: "Archief",
  description: "Alle edities en stukken van de Kapitaalkrant.",
};

export default function ArchivePage() {
  return (
    <div className="container py-10">
      <p className="text-[11px] uppercase tracking-[0.18em] text-accent">
        Archief
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
        Edities
      </h1>

      <section
        id={`editie-${EDITION.number}`}
        className="mt-10 border-t-2 border-foreground pt-8"
      >
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          {EDITION.folio} · {formatNlDate(EDITION.date)}
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold">
          {EDITION.name}
        </h2>
        <p className="mt-3 max-w-2xl font-serif text-muted-foreground">
          {EDITION.note}
        </p>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {articles.map((article) => (
            <StoryCard key={article.slug} article={article} />
          ))}
        </div>
        <p className="mt-8 text-sm">
          <Link href="/api/v1/krant" className="underline hover:text-accent">
            Deze editie als JSON
          </Link>
        </p>
      </section>
    </div>
  );
}
