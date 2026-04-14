import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { lowCarbRecipes, Recipe } from "@/data/lowCarb";
import { salads } from "@/data/salads";
import { marmitaRecipes, desserts } from "@/data/marmitas";
import { mealPlanDays, allowedFoods, avoidFoods } from "@/data/mealPlan";
import { teas } from "@/data/teas";
import { Heart, ArrowLeft, Lock, Check, ChevronRight } from "lucide-react";
import { FoodImage } from "@/components/FoodImage";

type MealFilter = "all" | "breakfast" | "lunch" | "snack" | "dinner" | "lowcarb" | "dessert" | "tea";

const filters: { id: MealFilter; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "breakfast", label: "Café" },
  { id: "lunch", label: "Almoço" },
  { id: "snack", label: "Lanche" },
  { id: "dinner", label: "Jantar" },
  { id: "lowcarb", label: "Low Carb" },
  { id: "dessert", label: "Doces" },
  { id: "tea", label: "Chá" },
];

const RecipeCard = ({ recipe, onSelect }: { recipe: Recipe; onSelect: () => void }) => {
  const { appState } = useApp();
  return (
    <button onClick={onSelect} className="card-elevated w-full text-left flex items-center gap-3 active:scale-[0.98] transition-transform">
      <FoodImage src={recipe.image} alt={recipe.name} size="md" />
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-foreground text-sm">{recipe.name}</h4>
        <p className="text-xs text-muted-foreground">{recipe.categoryLabel} • {recipe.time}</p>
        {recipe.calories && <p className="text-xs text-primary mt-1">{recipe.calories} kcal</p>}
      </div>
      <button onClick={e => { e.stopPropagation(); appState.toggleFavorite(recipe.id); }} className="p-2">
        <Heart className={`w-4 h-4 ${appState.isFavorite(recipe.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
      </button>
    </button>
  );
};

const RecipeDetail = ({ recipe, onBack }: { recipe: Recipe; onBack: () => void }) => {
  const { appState } = useApp();
  return (
    <div className="screen-content animate-slide-up">
      <button onClick={onBack} className="flex items-center gap-2 text-primary mb-4">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </button>
      <div className="text-center mb-6">
        <FoodImage src={recipe.image} alt={recipe.name} size="xl" className="mx-auto" />
        <h2 className="text-xl font-heading font-bold mt-3 text-foreground">{recipe.name}</h2>
        <div className="flex items-center justify-center gap-3 mt-2">
          <span className="badge-unlocked">{recipe.categoryLabel}</span>
          <span className="text-sm text-muted-foreground">⏱️ {recipe.time}</span>
          <span className="text-sm text-muted-foreground">🍽️ {recipe.servings}</span>
        </div>
      </div>
      {recipe.calories && (
        <div className="card-highlight mb-4 grid grid-cols-4 gap-2 text-center">
          <div><p className="text-xs text-muted-foreground">Calorias</p><p className="font-bold text-foreground">{recipe.calories}</p></div>
          <div><p className="text-xs text-muted-foreground">Carbs</p><p className="font-bold text-foreground">{recipe.carbs}g</p></div>
          <div><p className="text-xs text-muted-foreground">Proteína</p><p className="font-bold text-foreground">{recipe.protein}g</p></div>
          <div><p className="text-xs text-muted-foreground">Gordura</p><p className="font-bold text-foreground">{recipe.fat}g</p></div>
        </div>
      )}
      <div className="space-y-4">
        <div className="card-elevated">
          <h4 className="font-bold text-foreground mb-2">📝 Ingredientes</h4>
          <ul className="space-y-1">
            {recipe.ingredients.map((i, idx) => (
              <li key={idx} className="text-sm text-muted-foreground flex gap-2"><span className="text-primary">•</span>{i}</li>
            ))}
          </ul>
        </div>
        <div className="card-elevated">
          <h4 className="font-bold text-foreground mb-2">👨‍🍳 Modo de Preparo</h4>
          <p className="text-sm text-muted-foreground">{recipe.preparation}</p>
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <button onClick={() => appState.addCalories("lunch", recipe.calories || 300)} className="flex-1 py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-sm">
          + Adicionar calorias
        </button>
        <button onClick={() => appState.toggleFavorite(recipe.id)} className="w-14 rounded-2xl bg-muted flex items-center justify-center">
          <Heart className={`w-5 h-5 ${appState.isFavorite(recipe.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
        </button>
      </div>
    </div>
  );
};

const PlanningView = ({ onBack }: { onBack: () => void }) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [subView, setSubView] = useState<"days" | "allowed" | "avoid">("days");

  if (selectedDay !== null) {
    const day = mealPlanDays[selectedDay];
    return (
      <div className="screen-content animate-slide-up">
        <button onClick={() => setSelectedDay(null)} className="flex items-center gap-2 text-primary mb-4">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>
        <h2 className="text-xl font-heading font-bold text-foreground mb-4">Dia {day.day}</h2>
        <div className="space-y-3">
          {[
            { label: "☀️ Café da manhã", val: day.breakfast },
            { label: "🍽️ Almoço", val: day.lunch },
            { label: "🍎 Lanche", val: day.snack },
            { label: "🌙 Jantar", val: day.dinner },
          ].map(m => (
            <div key={m.label} className="card-elevated">
              <h4 className="font-bold text-foreground text-sm mb-1">{m.label}</h4>
              <p className="text-sm text-muted-foreground">{m.val}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="screen-content animate-slide-up">
      <button onClick={onBack} className="flex items-center gap-2 text-primary mb-4">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </button>
      <h2 className="text-xl font-heading font-bold text-foreground mb-4">📋 Planejamento de 14 Dias</h2>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {(["days", "allowed", "avoid"] as const).map(v => (
          <button key={v} onClick={() => setSubView(v)} className={`filter-chip whitespace-nowrap ${subView === v ? "filter-chip-active" : "filter-chip-inactive"}`}>
            {v === "days" ? "Dias" : v === "allowed" ? "O que comer" : "O que evitar"}
          </button>
        ))}
      </div>

      {subView === "days" && (
        <div className="space-y-2">
          {mealPlanDays.map((d, i) => (
            <button key={d.day} onClick={() => setSelectedDay(i)} className="card-elevated w-full text-left flex items-center justify-between active:scale-[0.98] transition-transform">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">{d.day}</div>
                <div>
                  <p className="font-bold text-foreground text-sm">Dia {d.day}</p>
                  <p className="text-xs text-muted-foreground truncate max-w-[200px]">Café: {d.breakfast.substring(0, 40)}...</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      )}

      {subView === "allowed" && (
        <div className="grid grid-cols-2 gap-3">
          {allowedFoods.map(f => (
            <div key={f.group} className="card-elevated text-center">
              <span className="text-2xl">{f.icon}</span>
              <p className="font-bold text-foreground text-xs mt-2">{f.group}</p>
              <p className="text-xs text-muted-foreground mt-1">{f.items}</p>
            </div>
          ))}
        </div>
      )}

      {subView === "avoid" && (
        <div className="space-y-2">
          {avoidFoods.map(f => (
            <div key={f} className="card-elevated flex items-center gap-3">
              <span className="text-red-500">✕</span>
              <span className="text-sm text-foreground">{f}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const MealsScreen = () => {
  const { subScreen, setSubScreen, appState } = useApp();
  const [filter, setFilter] = useState<MealFilter>("all");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  if (subScreen === "planning") return <PlanningView onBack={() => setSubScreen(null)} />;
  if (selectedRecipe) return <RecipeDetail recipe={selectedRecipe} onBack={() => setSelectedRecipe(null)} />;

  const allRecipes: Recipe[] = lowCarbRecipes;
  const getFiltered = () => {
    if (filter === "all" || filter === "lowcarb") return allRecipes;
    if (filter === "tea") return [];
    if (filter === "dessert") return [];
    return allRecipes.filter(r => r.category === filter);
  };

  const filtered = getFiltered();

  return (
    <div className="screen-content space-y-4 animate-fade-in">
      <h2 className="text-xl font-heading font-bold text-foreground">🍽️ Refeições</h2>

      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
        {filters.map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} className={`filter-chip whitespace-nowrap ${filter === f.id ? "filter-chip-active" : "filter-chip-inactive"}`}>
            {f.label}
          </button>
        ))}
      </div>

      <button onClick={() => setSubScreen("planning")} className="card-highlight w-full text-left flex items-center justify-between">
        <div>
          <p className="font-bold text-foreground text-sm">📋 Planejamento de 14 Dias</p>
          <p className="text-xs text-muted-foreground mt-1">Cardápio completo dia a dia</p>
        </div>
        <ChevronRight className="w-5 h-5 text-primary" />
      </button>

      <div className="card-elevated">
        <h3 className="font-bold text-foreground text-sm mb-2">🥡 Marmitas Fit</h3>
        <p className="text-xs text-muted-foreground mb-3">Refeições práticas para o dia a dia</p>
        <div className="space-y-2">
          {[...marmitaRecipes.breakfast, ...marmitaRecipes.lunch, ...marmitaRecipes.dinner].slice(0, 3).map(r => (
            <div key={r.id} className="flex items-center gap-3 bg-muted rounded-xl p-2">
              <FoodImage src={r.image} alt={r.name} size="sm" />
              <span className="text-sm font-medium text-foreground">{r.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card-elevated">
        <h3 className="font-bold text-foreground text-sm mb-2">🥗 Saladas</h3>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {salads.slice(0, 4).map(s => (
            <div key={s.id} className="min-w-[140px] bg-muted rounded-xl p-3 text-center">
              <FoodImage src={s.image} alt={s.name} size="md" className="mx-auto" />
              <p className="text-xs font-medium text-foreground mt-1 truncate">{s.name}</p>
              {s.isMainMeal && <span className="text-xs text-primary">⭐ Refeição completa</span>}
            </div>
          ))}
        </div>
      </div>

      {filter === "dessert" ? (
        <div className="space-y-3">
          <h3 className="section-title">🍰 Doces Fitness</h3>
          {desserts.map(d => (
            <div key={d.id} className={`card-elevated flex items-center gap-3 ${d.locked ? "opacity-60" : ""}`}>
              <span className="text-2xl">{d.image}</span>
              <div className="flex-1">
                <p className="font-bold text-foreground text-sm">{d.name}</p>
                <p className="text-xs text-muted-foreground">{d.calories} kcal</p>
              </div>
              {d.locked && <Lock className="w-4 h-4 text-muted-foreground" />}
            </div>
          ))}
        </div>
      ) : filter === "tea" ? (
        <div className="space-y-3">
          {teas.map(t => (
            <div key={t.id} className="card-elevated flex items-center gap-3">
              <FoodImage src={t.image} alt={t.name} size="md" />
              <div className="flex-1">
                <p className="font-bold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.shortDescription}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          <h3 className="section-title">
            {filter === "lowcarb" ? "🥑 Low Carb" : "📖 Receitas"}
          </h3>
          {filtered.map(r => (
            <RecipeCard key={r.id} recipe={r} onSelect={() => setSelectedRecipe(r)} />
          ))}
        </div>
      )}
    </div>
  );
};
