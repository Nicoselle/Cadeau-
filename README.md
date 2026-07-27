# Cadeau- — AI Prompt Toolkit voor Vlaamse Home Services

Een herbruikbare bibliotheek van Claude-prompts voor een glazenwas-onderneming in Vlaanderen. Genereert lokale SEO-content, klantcommunicatie en social media posts — volledig aangepast aan de Belgische markt en Vlaamse tone of voice.

## Snelstart

**1. Configureer je bedrijfsgegevens**

Pas `config/business.json` aan met jouw naam, gemeente, tarieven en contactgegevens.

**2. Genereer een prompt**

```bash
python generate.py prompts/google-business/profiel-beschrijving.md --gemeente Brasschaat
```

**3. Kopieer de output naar Claude**

Plak de gegenereerde tekst in een nieuw Claude-gesprek. Claude genereert dan de uiteindelijke content.

## Projectstructuur

```
Cadeau-/
├── config/
│   └── business.json              # Jouw bedrijfsgegevens (hier aanpassen)
├── prompts/
│   ├── google-business/           # Google Business Profile
│   ├── website-seo/               # SEO-pagina's en meta-tags
│   ├── klant-communicatie/        # E-mails (bevestiging, offerte, reviews)
│   └── social-media/              # Facebook & Instagram posts
├── output/                        # Sla gegenereerde content hier op
├── generate.py                    # Placeholder-invuller
├── CLAUDE.md                      # Persistente context voor Claude
└── README.md                      # Dit bestand
```

## Extra variabelen meegeven

Naast de waarden in `business.json` kun je extra variabelen toevoegen via `--key waarde`:

```bash
# Seizoen meegeven voor een Google post
python generate.py prompts/google-business/berichten.md --gemeente Schilde --seizoen herfst

# Klantgegevens voor een bevestigingsmail
python generate.py prompts/klant-communicatie/boekingsbevestiging.md \
  --klant_naam "Katrien" \
  --datum "donderdag 31 juli" \
  --tijdslot "09:00–11:00" \
  --klant_adres "Bredabaan 45, Brasschaat" \
  --prijs "€75"

# Offertemail
python generate.py prompts/klant-communicatie/offerte.md \
  --klant_naam "Marc" \
  --aangevraagde_dienst "ramen wassen + serre" \
  --klant_adres "Zilverstraat 12, Schilde" \
  --prijs_schatting "€95" \
  --datum_voorstel "vrijdag 1 augustus of maandag 4 augustus"
```

## Vereisten

- Python 3.8 of hoger
- Geen externe libraries nodig

## Workflow Remote Operator

```
Klant zoekt "glazenwasser Brasschaat" op Google
        ↓
Vindt jouw Google Business + website (gebouwd met deze prompts)
        ↓
Boekt online → automatische bevestigingsmail (prompt: boekingsbevestiging)
        ↓
Dag voor afspraak → herinneringsmail (prompt: herinnering)
        ↓
Na service → review-verzoek (prompt: review-verzoek)
        ↓
Reviews versterken Google-ranking → cyclus herhaalt
```
