import { X, Check, Heart } from "lucide-react";
import placeholder from "@/assets/skin/general/placeholder-skin.jpg";
import type { SkinExercise } from "@/data/skinExercises";
import type { SkinRecipe } from "@/data/skinRecipes";

type Props =
  | {
      kind: "exercise";
      exercise: SkinExercise;
      done: boolean;
      onToggleDone: () => void;
      onClose: () => void;
    }
  | {
      kind: "recipe";
      recipe: SkinRecipe;
      favorite: boolean;
      onToggleFavorite: () => void;
      onClose: () => void;
    };

export const SkinDetailModal = (props: Props) => {
  return (
    <div
      className="fixed inset-0 z-[60] bg-black/60 flex items-end sm:items-center justify-center animate-fade-in"
      onClick={props.onClose}
    >
      <div
        className="bg-background w-full sm:max-w-md max-h-[92vh] rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[4/3] bg-muted">
          <img
            src={props.kind === "exercise" ? props.exercise.image : props.recipe.image}
            alt={props.kind === "exercise" ? props.exercise.name : props.recipe.name}
            width={768}
            height={576}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = placeholder;
            }}
          />
          <button
            onClick={props.onClose}
            aria-label="Fechar"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-card/90 flex items-center justify-center"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        <div className="overflow-y-auto px-4 py-4 space-y-3">
          {props.kind === "exercise" ? (
            <ExerciseBody {...props} />
          ) : (
            <RecipeBody {...props} />
          )}
        </div>
      </div>
    </div>
  );
};

const ExerciseBody = ({
  exercise,
  done,
  onToggleDone,
}: {
  exercise: SkinExercise;
  done: boolean;
  onToggleDone: () => void;
}) => (
  <>
    <div>
      <h3 className="font-heading font-bold text-foreground text-lg">{exercise.name}</h3>
      <p className="text-xs text-muted-foreground mt-0.5">
        {exercise.area} • {exercise.level} • {exercise.duration} • {exercise.equipment}
      </p>
    </div>

    <div className="card-highlight">
      <p className="text-xs font-bold text-primary uppercase tracking-wide mb-1">Benefícios</p>
      <ul className="space-y-1">
        {exercise.benefits.map((b) => (
          <li key={b} className="text-sm text-foreground flex gap-2">
            <span className="text-primary">→</span>
            {b}
          </li>
        ))}
      </ul>
    </div>

    <div>
      <p className="text-xs font-bold text-primary uppercase tracking-wide mb-1.5">Passo a passo</p>
      <ol className="space-y-1.5">
        {exercise.steps.map((s, i) => (
          <li key={s} className="text-sm text-foreground flex gap-2">
            <span className="font-bold text-primary shrink-0">{i + 1}.</span>
            <span>{s}</span>
          </li>
        ))}
      </ol>
    </div>

    <div className="bg-muted rounded-xl p-3">
      <p className="text-xs font-bold text-foreground">Séries sugeridas</p>
      <p className="text-sm text-foreground mt-0.5">{exercise.suggestedSets}</p>
    </div>

    <div>
      <p className="text-xs font-bold text-accent uppercase tracking-wide mb-1.5">Erros comuns</p>
      <ul className="space-y-1">
        {exercise.commonMistakes.map((m) => (
          <li key={m} className="text-sm text-foreground flex gap-2">
            <span className="text-accent">×</span>
            {m}
          </li>
        ))}
      </ul>
    </div>

    <div className="bg-accent/10 border border-accent/20 rounded-xl p-3">
      <p className="text-xs font-bold text-accent uppercase tracking-wide mb-1">Cuidados</p>
      <ul className="space-y-1">
        {exercise.cautions.map((c) => (
          <li key={c} className="text-sm text-foreground">• {c}</li>
        ))}
      </ul>
    </div>

    <button
      onClick={onToggleDone}
      className={`w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 ${
        done ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"
      }`}
    >
      <Check className="w-4 h-4" />
      {done ? "Feito hoje ✓" : "Marcar como feito"}
    </button>
  </>
);

const RecipeBody = ({
  recipe,
  favorite,
  onToggleFavorite,
}: {
  recipe: SkinRecipe;
  favorite: boolean;
  onToggleFavorite: () => void;
}) => (
  <>
    <div>
      <h3 className="font-heading font-bold text-foreground text-lg">{recipe.name}</h3>
      <p className="text-xs text-muted-foreground mt-0.5">{recipe.category}</p>
      <p className="text-sm text-foreground mt-2 leading-relaxed">{recipe.description}</p>
    </div>

    <div className="grid grid-cols-4 gap-2">
      <div className="bg-muted rounded-xl p-2 text-center">
        <p className="text-[10px] text-muted-foreground uppercase">Kcal</p>
        <p className="text-sm font-bold text-foreground">{recipe.calories}</p>
      </div>
      <div className="bg-muted rounded-xl p-2 text-center">
        <p className="text-[10px] text-muted-foreground uppercase">Carbs</p>
        <p className="text-sm font-bold text-foreground">{recipe.carbs}g</p>
      </div>
      <div className="bg-muted rounded-xl p-2 text-center">
        <p className="text-[10px] text-muted-foreground uppercase">Prot.</p>
        <p className="text-sm font-bold text-foreground">{recipe.protein}g</p>
      </div>
      <div className="bg-muted rounded-xl p-2 text-center">
        <p className="text-[10px] text-muted-foreground uppercase">Gord.</p>
        <p className="text-sm font-bold text-foreground">{recipe.fat}g</p>
      </div>
    </div>

    <div>
      <p className="text-xs font-bold text-primary uppercase tracking-wide mb-1.5">Ingredientes</p>
      <ul className="space-y-1">
        {recipe.ingredients.map((i) => (
          <li key={i} className="text-sm text-foreground">• {i}</li>
        ))}
      </ul>
    </div>

    <div>
      <p className="text-xs font-bold text-primary uppercase tracking-wide mb-1.5">Modo de preparo</p>
      <p className="text-sm text-foreground leading-relaxed">{recipe.preparation}</p>
    </div>

    <div className="card-highlight">
      <p className="text-xs font-bold text-primary uppercase tracking-wide mb-1">Benefício principal</p>
      <p className="text-sm text-foreground leading-relaxed">{recipe.mainBenefit}</p>
    </div>

    {recipe.notes && (
      <p className="text-xs text-muted-foreground italic leading-relaxed">💡 {recipe.notes}</p>
    )}
    {recipe.cautions && (
      <div className="bg-accent/10 border border-accent/20 rounded-xl p-3">
        <p className="text-xs text-foreground">
          <span className="font-bold text-accent">⚠️ Atenção: </span>
          {recipe.cautions}
        </p>
      </div>
    )}

    <p className="text-[11px] text-muted-foreground italic text-center">
      Valores nutricionais aproximados. Podem variar conforme marcas, porções e modo de preparo.
    </p>

    <button
      onClick={onToggleFavorite}
      className={`w-full py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 ${
        favorite ? "bg-accent/10 text-accent" : "bg-muted text-foreground"
      }`}
    >
      <Heart className={`w-4 h-4 ${favorite ? "fill-current" : ""}`} />
      {favorite ? "Favorita" : "Favoritar"}
    </button>
  </>
);
