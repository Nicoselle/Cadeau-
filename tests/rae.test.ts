import { describe, expect, it } from "vitest";
import { classifyCohort, computeRae, monthsSinceCutoff } from "@/lib/engines/rae";

describe("RAE cohort logic", () => {
  it("treats the cutoff month as the oldest slot", () => {
    expect(monthsSinceCutoff(9, 9)).toBe(0);
    expect(classifyCohort(0)).toBe("oldest");
  });

  it("treats the month before cutoff as youngest", () => {
    expect(monthsSinceCutoff(8, 9)).toBe(11);
    expect(classifyCohort(11)).toBe("youngest");
  });

  it("maps Chinese September vs August to the Taobao finding", () => {
    const september = computeRae("1990-09-12", "CN");
    const august = computeRae("1990-08-12", "CN");
    expect(september.cohortPosition).toBe("oldest");
    expect(august.cohortPosition).toBe("youngest");
    expect(september.riskAppetite).toBeGreaterThan(august.riskAppetite);
  });

  it("uses the Belgian calendar-year cohort", () => {
    const january = computeRae("1988-01-04", "BE");
    const june = computeRae("1988-06-20", "BE");
    const december = computeRae("1988-12-02", "BE");
    expect(january.cohortPosition).toBe("oldest");
    expect(june.cohortPosition).toBe("middle");
    expect(december.cohortPosition).toBe("youngest");
    expect(december.fundingBias).toBe("conservative-margin");
  });

  it("flags US June births as relatively young", () => {
    const june = computeRae("1975-06-15", "US");
    expect(june.cohortPosition).toBe("youngest");
    expect(june.fundingBias).toBe("conservative-margin");
  });
});
