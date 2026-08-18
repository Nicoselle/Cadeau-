# Meetrapport — de spilindex gevonden (2026-08-17, derde werkronde)

Vervolg op `meetrapport-2026-08-17-belgische-poot.md`. Doel: de spilindexdrempel die in de
bestat-view ontbrak, zodat de indexeringsduiding een harde waarde krijgt.

## Zoekpad
1. De bestat-catalogus (487 views, al op schijf uit ronde 2) doorzocht op spilindex/pivot/
   overschrijding: **nul treffers**. Statbel publiceert de spilindex niet als view; het is het
   domein van het **Federaal Planbureau** (plan.be) — een bron búiten de huidige vijfkoppige
   ladder. Voorstel: plan.be aan de bronnenladder toevoegen (officiële federale instelling,
   maandelijkse vaste publicatie).
2. Webzoektocht (±21:20Z) leverde de Planbureau-pagina "Indexcijfer der consumptieprijzen –
   Inflatievooruitzichten" op, in twee vintages; directe fetch van
   `plan.be/nl/data/indexcijfer-der-consumptieprijzen` (±21:25Z) leverde de vintage van
   02/06/2026. De zoekindex toonde ook de vintage van 07/07/2026 met identieke
   spilindex-conclusies. *(Vermoeden: de crawler-cache serveert de oudere pagina; de
   07/07-inhoud kwam via het zoekresultaat binnen.)*

## De cijfers (bron: Federaal Planbureau, vintages 02/06/2026 en 07/07/2026)

| Grootheid | Waarde |
|---|---|
| Spilindex (basisjaar 2025) | **100,28** |
| Overschrijding | **juni 2026** (Planbureau-raming in beide vintages) |
| Indexering sociale uitkeringen + overheidswedden | **september 2026, +2%** |
| Modaliteit | **'centenindex'**: 2% alleen op de schijf tot €2.000 bruto/maand (uitkeringen) resp. €4.000 (wedden) |
| Wachttijd overschrijding → indexering | 3 maanden (regel sinds 01-07-2025, Programmawet 18-07-2025) |
| Volgende spilindexen | 102,29 (verwacht: december 2026) en 104,34 (verwacht: oktober 2027) |
| Inflatieraming Planbureau | gemiddeld 3,4% in 2026; 2,9% in 2027 |
| Energiehypothese | Brent gemiddeld $93/vat in 2026 (termijnmarkt 25-05-2026) |

## Toetsing tegen eigen data — de overschrijding is een FEIT, geen raming meer
Uit `data/statbel_cpi_gezondheidsindex_2025-07_2026-07.csv` (Statbel, opgehaald ronde 2):
afgevlakte gezondheidsindex **juni 2026 = 100,37** en **juli 2026 = 100,77** — beide boven de
drempel van 100,28. De juni-overschrijding die het Planbureau raamde, is in de gerealiseerde
Statbel-cijfers dus bevestigd. Kanttekening bij de ramingskwaliteit: het Planbureau voorzag
(vintage 02/06) voor juni 100,48 en juli 100,94; gerealiseerd werd 100,37 en 100,77 — de
richting klopte, het tempo was iets overschat. *(Feit: beide reeksen; duiding "iets overschat"
is mijn lezing.)*

## Bonnen
- ±21:20Z — Exa-zoekopdracht; treffer `plan.be/nl/data/indexcijfer-der-consumptieprijzen`
  [07/07/2026] en `plan.be/databases/17-nl-...` (oudere vintage, maart/april: toen nog "juli
  2026" als verwachte overschrijding — sindsdien vervroegd naar juni).
- ±21:20Z — controleberichten derden: VRT NWS 05-05-2026, Partena 21-05-2026 en 30-03-2026,
  CLB Group 07-05-2026 — alle consistent met de Planbureau-lezing.
- ±21:25Z — directe fetch `plan.be/nl/data/indexcijfer-der-consumptieprijzen` (vintage
  02/06/2026): volledige spilindex-sectie en vooruitzichtentabel t/m dec 2027.

## Kosten deze stap
Geschat €0,05–€0,10 (1 zoekopdracht + 1 fetch). Schatting, geen meting.
