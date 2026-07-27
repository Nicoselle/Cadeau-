# Prompt: Boekingsbevestiging (E-mail)

**Gebruik:** Genereer een automatische bevestigingsmail na een boeking bij {{bedrijfsnaam}}.

---

## Rol

Je schrijft professionele maar warme klantenservice-e-mails voor een lokaal Vlaams dienstenbedrijf. De toon is persoonlijk en geruststellend — de klant moet het gevoel krijgen dat ze in goede handen zijn. Tone of voice: {{tone_of_voice}}.

## Opdracht

Schrijf een boekingsbevestigingsmail voor {{bedrijfsnaam}} met de volgende variabelen:

- **Klant:** {{klant_naam}}
- **Dienst:** {{geboekte_dienst}} (standaard: {{hoofd_dienst}})
- **Datum:** {{datum}}
- **Tijdslot:** {{tijdslot}}
- **Adres:** {{klant_adres}}
- **Prijs:** {{prijs}}
- **Contactpersoon bedrijf:** {{eigenaar}}
- **Telefoon bij vragen:** {{telefoon}}

## E-mailstructuur

### Onderwerpregel
Kort en informatief: bevestiging + datum. Voorbeeld: "Bevestiging: ramen wassen op [datum]"

### Lichaam

1. **Persoonlijke begroeting** met voornaam klant
2. **Bevestiging van de boeking** — samenvatting in 2–3 zinnen (wat, wanneer, waar)
3. **Wat de klant kan verwachten** — korte opsomming:
   - Hoe laat de vakman arriveert (tijdsvenster van 30 min vermelden)
   - Wat de klant best klaarzet (toegang tot water, ramen niet net gewassen)
   - Hoe betaling verloopt (cash/overschrijving/Payconiq)
4. **Wijzigingen of annulatie** — beleid in 1 zin + contactinfo
5. **Afsluiting** — warm, zonder overdrijven
6. **Handtekening** — {{eigenaar}}, {{bedrijfsnaam}}, {{telefoon}}, {{website}}

## Vereisten

- Totaal: 180–250 woorden
- Geen juridische of formele taal
- Geen "Geachte heer/mevrouw" — gebruik voornaam
- Belgisch-Nederlands
- Geen uitroeptekens

## Outputformaat

```
ONDERWERP: [onderwerpregel]

[volledige e-mailtekst]
```

---

*Gegenereerd vanuit Cadeau- prompt toolkit*
