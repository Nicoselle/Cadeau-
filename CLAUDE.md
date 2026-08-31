# CLAUDE.md — Azimut

## Project

**Azimut** is een datagedreven briefing-app voor mannelijke ondernemers.
Repository: `Cadeau-` (Nicoselle). Feature branches: `claude/<omschrijving>-<id>`
of `cursor/<omschrijving>-<id>`.

Het product weegt vier lagen tot één bedrijfsadvies: RAE, BaZi, numerologie,
Human Design/BG5. De UI spreekt directeurstaal. Geen esoterisch jargon in
gebruikersoutput.

De map `redactie/` is een apart Kapitaalkrant-archief. Niet vermengen met Azimut.

## Structuur

```
src/
  app/                 # /, /briefing, /methode, /api/v1/briefing
  components/          # intake, briefing, chrome
  lib/engines/         # rae, bazi, numerology, humandesign, synthesis
  lib/cities.ts        # geocodes + DST-regels
  types/briefing.ts
tests/                 # vitest, spiegelt de engines
docs/                  # architectuur, monetisatie, VLAIO
redactie/              # Kapitaalkrant — buiten scope
```

## Conventies

- Conventional Commits (`feat`, `fix`, `docs`, `test`, `chore`)
- TypeScript strict, geen secrets in git
- Synthese blijft deterministisch en unit-testbaar
- UI: dark mode, Inter, neon-blauw accent, geen paars/goud/sterren
- Wijzig geen `redactie/`-bestanden tenzij dat de taak is

## Commands

```bash
npm run dev
npm test
npm run typecheck
npm run lint
npm run build
```

## Engines

Nieuwe businessregels horen in `src/lib/engines/synthesis.ts` of in de
verantwoordelijke laag — niet in React-componenten. `generateBriefing()` is de
enige orkestrator.

HD-type en autoriteit komen uit kanalen (`humandesign-data.ts`). Wijzig het
Rave-wiel of de channellijst alleen met een testdekking.

## Omgeving

```bash
# .env.example
# NEXT_PUBLIC_SITE_URL=https://azimut.example.com
```

Geen API-keys nodig voor de MVP.

## Roadmap-grenzen

Niet in deze codebase stoppen zonder expliciete opdracht: paywall, auth,
externe astrologie-API's, Swiss Ephemeris, LLM-proza, team-synastrie.
