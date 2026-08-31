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
    `- Archief van alle edities: ${SITE.url}/api/v1/archief`,
    `- Nummer in het archief: ${SITE.url}/api/v1/archief/1`,
    `- Nazien augustus: ${SITE.url}/api/v1/nazien`,
    `- Redactiebriefing (14:00-beslissing): ${SITE.url}/api/v1/briefing`,
    `- Stukken: ${SITE.url}/api/v1/stukken`,
    `- Markten: ${SITE.url}/api/v1/markten`,
    `- Volglijst (openbare notering): ${SITE.url}/api/v1/volgen`,
    `- Onderzoek (cijfers die titels raken): ${SITE.url}/api/v1/onderzoek`,
    `- Koerslezingen: ${SITE.url}/api/v1/smc`,
    `- Lokaal (vraaggestuurd, andere uitgave): ${SITE.url}/api/v1/lokaal?plaatsen=gent`,
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
    `- Nazien (augustus 2026, dag voor dag): ${SITE.url}/nazien`,
    `- Briefing: ${SITE.url}/briefing`,
    `- Archief: ${SITE.url}/archief`,
    `- Nummer 1: ${SITE.url}/archief/1`,
    `- Nummer 2: ${SITE.url}/archief/2`,
    `- Piramide (allocatie, dossiers, SMC): ${SITE.url}/piramide`,
    `- Dossierdiepte: ${SITE.url}/onderzoek/[slug]`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
