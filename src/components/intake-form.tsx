"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CITIES, COUNTRY_LABELS, citiesFor } from "@/lib/cities";
import type { BriefingResponse, CountryCode } from "@/types/briefing";
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
      const response = await fetch("/api/v1/briefing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          birthDate,
          birthTime,
          cityId,
          country,
          companyFoundedOn: companyFoundedOn || undefined,
        }),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ?? "Berekening mislukt.");
      }
      const data = payload.data as BriefingResponse;
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
          <span className="type-kicker">Volledige naam</span>
          <Input
            required
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Voor- en achternaam"
            autoComplete="name"
          />
        </label>
        <label className="space-y-1.5">
          <span className="type-kicker">Geboortedatum</span>
          <Input
            required
            type="date"
            value={birthDate}
            onChange={(event) => setBirthDate(event.target.value)}
          />
        </label>
        <label className="space-y-1.5">
          <span className="type-kicker">Geboortetijd</span>
          <Input
            required
            type="time"
            value={birthTime}
            onChange={(event) => setBirthTime(event.target.value)}
          />
        </label>
        <label className="space-y-1.5">
          <span className="type-kicker">Land van schoolcohort</span>
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
          <span className="type-kicker">Geboorteplaats</span>
          <Select value={cityId} onChange={(event) => setCityId(event.target.value)}>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </Select>
        </label>
        <label className="space-y-1.5 sm:col-span-2">
          <span className="type-kicker">Oprichtingsdatum bedrijf (optioneel)</span>
          <Input
            type="date"
            value={companyFoundedOn}
            onChange={(event) => setCompanyFoundedOn(event.target.value)}
          />
        </label>
      </div>
      {error ? <p className="text-sm text-red-400">{error}</p> : null}
      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={pending}>
        {pending ? "Berekenen…" : "Genereer mijn briefing"}
      </Button>
      <p className="text-xs leading-relaxed text-muted-foreground">
        Geen esoterisch jargon in de output. De ruwe lagen blijven beschikbaar als bewijs,
        niet als interface.
      </p>
    </form>
  );
}
