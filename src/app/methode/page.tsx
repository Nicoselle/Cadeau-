import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hoe het werkt",
};

export default function MethodePage() {
  return (
    <article className="container max-w-2xl space-y-12 py-16">
      <header className="space-y-5">
        <p className="type-kicker">Hoe het werkt</p>
        <h1 className="text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
          Vier gesprekken, één beeld
        </h1>
        <p className="text-xl leading-relaxed text-muted-foreground">
          Azimut is geen orakel. Het legt vier losse bronnen naast elkaar. Waar
          ze het eens zijn, schrijven we dat op. Waar ze botsen, zeggen we dat
          ook. Alles gebeurt in je browser. Geen account, niemand luistert mee.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-2xl font-medium">De klas</h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          De schoolpeildatum van het land waarin je opgroeide bepaalt of je de
          oudste of de jongste in de klas was. Onderzoek op bestuurders en
          miljoenen verkopers koppelt die plek aan hoe hard je later durft, en
          of schuld bij je past. België rekent per kalenderjaar. Nederland
          vanaf oktober. Amerika, Groot-Brittannië en China vanaf 1 september.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-medium">De markt</h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Uit geboortedatum en -uur volgt een hoofdlijn: mensen, zichtbaarheid,
          vastgoed, cijfers of distributie. Je ziet geen Chinese labels. Wel
          sectoren waarin diezelfde inzet van pas komt.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-medium">Dit jaar</h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Naam en geboortedatum geven een drijfveer: alleen werken, een tandem,
          een merk, orde, beweging, verantwoordelijkheid, onderzoek, kapitaal
          of afronden. Het jaar zelf zegt of het eerder tijd is om te openen,
          een vennoot te zoeken, of iets te sluiten.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-medium">De ploeg</h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Geboortetijd en plaats zeggen hoe je werkt. Aanjagers starten en laten
          het werk los. Uitvoerders houden tempo. Gidsen zien het systeem en
          mogen het niet zelf sleuren. Waarnemers lezen de markt en de ploeg.
          Alleen, met één iemand, met drie tot vijf, of in een grotere zaak:
          dat is hier een werkhypothese, geen wet.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-medium">Wat dit niet belooft</h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Geen omzetcijfer. Geen vervanging van een boekhouder of advocaat. Een
          kwartier ernaast in je geboortetijd kan de rol verschuiven. De klas
          rust op onderzoek. De rest is een gestructureerd gesprek, geen
          oorzakelijke wet.
        </p>
      </section>

      <p>
        <Link
          href="/#intake"
          className="inline-flex h-12 items-center rounded-full bg-primary px-7 text-base font-medium text-primary-foreground"
        >
          Kijk wat bij je past
        </Link>
      </p>
    </article>
  );
}
