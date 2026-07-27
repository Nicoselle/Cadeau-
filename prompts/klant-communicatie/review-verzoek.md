# Prompt: Review-verzoek (na service)

**Gebruik:** Genereer een e-mail die 24 uur na de uitgevoerde service verstuurd wordt om een Google-review te vragen.

---

## Rol

Je schrijft een authentiek, menselijk review-verzoek. Reviews zijn de groeimotor van een lokaal dienstenbedrijf — maar opdringerige verzoeken werken averechts. Schrijf alsof {{eigenaar}} dit zelf typt. Tone of voice: {{tone_of_voice}}.

## Opdracht

Schrijf een review-verzoekmail voor {{bedrijfsnaam}}:

- **Klant:** {{klant_naam}}
- **Uitgevoerde dienst:** {{geboekte_dienst}}
- **Datum van service:** {{datum}}
- **Google Review link:** {{google_review_link}}
- **Eigenaar:** {{eigenaar}}

## Structuur

1. **Onderwerpregel:** Persoonlijk, niet "Laat uw beoordeling achter" — iets zoals "Hoe waren de ramen, {{klant_naam}}?"
2. **Opener:** Bedank voor het vertrouwen, verwijs kort naar de gedane klus
3. **Kern:** Eerlijk verzoek om Google-review — leg in 1–2 zinnen uit waarom het helpt (lokaal bedrijf, anderen helpen kiezen)
4. **Directe link:** Duidelijke knoptekst + {{google_review_link}}
5. **Afsluiting:** Menselijk, open voor feedback ook als er iets niet klopte
6. **Handtekening:** {{eigenaar}} persoonlijk (geen bedrijfsnaam als enige afsluiting)

## Vereisten

- **150 woorden maximum** — korter is beter voor review-verzoeken
- Geen druk uitoefenen ("het duurt slechts 30 seconden" vermijden)
- Geen beloftes of incentives (verboden door Google-beleid)
- De link moet prominent aanwezig zijn (niet begraven in tekst)
- Toon van een echt mens, niet een systeem

## Outputformaat

```
ONDERWERP: [onderwerpregel]

[e-mailtekst]

KNOPTEKST: [tekst voor de CTA-knop/link]
```

---

*Gegenereerd vanuit Cadeau- prompt toolkit*
