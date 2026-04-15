import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { lowCarbRecipes, Recipe } from "@/data/lowCarb";
import { salads } from "@/data/salads";
import { marmitaRecipes, desserts } from "@/data/marmitas";
import { mealPlanDays, allowedFoods, avoidFoods } from "@/data/mealPlan";
import { teas } from "@/data/teas";
import { Heart, ArrowLeft, Lock, Check, ChevronRight, Flame, Target, Pencil } from "lucide-react";
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

const CalorieBadge = ({ calories }: { calories?: number }) => {
  if (!calories) return null;
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-500">
      <Flame className="w-3 h-3" />
      {calories} kcal
    </span>
  );
};

const RecipeGridCard = ({ recipe, onSelect }: { recipe: Recipe; onSelect: () => void }) => {
  const { appState } = useApp();
  return (
    <button onClick={onSelect} className="card-elevated w-full text-left overflow-hidden active:scale-[0.98] transition-transform p-0">
      <div className="relative">
        <img src={recipe.image} alt={recipe.name} loading="lazy" className="w-full h-36 object-cover" />
        <button
          onClick={e => { e.stopPropagation(); appState.toggleFavorite(recipe.id); }}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center"
        >
          <Heart className={`w-4 h-4 ${appState.isFavorite(recipe.id) ? "fill-red-500 text-red-500" : "text-foreground"}`} />
        </button>
      </div>
      <div className="p-3">
        <h4 className="font-bold text-foreground text-sm leading-tight line-clamp-2">{recipe.name}</h4>
        <p className="text-xs text-muted-foreground mt-1">{recipe.categoryLabel}</p>
        <CalorieBadge calories={recipe.calories} />
      </div>
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
        {recipe.calories && (
          <div className="flex items-center justify-center gap-1 mt-2">
            <Flame className="w-4 h-4 text-red-500" />
            <span className="text-sm font-bold text-red-500">{recipe.calories} kcal</span>
          </div>
        )}
      </div>
      {recipe.calories && (
        <div className="card-highlight mb-4 grid grid-cols-4 gap-2 text-center">
          <div><p className="text-xs text-muted-foreground">Calorias</p><p className="font-bold text-foreground">{recipe.calories}</p></div>
          <div><p className="text-xs text-muted-foreground">Carbs</p><p className="font-bold text-foreground">{recipe.carbs || "—"}g</p></div>
          <div><p className="text-xs text-muted-foreground">Proteína</p><p className="font-bold text-foreground">{recipe.protein || "—"}g</p></div>
          <div><p className="text-xs text-muted-foreground">Gordura</p><p className="font-bold text-foreground">{recipe.fat || "—"}g</p></div>
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

const GoalCalculator = ({ onBack }: { onBack: () => void }) => {
  const { appState } = useApp();
  const { state } = appState;
  const [weight, setWeightVal] = useState(state.profile.initialWeight.toString());
  const [height, setHeight] = useState(state.profile.height.toString());
  const [targetWeight, setTargetWeight] = useState("");
  const [age, setAge] = useState(state.profile.age.toString());
  const [gender, setGender] = useState(state.profile.gender);
  const [activity, setActivity] = useState(state.profile.activityLevel);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);
    if (!w || !h || !a) return;
    // Harris-Benedict BMR
    let bmr = gender === "feminino"
      ? 447.593 + 9.247 * w + 3.098 * h - 4.330 * a
      : 88.362 + 13.397 * w + 4.799 * h - 5.677 * a;
    const activityMultipliers: Record<string, number> = {
      sedentario: 1.2, leve: 1.375, moderado: 1.55, ativo: 1.725, "muito ativo": 1.9
    };
    const tdee = bmr * (activityMultipliers[activity] || 1.55);
    // Deficit for weight loss
    const dailyCal = Math.round(tdee - 500);
    setResult(Math.max(1200, dailyCal));
  };

  const saveGoal = () => {
    if (result) {
      appState.updateProfile({
        initialWeight: parseFloat(weight),
        height: parseFloat(height),
        age: parseInt(age),
        gender,
        activityLevel: activity
      });
      appState.setCalorieGoal(result);
      onBack();
    }
  };

  return (
    <div className="screen-content animate-slide-up space-y-4">
      <button onClick={onBack} className="flex items-center gap-2 text-primary mb-2">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </button>
      <h2 className="text-xl font-heading font-bold text-foreground flex items-center gap-2">
        <Target className="w-5 h-5 text-primary" /> Definir Meta
      </h2>
      <p className="text-sm text-muted-foreground">Calcule suas calorias diárias ideais para atingir seu objetivo.</p>

      <div className="space-y-3">
        {[
          { label: "Peso atual (kg)", value: weight, set: setWeightVal },
          { label: "Altura (cm)", value: height, set: setHeight },
          { label: "Peso almejado (kg)", value: targetWeight, set: setTargetWeight },
          { label: "Idade", value: age, set: setAge },
        ].map(f => (
          <div key={f.label} className="card-elevated">
            <label className="text-xs text-muted-foreground">{f.label}</label>
            <input type="number" value={f.value} onChange={e => f.set(e.target.value)} className="w-full mt-1 bg-muted rounded-xl px-3 py-2 text-foreground text-sm outline-none" />
          </div>
        ))}

        <div className="card-elevated">
          <label className="text-xs text-muted-foreground">Gênero</label>
          <div className="flex gap-2 mt-1">
            {["feminino", "masculino"].map(g => (
              <button key={g} onClick={() => setGender(g)} className={`flex-1 py-2 rounded-xl text-sm font-medium ${gender === g ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                {g === "feminino" ? "Feminino" : "Masculino"}
              </button>
            ))}
          </div>
        </div>

        <div className="card-elevated">
          <label className="text-xs text-muted-foreground">Nível de atividade</label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            {["sedentario", "leve", "moderado", "ativo"].map(a => (
              <button key={a} onClick={() => setActivity(a)} className={`py-2 rounded-xl text-xs font-medium capitalize ${activity === a ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                {a}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button onClick={calculate} className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-sm">
        Calcular calorias diárias
      </button>

      {result && (
        <div className="card-highlight text-center">
          <p className="text-xs text-muted-foreground">Meta diária recomendada</p>
          <p className="text-3xl font-bold text-primary mt-1">{result} kcal</p>
          <p className="text-xs text-muted-foreground mt-2">Para perda de peso saudável (~0.5 kg/semana)</p>
          <button onClick={saveGoal} className="mt-4 w-full py-3 rounded-2xl bg-accent text-accent-foreground font-bold text-sm">
            Salvar como minha meta
          </button>
        </div>
      )}
    </div>
  );
};

const PlanningView = ({ onBack }: { onBack: () => void }) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [subView, setSubView] = useState<"days" | "allowed" | "avoid">("days");
  const [showGoal, setShowGoal] = useState(false);

  if (showGoal) return <GoalCalculator onBack={() => setShowGoal(false)} />;

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

      <button onClick={() => setShowGoal(true)} className="card-highlight w-full text-left flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Target className="w-5 h-5 text-primary" />
          <div>
            <p className="font-bold text-foreground text-sm">Definir Meta</p>
            <p className="text-xs text-muted-foreground">Calcule suas calorias diárias ideais</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-primary" />
      </button>

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

  // Build unified items for "all" view: marmitas + salads + low carb + desserts
  const allMarmitas = [...marmitaRecipes.breakfast, ...marmitaRecipes.lunch, ...marmitaRecipes.dinner];

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

      {filter === "dessert" ? (
        <div className="space-y-3">
          <h3 className="section-title">🍰 Doces Fitness</h3>
          <div className="grid grid-cols-2 gap-3">
            {desserts.map(d => (
              <div key={d.id} className={`card-elevated overflow-hidden p-0 ${d.locked ? "opacity-60" : ""}`}>
                <div className="relative">
                  <img src={d.image} alt={d.name} loading="lazy" className="w-full h-32 object-cover" />
                  {d.locked && (
                    <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
                      <Lock className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="font-bold text-foreground text-sm leading-tight line-clamp-2">{d.name}</p>
                  <CalorieBadge calories={d.calories} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : filter === "tea" ? (
        <div className="grid grid-cols-2 gap-3">
          {teas.map(t => (
            <div key={t.id} className="card-elevated overflow-hidden p-0">
              <img src={t.image} alt={t.name} loading="lazy" className="w-full h-32 object-cover" />
              <div className="p-3">
                <p className="font-bold text-foreground text-sm leading-tight line-clamp-2">{t.name}</p>
                <p className="text-xs text-muted-foreground mt-1">Chá</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {(filter === "all") && (
            <>
              <h3 className="section-title">🥡 Marmitas Fit</h3>
              <div className="grid grid-cols-2 gap-3">
                {allMarmitas.slice(0, 4).map(r => (
                  <div key={r.id} className="card-elevated overflow-hidden p-0">
                    <img src={r.image} alt={r.name} loading="lazy" className="w-full h-32 object-cover" />
                    <div className="p-3">
                      <p className="font-bold text-foreground text-sm leading-tight line-clamp-2">{r.name}</p>
                      <CalorieBadge calories={r.calories} />
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="section-title">🥗 Saladas</h3>
              <div className="grid grid-cols-2 gap-3">
                {salads.slice(0, 4).map(s => (
                  <div key={s.id} className="card-elevated overflow-hidden p-0">
                    <img src={s.image} alt={s.name} loading="lazy" className="w-full h-32 object-cover" />
                    <div className="p-3">
                      <p className="font-bold text-foreground text-sm leading-tight line-clamp-2">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.saladCategoryLabel}</p>
                      {s.isMainMeal && <span className="text-xs text-primary">⭐ Refeição completa</span>}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <h3 className="section-title">
            {filter === "lowcarb" ? "🥑 Low Carb" : filter === "all" ? "📖 Receitas Low Carb" : `📖 ${filters.find(f => f.id === filter)?.label || "Receitas"}`}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {filtered.map(r => (
              <RecipeGridCard key={r.id} recipe={r} onSelect={() => setSelectedRecipe(r)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
