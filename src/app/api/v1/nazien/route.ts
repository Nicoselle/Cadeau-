import { augustPieceFor, buildAugustLedger } from "@/lib/as-of";
import { getArticle } from "@/lib/newspaper";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const days = buildAugustLedger().map((day) => {
    const piece = augustPieceFor(day.date);
    const article = getArticle(piece.slug);
    return {
      ...day,
      piece: {
        slug: piece.slug,
        url: `${SITE.url}${piece.href}`,
        title: article?.title ?? piece.title,
      },
    };
  });

  return Response.json({
    meta: {
      publication: SITE.name,
      pulled: "2026-08-31",
      rule: "Laatste waarneming ≤ peildatum. M2-juli alleen vanaf 2026-08-25 (H.6). Juni-revisie staat in de vintage, niet in de editievloer.",
      endpoint_version: "v1",
    },
    days,
  });
}
