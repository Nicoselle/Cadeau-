# Grokbot — twee dagelijkse brieven, geen uitgever

Nico krijgt een **ochtendbrief om 8:00** en een **namiddagbrief om 15:00**,
Europe/Brussels. Jij zet. Jij publiceert niet. Een genummerd nummer blijft
apart, nooit automatisch.

Klok: `src/lib/desk-clock.ts`.

| Tijd (Brussel) | Wat |
|---|---|
| 8:00 | Ochtendbrief. Alleen wat ≤ 8:00 gezien is. |
| 15:00 | Namiddagbrief. Alleen wat ≤ 15:00 gezien is. Zegt of de dag een rij bijlegde. |

Geen cijfer van na het slot. Geen CMT van een dag die No Results Found
zegt. Geen volglijst of allocatie in de open brief. `/safe` blijft dicht.
Niet mergen naar `koppel-zeta`.
