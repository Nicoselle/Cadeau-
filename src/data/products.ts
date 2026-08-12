import type { Product, ProductInput } from "@/types/product";
import { computeResilience } from "@/lib/resilience";

/**
 * Real products sold in the Benelux/EU market, gathered from live retailer
 * pages (see the `affiliateUrl`/`retailer` on each item). Verified fields:
 * product name, retailer, price (EUR), total calories and shelf life were read
 * from the linked shop page around 2026-08-12.
 *
 * ESTIMATED / UNVERIFIED fields — retailers rarely publish these, so they are
 * conservative estimates and flagged per product below:
 *   - totalProteinGrams (except where the label was published)
 *   - totalWaterLiters: retailers rarely list this. Ready-to-eat rations that
 *     need no water are null; water-required meals carry a planning estimate of
 *     ~0.25 L per serving (flagged inline).
 *   - some shelf-life values where the page only said "several years"
 *
 * Prices change often and stock varies — always verify on the retailer page
 * before purchasing. `affiliateUrl` holds the real product page; wrap it with
 * your own affiliate program if desired.
 */

export const DATA_LAST_UPDATED = "2026-08-12";

const rawProducts: ProductInput[] = [
  {
    id: "nrg-5-500g",
    name: "NRG-5 Noodrantsoen 500 g",
    brand: "NRG-5 (MSI)",
    type: "bar",
    servings: 9,
    daysOfSupply: 1,
    intendedPersons: 1,
    totalCalories: 2300,
    totalProteinGrams: 73, // verified: 14,5 g eiwit/100 g × 500 g
    shelfLifeYearsMin: 20,
    shelfLifeYearsMax: 20,
    waterRequired: false,
    totalWaterLiters: null,
    hotWaterMandatory: false,
    priceEUR: 8.95,
    dietOptions: ["vegan", "dairy-free"], // bevat wél gluten (tarwe/gerst)
    preparation:
      "Kant-en-klaar noodrantsoen van 9 blokken (2300 kcal). Direct opeten of verkruimelen in water/melk als pap; geen verwarming of koken nodig.",
    scenarios: ["BUG_OUT_BAG", "72_HOUR_KIT", "SHELTER_IN_PLACE"],
    availableInEU: true,
    availableInNetherlands: true,
    availableInBelgium: true,
    availableInSweden: false,
    retailer: "Prepshop.nl",
    affiliateUrl:
      "https://www.prepshop.nl/eten/noodrantsoenen/detail/28/nrg-5-noodrantsoen-500-gram---2300-kcal.html",
    lastUpdated: "2026-08-12",
  },
  {
    id: "seven-oceans-500g",
    name: "Seven Oceans Noodrantsoen 500 g",
    brand: "Seven Oceans (GC Rieber)",
    type: "bar",
    servings: 18,
    daysOfSupply: 1,
    intendedPersons: 1,
    totalCalories: 2440,
    totalProteinGrams: 46, // estimate: ~9,2 g/100 g × 500 g
    shelfLifeYearsMin: 5,
    shelfLifeYearsMax: 5,
    waterRequired: false,
    totalWaterLiters: null,
    hotWaterMandatory: false,
    priceEUR: 6.49,
    dietOptions: ["vegetarian"], // bevat gluten; SOLAS-gecertificeerd zeeredding
    preparation:
      "Kant-en-klaar zeeredding­rantsoen (18 tabletten). Ontworpen om dorst te beperken; geen water of bereiding nodig, direct eetbaar.",
    scenarios: ["BUG_OUT_BAG", "72_HOUR_KIT", "SHELTER_IN_PLACE"],
    availableInEU: true,
    availableInNetherlands: true,
    availableInBelgium: true,
    availableInSweden: false,
    retailer: "Prepshop.nl",
    affiliateUrl:
      "https://www.prepshop.nl/eten/noodrantsoenen/detail/156/seven-oceans-noodrantsoen-500-gram---2440-kcal.html",
    lastUpdated: "2026-08-12",
  },
  {
    id: "bp-er-box-24",
    name: "BP-ER Emergency Food — doos 24 × 500 g",
    brand: "BP-ER (GC Rieber)",
    type: "bar",
    servings: 24, // 24 pakjes van 500 g
    daysOfSupply: 24, // 1 pakje per persoon per dag
    intendedPersons: 1,
    totalCalories: 58368, // verified: 24 × 2432 kcal
    totalProteinGrams: 1104, // estimate: ~46 g per pakje × 24
    shelfLifeYearsMin: 5,
    shelfLifeYearsMax: 5, // NL-verkoper garandeert 5 jaar (sommige bronnen claimen 20)
    waterRequired: false,
    totalWaterLiters: null,
    hotWaterMandatory: false,
    priceEUR: 129.95,
    dietOptions: ["vegetarian"], // bevat tarwe (gluten)
    preparation:
      "Kant-en-klaar compact noodrantsoen (24 pakjes van 2432 kcal, samen 24 dagen). Direct eetbaar of aan te maken tot pap; geen water of koken nodig.",
    scenarios: ["30_DAY_SUPPLY", "SHELTER_IN_PLACE", "BUG_OUT_BAG"],
    availableInEU: true,
    availableInNetherlands: true,
    availableInBelgium: true,
    availableInSweden: false,
    retailer: "Goedvoorbereid.nl",
    affiliateUrl:
      "https://www.goedvoorbereid.nl/products/bp-er-emergency-food-noodrantsoen-500g",
    lastUpdated: "2026-08-12",
  },
  {
    id: "adventure-food-selection-10",
    name: "Selection 10 Pack — vriesdroogmaaltijden",
    brand: "Adventure Food",
    type: "kit",
    servings: 10,
    daysOfSupply: 3, // 10 maaltijden ≈ 3 dagen bij 3/dag
    intendedPersons: 1,
    totalCalories: 6000, // verified: gemiddeld 600 kcal × 10 maaltijden
    totalProteinGrams: 250, // estimate: ~25 g per maaltijd × 10
    shelfLifeYearsMin: 5,
    shelfLifeYearsMax: 8, // estimate: pagina noemt "meerdere jaren"
    waterRequired: true,
    totalWaterLiters: 2.5, // estimate: ~0,25 L per maaltijd × 10
    hotWaterMandatory: true, // kokend water direct in de zak vereist
    priceEUR: 67.49,
    dietOptions: [], // mix van vlees- en vegetarische maaltijden
    preparation:
      "Tien gevarieerde gevriesdroogde maaltijden (Nederlands merk). Kokend water direct in de stazak, roeren en ~8 minuten wachten. Zeer lichtgewicht (~1,6 kg).",
    scenarios: ["BUG_OUT_BAG", "72_HOUR_KIT"],
    availableInEU: true,
    availableInNetherlands: true,
    availableInBelgium: true,
    availableInSweden: false,
    retailer: "Outdoor-food.nl",
    affiliateUrl:
      "https://outdoor-food.nl/en/products/adventure-food-selection-10-pack-vriesdroogmaaltijden",
    lastUpdated: "2026-08-12",
  },
  {
    id: "tactical-foodpack-juliett",
    name: "MRE Weekpack Juliett (vegetarisch)",
    brand: "Tactical Foodpack",
    type: "kit",
    servings: 21,
    daysOfSupply: 7,
    intendedPersons: 1,
    totalCalories: 9385, // verified via armed.eu per-gerecht breakdown
    totalProteinGrams: 240, // verified: 240 g per pack
    shelfLifeYearsMin: 8,
    shelfLifeYearsMax: 8,
    waterRequired: true,
    totalWaterLiters: 5, // estimate: ~0,24 L per portie × 21
    hotWaterMandatory: false, // heet water aanbevolen; koud water werkt ook (~10 min)
    priceEUR: 246.87,
    dietOptions: ["vegetarian"],
    preparation:
      "Estisch weekpakket met 21 porties (9 gerechten). Heet water tot de vouwlijn in de zak, ~10 minuten; koud water kan ook maar duurt langer.",
    scenarios: ["BUG_OUT_BAG", "72_HOUR_KIT", "SHELTER_IN_PLACE"],
    availableInEU: true,
    availableInNetherlands: true,
    availableInBelgium: true,
    availableInSweden: true, // armed.eu verzendt naar Zweden
    retailer: "Armed.eu",
    affiliateUrl: "https://www.armed.eu/en/mre-weekpack-juliett-tactical-foodpack/",
    lastUpdated: "2026-08-12",
  },
  {
    id: "treknee-7day-veg",
    name: "7 Dagen Noodrantsoen — vegetarisch",
    brand: "Trek'n Eat",
    type: "bucket",
    servings: 21, // estimate: ~3 maaltijden/dag × 7
    daysOfSupply: 7,
    intendedPersons: 1,
    totalCalories: 12640, // verified
    totalProteinGrams: 300, // estimate
    shelfLifeYearsMin: 5,
    shelfLifeYearsMax: 5,
    waterRequired: true,
    totalWaterLiters: 5.3, // estimate: ~0,25 L per maaltijd × 21
    hotWaterMandatory: false, // warm water aanbevolen; koud kan
    priceEUR: 114.95,
    dietOptions: ["vegetarian"],
    preparation:
      "Weekvoorraad gevriesdroogde maaltijden in een compacte plastic emmer (~1.800 kcal/dag). Water toevoegen, roeren en laten wachten; alleen water nodig.",
    scenarios: ["72_HOUR_KIT", "SHELTER_IN_PLACE", "30_DAY_SUPPLY"],
    availableInEU: true,
    availableInNetherlands: true,
    availableInBelgium: true,
    availableInSweden: false,
    retailer: "Darkshop.nl",
    affiliateUrl:
      "https://www.darkshop.nl/trek-n-eat-7-dagen-noodrantsoen-12-640-kcal-vegetarisch/",
    lastUpdated: "2026-08-12",
  },
  {
    id: "readywise-14day",
    name: "14 Dagen Noodrantsoen (120 porties)",
    brand: "ReadyWise",
    type: "bucket",
    servings: 120,
    daysOfSupply: 14,
    intendedPersons: 1,
    totalCalories: 24360, // verified: ~1.740 kcal/dag
    totalProteinGrams: 600, // estimate
    shelfLifeYearsMin: 20,
    shelfLifeYearsMax: 25, // pagina noemt zowel 20 (body) als 25 jaar (titel)
    waterRequired: true,
    totalWaterLiters: 28, // estimate: ~0,24 L per portie × 120
    hotWaterMandatory: false, // "enkel water toevoegen"; warm aanbevolen
    priceEUR: 410.0,
    dietOptions: [], // bevat melk, soja, tarwe (gluten)
    preparation:
      "120 maaltijden in 30 zakjes, verpakt in een stapelbare emmer. Water toevoegen aan de pouch en enkele minuten laten staan. Lichtgewicht door vriesdroging.",
    scenarios: ["SHELTER_IN_PLACE", "30_DAY_SUPPLY", "72_HOUR_KIT"],
    availableInEU: true,
    availableInNetherlands: true,
    availableInBelgium: true,
    availableInSweden: false,
    retailer: "Allprepare.com",
    affiliateUrl: "https://www.allprepare.com/readywise-noodrantsoen-14-dagen",
    lastUpdated: "2026-08-12",
  },
  {
    id: "real-turmat-zalm-teriyaki",
    name: "Zalm Teriyaki (losse maaltijd)",
    brand: "Real Turmat",
    type: "pouch",
    servings: 1,
    daysOfSupply: 1, // losse maaltijd (~1 hoofdmaaltijd, geen volledige dag)
    intendedPersons: 1,
    totalCalories: 568, // verified
    totalProteinGrams: 30, // estimate (zalm, eiwitrijk)
    shelfLifeYearsMin: 5,
    shelfLifeYearsMax: 5,
    waterRequired: true,
    totalWaterLiters: 0.25, // estimate: ~2,3 dl per maaltijd
    hotWaterMandatory: true, // heet water in de vacuümzak
    priceEUR: 12.99,
    dietOptions: [], // bevat vis en soja
    preparation:
      "Hoogwaardige Noorse gevriesdroogde hoofdmaaltijd (Drytech). Heet water direct in de vacuümzak; ideaal per-maaltijd bevoorrading met hoge kwaliteit/gewicht.",
    scenarios: ["BUG_OUT_BAG", "72_HOUR_KIT"],
    availableInEU: true,
    availableInNetherlands: true,
    availableInBelgium: true,
    availableInSweden: false,
    retailer: "RealHikingFood.nl",
    affiliateUrl: "https://www.realhikingfood.nl/product/zalm-teriyaki-real-turmat/",
    lastUpdated: "2026-08-12",
  },
  {
    id: "nato-mre-24h-menu1",
    name: "NATO MRE Zelfverwarmend 24H-rantsoen — Menu 1",
    brand: "NATO MRE (Lyophilise & Co)",
    type: "mre",
    servings: 3, // ontbijt + 2 hoofdgerechten
    daysOfSupply: 1,
    intendedPersons: 1,
    totalCalories: 3600, // verified
    totalProteinGrams: 100, // estimate
    shelfLifeYearsMin: 3,
    shelfLifeYearsMax: 4, // estimate (best-before ~2028); gesteriliseerde natte MRE
    waterRequired: false,
    totalWaterLiters: null,
    hotWaterMandatory: false, // vlamloze verwarmers inbegrepen; water alleen voor de heater
    priceEUR: 25.55,
    dietOptions: [], // sommige gerechten batch-afhankelijk halal
    preparation:
      "Volledig 24-uursrantsoen met gesteriliseerde kant-en-klare hoofdgerechten en 2 vlamloze verwarmers. Geen kooktoestel of drinkwater nodig; incl. 4 waterzuiveringstabletten.",
    scenarios: ["BUG_OUT_BAG", "72_HOUR_KIT", "SHELTER_IN_PLACE"],
    availableInEU: true,
    availableInNetherlands: true,
    availableInBelgium: true,
    availableInSweden: false,
    retailer: "Freezedriedandco.com",
    affiliateUrl:
      "https://www.freezedriedandco.com/8352-nato-mre-ration-24h-menu-1-3600-kcal.html",
    lastUpdated: "2026-08-12",
  },
];

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/** Products with all derived fields computed from the raw facts. */
export const products: Product[] = rawProducts.map((p) => ({
  ...p,
  caloriesPerDay: Math.round(p.totalCalories / p.daysOfSupply),
  pricePer100Kcal: round2((p.priceEUR / p.totalCalories) * 100),
  resilienceScore: computeResilience(p).score,
}));

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
