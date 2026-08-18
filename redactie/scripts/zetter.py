#!/usr/bin/env python3
"""zetter.py — gereedschap van de Zetter voor de Kapitaalkrant.

Vervangt het handwerk van de eerste zeven werkrondes. Drie commando's:

    python3 scripts/zetter.py agenda [--datum JJJJ-MM-DD] [--horizon DAGEN]
        Welke reeksen zijn toe aan een check, en welke orakelboekregels vervallen binnenkort.

    python3 scripts/zetter.py jj <csv> [--kolom NAAM] [--maanden N]
        Jaar-op-jaargroei uit een opgeslagen reeks, zonder handwerk.

    python3 scripts/zetter.py dekking
        Wat ligt er in data/, en tot wanneer loopt elke reeks?

Geen netwerk: dit script rekent alleen met wat al opgehaald en opgeslagen is. Ophalen blijft
mensen- resp. botwerk, want elke ophaling hoort een bon te krijgen.
"""
import argparse, csv, datetime as dt, os, re, sys

BASIS = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(BASIS, "data")
KALENDER = os.path.join(BASIS, "voorstel-releasekalender-v2.yaml")
ORAKELBOEK = os.path.join(BASIS, "registers", "orakelboek.md")


def lees_reeks(pad, kolom=None):
    """Geeft (kolomnaam, [(datum_string, waarde_float)]) terug; lege waarden overgeslagen."""
    with open(pad, newline="", encoding="utf-8") as f:
        rijen = [r for r in csv.reader(f) if r and not r[0].startswith("#")]
    kop, *rest = rijen
    if kolom is None:
        kolom = kop[1]
    if kolom not in kop:
        raise SystemExit(f"kolom '{kolom}' niet gevonden; beschikbaar: {', '.join(kop[1:])}")
    i = kop.index(kolom)
    uit = []
    for r in rest:
        if len(r) <= i or not r[i].strip():
            continue
        try:
            uit.append((r[0], float(r[i])))
        except ValueError:
            continue
    return kolom, uit


def maandsleutel(datumstring):
    """'2026-06-01' en '2026-06' worden allebei '2026-06'."""
    return datumstring[:7]


def cmd_jj(args):
    kolom, reeks = lees_reeks(args.csv, args.kolom)
    per_maand = {}
    for d, w in reeks:
        per_maand[maandsleutel(d)] = w  # laatste waarneming van de maand wint
    maanden = sorted(per_maand)
    if not maanden:
        raise SystemExit("geen bruikbare waarnemingen")
    print(f"reeks: {os.path.basename(args.csv)} — kolom {kolom}")
    print(f"{'maand':<9} {'waarde':>10} {'j/j':>9}")
    for m in maanden[-args.maanden:]:
        jaar, mnd = m.split("-")
        vorig = f"{int(jaar)-1}-{mnd}"
        if vorig in per_maand and per_maand[vorig]:
            groei = (per_maand[m] / per_maand[vorig] - 1) * 100
            print(f"{m:<9} {per_maand[m]:>10.3f} {groei:>8.2f}%")
        else:
            print(f"{m:<9} {per_maand[m]:>10.3f} {'—':>9}")


def cmd_dekking(_args):
    if not os.path.isdir(DATA):
        raise SystemExit(f"geen datamap op {DATA}")
    print(f"{'bestand':<48} {'kolom':<18} {'laatste':<10} {'n':>5}")
    for naam in sorted(os.listdir(DATA)):
        if not naam.endswith(".csv"):
            continue
        pad = os.path.join(DATA, naam)
        try:
            kolom, reeks = lees_reeks(pad)
        except SystemExit:
            continue
        if not reeks:
            continue
        print(f"{naam:<48} {kolom[:18]:<18} {reeks[-1][0]:<10} {len(reeks):>5}")


def _datums_uit(pad, patroon):
    """Alle JJJJ-MM-DD in een bestand, met de regel waarin ze staan."""
    uit = []
    if not os.path.exists(pad):
        return uit
    with open(pad, encoding="utf-8") as f:
        for regel in f:
            for d in re.findall(patroon, regel):
                uit.append((d, regel.strip()))
    return uit


def cmd_agenda(args):
    vandaag = dt.date.fromisoformat(args.datum) if args.datum else dt.date.today()
    grens = vandaag + dt.timedelta(days=args.horizon)
    print(f"agenda vanaf {vandaag} tot {grens} ({args.horizon} dagen)\n")

    print("— reeksen die een check vragen —")
    gevonden = False
    try:
        import yaml
        with open(KALENDER, encoding="utf-8") as f:
            kal = yaml.safe_load(f)
        for reeks in kal.get("reeksen", []):
            for veld in ("volgende_publicatie", "volgende_check"):
                d = reeks.get(veld)
                if isinstance(d, dt.date) and vandaag <= d <= grens:
                    print(f"  {d}  {veld:<20} {reeks['id']}")
                    gevonden = True
    except Exception as e:  # kalender ontbreekt of is stuk: zeg dat, verzin niets
        print(f"  kalender niet leesbaar ({e})")
    if not gevonden:
        print("  niets binnen de horizon")

    print("\n— orakelboek: vervaldagen en toetsdata —")
    regels = _datums_uit(ORAKELBOEK, r"\d{4}-\d{2}-\d{2}")
    treffers = sorted({(d, r) for d, r in regels
                       if vandaag <= dt.date.fromisoformat(d) <= grens})
    if not treffers:
        print("  niets binnen de horizon")
    for d, regel in treffers:
        nummer = regel.split("|")[1].strip() if regel.startswith("|") else "?"
        print(f"  {d}  regel {nummer}")


def main():
    p = argparse.ArgumentParser(description="Gereedschap van de Zetter")
    sub = p.add_subparsers(dest="cmd", required=True)

    a = sub.add_parser("agenda", help="wat is toe aan een check")
    a.add_argument("--datum", help="peildatum JJJJ-MM-DD (standaard: vandaag)")
    a.add_argument("--horizon", type=int, default=45, help="aantal dagen vooruit")
    a.set_defaults(func=cmd_agenda)

    j = sub.add_parser("jj", help="jaar-op-jaargroei uit een opgeslagen reeks")
    j.add_argument("csv")
    j.add_argument("--kolom")
    j.add_argument("--maanden", type=int, default=13)
    j.set_defaults(func=cmd_jj)

    d = sub.add_parser("dekking", help="overzicht van de datavloer")
    d.set_defaults(func=cmd_dekking)

    args = p.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
