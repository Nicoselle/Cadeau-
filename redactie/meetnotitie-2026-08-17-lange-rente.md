# Meetnotitie — de lange rente wil niet mee (2026-08-17, vierde werkronde)

Aanvulling op de datavloer met twee Amerikaanse dagreeksen (bonnen: FRED, opgehaald
2026-08-17 ±21:40Z; volledige reeksen in `data/`):

- `DGS10` — tienjaars staatsrente, t/m 06-08-2026 (laatste waarde in de opgehaalde reeks);
- `T10YIE` — tienjaars breakeven-inflatieverwachting, t/m 17-08-2026.

## Wat de cijfers zeggen (feiten)

| Moment | Beleidsrente (DFF) | Tienjaarsrente (DGS10) | Spread |
|---|---|---|---|
| 17-09-2025 (vooravond eerste verlaging) | 4,33% | 4,06% | −0,27 pp |
| 31-12-2025 | 3,64% | 4,18% | +0,54 pp |
| 06-08-2026 | 3,63% | 4,69% | **+1,06 pp** |

Sinds de Fed begon te verlagen is de beleidsrente ~70 basispunten gedaald en de
tienjaarsrente ~63 basispunten gestégen (piek 4,75% op 31-07-2026). De
breakeven-inflatieverwachting bleef daarbij opvallend vlak: 2,2–2,5% over de hele periode,
laatste stand 2,28% — terwijl de gemeten CPI-inflatie 3,3% bedraagt.

## Betekenis (vermoedens, twee lezingen — nog niet beslecht)

1. **Fiscale lezing (Oostenrijks congeniaal):** de lange kant van de markt weigert de
   verlaging te volgen en eist een hogere termijnpremie — wie de staat tien jaar financiert
   bij deze tekorten en deze geldgroei, wil er meer voor betaald worden. Het gat tussen
   breakeven (2,3%) en gemeten inflatie (3,3%) betekent dan niet dat de markt de inflatie
   laag acht, maar dat de reële component van de lange rente stijgt.
2. **Disinflatielezing (steenman):** de markt gelooft oprecht dat de inflatie terugvalt
   richting 2–2,5% (zoals ook het Planbureau voor België 2027 raamt) en de stijging van de
   lange rente weerspiegelt reële groei- of aanbodfactoren, geen wantrouwen.

Toetsbaar verschil: in lezing 1 blijft de spread beleidsrente–tienjaars oplopen zolang de
Fed verlaagt; in lezing 2 topt hij af zodra de inflatiecijfers dalen. Kandidaat voor een
orakelboek-regel zodra hier een stuk op wordt gebouwd; nu nog niet vastgelegd, eerst een
maand extra data.

## NBB — derde poging, derde nee
Twee API-gokken (`stat.nbb.be/RestSDMX/...` en `dataexplorer.nbb.be/api/v1/dataflow/all`,
±21:40Z): onbekende fout resp. 404. De NBB blijft over geen enkele route bereikbaar; staat
zo in de kalender onder `dode_routes`.

## Kosten deze ronde
Geschat €0,10–€0,15 (1 batchfetch van 4 URL's + verwerking). Schatting, geen meting.
