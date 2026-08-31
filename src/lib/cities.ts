import type { CountryCode } from "@/types/briefing";

export interface City {
  id: string;
  name: string;
  country: CountryCode;
  latitude: number;
  longitude: number;
  timezone: string;
  baseOffset: number;
  dst: "eu" | "us" | "none";
}

export const CITIES: City[] = [
  { id: "antwerpen", name: "Antwerpen", country: "BE", latitude: 51.2194, longitude: 4.4025, timezone: "Europe/Brussels", baseOffset: 1, dst: "eu" },
  { id: "brussel", name: "Brussel", country: "BE", latitude: 50.8503, longitude: 4.3517, timezone: "Europe/Brussels", baseOffset: 1, dst: "eu" },
  { id: "gent", name: "Gent", country: "BE", latitude: 51.0543, longitude: 3.7174, timezone: "Europe/Brussels", baseOffset: 1, dst: "eu" },
  { id: "brugge", name: "Brugge", country: "BE", latitude: 51.2093, longitude: 3.2247, timezone: "Europe/Brussels", baseOffset: 1, dst: "eu" },
  { id: "leuven", name: "Leuven", country: "BE", latitude: 50.8798, longitude: 4.7005, timezone: "Europe/Brussels", baseOffset: 1, dst: "eu" },
  { id: "mechelen", name: "Mechelen", country: "BE", latitude: 51.0259, longitude: 4.4776, timezone: "Europe/Brussels", baseOffset: 1, dst: "eu" },
  { id: "hasselt", name: "Hasselt", country: "BE", latitude: 50.9307, longitude: 5.3378, timezone: "Europe/Brussels", baseOffset: 1, dst: "eu" },
  { id: "kortrijk", name: "Kortrijk", country: "BE", latitude: 50.8279, longitude: 3.2648, timezone: "Europe/Brussels", baseOffset: 1, dst: "eu" },
  { id: "oostende", name: "Oostende", country: "BE", latitude: 51.2154, longitude: 2.9286, timezone: "Europe/Brussels", baseOffset: 1, dst: "eu" },
  { id: "luik", name: "Luik", country: "BE", latitude: 50.6326, longitude: 5.5797, timezone: "Europe/Brussels", baseOffset: 1, dst: "eu" },
  { id: "charleroi", name: "Charleroi", country: "BE", latitude: 50.4108, longitude: 4.4446, timezone: "Europe/Brussels", baseOffset: 1, dst: "eu" },
  { id: "namen", name: "Namen", country: "BE", latitude: 50.4674, longitude: 4.872, timezone: "Europe/Brussels", baseOffset: 1, dst: "eu" },
  { id: "niel", name: "Niel", country: "BE", latitude: 51.109, longitude: 4.334, timezone: "Europe/Brussels", baseOffset: 1, dst: "eu" },
  { id: "amsterdam", name: "Amsterdam", country: "NL", latitude: 52.3676, longitude: 4.9041, timezone: "Europe/Amsterdam", baseOffset: 1, dst: "eu" },
  { id: "rotterdam", name: "Rotterdam", country: "NL", latitude: 51.9244, longitude: 4.4777, timezone: "Europe/Amsterdam", baseOffset: 1, dst: "eu" },
  { id: "den-haag", name: "Den Haag", country: "NL", latitude: 52.0705, longitude: 4.3007, timezone: "Europe/Amsterdam", baseOffset: 1, dst: "eu" },
  { id: "utrecht", name: "Utrecht", country: "NL", latitude: 52.0907, longitude: 5.1214, timezone: "Europe/Amsterdam", baseOffset: 1, dst: "eu" },
  { id: "eindhoven", name: "Eindhoven", country: "NL", latitude: 51.4416, longitude: 5.4697, timezone: "Europe/Amsterdam", baseOffset: 1, dst: "eu" },
  { id: "groningen", name: "Groningen", country: "NL", latitude: 53.2194, longitude: 6.5665, timezone: "Europe/Amsterdam", baseOffset: 1, dst: "eu" },
  { id: "maastricht", name: "Maastricht", country: "NL", latitude: 50.8514, longitude: 5.691, timezone: "Europe/Amsterdam", baseOffset: 1, dst: "eu" },
  { id: "berlin", name: "Berlijn", country: "DE", latitude: 52.52, longitude: 13.405, timezone: "Europe/Berlin", baseOffset: 1, dst: "eu" },
  { id: "munich", name: "München", country: "DE", latitude: 48.1351, longitude: 11.582, timezone: "Europe/Berlin", baseOffset: 1, dst: "eu" },
  { id: "paris", name: "Parijs", country: "FR", latitude: 48.8566, longitude: 2.3522, timezone: "Europe/Paris", baseOffset: 1, dst: "eu" },
  { id: "london", name: "Londen", country: "UK", latitude: 51.5074, longitude: -0.1278, timezone: "Europe/London", baseOffset: 0, dst: "eu" },
  { id: "new-york", name: "New York", country: "US", latitude: 40.7128, longitude: -74.006, timezone: "America/New_York", baseOffset: -5, dst: "us" },
  { id: "los-angeles", name: "Los Angeles", country: "US", latitude: 34.0522, longitude: -118.2437, timezone: "America/Los_Angeles", baseOffset: -8, dst: "us" },
  { id: "chicago", name: "Chicago", country: "US", latitude: 41.8781, longitude: -87.6298, timezone: "America/Chicago", baseOffset: -6, dst: "us" },
  { id: "beijing", name: "Peking", country: "CN", latitude: 39.9042, longitude: 116.4074, timezone: "Asia/Shanghai", baseOffset: 8, dst: "none" },
  { id: "shanghai", name: "Shanghai", country: "CN", latitude: 31.2304, longitude: 121.4737, timezone: "Asia/Shanghai", baseOffset: 8, dst: "none" },
  { id: "hong-kong", name: "Hongkong", country: "CN", latitude: 22.3193, longitude: 114.1694, timezone: "Asia/Hong_Kong", baseOffset: 8, dst: "none" },
  { id: "zurich", name: "Zürich", country: "OTHER", latitude: 47.3769, longitude: 8.5417, timezone: "Europe/Zurich", baseOffset: 1, dst: "eu" },
  { id: "singapore", name: "Singapore", country: "OTHER", latitude: 1.3521, longitude: 103.8198, timezone: "Asia/Singapore", baseOffset: 8, dst: "none" },
  { id: "dubai", name: "Dubai", country: "OTHER", latitude: 25.2048, longitude: 55.2708, timezone: "Asia/Dubai", baseOffset: 4, dst: "none" },
  { id: "tokyo", name: "Tokio", country: "OTHER", latitude: 35.6762, longitude: 139.6503, timezone: "Asia/Tokyo", baseOffset: 9, dst: "none" },
];

