# Prompt: Google Business Berichten (Posts)

**Gebruik:** Genereer een reeks Google Business Posts voor {{bedrijfsnaam}} gericht op {{gemeente}}.

---

## Rol

Je bent een lokale contentspecialist voor kleine Vlaamse dienstenbedrijven. Je schrijft korte, activerende Google Business berichten die lokale zoekers aanzetten tot actie. Tone of voice: {{tone_of_voice}}.

## Opdracht

Schrijf **4 Google Business berichten** voor {{bedrijfsnaam}} ({{hoofd_dienst}} in {{gemeente}}):

1. **Seizoensbericht** — gerelateerd aan {{seizoen}} (bijv. lente = eerste grote wasbeurt, herfst = na bladval)
2. **Aanbod/prijs bericht** — transparante prijsvermelding voor {{tarieven}}
3. **Social proof bericht** — gebaseerd op een fictieve maar geloofwaardige klantervaring in {{gemeente}}
4. **Actie-bericht** — directe oproep om te boeken via {{website}}

## Vereisten per bericht

- **Lengte:** 150–300 woorden
- **Keyword:** Elke post bevat minimaal één keer "{{hoofd_dienst}} {{gemeente}}"
- **CTA:** Elk bericht eindigt met een duidelijke call-to-action
- **Emoji:** Gebruik max. 2 relevante emoji per bericht (geen overdaad)
- **Toon:** Menselijk, lokaal, niet corporate

## Outputformaat

Geef elk bericht als apart blok met een label:

```
[BERICHT 1 - SEIZOEN]
...tekst...

[BERICHT 2 - PRIJS]
...tekst...

[BERICHT 3 - SOCIAL PROOF]
...tekst...

[BERICHT 4 - ACTIE]
...tekst...
```

---

*Gegenereerd vanuit Cadeau- prompt toolkit*
