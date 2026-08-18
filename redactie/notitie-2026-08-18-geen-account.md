# Notitie — waarom ik geen account aanmaak, en waarom het niet nodig is (2026-08-18)

Nico vroeg of ik een gratis account kan aanmaken (Yahoo Finance). Antwoord: nee — en het zou
ons niets opleveren. Beide delen hieronder, met bonnen.

## 1. Waarom ik het niet doe

Mijn opdracht zet accounts op de harde-nee-lijst: *"Je geeft geen geld uit en gaat geen
verbintenis aan: niets kopen, geen account, geen abonnement, geen bestelling."* Dat is niet
alleen een formaliteit; er zitten drie praktische redenen achter die ook met jouw toestemming
blijven gelden:

- **Een account vraagt een identiteit.** Het enige e-mailadres dat ik heb is dat van jou. Een
  registratie zou dus op jouw naam staan en jouw persoonsgegevens bij een externe dienst
  neerleggen — dat is jouw beslissing, niet de mijne.
- **Voorwaarden aanvaarden is een verbintenis.** Ook een gratis account bindt de houder aan
  gebruiksvoorwaarden. Dat aangaan namens jou is precies het soort naar-buiten-gerichte,
  moeilijk terug te draaien handeling die ik aan jou laat.
- **Technisch kan het hier ook niet.** Yahoo is vanaf deze omgeving direct onbereikbaar
  (proxy 403, gemeten 2026-08-18 08:22Z); registratie vraagt een interactieve browserflow met
  CAPTCHA en verificatie, en die route heb ik niet.

Wil je het toch, dan is de nette volgorde: jij maakt het account, en geeft mij desgewenst
alleen wat nodig is. Sleutels of wachtwoorden komen dan **niet** in de repository — die hoort
in de omgeving thuis, niet in de code.

## 2. Waarom het niet nodig is — een gratis account lost dit niet op

Uitgezocht op 2026-08-18 ±08:45Z:

- **Yahoo's eigen helppagina** (`help.yahoo.com/kb/SLN2311.html`) is expliciet: *"Downloading
  historical data is available with a Yahoo Finance Gold subscription."* De CSV-download zit dus
  niet achter een gratis registratie maar achter een **betaald** abonnement. Een gratis account
  geeft ons die reeksen niet. Dit bevestigt de waarschuwing in mijn rolprompt.
- **De v7-download-API is bovendien afgeschreven** en geeft 401/Unauthorized; ontwikkelaars van
  de bekende bibliotheken zijn er jaren geleden van afgestapt (bonnen: issues bij
  `karlwancl/YahooFinanceApi` en `gadicc/yahoo-finance2`).
- **De v8-chart-API vraagt juist géén account.** Die werkt zonder cookie of crumb-authenticatie
  (bevestigd in dezelfde bronnen, en beschreven als de route die de website zelf gebruikt). Toen
  ik hem gisteren probeerde, faalde hij op de content-type-afhandeling van mijn indirecte route —
  **niet op authenticatie**. Anders gezegd: wat mij tegenhoudt is het netwerkbeleid van deze
  omgeving, niet een ontbrekend account.

## 3. Wat het wél oplost

De echte oplossing is de aanvraag die hier al twee keer eerder stond: **zet de brondomeinen op
de toelatingslijst van de omgeving.** Doe je dat, dan werkt de v8-chart-API gratis en zonder
account, naast de vijf ladderbronnen die nu allemaal direct geblokkeerd zijn.

En voor de kortere termijn: het gat is al gedicht. FRED levert de marktdata die we nodig hadden
machineleesbaar en gratis — `SP500`, `DGS30` en `VIXCLS` liggen sinds gisteren in `data/`, en
FRED's S&P-cijfer voor 17-08 was exact gelijk aan dat van Yahoo. Wat FRED niet voert is de
BEL 20; daarvoor blijft de Yahoo-quotepagina bruikbaar, en die vraagt geen account.

*(Terzijde, ter volledigheid: er bestaan gratis alternatieven met eigen sleutel — Alpha Vantage
25 verzoeken per dag, Twelve Data 800, Finnhub 60 per minuut. Allemaal vragen ze registratie, en
dus geldt punt 1. Ik noem ze zodat jij de keuze hebt, ik zet zelf geen stap.)*

## Aanbeveling
Geen account. Wel: netwerkbeleid verruimen. Als je toch een sleutel wilt bij een van de gratis
diensten, maak jij hem aan en zet hem als omgevingsvariabele klaar — dan gebruik ik hem.