export const COUNTRY_LABELS: Record<CountryCode, string> = {
  BE: "België",
  NL: "Nederland",
  DE: "Duitsland",
  FR: "Frankrijk",
  UK: "Verenigd Koninkrijk",
  US: "Verenigde Staten",
  CN: "China",
  OTHER: "Andere",
};

function lastWeekdayOfMonth(year: number, monthIndex: number, weekday: number): Date {
  const last = new Date(Date.UTC(year, monthIndex + 1, 0));
  const offset = (last.getUTCDay() - weekday + 7) % 7;
  last.setUTCDate(last.getUTCDate() - offset);
  return last;
}

function nthWeekdayOfMonth(year: number, monthIndex: number, weekday: number, n: number): Date {
  const first = new Date(Date.UTC(year, monthIndex, 1));
  const offset = (weekday - first.getUTCDay() + 7) % 7;
  first.setUTCDate(1 + offset + (n - 1) * 7);
  return first;
}

export function isDstActive(date: Date, rule: City["dst"]): boolean {
  if (rule === "none") return false;
  const year = date.getUTCFullYear();
  if (rule === "eu") {
    const start = lastWeekdayOfMonth(year, 2, 0);
    start.setUTCHours(1, 0, 0, 0);
    const end = lastWeekdayOfMonth(year, 9, 0);
    end.setUTCHours(1, 0, 0, 0);
    return date >= start && date < end;
  }
  const start = nthWeekdayOfMonth(year, 2, 0, 2);
  start.setUTCHours(2, 0, 0, 0);
  const end = nthWeekdayOfMonth(year, 10, 0, 1);
  end.setUTCHours(2, 0, 0, 0);
  return date >= start && date < end;
}

export function localToUtc(birthDate: string, birthTime: string, city: City): Date {
  const [year, month, day] = birthDate.split("-").map(Number);
  const [hour, minute] = birthTime.split(":").map(Number);
  const probe = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const offset = city.baseOffset + (isDstActive(probe, city.dst) ? 1 : 0);
  return new Date(Date.UTC(year, month - 1, day, hour, minute) - offset * 3_600_000);
}

export function findCity(id: string): City | undefined {
  return CITIES.find((city) => city.id === id);
}

export function citiesFor(country: CountryCode): City[] {
  const matched = CITIES.filter((city) => city.country === country);
  return matched.length > 0 ? matched : CITIES;
}
