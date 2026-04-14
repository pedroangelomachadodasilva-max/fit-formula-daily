import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { exercises, exerciseBenefits, exerciseSafetyWarnings, Exercise } from "@/data/exercises";
import { Heart, Check, ArrowLeft, AlertTriangle } from "lucide-react";
import { FoodImage } from "@/components/FoodImage";

type ExFilter = "all" | "beginner" | "intermediate" | "advanced";
type MuscleFilter = "all" | "legs" | "abs" | "arms" | "full";

const ExerciseDetail = ({ exercise, onBack }: { exercise: Exercise; onBack: () => void }) => {
  const { appState } = useApp();
  const isDone = appState.state.dailyLog.exercisesDone.includes(exercise.id);

  return (
    <div className="screen-content animate-slide-up">
      <button onClick={onBack} className="flex items-center gap-2 text-primary mb-4">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </button>
      <div className="text-center mb-6">
        <FoodImage src={exercise.image} alt={exercise.name} size="xl" className="mx-auto" />
        <h2 className="text-xl font-heading font-bold mt-3 text-foreground">{exercise.name}</h2>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="badge-unlocked">{exercise.levelLabel}</span>
          <span className="text-sm text-muted-foreground">{exercise.sets}x{exercise.reps}</span>
        </div>
      </div>
      <div className="space-y-4">
        <div className="card-elevated">
          <h4 className="font-bold text-foreground mb-2">📖 Descrição</h4>
          <p className="text-sm text-muted-foreground">{exercise.description}</p>
        </div>
        <div className="card-elevated">
          <h4 className="font-bold text-foreground mb-2">💪 Músculos</h4>
          <div className="flex flex-wrap gap-2">
            {exercise.muscles.map(m => (
              <span key={m} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{m}</span>
            ))}
          </div>
        </div>
        <div className="card-elevated">
          <h4 className="font-bold text-foreground mb-2">⚠️ Erros Comuns</h4>
          {exercise.commonMistakes.map((m, i) => (
            <p key={i} className="text-sm text-muted-foreground">• {m}</p>
          ))}
        </div>
        <div className="card-elevated border-destructive/20">
          <h4 className="font-bold text-destructive mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Atenção
          </h4>
          {exercise.safetyNotes.map((n, i) => (
            <p key={i} className="text-sm text-muted-foreground">• {n}</p>
          ))}
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => appState.markExerciseDone(exercise.id)}
          className={`flex-1 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 ${isDone ? "bg-primary text-primary-foreground" : "bg-primary/20 text-primary"}`}
        >
          <Check className="w-4 h-4" /> {isDone ? "Feito!" : "Marcar como feito"}
        </button>
        <button onClick={() => appState.toggleFavorite(exercise.id)} className="w-14 rounded-2xl bg-muted flex items-center justify-center">
          <Heart className={`w-5 h-5 ${appState.isFavorite(exercise.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
        </button>
      </div>
    </div>
  );
};

export const ExercisesScreen = () => {
  const [level, setLevel] = useState<ExFilter>("all");
  const [muscle, setMuscle] = useState<MuscleFilter>("all");
  const [selected, setSelected] = useState<Exercise | null>(null);
  const [showSafety, setShowSafety] = useState(false);
  const { appState } = useApp();

  if (selected) return <ExerciseDetail exercise={selected} onBack={() => setSelected(null)} />;

  const filtered = exercises.filter(e => {
    if (level !== "all" && e.level !== level) return false;
    if (muscle !== "all" && e.muscleGroup !== muscle) return false;
    return true;
  });

  return (
    <div className="screen-content space-y-4 animate-fade-in">
      <h2 className="text-xl font-heading font-bold text-foreground">💪 Exercícios em Casa</h2>

      <button onClick={() => setShowSafety(!showSafety)} className="card-elevated w-full text-left border-accent/30">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-accent" />
          <span className="font-bold text-foreground text-sm">Avisos de Segurança</span>
        </div>
        {showSafety && (
          <div className="mt-2 animate-fade-in">
            {exerciseSafetyWarnings.map((w, i) => (
              <p key={i} className="text-xs text-muted-foreground">• {w}</p>
            ))}
          </div>
        )}
      </button>

      <div className="card-highlight">
        <h3 className="font-bold text-foreground text-sm mb-2">✨ Benefícios</h3>
        <div className="flex flex-wrap gap-2">
          {exerciseBenefits.map(b => (
            <span key={b} className="text-xs bg-card px-2 py-1 rounded-full text-foreground">{b}</span>
          ))}
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {([
          { id: "all" as ExFilter, label: "Todos" },
          { id: "beginner" as ExFilter, label: "Iniciante" },
          { id: "intermediate" as ExFilter, label: "Intermediário" },
          { id: "advanced" as ExFilter, label: "Avançado" },
        ]).map(f => (
          <button key={f.id} onClick={() => setLevel(f.id)} className={`filter-chip whitespace-nowrap ${level === f.id ? "filter-chip-active" : "filter-chip-inactive"}`}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {([
          { id: "all" as MuscleFilter, label: "Todos" },
          { id: "legs" as MuscleFilter, label: "🦵 Pernas" },
          { id: "abs" as MuscleFilter, label: "🎯 Abdômen" },
          { id: "arms" as MuscleFilter, label: "💪 Braços" },
          { id: "full" as MuscleFilter, label: "🏃 Corpo inteiro" },
        ]).map(f => (
          <button key={f.id} onClick={() => setMuscle(f.id)} className={`filter-chip whitespace-nowrap ${muscle === f.id ? "filter-chip-active" : "filter-chip-inactive"}`}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(ex => {
          const isDone = appState.state.dailyLog.exercisesDone.includes(ex.id);
          return (
            <button key={ex.id} onClick={() => setSelected(ex)} className="card-elevated w-full text-left flex items-center gap-3 active:scale-[0.98] transition-transform">
              <FoodImage src={ex.image} alt={ex.name} size="md" />
              <div className="flex-1">
                <h4 className="font-bold text-foreground text-sm">{ex.name}</h4>
                <p className="text-xs text-muted-foreground">{ex.levelLabel} • {ex.sets}x{ex.reps}</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {ex.muscles.slice(0, 2).map(m => (
                    <span key={m} className="text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{m}</span>
                  ))}
                </div>
              </div>
              {isDone && (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
