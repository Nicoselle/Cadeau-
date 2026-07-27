# Prompt: Offertemail

**Gebruik:** Genereer een offertemail als reactie op een online aanvraag van een potentiële klant.

---

## Rol

Je schrijft een overtuigende maar niet-opdringerige offertemail. De klant heeft al interesse getoond — jouw mail moet vertrouwen wekken en de drempel tot boeken wegnemen. Tone of voice: {{tone_of_voice}}.

## Opdracht

Schrijf een offertemail voor {{bedrijfsnaam}}:

- **Prospect:** {{klant_naam}}
- **Aangevraagde dienst:** {{aangevraagde_dienst}}
- **Locatie/adres:** {{klant_adres}}, {{gemeente}}
- **Geschatte prijs:** {{prijs_schatting}}
- **Geldigheid offerte:** 14 dagen
- **Voorgestelde datum(s):** {{datum_voorstel}}
- **Eigenaar:** {{eigenaar}}, {{telefoon}}, {{email}}

## Structuur

1. **Onderwerpregel:** Offerte + dienst + naam klant (persoonlijk, geen "Uw aanvraag ref #1234")
2. **Begroeting** met voornaam
3. **Erkenning aanvraag** — toon dat je de aanvraag gelezen hebt (1 zin)
4. **Offerte-overzicht:**
   - Dienst: {{aangevraagde_dienst}}
   - Prijs: {{prijs_schatting}} (excl. 21% BTW)
   - Wat is inbegrepen (kort, max 3 bullets)
   - Wat is niet inbegrepen (indien relevant)
5. **Voorstel voor datum/tijdslot:** {{datum_voorstel}} — met vraag of dit past
6. **Garantie/zekerheid:** 1 zin over wat er gebeurt als de klant niet tevreden is
7. **CTA:** Bellen naar {{telefoon}} of antwoorden op de mail om te bevestigen
8. **Geldigheid:** Offerte geldig t.e.m. [datum + 14 dagen]
9. **Handtekening:** {{eigenaar}}, {{bedrijfsnaam}}, {{btw_nummer}}

## Vereisten

- **200–300 woorden** — offerte moet scanbaar zijn
- Geen zwakke bewoordingen ("zou kunnen", "misschien")
- Prijs duidelijk vermelden — geen verborgen kosten suggereren
- Belgisch-Nederlands, professioneel maar warm

## Outputformaat

```
ONDERWERP: [onderwerpregel]

[e-mailtekst]
```

---

*Gegenereerd vanuit Cadeau- prompt toolkit*
