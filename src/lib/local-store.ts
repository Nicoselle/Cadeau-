"use client";

import { useCallback, useEffect, useState } from "react";
import type { EntrepreneurStory, Subscription } from "@/types/local";

const SUB_KEY = "kapitaalkrant.abonnement";
const STORIES_KEY = "kapitaalkrant.verhalen";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function useLocalSubscription() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSubscription(readJson<Subscription | null>(SUB_KEY, null));
    setReady(true);
  }, []);

  const save = useCallback(async (plaatsen: string[], email?: string) => {
    const next: Subscription = {
      plaatsen: [...new Set(plaatsen)],
      email: email?.trim() || undefined,
      updated: new Date().toISOString(),
    };
    window.localStorage.setItem(SUB_KEY, JSON.stringify(next));
    setSubscription(next);
    await fetch("/api/v1/lokaal/abonneren", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
    return next;
  }, []);

  const clear = useCallback(() => {
    window.localStorage.removeItem(SUB_KEY);
    setSubscription(null);
  }, []);

  return { subscription, ready, save, clear };
}

export function useLocalStories() {
  const [stories, setStories] = useState<EntrepreneurStory[]>([]);

  useEffect(() => {
    setStories(readJson<EntrepreneurStory[]>(STORIES_KEY, []));
  }, []);

  const remember = useCallback((story: EntrepreneurStory) => {
    setStories((current) => {
      const next = [story, ...current.filter((item) => item.id !== story.id)];
      window.localStorage.setItem(STORIES_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { stories, remember };
}
