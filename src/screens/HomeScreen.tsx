import { Droplets, Scale, Flame, BookOpen, Check, Pencil } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { teas } from "@/data/teas";
import { useState } from "react";
import { FoodImage } from "@/components/FoodImage";

export const HomeScreen = () => {
  const { appState, setActiveTab, setSubScreen } = useApp();
  const { state, addWater, setWeight, totalCalories, markTeaDrunk } = appState;
  const todayTea = teas[new Date().getDay() % teas.length];
  const [weightInput, setWeightInput] = useState("");
  const [showWeightInput, setShowWeightInput] = useState(false);
  const [showCalorieEdit, setShowCalorieEdit] = useState(false);
  const [calorieGoalInput, setCalorieGoalInput] = useState("");
  const calorieGoal = state.calorieGoal || 1500;

  return (
    <div className="screen-content space-y-4 animate-fade-in">
      <div className="pt-2">
        <h2 className="text-2xl font-heading font-bold text-foreground">
          Olá, {state.profile.name}! 👋
        </h2>
        <p className="text-muted-foreground text-sm mt-1">Como está seu dia hoje?</p>
      </div>

      {/* Tea of the day */}
      <div className="card-highlight">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs font-medium text-primary uppercase tracking-wider">Chá do dia</p>
            <h3 className="font-bold text-foreground mt-1">{todayTea.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{todayTea.shortDescription}</p>
            <p className="text-xs text-muted-foreground mt-2">⏰ {todayTea.recommendedTime}</p>
          </div>
          <FoodImage src={todayTea.image} alt={todayTea.name} size="lg" />
        </div>
        <div className="flex gap-2 mt-3">
          <button onClick={() => setActiveTab("tea")} className="flex-1 text-xs font-medium py-2 rounded-xl bg-card text-foreground">
            Ver receita
          </button>
          <button
            onClick={() => markTeaDrunk(todayTea.id)}
            className={`flex-1 text-xs font-medium py-2 rounded-xl flex items-center justify-center gap-1 ${
              state.dailyLog.teasDrunk.includes(todayTea.id) ? "bg-primary text-primary-foreground" : "bg-primary/20 text-primary"
            }`}
          >
            <Check className="w-3 h-3" />
            {state.dailyLog.teasDrunk.includes(todayTea.id) ? "Tomado!" : "Marcar"}
          </button>
        </div>
      </div>

      {/* Planning card */}
      <div className="card-elevated">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-foreground">Planejamento do Dia</h3>
          </div>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">Dia {(new Date().getDate() % 14) + 1}</span>
        </div>
        <button
          onClick={() => { setActiveTab("meals"); setSubScreen("planning"); }}
          className="w-full text-sm font-medium py-2.5 rounded-xl bg-primary/10 text-primary"
        >
          Abrir planejamento completo
        </button>
      </div>

      {/* Weight */}
      <div className="card-elevated">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-accent" />
            <h3 className="font-bold text-foreground">Peso Hoje</h3>
          </div>
          <span className="text-lg font-bold text-foreground">
            {state.dailyLog.weight ? `${state.dailyLog.weight} kg` : "—"}
          </span>
        </div>
        {showWeightInput ? (
          <div className="flex gap-2 mt-3">
            <input type="number" value={weightInput} onChange={e => setWeightInput(e.target.value)} placeholder="Ex: 73.5" className="flex-1 px-3 py-2 rounded-xl bg-muted text-foreground text-sm border-0 outline-none" />
            <button onClick={() => { if (weightInput) { setWeight(parseFloat(weightInput)); setShowWeightInput(false); setWeightInput(""); } }} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
              Salvar
            </button>
          </div>
        ) : (
          <button onClick={() => setShowWeightInput(true)} className="mt-3 w-full text-sm font-medium py-2 rounded-xl bg-accent/10 text-accent">
            Registrar peso
          </button>
        )}
      </div>

      {/* Water */}
      <div className="card-elevated">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-blue-500" />
            <h3 className="font-bold text-foreground">Água</h3>
          </div>
          <span className="text-sm font-semibold text-foreground">{state.dailyLog.water} / 2000 ml</span>
        </div>
        <div className="progress-bar mb-3">
          <div className="progress-fill bg-gradient-to-r from-blue-400 to-blue-500" style={{ width: `${Math.min(100, (state.dailyLog.water / 2000) * 100)}%` }} />
        </div>
        <div className="flex gap-2">
          {[200, 300, 500].map(ml => (
            <button key={ml} onClick={() => addWater(ml)} className="flex-1 text-xs font-medium py-2 rounded-xl bg-blue-50 text-blue-600 active:bg-blue-100">
              +{ml}ml
            </button>
          ))}
        </div>
      </div>

      {/* Calories */}
      <div className="card-elevated">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <h3 className="font-bold text-foreground">Calorias do Dia</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground">{totalCalories} / {calorieGoal} kcal</span>
            <button onClick={() => { setShowCalorieEdit(!showCalorieEdit); setCalorieGoalInput(calorieGoal.toString()); }} className="p-1 rounded-lg hover:bg-muted">
              <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>
        </div>
        {showCalorieEdit && (
          <div className="flex gap-2 mb-3">
            <input type="number" value={calorieGoalInput} onChange={e => setCalorieGoalInput(e.target.value)} className="flex-1 px-3 py-2 rounded-xl bg-muted text-foreground text-sm outline-none" placeholder="Meta kcal" />
            <button onClick={() => { if (calorieGoalInput) { appState.setCalorieGoal(parseInt(calorieGoalInput)); setShowCalorieEdit(false); } }} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
              Salvar
            </button>
          </div>
        )}
        <div className="progress-bar mb-3">
          <div className="h-full rounded-full bg-gradient-to-r from-orange-400 to-accent transition-all duration-500" style={{ width: `${Math.min(100, (totalCalories / calorieGoal) * 100)}%` }} />
        </div>
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            { label: "Café", val: state.dailyLog.calories.breakfast },
            { label: "Almoço", val: state.dailyLog.calories.lunch },
            { label: "Lanche", val: state.dailyLog.calories.snack },
            { label: "Jantar", val: state.dailyLog.calories.dinner },
          ].map(m => (
            <div key={m.label} className="bg-muted rounded-xl py-2">
              <p className="text-xs text-muted-foreground">{m.label}</p>
              <p className="text-sm font-bold text-foreground">{m.val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Daily habits checklist */}
      <div className="card-elevated">
        <h3 className="font-bold text-foreground mb-3">Hábitos do Dia</h3>
        <div className="space-y-2">
          {[
            { key: "tea" as const, label: "Tomei meu chá", emoji: "🍵" },
            { key: "water" as const, label: "Bati meta de água", emoji: "💧" },
            { key: "exercise" as const, label: "Fiz exercício", emoji: "🏋️" },
            { key: "plan" as const, label: "Segui o planejamento", emoji: "📋" },
            { key: "anxiety" as const, label: "Controlei ansiedade alimentar", emoji: "🧘" },
          ].map(h => (
            <button
              key={h.key}
              onClick={() => appState.toggleHabit(h.key)}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-colors ${
                state.dailyLog.habits[h.key] ? "bg-primary/10" : "bg-muted"
              }`}
            >
              <span>{h.emoji}</span>
              <span className="text-sm font-medium text-foreground flex-1 text-left">{h.label}</span>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                state.dailyLog.habits[h.key] ? "bg-primary border-primary" : "border-muted-foreground/30"
              }`}>
                {state.dailyLog.habits[h.key] && <Check className="w-3 h-3 text-primary-foreground" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick shortcuts */}
      <div>
        <h3 className="section-title mb-3">Atalhos</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Refeições", icon: "🍽️", action: () => setActiveTab("meals") },
            { label: "Planejamento", icon: "📋", action: () => { setActiveTab("meals"); setSubScreen("planning"); } },
            { label: "Scanner", icon: "📸", action: () => setActiveTab("camera") },
            { label: "Exercícios", icon: "💪", action: () => setActiveTab("exercises") },
            { label: "Progresso", icon: "📈", action: () => setActiveTab("progress") },
            { label: "Upsells", icon: "🎁", action: () => setSubScreen("upsells") },
          ].map(s => (
            <button key={s.label} onClick={s.action} className="card-elevated flex flex-col items-center gap-2 py-4 active:scale-95 transition-transform">
              <span className="text-2xl">{s.icon}</span>
              <span className="text-xs font-medium text-foreground">{s.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
