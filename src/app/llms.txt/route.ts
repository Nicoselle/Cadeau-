import { NextResponse } from "next/server";
import { SITE } from "@/lib/site";

export function GET() {
  const body = `# ${SITE.name}

${SITE.description}

## Pages
- ${SITE.url}/
- ${SITE.url}/methode
- ${SITE.url}/briefing (session-only; not crawlable)

## API
POST ${SITE.url}/api/v1/briefing
JSON: { fullName, birthDate, birthTime, cityId, country, companyFoundedOn? }

Bronnen: klaspositie, sector, drijfveer, organisatie. Output: een zakelijk dossier in het Nederlands.
`;
  return new NextResponse(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
