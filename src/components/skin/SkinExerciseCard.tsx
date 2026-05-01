import { Check, Info } from "lucide-react";
import placeholder from "@/assets/skin/general/placeholder-skin.jpg";
import type { SkinExercise } from "@/data/skinExercises";

interface Props {
  exercise: SkinExercise;
  done: boolean;
  onToggleDone: () => void;
  onOpenDetail: () => void;
}

export const SkinExerciseCard = ({ exercise, done, onToggleDone, onOpenDetail }: Props) => (
  <div className="card-elevated p-0 overflow-hidden">
    <div className="relative w-full aspect-square bg-muted">
      <img
        src={exercise.image}
        alt={exercise.name}
        loading="lazy"
        width={768}
        height={768}
        className="w-full h-full object-cover"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = placeholder;
        }}
      />
      <span className="absolute top-2 left-2 text-[10px] uppercase tracking-wide bg-card/90 text-foreground rounded-full px-2 py-0.5 font-bold">
        {exercise.level}
      </span>
    </div>
    <div className="p-3 space-y-2">
      <div>
        <p className="font-bold text-foreground text-sm leading-tight">{exercise.name}</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          {exercise.area} • {exercise.duration}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onOpenDetail}
          className="flex-1 py-2 rounded-xl bg-muted text-foreground text-xs font-medium flex items-center justify-center gap-1"
        >
          <Info className="w-3.5 h-3.5" /> Ver passo a passo
        </button>
        <button
          onClick={onToggleDone}
          aria-label={done ? "Desmarcar exercício" : "Marcar exercício como feito"}
          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-colors ${
            done ? "bg-primary text-primary-foreground" : "bg-accent/10 text-accent"
          }`}
        >
          <Check className="w-3.5 h-3.5" /> {done ? "Feito" : "Marcar"}
        </button>
      </div>
    </div>
  </div>
);
