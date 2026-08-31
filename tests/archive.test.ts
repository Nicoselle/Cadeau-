import { describe, expect, it } from "vitest";
import { EDITIONS } from "@/data/edition";
import {
  serializeArchiveIndex,
  serializeArchivedEdition,
} from "@/lib/krant-api";
import {
  editionPath,
  getEdition,
  leadOfEdition,
  newsOfEdition,
  opinionOnEditionDate,
  opinionsOfEdition,
} from "@/lib/newspaper";

describe("archief van alle edities", () => {
  it("registers every numbered edition with a lead slug that exists", () => {
    expect(EDITIONS.map((edition) => edition.number)).toEqual([1, 2]);
    for (const edition of EDITIONS) {
      const lead = leadOfEdition(edition.number);
      expect(lead.slug).toBe(edition.leadSlug);
      expect(lead.edition).toBe(edition.number);
    }
  });

  it("keeps edition 1 as six news pieces and the kraan as voorpagina", () => {
    expect(newsOfEdition(1).map((article) => article.slug)).toEqual([
      "kraan-weer-open",
      "lange-rente-wil-niet-mee",
      "thermometer-werd-betwist",
      "centenindex-is-wet",
      "meet-de-geldgroei-twee-keer",
      "euro-onder-water",
    ]);
    expect(leadOfEdition(1).slug).toBe("kraan-weer-open");
    expect(opinionOnEditionDate(1)?.slug).toBe("mening-2026-08-18");
    expect(
      opinionsOfEdition(1)
        .map((article) => article.published)
        .every((date) => date <= "2026-08-18"),
    ).toBe(true);
  });

  it("keeps edition 2 as the bodem lead and the vat of 31 August", () => {
    expect(newsOfEdition(2)).toHaveLength(5);
    expect(leadOfEdition(2).slug).toBe("reele-rente-houdt-de-bodem");
    expect(opinionOnEditionDate(2)?.slug).toBe("vat-liegt-minder-dan-de-index");
    expect(opinionsOfEdition(2).length).toBeGreaterThanOrEqual(1);
  });

  it("points the live edition path at the archive issue", () => {
    expect(editionPath()).toBe("/archief/2");
    expect(editionPath(1)).toBe("/archief/1");
    expect(getEdition(99)).toBeUndefined();
  });

  it("serializes the archive index and each issue", () => {
    const index = serializeArchiveIndex();
    expect(index.editions).toHaveLength(2);
    expect(index.editions.map((item) => item.number)).toEqual([1, 2]);
    expect(index.editions[0]?.url).toContain("/archief/1");

    const first = serializeArchivedEdition(1);
    expect(first?.edition.folio).toBe("Nr. 1");
    expect(first?.lead.slug).toBe("kraan-weer-open");
    expect(first?.articles).toHaveLength(6);
    expect(first?.opinions.some((item) => item.slug === "mening-2026-08-18")).toBe(
      true,
    );

    const second = serializeArchivedEdition(2);
    expect(second?.lead.slug).toBe("reele-rente-houdt-de-bodem");
    expect(second?.articles).toHaveLength(5);
    expect(serializeArchivedEdition(99)).toBeNull();
  });
});
