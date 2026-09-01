import { describe, expect, it } from "vitest";
import {
  authorizeSafeRequest,
  parseBasicCredentials,
  resolveSafePassword,
} from "@/lib/safe-gate";

function basic(user: string, password: string): string {
  return `Basic ${btoa(`${user}:${password}`)}`;
}

describe("safe-poort", () => {
  it("sluit als het wachtwoord ontbreekt of leeg is", () => {
    expect(resolveSafePassword(undefined)).toBeNull();
    expect(resolveSafePassword("")).toBeNull();
    expect(resolveSafePassword("   ")).toBeNull();
    expect(authorizeSafeRequest(basic("nico", "x"), undefined)).toBe(false);
    expect(authorizeSafeRequest(basic("nico", "x"), "")).toBe(false);
    expect(authorizeSafeRequest(basic("nico", ""), "geheim")).toBe(false);
  });

  it("laat alleen het juiste wachtwoord door", () => {
    expect(authorizeSafeRequest(null, "geheim")).toBe(false);
    expect(authorizeSafeRequest("Bearer geheim", "geheim")).toBe(false);
    expect(authorizeSafeRequest(basic("nico", "fout"), "geheim")).toBe(false);
    expect(authorizeSafeRequest(basic("wieook", "geheim"), "geheim")).toBe(true);
  });

  it("leest Basic-credentials", () => {
    expect(parseBasicCredentials(basic("safe", "abc:def"))).toEqual({
      username: "safe",
      password: "abc:def",
    });
    expect(parseBasicCredentials("Basic $$$")).toBeNull();
  });
});
