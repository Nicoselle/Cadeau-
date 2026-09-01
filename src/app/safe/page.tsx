import { SAFE_CLIENT, SAFE_NAMES, SAFE_SLEEVES } from "@/data/safe-capital";
import { formatNlDate } from "@/lib/newspaper";

export const dynamic = "force-dynamic";

export default function SafeCapitalPage() {
  return (
    <div className="container py-10">
      <p className="text-[11px] uppercase tracking-[0.18em] text-accent">
        {SAFE_CLIENT.name} · achter de poort
      </p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.02em] sm:text-5xl">
        Volglijst en allocatie
      </h1>
      <p className="mt-4 max-w-2xl font-serif text-lg leading-relaxed text-muted-foreground">
        Peil {formatNlDate(SAFE_CLIENT.asOf)}, {SAFE_CLIENT.clock}. Alleen wat
        gezien is. De Amerikaanse regular session was nog dicht. Dit is de
        Otium-doctrine, geen 40/30/20/10.
      </p>
      <p className="mt-3 max-w-2xl border-y border-hairline py-3 font-serif text-sm leading-relaxed">
        {SAFE_CLIENT.disclaimer}
      </p>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold tracking-[-0.02em]">
          A–G · Investeringsmemo
        </h2>
        <p className="mt-2 max-w-2xl font-serif text-muted-foreground">
          Indicatief. Geen modelportefeuille. Mouw D staat apart van de
          portefeuille.
        </p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[32rem] border-collapse text-left text-[0.95rem]">
            <thead>
              <tr className="border-y-2 border-foreground">
                <th className="py-2 pr-4 font-sans text-[11px] font-medium uppercase tracking-[0.12em]">
                  Mouw
                </th>
                <th className="py-2 pr-4 font-sans text-[11px] font-medium uppercase tracking-[0.12em]">
                  Band
                </th>
                <th className="py-2 pr-4 font-sans text-[11px] font-medium uppercase tracking-[0.12em]">
                  Wat
                </th>
              </tr>
            </thead>
            <tbody>
              {SAFE_SLEEVES.map((sleeve) => (
                <tr key={sleeve.id} className="border-b border-hairline">
                  <td className="py-3 pr-4 align-top font-medium">
                    {sleeve.id} · {sleeve.title}
                  </td>
                  <td className="py-3 pr-4 align-top">{sleeve.range}</td>
                  <td className="py-3 pr-4 align-top font-serif">{sleeve.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold tracking-[-0.02em]">
          Volglijst
        </h2>
        <p className="mt-2 max-w-2xl font-serif text-muted-foreground">
          Geen extra product. Enige nieuwe primaire IR sinds maandagochtend:
          SEALSQ, 31 augustus. Geen live koersen vanochtend, behalve de
          Kitco-bids die ook in de open brief staan en de CNBC-quote van SpaceX
          van 31 augustus.
        </p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left text-[0.92rem]">
            <thead>
              <tr className="border-y-2 border-foreground">
                <th className="py-2 pr-4 font-sans text-[11px] font-medium uppercase tracking-[0.12em]">
                  Naam
                </th>
                <th className="py-2 pr-4 font-sans text-[11px] font-medium uppercase tracking-[0.12em]">
                  Notering
                </th>
                <th className="py-2 pr-4 font-sans text-[11px] font-medium uppercase tracking-[0.12em]">
                  Tape 1 september
                </th>
              </tr>
            </thead>
            <tbody>
              {SAFE_NAMES.map((item) => (
                <tr key={item.id} className="border-b border-hairline">
                  <td className="py-2 pr-4 align-top">
                    <span className="font-medium">{item.name}</span>
                    <span className="mt-0.5 block text-[12px] text-muted-foreground">
                      {item.note}
                    </span>
                  </td>
                  <td className="py-2 pr-4 align-top">{item.listedAs}</td>
                  <td className="py-2 pr-4 align-top font-serif">{item.tape}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
