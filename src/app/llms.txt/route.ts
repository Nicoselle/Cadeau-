import { articles } from "@/data/articles";
import { EDITION } from "@/data/edition";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    `${EDITION.folio} — ${EDITION.name}. Peil ${EDITION.asOf}.`,
    "Geen beleggingsadvies. Cijfers met bon; duiding is gemarkeerd.",
    "",
    "## API",
    `- Huidige editie: ${SITE.url}/api/v1/krant`,
    `- Stukken: ${SITE.url}/api/v1/stukken`,
    `- Markten: ${SITE.url}/api/v1/markten`,
    `- Lokaal (vraaggestuurd): ${SITE.url}/api/v1/lokaal?plaatsen=gent`,
    `- Volglijst (publieke tape): ${SITE.url}/api/v1/volgen`,
    `- Onderzoek (macro die assets raakt): ${SITE.url}/api/v1/onderzoek`,
    `- Noodvoedsel-directory (zuster): ${SITE.url}/api/v1/products`,
    "",
    "## Stukken",
    ...articles.map(
      (article) =>
        `- [${article.title}](${SITE.url}/stuk/${article.slug}) — ${article.desk}, ${article.published}`,
    ),
    "",
    "## Rubrieken",
    `- Voorpagina: ${SITE.url}/`,
    `- Markten: ${SITE.url}/markten`,
    `- Orakelboek: ${SITE.url}/orakelboek`,
    `- Methode: ${SITE.url}/methode`,
    `- Archief: ${SITE.url}/archief`,
    `- Piramide / volglijst: ${SITE.url}/piramide`,
    `- Onderzoek: ${SITE.url}/onderzoek`,
    `- Lokaal: ${SITE.url}/lokaal`,
    `- Ondernemersverhaal: ${SITE.url}/lokaal/verhaal`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
