import type { Article, BodyBlock } from "@/types/newspaper";

export function ArticleBody({ article }: { article: Article }) {
  return (
    <div className="article-prose font-serif text-[1.05rem] leading-[1.7]">
      {article.body.map((block, index) => (
        <Block key={`${block.type}-${index}`} block={block} first={index === 0} />
      ))}
    </div>
  );
}

function Block({ block, first }: { block: BodyBlock; first: boolean }) {
  if (block.type === "h2") {
    return (
      <h2 className="mb-3 mt-10 font-display text-2xl font-bold leading-tight tracking-[-0.02em]">
        {block.text}
      </h2>
    );
  }

  if (block.type === "quote") {
    return (
      <blockquote className="my-8 border-y border-foreground py-5 font-display text-2xl font-medium leading-snug text-foreground">
        {block.text}
      </blockquote>
    );
  }

  if (block.type === "note") {
    return (
      <p className="my-6 border-y border-hairline py-3 text-[0.95rem] text-muted-foreground">
        {block.text}
      </p>
    );
  }

  if (block.type === "table") {
    return (
      <figure className="my-8 overflow-x-auto">
        <table className="w-full min-w-[28rem] border-collapse text-left text-[0.92rem]">
          <thead>
            <tr className="border-y-2 border-foreground">
              {block.headers.map((header) => (
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
            {block.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-hairline">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="py-2 pr-4 align-top">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {block.caption ? (
          <figcaption className="mt-2 font-sans text-[12px] text-muted-foreground">
            {block.caption}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  const kindClass =
    block.kind === "duiding"
      ? "duiding"
      : block.kind === "raming"
        ? "duiding"
        : "";

  return (
    <p className={`${first ? "drop-cap" : ""} ${kindClass}`.trim()}>
      {block.text}
    </p>
  );
}

export function SteenmanBox({
  objection,
  antwoord,
}: {
  objection: string;
  antwoord: string;
}) {
  return (
    <aside className="mt-12 border-y-2 border-foreground py-6">
      <p className="kicker">De steenman</p>
      <h2 className="mt-2 font-display text-2xl font-bold tracking-[-0.02em]">
        De sterkste tegenwerping, eerlijk weergegeven
      </h2>
      <p className="mt-4 font-serif leading-relaxed">{objection}</p>
      <p className="mt-5 font-sans text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        Antwoord in één adem
      </p>
      <p className="mt-2 font-serif leading-relaxed">{antwoord}</p>
    </aside>
  );
}
