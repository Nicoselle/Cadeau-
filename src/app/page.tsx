import { IntakeForm } from "@/components/intake-form";
import { SITE } from "@/lib/site";

const LAYERS = [
  {
    title: "De klas",
    body: "Was je de oudste of de jongste? Dat kleurt later hoe hard je durft te groeien, en of een lening bij je past.",
  },
  {
    title: "De markt",
    body: "Waar jouw manier van werken van pas komt: mensen, zichtbaarheid, vastgoed, cijfers of distributie.",
  },
  {
    title: "Dit jaar",
    body: "Of het nu tijd is om iets te openen, een vennoot te zoeken, of rustig af te ronden.",
  },
  {
    title: "De ploeg",
    body: "Jouw rol, hoe je het best beslist, op welke schaal je scherp blijft, en wie je er het eerst bij haalt.",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="container grid gap-14 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
        <div className="space-y-7">
          <p className="type-kicker">{SITE.name}</p>
          <h1 className="max-w-xl text-4xl font-medium leading-[1.15] tracking-tight sm:text-6xl">
            Geen horoscoop. Wel een eerlijk beeld van wat bij je past.
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
            Vul je naam, geboortedatum en plaats in. Je krijgt een leesbare
            schets: welke zaak, op welke schaal, en met wie je het best werkt.
            Alsof een collega die je al lang kent het je uitlegt.
          </p>
        </div>
        <div className="soft-card p-7 sm:p-8">
          <h2 className="font-serif text-2xl font-medium tracking-tight">Wie ben je?</h2>
          <p className="mb-7 mt-2 text-base leading-relaxed text-muted-foreground">
            Alleen dit. Optioneel de dag waarop je vennootschap is opgericht.
          </p>
          <IntakeForm />
        </div>
      </section>

      <section className="border-t border-border/50">
        <div className="container grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
          {LAYERS.map((layer) => (
            <article key={layer.title} className="space-y-3">
              <h2 className="font-serif text-xl font-medium">{layer.title}</h2>
              <p className="text-base leading-relaxed text-muted-foreground">{layer.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
