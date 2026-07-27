# Cadeau- — Projectcontext voor Claude

## Wat is dit project?

Een toolkit van AI-prompts voor een Vlaamse "Remote Operator" glazenwas-onderneming. Het model: de eigenaar fungeert als digitale brug tussen klanten en zelfstandige onderaannemers, ondersteund door AI-geautomatiseerde marketing en administratie.

## Bedrijfscontext

- **Dienst:** Professioneel ramen wassen bij particulieren
- **Markt:** Welgestelde randgemeenten rond Antwerpen (Brasschaat, Schilde, Zoersel, ...)
- **Model:** Klant boekt online → onderaannemer voert uit → eigenaar beheert digitaal
- **Concurrentiepositie:** Betrouwbaarheid, vaste prijs, lokale verankering

## Tone of Voice (altijd toepassen)

- Belgisch-Nederlands (geen Hollandismen zoals "geweldig", "tof", "super")
- Direct en concreet — geen omhaal van woorden
- Menselijk en lokaal — geen corporate taal
- Geen superlatieven ("de beste", "de goedkoopste")
- Geen uitroeptekens

## Hoe de prompts werken

Alle promptbestanden staan in `prompts/`. Ze bevatten `{{placeholder}}`-variabelen.

Gebruik `generate.py` om een ingevulde prompt te genereren:

```bash
python generate.py prompts/google-business/profiel-beschrijving.md --gemeente Brasschaat
```

De output kopieer je naar een Claude-conversatie om de uiteindelijke content te genereren.

## Promptbibliotheek — overzicht

| Bestand | Doel |
|---|---|
| `prompts/google-business/profiel-beschrijving.md` | Google Business Profile tekst |
| `prompts/google-business/berichten.md` | Google Posts |
| `prompts/website-seo/dienstenpagina.md` | Lokale SEO-pagina per gemeente |
| `prompts/website-seo/homepage.md` | Homepage copy |
| `prompts/website-seo/meta-descriptions.md` | Meta title + description voor alle pagina's |
| `prompts/klant-communicatie/boekingsbevestiging.md` | Automatische bevestigingsmail |
| `prompts/klant-communicatie/herinnering.md` | Herinneringsmail dag voor afspraak |
| `prompts/klant-communicatie/review-verzoek.md` | Review-verzoek na service |
| `prompts/klant-communicatie/offerte.md` | Offertemail bij aanvraag |
| `prompts/social-media/facebook-post.md` | Facebook/Instagram posts |
| `prompts/social-media/voor-na.md` | Voor/na resultaat posts |

## Configuratie aanpassen

Pas `config/business.json` aan met jouw echte bedrijfsgegevens (naam, telefoonnummer, website, etc.) voordat je prompts genereert.
