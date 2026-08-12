"use client";

import { useCallback, useEffect, useState } from "react";

export const STORAGE_KEY = "cadeau-compare";
export const MAX_COMPARE = 4;

export function readCompareIds(): string[] {
  if (typeof window === "undefined") return [];
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

export function writeCompareIds(ids: string[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // ignore storage write failures (private mode, quota, …)
  }
}

/**
 * Shared compare-selection state backed by localStorage.
 * `validIds` optionally restricts the selection to known product ids.
 */
export function useCompare(validIds?: string[]) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    let next = readCompareIds();
    if (validIds) next = next.filter((id) => validIds.includes(id));
    setIds(next.slice(0, MAX_COMPARE));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validIds?.join(",")]);

  useEffect(() => {
    writeCompareIds(ids);
  }, [ids]);

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_COMPARE) return prev;
      return [...prev, id];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setIds((prev) => prev.filter((x) => x !== id));
  }, []);

  const clear = useCallback(() => setIds([]), []);

  const isSelected = useCallback((id: string) => ids.includes(id), [ids]);

  return {
    ids,
    toggle,
    remove,
    clear,
    isSelected,
    isFull: ids.length >= MAX_COMPARE,
  };
}
