import type { NumerologyResult } from "@/types/briefing";

const MASTER = new Set([11, 22, 33]);

const LETTER_VALUE: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
  s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
};

const VOWELS = new Set(["a", "e", "i", "o", "u", "y"]);

export function reduceNumber(value: number, keepMasters = true): number {
  if (value <= 0) return 0;
  let current = value;
  while (current > 9 && !(keepMasters && MASTER.has(current))) {
    current = String(current)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }
  return current;
}

function normalizeLetters(name: string): string[] {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .split("")
    .filter((char) => /[a-z]/.test(char));
}

function sumLetters(letters: string[]): number {
  return letters.reduce((sum, char) => sum + (LETTER_VALUE[char] ?? 0), 0);
}

export function lifePathFromDate(isoDate: string): number {
  const digits = isoDate.replaceAll("-", "").split("").map(Number);
  return reduceNumber(digits.reduce((sum, digit) => sum + digit, 0));
}

export function personalYearFrom(isoDate: string, year: number): number {
  const month = Number(isoDate.slice(5, 7));
  const day = Number(isoDate.slice(8, 10));
  return reduceNumber(reduceNumber(month, false) + reduceNumber(day, false) + reduceNumber(year, false), false);
}

export function computeNumerology(
  fullName: string,
  birthDate: string,
  now = new Date(),
  companyFoundedOn?: string,
): NumerologyResult {
  const letters = normalizeLetters(fullName);
  const vowels = letters.filter((char) => VOWELS.has(char));
  const consonants = letters.filter((char) => !VOWELS.has(char));

  return {
    lifePath: lifePathFromDate(birthDate),
    expression: reduceNumber(sumLetters(letters)),
    soulUrge: reduceNumber(sumLetters(vowels)),
    personality: reduceNumber(sumLetters(consonants)),
    personalYear: personalYearFrom(birthDate, now.getUTCFullYear()),
    companyYear: companyFoundedOn
      ? personalYearFrom(companyFoundedOn, now.getUTCFullYear())
      : undefined,
  };
}
