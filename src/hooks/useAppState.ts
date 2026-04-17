import { useState, useEffect, useCallback } from "react";

interface DailyLog {
  date: string;
  water: number;
  weight: number | null;
  calories: { breakfast: number; lunch: number; snack: number; dinner: number };
  teasDrunk: string[];
  exercisesDone: string[];
  planDayCompleted: number | null;
  habits: { tea: boolean; water: boolean; exercise: boolean; plan: boolean; anxiety: boolean };
}

interface AppState {
  favorites: string[];
  dailyLog: DailyLog;
  weightHistory: { date: string; weight: number }[];
  calorieGoal: number;
  profile: {
    name: string; email: string; age: number; gender: string;
    height: number; initialWeight: number; goal: string; activityLevel: string;
    password?: string;
  };
  access: {
    main: boolean; doces: boolean; peleFlacida: boolean;
    subscriptionActive: boolean; subscriptionDueDate: string;
  };
}

const today = () => new Date().toISOString().split("T")[0];

const defaultDailyLog = (): DailyLog => ({
  date: today(),
  water: 0,
  weight: null,
  calories: { breakfast: 0, lunch: 0, snack: 0, dinner: 0 },
  teasDrunk: [],
  exercisesDone: [],
  planDayCompleted: null,
  habits: { tea: false, water: false, exercise: false, plan: false, anxiety: false }
});

const defaultState: AppState = {
  favorites: [],
  dailyLog: defaultDailyLog(),
  weightHistory: [
    { date: "2025-04-01", weight: 75 },
    { date: "2025-04-05", weight: 74.5 },
    { date: "2025-04-08", weight: 74.2 },
    { date: "2025-04-10", weight: 73.8 },
    { date: "2025-04-12", weight: 73.5 },
  ],
  calorieGoal: 1500,
  profile: {
    name: "Maria", email: "maria@email.com", age: 32, gender: "feminino",
    height: 165, initialWeight: 75, goal: "Perder 10kg", activityLevel: "moderado",
    password: "••••••••"
  },
  access: {
    main: true, doces: false, peleFlacida: false,
    subscriptionActive: true, subscriptionDueDate: "2025-05-14"
  }
};

function loadState(): AppState {
  try {
    const saved = localStorage.getItem("formula-emagrecer");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.dailyLog?.date !== today()) {
        parsed.dailyLog = defaultDailyLog();
      }
      return { ...defaultState, ...parsed };
    }
  } catch {}
  return defaultState;
}

export function useAppState() {
  const [state, setState] = useState<AppState>(loadState);

  useEffect(() => {
    localStorage.setItem("formula-emagrecer", JSON.stringify(state));
  }, [state]);

  const toggleFavorite = useCallback((id: string) => {
    setState(s => ({
      ...s,
      favorites: s.favorites.includes(id)
        ? s.favorites.filter(f => f !== id)
        : [...s.favorites, id]
    }));
  }, []);

  const addWater = useCallback((ml: number) => {
    setState(s => ({
      ...s,
      dailyLog: {
        ...s.dailyLog,
        water: s.dailyLog.water + ml,
        habits: { ...s.dailyLog.habits, water: s.dailyLog.water + ml >= 2000 }
      }
    }));
  }, []);

  const setWeight = useCallback((weight: number) => {
    setState(s => ({
      ...s,
      dailyLog: { ...s.dailyLog, weight },
      weightHistory: [
        ...s.weightHistory.filter(w => w.date !== today()),
        { date: today(), weight }
      ]
    }));
  }, []);

  const addCalories = useCallback((meal: "breakfast" | "lunch" | "snack" | "dinner", amount: number) => {
    setState(s => ({
      ...s,
      dailyLog: {
        ...s.dailyLog,
        calories: { ...s.dailyLog.calories, [meal]: s.dailyLog.calories[meal] + amount }
      }
    }));
  }, []);

  const markTeaDrunk = useCallback((teaId: string) => {
    // Allow registering multiple cups of the same tea
    setState(s => ({
      ...s,
      dailyLog: {
        ...s.dailyLog,
        teasDrunk: [...s.dailyLog.teasDrunk, teaId],
        habits: { ...s.dailyLog.habits, tea: true }
      }
    }));
  }, []);

  const markExerciseDone = useCallback((exId: string) => {
    setState(s => ({
      ...s,
      dailyLog: {
        ...s.dailyLog,
        exercisesDone: s.dailyLog.exercisesDone.includes(exId)
          ? s.dailyLog.exercisesDone
          : [...s.dailyLog.exercisesDone, exId],
        habits: { ...s.dailyLog.habits, exercise: true }
      }
    }));
  }, []);

  const toggleHabit = useCallback((habit: keyof DailyLog["habits"]) => {
    setState(s => ({
      ...s,
      dailyLog: {
        ...s.dailyLog,
        habits: { ...s.dailyLog.habits, [habit]: !s.dailyLog.habits[habit] }
      }
    }));
  }, []);

  const updateProfile = useCallback((profile: Partial<AppState["profile"]>) => {
    setState(s => ({ ...s, profile: { ...s.profile, ...profile } }));
  }, []);

  const setCalorieGoal = useCallback((goal: number) => {
    setState(s => ({ ...s, calorieGoal: goal }));
  }, []);

  const isFavorite = useCallback((id: string) => state.favorites.includes(id), [state.favorites]);

  const totalCalories = state.dailyLog.calories.breakfast + state.dailyLog.calories.lunch +
    state.dailyLog.calories.snack + state.dailyLog.calories.dinner;

  return {
    state, setState, toggleFavorite, addWater, setWeight, addCalories,
    markTeaDrunk, markExerciseDone, toggleHabit, updateProfile,
    isFavorite, totalCalories, setCalorieGoal
  };
}
