"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "cadeau-compare";

export function CompareEmpty() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      const ids = Array.isArray(parsed)
        ? parsed.filter((x): x is string => typeof x === "string")
        : [];
      if (ids.length > 0) {
        router.replace(`/compare?ids=${ids.join(",")}`);
        return;
      }
    } catch {
      // ignore
    }
    setChecked(true);
  }, [router]);

  if (!checked) return null;

  return (
    <div className="rounded-lg border border-dashed border-border p-12 text-center">
      <p className="font-medium">Nog geen producten geselecteerd</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Selecteer 2 tot 4 producten in de directory om ze naast elkaar te
        vergelijken.
      </p>
      <Link
        href="/"
        className="mt-4 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Naar de directory
      </Link>
    </div>
  );
}
