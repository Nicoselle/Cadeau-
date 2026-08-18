# Bronnenstaat, aanvulling — Yahoo Finance getoetst (2026-08-18)

Op verzoek van Nico. Vooraf de aantekening uit mijn rolprompt: *"Yahoo-CSV zit achter een
betaalmuur; leun daar niet op."* Ik heb de bron daarom niet overgeslagen maar getoetst zoals
elke andere — meerdere routes, en hieronder staat letterlijk wat er gebeurde. **Ik heb niets
gekocht, geen account gemaakt en geen abonnement genomen**; waar een betaalmuur staat, staat
in dit rapport "dood".

## De toets, route voor route

| Route | Uitkomst | Bon |
|---|---|---|
| Direct, alle drie de Yahoo-hosts | **dood** — HTTP 000, proxy-gateway weigert met 403 | proxystatuslog 2026-08-18T08:22:13–14Z, hosts `query1.finance.yahoo.com:443` en `finance.yahoo.com:443` |
| Quotepagina `finance.yahoo.com/quote/^GSPC` (indirect) | **WERKT** — volledige koersgegevens | opgehaald 2026-08-18 ±08:24Z |
| Chart-API `query1…/v8/finance/chart/^GSPC` (indirect) | dood — content-type geweigerd | idem |
| Download-CSV `query1…/v7/finance/download/^GSPC` (indirect) | dood — timeout | idem |

**De rolprompt heeft gelijk over de CSV.** De machineleesbare routes — juist de routes die je
zou willen — geven niets. Wat wél binnenkomt is de gewone quotepagina.

## Wat de quotepagina oplevert (feiten, stand 17-08-2026 slot)

S&P 500 **7.745,06** (−40,70; −0,52%), dagbereik 7.744,88–7.790,68, volume 2.506.498.000,
52-weeksbereik 6.316,91–7.816,70. Plus een hele reeks andere indices in één keer, waaronder:
VIX 15,94 (+4,94%); dertigjaarsrente ^TYX 5,31%; Nasdaq 26.644,91; Dow 53.459,78;
Nikkei 67.460,73 (−2,54%); DAX 26.179,37; CAC 40 8.531,19; EURO STOXX 50 6.486,84;
**BEL 20 5.736,10** (−0,46%); Hang Seng 25.491,41; FTSE 100 10.723,66.

## De kruiscontrole — en de eigenlijke vondst

Ik heb het S&P-cijfer tegen een onafhankelijke bron gelegd: FRED heeft de reeks `SP500`. Stand
17-08-2026: **7.745,06 — identiek**. Yahoo's cijfer klopt dus.

Maar daarmee kwam de belangrijkere vondst: **FRED levert dezelfde marktdata wél machineleesbaar,
met bon.** Opgehaald en opgeslagen (±08:26Z): `SP500` (S&P 500 dagelijks), `DGS30`
(dertigjaarsrente), `VIXCLS` (VIX). Dat vult precies het gat dat het dode Stooq achterliet — tot
nu toe had de datavloer géén marktdata, alleen macro.

Eén verschil in het voordeel van Yahoo: **versheid.** De quotepagina gaf 17 augustus; de
FRED-reeksen liepen tot 14 augustus (DGS30, VIXCLS t/m 13-08) — twee tot vier dagen achter. Voor
een stuk dat op een dagkoers steunt is dat het overwegen waard.

## Aanbeveling voor de bronnenladder

1. **FRED blijft de hoofdroute voor marktreeksen** — machineleesbaar, reproduceerbaar, bon per
   ophaling. Neem `SP500`, `DGS30`, `VIXCLS` op in de kalender.
2. **Yahoo-quotepagina als aanvulling**, voor twee dingen: een versheidscheck op de laatste een
   à twee dagen, en indices die FRED niet voert — met name de **BEL 20**, wat voor een Belgische
   publicatie niet niks is.
3. **Yahoo-CSV en chart-API blijven als dood gemarkeerd.** De rolpromptregel blijft dus staan,
   alleen preciezer: niet "Yahoo is onbruikbaar", maar "Yahoo's machineleesbare routes zijn
   dood; de quotepagina niet".
4. Op te nemen bij de volgende kalenderrevisie (v3); v2 blijft ongewijzigd tot dan.

## Bijvangst voor het lopende renteverhaal (feiten + één vermoeden)

De dertigjaarsrente staat op **5,25%** (14-08) tegenover een beleidsrente van 3,63%: een spread
van **+1,62 procentpunt**, waar de tienjaars +1,06 pp doet. Yahoo's ^TYX van 17-08 (5,31%) ligt
daar nog 6 basispunten boven — andere dag, dus geen tegenspraak, wel dezelfde richting.
*Vermoeden:* dat de spread aan de dertigjaars nog ruimer is dan aan de tienjaars past bij de
fiscale lezing uit `meetnotitie-2026-08-17-lange-rente.md` — hoe langer de looptijd, hoe meer
premie geëist wordt — maar één waarneming beslecht die twee lezingen niet. Ik verleng de meting
bij de wekkerronde van 26 augustus en houd orakelboek-regel 7 ongewijzigd.

Terzijde, ook een feit: de VIX stond op 14,55–15,94 en de S&P binnen 1% van zijn 52-weekstop,
terwijl de lange rente stijgt. Aandelen prijzen op dit moment geen enkele zorg in die de
obligatiemarkt wél lijkt te prijzen. Dat is een spanning om in de gaten te houden, geen conclusie.

## Kosten deze ronde
Geschat €0,10–€0,15 (1 directe test + 2 batchfetches). Schatting, geen meting. Uitgaven: **geen**.
