# Azimut — zakelijk kompas voor ondernemers

Azimut is geen horoscoop-app. Het is een briefing-engine die vier onafhankelijke
datalagen weegt tot één operationele bedrijfsblauwdruk: **welk soort bedrijf**
je bouwt, **in welke sector**, **op welke schaal**, **met welk risicoprofiel**,
en **wie je als eerste aanneemt**.

Doelgroep: mannelijke founders, executives en operators. De interface is
bewust fintech, niet esoterisch. Geen paars, geen planeetjargon, geen
daghoroscoop.

## De vier lagen

| Laag | Variabele | Business-output |
|---|---|---|
| Relative Age Effect | schoolcohort × geboortemaand | risico, schuld, leiderschapsbias |
| BaZi (Vier Pilaren) | dominant / ontbrekend element | industriesector |
| Numerologie | levenspad, expressie, jaar 1–9 | missie en timing |
| Human Design / BG5 | type, autoriteit, poorten | rol, besluitvorming, teamgaten |

Wanneer lagen conflicteren, toont Azimut een **paradox** (bijvoorbeeld: breed
publiek + solitaire operatie) in plaats van die weg te middelen.

## Tech-stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind** dark executive UI
- **astronomy-engine** voor tropische posities en de 88°-designboog
- Deterministische synthese — geen LLM in de MVP, wel een API-hook voor later
- **Vitest** + GitHub Actions

## Ontwikkelen

```bash
npm install
npm run dev          # http://localhost:3000
npm test
npm run typecheck
npm run lint
npm run build
```

## API

```http
POST /api/v1/briefing
Content-Type: application/json

{
  "fullName": "Pieter Vandenberghe",
  "birthDate": "1988-06-20",
  "birthTime": "08:15",
  "cityId": "antwerpen",
  "country": "BE"
}
```

`country` bepaalt de schoolpeildatum (BE = 1 januari, NL = 1 oktober, US/UK/CN = 1 september).

## Wat expres nog niet in de MVP zit

- Swiss Ephemeris + Nominatim + volledige historische DST
- Gelicentieerde BG5 Penta / OC16-engine
- Auth, paywall, team-synastrie
- LLM-herschrijving van het proza

Zie `docs/architectuur.md`, `docs/monetisatie.md` en `docs/vlaams-ecosysteem.md`.

## Disclaimer

Beslissingsondersteuning. Geen financieel, juridisch of medisch advies. De
RAE-laag is empirisch. BaZi, numerologie en BG5 zijn gestructureerde
heuristieken.
