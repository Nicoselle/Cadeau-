import { describe, expect, it, beforeEach } from "vitest";
import {
  findPlace,
  resolvePlace,
  searchPlaces,
  slugify,
} from "@/lib/local-places";
import {
  parseRssItems,
  scoreFoundItem,
  buildSearchQuery,
} from "@/lib/local-search";
import { moderateIntake, typesetStory } from "@/lib/local-story";
import {
  addDemand,
  buildEdition,
  resetRegistryForTests,
  submitStory,
} from "@/lib/local-registry";

const rss = `<?xml version="1.0"?>
<rss><channel>
<item>
<title>Bakkerij De Korst opent tweede zaak in Gent - HLN</title>
<link>https://example.com/gent-bakker</link>
<pubDate>Thu, 28 Aug 2026 10:00:00 GMT</pubDate>
<source url="https://www.hln.be">HLN</source>
<description><![CDATA[Een Gentse ondernemer opent een tweede winkel.]]></description>
</item>
<item>
<title>Club wint de wedstrijd in Gent - Sportblad</title>
<link>https://example.com/voetbal</link>
<pubDate>Thu, 28 Aug 2026 11:00:00 GMT</pubDate>
<description>Voetbal eredivisie transfer</description>
</item>
</channel></rss>`;

describe("plaatsen", () => {
  it("slugifies Belgian names", () => {
    expect(slugify("Sint-Niklaas")).toBe("sint-niklaas");
    expect(slugify("Den Haag")).toBe("den-haag");
    expect(findPlace("gent")?.name).toBe("Gent");
  });

  it("resolves catalog and free village names", () => {
    expect(resolvePlace("Leuven")?.country).toBe("BE");
    expect(resolvePlace("Zomergem")?.slug).toBe("zomergem");
    expect(resolvePlace("!!")).toBeNull();
  });

  it("searches the catalog", () => {
    const hits = searchPlaces("brug", 5);
    expect(hits[0]?.name).toBe("Brugge");
  });
});

describe("zoekpijplijn", () => {
  it("builds a demand-scoped query", () => {
    const place = findPlace("gent");
    expect(place).toBeDefined();
    expect(buildSearchQuery(place!)).toContain("Gent");
    expect(buildSearchQuery(place!)).toContain("ondernemer");
  });

  it("parses RSS and prefers business over sports", () => {
    const items = parseRssItems(rss);
    expect(items).toHaveLength(2);
    expect(items[0].title).toContain("Bakkerij");
    const gent = findPlace("gent")!;
    expect(scoreFoundItem(gent, items[0])).toBeGreaterThanOrEqual(2);
    expect(scoreFoundItem(gent, items[1])).toBeLessThan(2);
  });
});

describe("verhaal-intake", () => {
  beforeEach(() => {
    resetRegistryForTests();
  });

  const geldig = {
    author: "Marie Peeters",
    company: "Atelier Peeters",
    plaats: "Gent",
    body: "We openen in de Veldstraat een tweede werkplaats. Het eerste atelier werd te klein, en we willen leerlingen uit de buurt een plek geven.",
  };

  it("weigert te korte teksten", () => {
    expect(moderateIntake({ ...geldig, body: "Te kort." })).toMatch(/te kort/i);
  });

  it("houdt een verhaal in de wachtkamer zonder vraag", () => {
    const story = typesetStory(geldig, false);
    expect(story.status).toBe("wachtkamer");
    expect(story.title).toContain("Atelier Peeters");
  });

  it("zet automatisch zodra er vraag is", () => {
    addDemand(["gent"]);
    const result = submitStory(geldig);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.story.status).toBe("gepubliceerd");
  });

  it("zoekt niet voor een gemeente zonder vraag", async () => {
    const edition = await buildEdition("hasselt");
    expect(edition?.vraag).toBe(0);
    expect(edition?.gevonden).toEqual([]);
  });
});
