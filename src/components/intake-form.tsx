"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CITIES, COUNTRY_LABELS, citiesFor } from "@/lib/cities";
import type { CountryCode } from "@/types/briefing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const COUNTRIES = Object.keys(COUNTRY_LABELS) as CountryCode[];

export function IntakeForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("08:00");
  const [country, setCountry] = useState<CountryCode>("BE");
  const [cityId, setCityId] = useState("antwerpen");
  const [companyFoundedOn, setCompanyFoundedOn] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const cities = useMemo(() => {
    const local = citiesFor(country);
    return local.length > 0 ? local : CITIES;
  }, [country]);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setPending(true);
    try {
      const { generateBriefing, parseIntake } = await import("@/lib/engines");
      const input = parseIntake({
        fullName,
        birthDate,
        birthTime,
        cityId,
        country,
        companyFoundedOn: companyFoundedOn || undefined,
      });
      const data = generateBriefing(input);
      sessionStorage.setItem("azimut:briefing", JSON.stringify(data));
      router.push("/briefing");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Berekening mislukt.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form id="intake" onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1.5 sm:col-span-2">
          <span className="type-label">Volledige naam</span>
          <Input
            required
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Voor- en achternaam"
            autoComplete="name"
          />
        </label>
        <label className="space-y-1.5">
          <span className="type-label">Geboortedatum</span>
          <Input
            required
            type="date"
            value={birthDate}
            onChange={(event) => setBirthDate(event.target.value)}
          />
        </label>
        <label className="space-y-1.5">
          <span className="type-label">Geboortetijd</span>
          <Input
            required
            type="time"
            value={birthTime}
            onChange={(event) => setBirthTime(event.target.value)}
          />
        </label>
        <label className="space-y-1.5">
          <span className="type-label">Land waar je naar school ging</span>
          <Select
            value={country}
            onChange={(event) => {
              const next = event.target.value as CountryCode;
              setCountry(next);
              const nextCities = citiesFor(next);
              if (nextCities[0]) setCityId(nextCities[0].id);
            }}
          >
            {COUNTRIES.map((code) => (
              <option key={code} value={code}>
                {COUNTRY_LABELS[code]}
              </option>
            ))}
          </Select>
        </label>
        <label className="space-y-1.5">
          <span className="type-label">Geboorteplaats</span>
          <Select value={cityId} onChange={(event) => setCityId(event.target.value)}>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </Select>
        </label>
        <label className="space-y-1.5 sm:col-span-2">
          <span className="type-label">Oprichtingsdatum zaak (mag leeg)</span>
          <Input
            type="date"
            value={companyFoundedOn}
            onChange={(event) => setCompanyFoundedOn(event.target.value)}
          />
        </label>
      </div>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={pending}>
        {pending ? "Even kijken…" : "Kijk wat bij me past"}
      </Button>
      <p className="text-sm leading-relaxed text-muted-foreground">
        Blijft op deze computer. Geen account, niemand anders ziet het.
      </p>
    </form>
  );
}
