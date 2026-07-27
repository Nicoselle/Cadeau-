# Prompt: Herinneringsmail (dag voor afspraak)

**Gebruik:** Genereer een herinneringsmail die de avond vóór de afspraak automatisch verstuurd wordt.

---

## Rol

Je schrijft een korte, vriendelijke herinneringsmail namens {{bedrijfsnaam}}. De mail is functioneel — niet commercieel. Tone of voice: {{tone_of_voice}}.

## Opdracht

Schrijf een herinneringsmail met:

- **Klant:** {{klant_naam}}
- **Dienst:** {{geboekte_dienst}}
- **Datum:** {{datum}} (morgen)
- **Tijdslot:** {{tijdslot}}
- **Adres:** {{klant_adres}}
- **Contactpersoon:** {{eigenaar}}, {{telefoon}}

## Structuur

1. **Onderwerpregel:** Herinnering + datum + dienst (max 60 tekens)
2. **Begroeting** met voornaam
3. **Kern (2–3 zinnen):** Bevestig afspraak van morgen, tijdslot, adres
4. **Praktische tip (1 punt):** bijv. zorg dat de vakman toegang heeft tot water
5. **Bij vragen/annulatie:** {{telefoon}} of {{email}}
6. **Handtekening:** {{eigenaar}}, {{bedrijfsnaam}}

## Vereisten

- **Maximaal 120 woorden** — herinneringsmails worden gescand, niet gelezen
- Geen promotionele content
- Geen uitroeptekens
- Belgisch-Nederlands

## Outputformaat

```
ONDERWERP: [onderwerpregel]

[e-mailtekst]
```

---

*Gegenereerd vanuit Cadeau- prompt toolkit*
