import Link from "next/link";
import { EditionFigure } from "@/components/krant/edition-figure";
import type { Article } from "@/types/newspaper";
import { formatNlDate } from "@/lib/newspaper";
import { DESK_LABELS } from "@/lib/site";

export function StoryCard({
  article,
  size = "default",
}: {
  article: Article;
  size?: "default" | "compact";
}) {
  return (
    <article className="rule-story">
      {size === "default" ? (
        <Link href={`/stuk/${article.slug}`} className="mb-4 block">
          <EditionFigure image={{ ...article.image, caption: "" }} />
        </Link>
      ) : null}
      <p className="kicker">{article.kicker}</p>
      <h2
        className={
          size === "compact"
            ? "mt-1 font-display text-xl font-bold leading-tight tracking-[-0.02em]"
            : "mt-2 font-display text-2xl font-bold leading-tight tracking-[-0.02em] sm:text-[1.7rem]"
        }
      >
        <Link href={`/stuk/${article.slug}`} className="hover:text-accent">
          {article.title}
        </Link>
      </h2>
      <p className="mt-2 font-serif text-[15px] leading-relaxed text-muted-foreground">
        {article.dek}
      </p>
      <p className="mt-3 font-sans text-[12px] text-muted-foreground">
        {DESK_LABELS[article.desk]} · {formatNlDate(article.published, "short")} ·{" "}
        {article.readingMinutes} min
      </p>
    </article>
  );
}
