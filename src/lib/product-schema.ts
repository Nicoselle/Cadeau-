import type { Product } from "@/types/product";
import { SCENARIO_LABELS, TYPE_LABELS } from "@/types/product";
import { SITE } from "@/lib/site";
import { formatShelfLife } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: string;
}

export function buildFaq(p: Product): FaqItem[] {
  const shelf = formatShelfLife(p.shelfLifeYearsMin, p.shelfLifeYearsMax);
  const noHeatAnswer = p.waterRequired
    ? p.hotWaterMandatory
      ? `Ja, ${p.brand} ${p.name} vereist heet water of koken. De meeste maaltijden kunnen niet goed worden bereid zonder warmtebron, dus plan een kooktoestel of brandstof in.`
      : `Bereiding zonder heet water is mogelijk. Je kunt koud water gebruiken om de maaltijden te weken; dit duurt langer maar werkt in noodsituaties. Reken op circa ${p.totalWaterLiters ?? "enkele"} liter water in totaal.`
    : `Er is geen water of warmtebron nodig. ${p.brand} ${p.name} is kant-en-klaar en kan direct worden gegeten.`;

  return [
    {
      question: `Hoeveel calorieën levert ${p.brand} ${p.name}?`,
      answer: `Dit pakket levert in totaal ${p.totalCalories.toLocaleString(
        "nl-NL",
      )} kcal, oftewel ongeveer ${p.caloriesPerDay.toLocaleString(
        "nl-NL",
      )} kcal per dag over ${p.daysOfSupply} dag(en) voor ${
        p.intendedPersons
      } persoon. Het bevat ${p.servings} porties en ${
        p.totalProteinGrams
      } gram eiwit.`,
    },
    {
      question: `Hoe lang is ${p.brand} ${p.name} houdbaar?`,
      answer: `De opgegeven houdbaarheid is ${shelf} bij koele, droge opslag. Bewaar het pakket uit direct zonlicht voor de langste levensduur.`,
    },
    {
      question: `Hoeveel water heb ik nodig voor ${p.brand} ${p.name}?`,
      answer: p.waterRequired
        ? `Ja, er is water nodig voor de bereiding${
            p.totalWaterLiters
              ? `: reken op ongeveer ${p.totalWaterLiters} liter voor het volledige pakket`
              : ""
          }. Houd hier rekening mee bij het plannen van je waterreserve.`
        : `Nee, dit product vereist geen water. Het is een kant-en-klaar rantsoen.`,
    },
    {
      question: `Kan ${p.brand} ${p.name} zonder heet water worden bereid?`,
      answer: noHeatAnswer,
    },
  ];
}

export function buildProductJsonLd(p: Product) {
  const shelf = formatShelfLife(p.shelfLifeYearsMin, p.shelfLifeYearsMax);
  const description = `${p.brand} ${p.name} (${
    TYPE_LABELS[p.type]
  }): ${p.totalCalories.toLocaleString("nl-NL")} kcal totaal, ~${p.caloriesPerDay.toLocaleString(
    "nl-NL",
  )} kcal/dag over ${p.daysOfSupply} dag(en), ${p.servings} porties, ${
    p.totalProteinGrams
  } g eiwit. Houdbaarheid ${shelf}. ${
    p.waterRequired
      ? `Water nodig${p.totalWaterLiters ? ` (~${p.totalWaterLiters} L)` : ""}${
          p.hotWaterMandatory ? ", heet water/koken vereist" : ""
        }.`
      : "Geen water of bereiding nodig."
  } Scenario's: ${p.scenarios.map((s) => SCENARIO_LABELS[s]).join(", ")}.`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${SITE.url}/product/${p.id}`,
    name: `${p.brand} ${p.name}`,
    sku: p.id,
    brand: {
      "@type": "Brand",
      name: p.brand,
    },
    category: TYPE_LABELS[p.type],
    description,
    url: `${SITE.url}/product/${p.id}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: p.priceUSD.toFixed(2),
      availability: "https://schema.org/InStock",
      url: p.affiliateUrl,
    },
    additionalProperty: [
      prop("Totale calorieën", p.totalCalories, "kcal"),
      prop("Calorieën per dag", p.caloriesPerDay, "kcal"),
      prop("Porties", p.servings),
      prop("Dagen voorraad", p.daysOfSupply, "dagen"),
      prop("Bedoeld voor personen", p.intendedPersons),
      prop("Eiwit totaal", p.totalProteinGrams, "g"),
      prop("Houdbaarheid minimaal", p.shelfLifeYearsMin, "jaar"),
      prop("Houdbaarheid maximaal", p.shelfLifeYearsMax, "jaar"),
      prop("Water vereist", p.waterRequired ? "ja" : "nee"),
      ...(p.totalWaterLiters !== null
        ? [prop("Waterbehoefte", p.totalWaterLiters, "L")]
        : []),
      prop("Heet water verplicht", p.hotWaterMandatory ? "ja" : "nee"),
      prop("Prijs per 100 kcal", p.pricePer100Kcal, "USD"),
      prop("Resilience Score", p.resilienceScore, "/100"),
      prop("Beschikbaar in EU", p.availableInEU ? "ja" : "nee"),
      prop("Beschikbaar in Zweden", p.availableInSweden ? "ja" : "nee"),
    ],
  };
}

export function buildFaqJsonLd(faq: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function prop(name: string, value: string | number, unitText?: string) {
  return {
    "@type": "PropertyValue",
    name,
    value,
    ...(unitText ? { unitText } : {}),
  };
}
