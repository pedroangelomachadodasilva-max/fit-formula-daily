import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { ArrowLeft, ChevronRight } from "lucide-react";

type ProgressTab = "daily" | "weekly" | "monthly";

const dayLabels = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const WeeklyBarChart = ({ todayScore }: { todayScore: number }) => {
  // Real weekly data: only today has data (from current state); other days are 0 until the user logs activity.
  // When persistence is added later, replace this with real per-day history.
  const todayIdx = new Date().getDay(); // 0=Dom..6=Sáb
  const order = [1, 2, 3, 4, 5, 6, 0]; // Seg..Dom
  const weekData = order.map(d => ({
    day: dayLabels[d],
    score: d === todayIdx ? todayScore : 0,
  }));
  const hasAnyData = weekData.some(d => d.score > 0);

  return (
    <div className="card-elevated">
      <h3 className="font-bold text-foreground mb-4">📊 Desempenho da Semana</h3>
      <div className="flex items-end gap-2 h-40">
        {weekData.map((d) => {
          const height = d.score; // 0..100 used directly as % of container
          const isGood = d.score >= 70;
          return (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1 h-full">
              <span className={`text-xs font-semibold ${d.score > 0 ? "text-foreground" : "text-muted-foreground/50"}`}>{d.score}%</span>
              <div className="w-full flex-1 flex items-end">
                <div
                  className={`w-full rounded-t-lg transition-all ${
                    d.score === 0
                      ? "bg-muted/40"
                      : isGood
                        ? "bg-gradient-to-t from-primary to-primary-light"
                        : "bg-gradient-to-t from-accent/60 to-accent/40"
                  }`}
                  style={{ height: d.score === 0 ? "4px" : `${height}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground font-medium">{d.day}</span>
            </div>
          );
        })}
      </div>
      {!hasAnyData && (
        <p className="text-xs text-muted-foreground text-center mt-3">
          Marque suas atividades durante a semana para ver seu desempenho aqui.
        </p>
      )}
    </div>
  );
};

const MonthlyView = ({ onBack }: { onBack: () => void }) => {
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  const weeks = [
    { week: 1, label: "Semana 1 (1-7)", score: 72, details: { water: 85, calories: 70, exercise: 60, tea: 80, habits: 65 } },
    { week: 2, label: "Semana 2 (8-14)", score: 78, details: { water: 90, calories: 75, exercise: 70, tea: 85, habits: 70 } },
    { week: 3, label: "Semana 3 (15-21)", score: 65, details: { water: 70, calories: 60, exercise: 55, tea: 75, habits: 60 } },
    { week: 4, label: "Semana 4 (22-28)", score: 82, details: { water: 92, calories: 80, exercise: 75, tea: 88, habits: 78 } },
  ];

  if (selectedWeek !== null) {
    const w = weeks[selectedWeek];
    return (
      <div className="screen-content animate-slide-up space-y-4">
        <button onClick={() => setSelectedWeek(null)} className="flex items-center gap-2 text-primary mb-2">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>
        <h2 className="text-xl font-heading font-bold text-foreground">{w.label}</h2>
        <div className="card-highlight text-center">
          <p className="text-xs text-muted-foreground">Adesão geral</p>
          <p className="text-3xl font-bold text-primary">{w.score}%</p>
        </div>
        <div className="space-y-3">
          {[
            { label: "💧 Água", val: w.details.water },
            { label: "🔥 Calorias", val: w.details.calories },
            { label: "🏋️ Exercícios", val: w.details.exercise },
            { label: "🍵 Chás", val: w.details.tea },
            { label: "✅ Hábitos", val: w.details.habits },
          ].map(item => (
            <div key={item.label} className="card-elevated">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{item.label}</span>
                <span className="text-sm font-bold text-primary">{item.val}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${item.val}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="screen-content animate-slide-up space-y-4">
      <button onClick={onBack} className="flex items-center gap-2 text-primary mb-2">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </button>
      <h2 className="text-xl font-heading font-bold text-foreground">📅 Desempenho Mensal</h2>
      <div className="space-y-3">
        {weeks.map((w, i) => (
          <button key={w.week} onClick={() => setSelectedWeek(i)} className="card-elevated w-full text-left flex items-center justify-between active:scale-[0.98] transition-transform">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm ${w.score >= 75 ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                {w.score}%
              </div>
              <div>
                <p className="font-bold text-foreground text-sm">{w.label}</p>
                <p className="text-xs text-muted-foreground">Toque para ver detalhes</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  );
};

export const ProgressScreen = () => {
  const { appState } = useApp();
  const { state, totalCalories } = appState;
  const [tab, setTab] = useState<ProgressTab>("daily");
  const [showMonthly, setShowMonthly] = useState(false);

  if (showMonthly) return <MonthlyView onBack={() => setShowMonthly(false)} />;

  const completedHabits = Object.values(state.dailyLog.habits).filter(Boolean).length;
  const totalHabits = 5;
  const adherence = Math.round((completedHabits / totalHabits) * 100);

  return (
    <div className="screen-content space-y-4 animate-fade-in">
      <h2 className="text-xl font-heading font-bold text-foreground">📈 Progresso</h2>

      <div className="flex gap-2">
        {(["daily", "weekly"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={`filter-chip flex-1 text-center ${tab === t ? "filter-chip-active" : "filter-chip-inactive"}`}>
            {{ daily: "Diário", weekly: "Semanal" }[t]}
          </button>
        ))}
      </div>

      {tab === "weekly" && <WeeklyBarChart todayScore={adherence} />}

      {/* Weight chart */}
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
            <div className="h-full rounded-full bg-gradient-to-r from-orange-400 to-accent" style={{ width: `${Math.min(100, (totalCalories / (state.calorieGoal || 1500)) * 100)}%` }} />
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

      {/* Monthly link */}
      <button onClick={() => setShowMonthly(true)} className="card-elevated w-full text-left flex items-center justify-between active:scale-[0.98] transition-transform">
        <div>
          <p className="font-bold text-foreground text-sm">📅 Ver desempenho mensal</p>
          <p className="text-xs text-muted-foreground mt-1">Analise seu progresso por semana</p>
        </div>
        <ChevronRight className="w-5 h-5 text-primary" />
      </button>
    </div>
  );
};
