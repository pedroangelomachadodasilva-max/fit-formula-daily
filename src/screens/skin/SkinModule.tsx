import { useState } from "react";
import { Heart, Check, ChevronRight } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { SkinLayout } from "./SkinLayout";
import {
  skinTopics,
  whatHelpsItems,
  trainingTips,
  nutritionPillars,
  hydrationDaily,
  collagenInfo,
  avoidList,
  naturalRecipes,
  type SkinTopicId,
} from "@/data/skinContent";

// ----- Estado local simples para checklist e favoritos da pele -----
type SkinState = {
  helpedTopics: string[];
  favoriteRecipes: string[];
  daily: { water: boolean; lotion: boolean; sunscreen: boolean; protein: boolean; training: boolean };
  weeklyTrainings: number;
};

const SK_KEY = "formula-skin";
const loadSkin = (): SkinState => {
  try {
    const raw = localStorage.getItem(SK_KEY);
    if (raw) return { ...defaultSkin, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return defaultSkin;
};
const defaultSkin: SkinState = {
  helpedTopics: [],
  favoriteRecipes: [],
  daily: { water: false, lotion: false, sunscreen: false, protein: false, training: false },
  weeklyTrainings: 0,
};

const useSkinState = () => {
  const [s, setS] = useState<SkinState>(loadSkin);
  const persist = (next: SkinState) => {
    setS(next);
    try {
      localStorage.setItem(SK_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };
  return {
    state: s,
    toggleHelped: (id: string) =>
      persist({
        ...s,
        helpedTopics: s.helpedTopics.includes(id)
          ? s.helpedTopics.filter((x) => x !== id)
          : [...s.helpedTopics, id],
      }),
    toggleFavRecipe: (id: string) =>
      persist({
        ...s,
        favoriteRecipes: s.favoriteRecipes.includes(id)
          ? s.favoriteRecipes.filter((x) => x !== id)
          : [...s.favoriteRecipes, id],
      }),
    toggleDaily: (k: keyof SkinState["daily"]) =>
      persist({ ...s, daily: { ...s.daily, [k]: !s.daily[k] } }),
    addTraining: () => persist({ ...s, weeklyTrainings: Math.min(7, s.weeklyTrainings + 1) }),
    resetWeek: () => persist({ ...s, weeklyTrainings: 0 }),
  };
};

// ----- Toolbar de ação genérico -----
const ActionToolbar = ({ id }: { id: string }) => {
  const { state, toggleHelped } = useSkinState();
  const helped = state.helpedTopics.includes(id);
  return (
    <button
      onClick={() => toggleHelped(id)}
      className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors ${
        helped ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
      }`}
    >
      <Check className="w-4 h-4" /> {helped ? "Marcado como útil" : "Isso me ajudou"}
    </button>
  );
};

// ----- Telas internas -----
const WhatHelps = () => (
  <>
    <div className="card-highlight">
      <p className="text-sm text-foreground leading-relaxed">
        Esses são os pilares com mais respaldo para apoiar a firmeza da pele durante o emagrecimento.
        Constância importa mais que qualquer produto isolado.
      </p>
    </div>
    <div className="space-y-2">
      {whatHelpsItems.map((it) => (
        <div key={it.title} className="card-elevated flex gap-3">
          <span className="text-2xl">{it.icon}</span>
          <div className="flex-1">
            <p className="font-bold text-foreground text-sm">{it.title}</p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{it.desc}</p>
          </div>
        </div>
      ))}
    </div>
    <ActionToolbar id="skin-what-helps" />
  </>
);

const Training = ({ onNavigate }: { onNavigate: (id: SkinTopicId) => void }) => {
  const { state, addTraining, resetWeek } = useSkinState();
  return (
    <>
      <div className="card-highlight">
        <p className="text-sm text-foreground leading-relaxed">{trainingTips.intro}</p>
      </div>
      <div className="card-elevated">
        <h3 className="font-heading font-bold text-foreground mb-2">Por que ajuda</h3>
        <ul className="space-y-1.5">
          {trainingTips.why.map((w) => (
            <li key={w} className="text-sm text-foreground flex gap-2">
              <span className="text-primary">→</span>
              {w}
            </li>
          ))}
        </ul>
      </div>
      <div className="card-elevated">
        <h3 className="font-heading font-bold text-foreground mb-2">Foco por área</h3>
        <div className="space-y-2">
          {trainingTips.focus.map((f) => (
            <div key={f.area} className="bg-muted rounded-xl p-3">
              <p className="font-bold text-foreground text-sm">{f.area}</p>
              <p className="text-xs text-muted-foreground mt-1">{f.exs}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="card-elevated">
        <h3 className="font-heading font-bold text-foreground mb-2">Como organizar a semana</h3>
        <ul className="space-y-1.5">
          {trainingTips.weekly.map((w) => (
            <li key={w} className="text-sm text-foreground flex gap-2">
              <span className="text-primary">•</span>
              {w}
            </li>
          ))}
        </ul>
      </div>
      <div className="card-elevated">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-heading font-bold text-foreground text-sm">Treinos da semana</h3>
          <span className="text-2xl font-heading font-bold text-primary">{state.weeklyTrainings}/4</span>
        </div>
        <div className="progress-bar mb-3">
          <div
            className="progress-fill"
            style={{ width: `${Math.min(100, (state.weeklyTrainings / 4) * 100)}%` }}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={addTraining}
            className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm"
          >
            + Marcar treino
          </button>
          <button onClick={resetWeek} className="px-4 py-2.5 rounded-xl bg-muted text-foreground text-sm">
            Resetar
          </button>
        </div>
      </div>
      <button
        onClick={() => onNavigate("nutrition")}
        className="w-full card-elevated flex items-center justify-between text-left"
      >
        <span className="text-sm text-foreground">Ver alimentação que sustenta a pele →</span>
        <ChevronRight className="w-4 h-4 text-primary" />
      </button>
      <ActionToolbar id="skin-training" />
    </>
  );
};

const Nutrition = ({ onNavigate }: { onNavigate: (id: SkinTopicId) => void }) => (
  <>
    <div className="card-highlight">
      <p className="text-sm text-foreground leading-relaxed">
        A pele precisa dos nutrientes certos para manter elasticidade e firmeza. Sem eles, nem o melhor
        treino entrega resultado completo.
      </p>
    </div>
    <div className="space-y-2">
      {nutritionPillars.map((p) => (
        <div key={p.title} className="card-elevated">
          <div className="flex gap-3 items-start">
            <span className="text-2xl">{p.icon}</span>
            <div className="flex-1">
              <p className="font-bold text-foreground text-sm">{p.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{p.desc}</p>
              <p className="text-xs text-foreground mt-2 leading-relaxed">
                <span className="text-primary font-medium">Onde encontrar: </span>
                {p.examples}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
    <button
      onClick={() => onNavigate("recipes")}
      className="w-full card-highlight text-left flex items-center justify-between"
    >
      <span className="text-sm font-bold text-foreground">🍓 Ver receitas que aplicam esses nutrientes</span>
      <ChevronRight className="w-4 h-4 text-primary" />
    </button>
    <ActionToolbar id="skin-nutrition" />
  </>
);

const Hydration = ({ onNavigate }: { onNavigate: (id: SkinTopicId) => void }) => {
  const { state, toggleDaily } = useSkinState();
  const items: { key: keyof SkinState["daily"]; label: string; emoji: string }[] = [
    { key: "water", label: "Bebi 2 L de água", emoji: "💧" },
    { key: "lotion", label: "Passei hidratante corporal", emoji: "🧴" },
    { key: "sunscreen", label: "Usei protetor solar", emoji: "☀️" },
    { key: "protein", label: "Comi proteína em todas as refeições", emoji: "🥚" },
    { key: "training", label: "Treinei hoje", emoji: "💪" },
  ];
  return (
    <>
      <div className="card-highlight">
        <p className="text-sm text-foreground leading-relaxed">
          Pequenos cuidados diários somam muito ao longo do tempo. Marque o que você fez hoje.
        </p>
      </div>
      <div className="card-elevated">
        <h3 className="font-heading font-bold text-foreground mb-3">Checklist de hoje</h3>
        <div className="space-y-2">
          {items.map((it) => (
            <button
              key={it.key}
              onClick={() => toggleDaily(it.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                state.daily[it.key] ? "bg-primary/10" : "bg-muted"
              }`}
            >
              <span>{it.emoji}</span>
              <span className="text-sm font-medium text-foreground flex-1 text-left">{it.label}</span>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  state.daily[it.key] ? "bg-primary border-primary" : "border-muted-foreground/30"
                }`}
              >
                {state.daily[it.key] && <Check className="w-3 h-3 text-primary-foreground" />}
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="card-elevated">
        <h3 className="font-heading font-bold text-foreground mb-2">Por que cada hábito importa</h3>
        <ul className="space-y-2">
          {hydrationDaily.map((h) => (
            <li key={h.title} className="flex gap-3">
              <span>{h.icon}</span>
              <div className="flex-1">
                <p className="font-bold text-foreground text-sm">{h.title}</p>
                <p className="text-xs text-muted-foreground">{h.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={() => onNavigate("avoid")}
        className="w-full card-elevated flex items-center justify-between text-left"
      >
        <span className="text-sm text-foreground">Ver o que evitar →</span>
        <ChevronRight className="w-4 h-4 text-primary" />
      </button>
      <ActionToolbar id="skin-hydration" />
    </>
  );
};

const Collagen = () => (
  <>
    <div className="card-highlight">
      <p className="text-sm text-foreground leading-relaxed">{collagenInfo.honest}</p>
    </div>
    <div className="card-elevated">
      <h3 className="font-heading font-bold text-foreground mb-2">Quando faz mais sentido</h3>
      <ul className="space-y-1.5">
        {collagenInfo.when.map((w) => (
          <li key={w} className="text-sm text-foreground flex gap-2">
            <span className="text-primary">•</span>
            {w}
          </li>
        ))}
      </ul>
    </div>
    <div className="card-elevated bg-accent/5 border-accent/20">
      <h3 className="font-heading font-bold text-foreground mb-2">O que ele NÃO faz</h3>
      <ul className="space-y-1.5">
        {collagenInfo.truth.map((t) => (
          <li key={t} className="text-sm text-foreground flex gap-2">
            <span className="text-accent">×</span>
            {t}
          </li>
        ))}
      </ul>
    </div>
    <div className="card-elevated">
      <h3 className="font-heading font-bold text-foreground mb-2">Como tomar, se quiser</h3>
      <p className="text-sm text-foreground leading-relaxed">{collagenInfo.how}</p>
    </div>
    <ActionToolbar id="skin-collagen" />
  </>
);

const Avoid = () => (
  <>
    <div className="card-highlight">
      <p className="text-sm text-foreground leading-relaxed">
        Esses fatores podem reduzir a elasticidade da pele e dificultar a firmeza, mesmo com treino e
        boa alimentação. Reduzir aos poucos já ajuda.
      </p>
    </div>
    <div className="space-y-2">
      {avoidList.map((a) => (
        <div key={a.title} className="card-elevated flex gap-3">
          <span className="text-2xl">{a.icon}</span>
          <div className="flex-1">
            <p className="font-bold text-foreground text-sm">{a.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{a.desc}</p>
          </div>
        </div>
      ))}
    </div>
    <ActionToolbar id="skin-avoid" />
  </>
);

const Recipes = () => {
  const { state, toggleFavRecipe } = useSkinState();
  return (
    <>
      <div className="card-highlight">
        <p className="text-sm text-foreground leading-relaxed">
          Receitas e dicas naturais para apoiar a pele com nutrientes do dia a dia. Não substituem
          treino, alimentação variada e hidratação — somam ao conjunto.
        </p>
      </div>
      <div className="space-y-3">
        {naturalRecipes.map((r) => {
          const fav = state.favoriteRecipes.includes(r.id);
          return (
            <div key={r.id} className="card-elevated">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{r.emoji}</span>
                  <div>
                    <p className="font-bold text-foreground text-sm">{r.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{r.purpose}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleFavRecipe(r.id)}
                  className={`p-2 rounded-full ${
                    fav ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${fav ? "fill-current" : ""}`} />
                </button>
              </div>
              <div className="mt-3 space-y-2">
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-wide">Ingredientes</p>
                  <ul className="mt-1 space-y-0.5">
                    {r.ingredients.map((ing) => (
                      <li key={ing} className="text-xs text-foreground">
                        • {ing}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-bold text-primary uppercase tracking-wide">Modo de preparo</p>
                  <p className="text-xs text-foreground mt-1 leading-relaxed">{r.preparation}</p>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="bg-muted rounded-xl p-2">
                    <p className="text-[10px] text-muted-foreground uppercase">Como usar</p>
                    <p className="text-xs text-foreground mt-0.5">{r.use}</p>
                  </div>
                  <div className="bg-muted rounded-xl p-2">
                    <p className="text-[10px] text-muted-foreground uppercase">Frequência</p>
                    <p className="text-xs text-foreground mt-0.5">{r.frequency}</p>
                  </div>
                </div>
                {r.notes && (
                  <p className="text-xs text-muted-foreground italic">💡 {r.notes}</p>
                )}
                {r.caution && (
                  <div className="bg-accent/10 border border-accent/20 rounded-xl p-2">
                    <p className="text-xs text-foreground">
                      <span className="font-bold text-accent">⚠️ Atenção: </span>
                      {r.caution}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

// ----- Tela principal do módulo -----
export const SkinModule = () => {
  const { setSubScreen } = useApp();
  const [topic, setTopic] = useState<SkinTopicId | null>(null);

  const close = () => setSubScreen(null);
  const back = () => setTopic(null);

  if (topic) {
    const meta = skinTopics.find((t) => t.id === topic);
    if (!meta) return null;
    const renderers: Record<SkinTopicId, () => React.ReactNode> = {
      "what-helps": () => <WhatHelps />,
      training: () => <Training onNavigate={setTopic} />,
      nutrition: () => <Nutrition onNavigate={setTopic} />,
      hydration: () => <Hydration onNavigate={setTopic} />,
      collagen: () => <Collagen />,
      avoid: () => <Avoid />,
      recipes: () => <Recipes />,
    };
    return (
      <SkinLayout title={meta.title} emoji={meta.emoji} onBack={back} onClose={close}>
        {renderers[topic]()}
      </SkinLayout>
    );
  }

  return (
    <SkinLayout title="Pele Flácida" emoji="✨" onClose={close}>
      <div className="card-highlight">
        <h3 className="font-heading font-bold text-foreground text-base">
          Cuidando da sua pele com honestidade 💚
        </h3>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          Essa área foi feita para apoiar quem tem flacidez leve a moderada, especialmente em
          emagrecimentos de 5 a 15 kg. Aqui você encontra hábitos, alimentação, cuidados diários e
          dicas naturais que realmente ajudam — sem promessas mágicas.
        </p>
      </div>

      <div className="card-elevated bg-primary/5 border-primary/20">
        <p className="text-xs text-foreground leading-relaxed">
          <span className="font-bold text-primary">A verdade simples: </span>
          firmeza vem de treino de força, alimentação adequada, hidratação, cuidados com a pele e
          constância. Tudo o resto é apoio.
        </p>
      </div>

      <div>
        <h3 className="section-title mb-3 px-1">Explore os temas</h3>
        <div className="grid grid-cols-2 gap-3">
          {skinTopics.map((t) => (
            <button
              key={t.id}
              onClick={() => setTopic(t.id)}
              className="card-elevated text-left active:scale-95 transition-transform"
            >
              <div className="text-2xl">{t.emoji}</div>
              <p className="font-bold text-foreground text-sm mt-2 leading-tight">{t.title}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{t.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="card-elevated bg-primary/5 border-primary/20 text-center">
        <p className="text-xs text-muted-foreground italic">
          "A pele responde em meses, não em dias. Cuide com constância — o resultado vem." ✨
        </p>
      </div>
    </SkinLayout>
  );
};
