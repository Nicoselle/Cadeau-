import { IntakeForm } from "@/components/intake-form";
import { SITE } from "@/lib/site";

const LAYERS = [
  {
    code: "01",
    title: "Klas en risico",
    body: "Was je de oudste of de jongste in de klas? Dat zegt iets over hoe hard je durft te groeien, en of schuld bij je past.",
  },
  {
    code: "02",
    title: "Sector",
    body: "Welke markten dezelfde inzet vragen als jij van nature levert: mensen, zichtbaarheid, vastgoed, cijfers of distributie.",
  },
  {
    code: "03",
    title: "Drijfveer en timing",
    body: "Waarom je onderneemt, en of dit jaar eerder openen, een vennoot zoeken of afronden vraagt.",
  },
  {
    code: "04",
    title: "Organisatie",
    body: "Jouw rol, hoe je beslist, op welke schaal je scherp blijft, en wie je als eerste moet aanwerven.",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="container grid gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        <div className="space-y-8">
          <p className="type-kicker">{SITE.name}</p>
          <h1 className="max-w-xl text-4xl font-semibold tracking-tight sm:text-6xl">
            Geen horoscoop. Een dossier voor je zaak.
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            Vier bronnen. Eén advies. Azimut vertaalt je geboortegegevens naar
            sector, schaal, risico en de eerste man die je binnenhaalt.
          </p>
          <dl className="grid max-w-lg grid-cols-3 gap-4 border-y border-border py-5">
            <div>
              <dt className="type-kicker">Bronnen</dt>
              <dd className="mt-2 text-2xl font-semibold">4</dd>
            </div>
            <div>
              <dt className="type-kicker">Resultaat</dt>
              <dd className="mt-2 text-2xl font-semibold">1 dossier</dd>
            </div>
            <div>
              <dt className="type-kicker">Vakjargon</dt>
              <dd className="mt-2 text-2xl font-semibold">0</dd>
            </div>
          </dl>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <p className="type-kicker">Intake</p>
          <h2 className="mt-2 text-xl font-semibold">Vul je gegevens in</h2>
          <p className="mb-6 mt-2 text-sm text-muted-foreground">
            Geboortedatum, tijd en plaats. Optioneel de oprichtingsdatum van de vennootschap.
          </p>
          <IntakeForm />
        </div>
      </section>

      <section className="border-t border-border">
        <div className="container grid gap-8 py-16 md:grid-cols-2 lg:grid-cols-4">
          {LAYERS.map((layer) => (
            <article key={layer.code} className="space-y-3">
              <p className="type-kicker">{layer.code}</p>
              <h2 className="text-lg font-semibold">{layer.title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{layer.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
