import { useState } from "react";
import { useApp } from "@/contexts/AppContext";

type ProgressTab = "daily" | "weekly" | "monthly";

export const ProgressScreen = () => {
  const { appState } = useApp();
  const { state, totalCalories } = appState;
  const [tab, setTab] = useState<ProgressTab>("daily");

  const completedHabits = Object.values(state.dailyLog.habits).filter(Boolean).length;
  const totalHabits = 5;
  const adherence = Math.round((completedHabits / totalHabits) * 100);

  return (
    <div className="screen-content space-y-4 animate-fade-in">
      <h2 className="text-xl font-heading font-bold text-foreground">📈 Progresso</h2>

      <div className="flex gap-2">
        {(["daily", "weekly", "monthly"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`filter-chip flex-1 text-center ${tab === t ? "filter-chip-active" : "filter-chip-inactive"}`}>
            {{ daily: "Diário", weekly: "Semanal", monthly: "Mensal" }[t]}
          </button>
        ))}
      </div>

      {/* Weight chart placeholder */}
      <div className="card-elevated">
        <h3 className="font-bold text-foreground mb-3">⚖️ Peso</h3>
        <div className="flex items-end gap-1 h-32">
          {state.weightHistory.slice(-7).map((w, i) => {
            const min = Math.min(...state.weightHistory.map(wh => wh.weight));
            const max = Math.max(...state.weightHistory.map(wh => wh.weight));
            const range = max - min || 1;
            const height = ((w.weight - min) / range) * 80 + 20;
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-muted-foreground font-medium">{w.weight}</span>
                <div className="w-full rounded-t-lg bg-gradient-to-t from-primary to-primary-light" style={{ height: `${height}%` }} />
                <span className="text-xs text-muted-foreground">{w.date.slice(8)}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Today's stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card-elevated text-center">
          <p className="text-3xl font-bold text-primary">{state.dailyLog.water}</p>
          <p className="text-xs text-muted-foreground mt-1">ml de água</p>
          <div className="progress-bar mt-2">
            <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-500" style={{ width: `${Math.min(100, (state.dailyLog.water / 2000) * 100)}%` }} />
          </div>
        </div>
        <div className="card-elevated text-center">
          <p className="text-3xl font-bold text-accent">{totalCalories}</p>
          <p className="text-xs text-muted-foreground mt-1">kcal consumidas</p>
          <div className="progress-bar mt-2">
            <div className="h-full rounded-full bg-gradient-to-r from-orange-400 to-accent" style={{ width: `${Math.min(100, (totalCalories / 1500) * 100)}%` }} />
          </div>
        </div>
        <div className="card-elevated text-center">
          <p className="text-3xl font-bold text-primary">{state.dailyLog.exercisesDone.length}</p>
          <p className="text-xs text-muted-foreground mt-1">exercícios feitos</p>
        </div>
        <div className="card-elevated text-center">
          <p className="text-3xl font-bold text-primary">{state.dailyLog.teasDrunk.length}</p>
          <p className="text-xs text-muted-foreground mt-1">chás tomados</p>
        </div>
      </div>

      {/* Adherence */}
      <div className="card-highlight">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-foreground">Adesão Geral</h3>
          <span className="text-2xl font-bold text-primary">{adherence}%</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${adherence}%` }} />
        </div>
        <p className="text-xs text-muted-foreground mt-2">{completedHabits} de {totalHabits} hábitos concluídos hoje</p>
      </div>

      {/* Habits summary */}
      <div className="card-elevated">
        <h3 className="font-bold text-foreground mb-3">✅ Hábitos de Hoje</h3>
        {[
          { label: "Chá", done: state.dailyLog.habits.tea, emoji: "🍵" },
          { label: "Água", done: state.dailyLog.habits.water, emoji: "💧" },
          { label: "Exercício", done: state.dailyLog.habits.exercise, emoji: "🏋️" },
          { label: "Planejamento", done: state.dailyLog.habits.plan, emoji: "📋" },
          { label: "Ansiedade", done: state.dailyLog.habits.anxiety, emoji: "🧘" },
        ].map(h => (
          <div key={h.label} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
            <div className="flex items-center gap-2">
              <span>{h.emoji}</span>
              <span className="text-sm text-foreground">{h.label}</span>
            </div>
            <div className={`w-5 h-5 rounded-full ${h.done ? "bg-primary" : "bg-muted"} flex items-center justify-center`}>
              {h.done && <span className="text-primary-foreground text-xs">✓</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
