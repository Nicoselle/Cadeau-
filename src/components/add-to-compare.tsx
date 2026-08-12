"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "cadeau-compare";
const MAX_COMPARE = 4;

export function AddToCompare({ id }: { id: string }) {
  const router = useRouter();
  const [inList, setInList] = useState(false);

  useEffect(() => {
    setInList(readIds().includes(id));
  }, [id]);

  function readIds(): string[] {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed)
        ? parsed.filter((x): x is string => typeof x === "string")
        : [];
    } catch {
      return [];
    }
  }

  function write(ids: string[]) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }

  function toggle() {
    const ids = readIds();
    if (ids.includes(id)) {
      write(ids.filter((x) => x !== id));
      setInList(false);
    } else {
      if (ids.length >= MAX_COMPARE) return;
      write([...ids, id]);
      setInList(true);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button variant={inList ? "secondary" : "outline"} onClick={toggle}>
        {inList ? "✓ In vergelijking" : "Toevoegen aan vergelijking"}
      </Button>
      <Button variant="ghost" onClick={() => router.push("/compare")}>
        Naar vergelijking →
      </Button>
    </div>
  );
}
