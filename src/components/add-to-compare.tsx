"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  MAX_COMPARE,
  readCompareIds,
  writeCompareIds,
} from "@/lib/compare";

export function AddToCompare({ id }: { id: string }) {
  const router = useRouter();
  const [inList, setInList] = useState(false);

  useEffect(() => {
    setInList(readCompareIds().includes(id));
  }, [id]);

  function toggle() {
    const ids = readCompareIds();
    if (ids.includes(id)) {
      writeCompareIds(ids.filter((x) => x !== id));
      setInList(false);
    } else {
      if (ids.length >= MAX_COMPARE) return;
      writeCompareIds([...ids, id]);
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
