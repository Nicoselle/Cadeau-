"use client";

import { useCallback, useEffect, useState } from "react";
import { createEmptyRoster, loadRoster, STORAGE_KEY } from "@/lib/rooster";
import type { RosterState } from "@/types/rooster";

export function usePersistedRoster() {
  const [state, setState] = useState<RosterState>(createEmptyRoster);
  const [undoState, setUndoState] = useState<RosterState | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setState(loadRoster(window.localStorage.getItem(STORAGE_KEY)));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [ready, state]);

  const commit = useCallback((next: RosterState) => {
    setState((current) => {
      setUndoState(current);
      return next;
    });
  }, []);

  const undo = useCallback(() => {
    setUndoState((previous) => {
      if (previous) setState(previous);
      return null;
    });
  }, []);

  const reset = useCallback(() => {
    setState((current) => {
      setUndoState(current);
      return createEmptyRoster();
    });
  }, []);

  return { state, commit, undo, reset, canUndo: undoState !== null, ready };
}
