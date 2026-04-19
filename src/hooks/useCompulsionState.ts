import { useCallback, useEffect, useState } from "react";

export interface DiaryEntry {
  id: string;
  date: string;
  emotion: string;
  trigger: string;
  cravingLevel: number;
  ate: "yes" | "no" | "partial";
  action: string;
  afterFeeling: string;
}

export interface CompulsionState {
  favorites: string[];
  helpedItems: string[];
  diary: DiaryEntry[];
  selectedTriggers: string[];
  lastMood: string | null;
  antiCrisisCompleted: number;
  breathingCompleted: number;
}

const DEFAULT_STATE: CompulsionState = {
  favorites: [],
  helpedItems: [],
  diary: [],
  selectedTriggers: [],
  lastMood: null,
  antiCrisisCompleted: 0,
  breathingCompleted: 0,
};

const STORAGE_KEY = "formula-compulsion";

function loadState(): CompulsionState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...DEFAULT_STATE, ...JSON.parse(saved) };
  } catch {
    /* ignore */
  }
  return DEFAULT_STATE;
}

export function useCompulsionState() {
  const [state, setState] = useState<CompulsionState>(loadState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore quota errors */
    }
  }, [state]);

  const toggleFavorite = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      favorites: s.favorites.includes(id)
        ? s.favorites.filter((f) => f !== id)
        : [...s.favorites, id],
    }));
  }, []);

  const toggleHelped = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      helpedItems: s.helpedItems.includes(id)
        ? s.helpedItems.filter((f) => f !== id)
        : [...s.helpedItems, id],
    }));
  }, []);

  const toggleTrigger = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      selectedTriggers: s.selectedTriggers.includes(id)
        ? s.selectedTriggers.filter((f) => f !== id)
        : [...s.selectedTriggers, id],
    }));
  }, []);

  const setMood = useCallback((mood: string) => {
    setState((s) => ({ ...s, lastMood: mood }));
  }, []);

  const addDiaryEntry = useCallback((entry: Omit<DiaryEntry, "id" | "date">) => {
    setState((s) => ({
      ...s,
      diary: [
        {
          ...entry,
          id: `d-${Date.now()}`,
          date: new Date().toISOString(),
        },
        ...s.diary,
      ],
    }));
  }, []);

  const removeDiaryEntry = useCallback((id: string) => {
    setState((s) => ({ ...s, diary: s.diary.filter((d) => d.id !== id) }));
  }, []);

  const incrementAntiCrisis = useCallback(() => {
    setState((s) => ({ ...s, antiCrisisCompleted: s.antiCrisisCompleted + 1 }));
  }, []);

  const incrementBreathing = useCallback(() => {
    setState((s) => ({ ...s, breathingCompleted: s.breathingCompleted + 1 }));
  }, []);

  return {
    state,
    toggleFavorite,
    toggleHelped,
    toggleTrigger,
    setMood,
    addDiaryEntry,
    removeDiaryEntry,
    incrementAntiCrisis,
    incrementBreathing,
  };
}
