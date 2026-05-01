import { useEffect, useMemo, useState } from "react";
import { ChevronRight, Sparkles, Dumbbell, Apple, Droplets, Pill, Ban, ChefHat } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { SkinLayout } from "./SkinLayout";
import { skinExercises } from "@/data/skinExercises";
import { skinRecipes } from "@/data/skinRecipes";
import { SkinChecklistCard, SkinChecklistItem } from "@/components/skin/SkinChecklistCard";
import { SkinExerciseCard } from "@/components/skin/SkinExerciseCard";
import { SkinRecipeCard } from "@/components/skin/SkinRecipeCard";
import { SkinDetailModal } from "@/components/skin/SkinDetailModal";

// ===== Estado local =====
const STORAGE_KEY = "formula-skin-v2";
const todayKey = () => new Date().toISOString().split("T")[0];

interface SkinPersistedState {
  date: string; // checklist diário reseta ao mudar o dia
  checked: string[];
  exercisesDone: string[]; // exercícios marcados hoje
  favoriteRecipes: string[];
  helpedSections: string[];
}

const defaultState: SkinPersistedState = {
  date: todayKey(),
  checked: [],
  exercisesDone: [],
  favoriteRecipes: [],
  helpedSections: [],
};

const loadState = (): SkinPersistedState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw) as SkinPersistedState;
    // reseta checklist diário e exercícios feitos quando muda o dia
    if (parsed.date !== todayKey()) {
      return { ...defaultState, favoriteRecipes: parsed.favoriteRecipes || [], helpedSections: parsed.helpedSections || [] };
    }
    return { ...defaultState, ...parsed };
  } catch {
    return defaultState;
  }
};

const useSkin = () => {
  const [state, setState] = useState<SkinPersistedState>(loadState);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state]);

  return {
    state,
    toggleCheck: (code: string) =>
      setState((s) => ({
        ...s,
        checked: s.checked.includes(code) ? s.checked.filter((c) => c !== code) : [...s.checked, code],
      })),
    toggleExerciseDone: (code: string) =>
      setState((s) => ({
        ...s,
        exercisesDone: s.exercisesDone.includes(code)
          ? s.exercisesDone.filter((c) => c !== code)
          : [...s.exercisesDone, code],
        // Se marcar um exercício, também marca o item "treino" do checklist diário
        checked:
          !s.exercisesDone.includes(code) && !s.checked.includes("skin_strength_training")
            ? [...s.checked, "skin_strength_training"]
            : s.checked,
      })),
    toggleFavoriteRecipe: (code: string) =>
      setState((s) => ({
        ...s,
        favoriteRecipes: s.favoriteRecipes.includes(code)
          ? s.favoriteRecipes.filter((c) => c !== code)
          : [...s.favoriteRecipes, code],
      })),
  };
};

// ===== Checklist diário =====
const checklistItems: SkinChecklistItem[] = [
  {
    code: "skin_hydration",
    icon: "💧",
    title: "Beber sua meta de água",
    desc: "Ajuda na aparência da pele. Use a meta de água calculada no app como referência.",
  },
  {
    code: "skin_strength_training",
    icon: "💪",
    title: "Treino de força ou exercício de firmeza",
    desc: "Melhora o contorno corporal e a firmeza visual.",
  },
  {
    code: "skin_protein",
    icon: "🥚",
    title: "Comer uma fonte de proteína",
    desc: "Ajuda na manutenção de massa magra e fornece aminoácidos importantes para os tecidos.",
  },
  {
    code: "skin_vitamin_c",
    icon: "🍊",
    title: "Consumir alimento rico em vitamina C",
    desc: "Participa da formação de colágeno.",
  },
  {
    code: "skin_sunscreen",
    icon: "☀️",
    title: "Usar protetor solar",
    desc: "Ajuda a proteger colágeno e elasticidade.",
  },
  {
    code: "skin_sleep",
    icon: "😴",
    title: "Dormir bem",
    desc: "Ajuda na recuperação do corpo e na rotina hormonal.",
  },
  {
    code: "skin_gradual_weight_loss",
    icon: "📅",
    title: "Evitar perda de peso muito rápida",
    desc: "Emagrecer rápido demais pode piorar a aparência de flacidez.",
  },
];

// ===== Conteúdos textuais por seção =====
const nutritionPillars = [
  {
    icon: "🥚",
    title: "Proteína suficiente",
    desc: "Ajuda na manutenção de massa magra e fornece aminoácidos importantes para os tecidos.",
    examples: "Ovos, frango, peixe, carne magra, iogurte natural, queijo cottage, tofu, lentilha, grão-de-bico.",
    caution: "Pessoas com doença renal devem consultar um profissional antes de aumentar muito a ingestão de proteína.",
  },
  {
    icon: "🍊",
    title: "Vitamina C",
    desc: "Participa da formação de colágeno.",
    examples: "Acerola, laranja, morango, kiwi, limão, pimentão, brócolis, goiaba.",
  },
  {
    icon: "🦪",
    title: "Zinco e cobre",
    desc: "Cofatores na produção de colágeno e elastina.",
    examples: "Sementes de abóbora, castanhas, cacau 70%, carne magra, grão-de-bico.",
  },
  {
    icon: "🥑",
    title: "Gorduras boas",
    desc: "Apoiam a barreira da pele e a absorção de vitaminas lipossolúveis.",
    examples: "Abacate, azeite de oliva, castanhas, sementes, peixes gordos.",
  },
  {
    icon: "💧",
    title: "Hidratação",
    desc: "Mantém a pele com mais turgor e elasticidade.",
    examples: "Água, água saborizada, frutas com alto teor de água (melancia, melão, pepino).",
  },
  {
    icon: "😴",
    title: "Sono e recuperação",
    desc: "É no sono que o corpo regenera tecidos e produz colágeno.",
    examples: "Dormir entre 7 e 8 horas por noite.",
  },
];

const hydrationItems = [
  { icon: "💧", title: "Meta de água do app", desc: "Siga sua meta diária de água calculada no app. Para muitas pessoas, isso fica em torno de 2 a 2,5 L ao dia, mas sua meta individual no app deve ser a principal referência." },
  { icon: "🧴", title: "Hidratante corporal diário", desc: "Aplicar após o banho, com pele ainda úmida. Constância importa mais que marca." },
  { icon: "☀️", title: "Protetor solar nas áreas expostas", desc: "FPS 30 ou mais, mesmo em dias nublados." },
  { icon: "🛁", title: "Banhos mornos, não muito quentes", desc: "Água muito quente pode ressecar e fragilizar a pele." },
  { icon: "😴", title: "Dormir 7 a 8 horas", desc: "É no sono que a pele se regenera." },
  { icon: "🚭", title: "Evitar cigarro", desc: "Reduz oxigênio na pele e degrada colágeno e elastina." },
  { icon: "📉", title: "Evitar perda de peso muito rápida", desc: "Quanto mais rápido o emagrecimento, mais difícil para a pele acompanhar." },
];

const avoidItems = [
  { icon: "📉", title: "Perda de peso muito rápida", desc: "Pode piorar a aparência de flacidez. Prefira ritmo gradual." },
  { icon: "🍗", title: "Pouca proteína", desc: "A pele precisa de aminoácidos para se manter firme." },
  { icon: "🏜️", title: "Baixa ingestão de água", desc: "Pele desidratada perde elasticidade e parece mais flácida." },
  { icon: "😴", title: "Pouco sono", desc: "Reduz a regeneração natural dos tecidos." },
  { icon: "🚭", title: "Cigarro", desc: "Degrada colágeno e elastina." },
  { icon: "☀️", title: "Sol sem proteção", desc: "Acelera o envelhecimento e a perda de firmeza." },
  { icon: "🥗", title: "Dietas muito restritivas", desc: "Falta de nutrientes prejudica a regeneração da pele." },
  { icon: "🛋️", title: "Sedentarismo", desc: "Sem estímulo muscular, fica mais difícil melhorar o contorno." },
];

const collagenInfo = {
  intro: "Colágeno pode ajudar como apoio, mas não faz milagre.",
  detail:
    "Ele não substitui treino de força, proteína suficiente, hidratação, sono e proteção solar. Os efeitos são graduais e variam de pessoa para pessoa.",
  helps: [
    "Colágeno hidrolisado ou peptídeos de colágeno",
    "Consumo junto com vitamina C",
    "Constância por pelo menos alguns meses",
    "Proteína suficiente na dieta",
  ],
  doesNot: [
    "Não elimina flacidez sozinho",
    "Não substitui musculação",
    "Não garante pele firme",
    "Não corrige flacidez intensa ou excesso de pele importante",
  ],
  cautions:
    "Gestantes, lactantes, pessoas com doença renal ou hepática, alergias ou uso de medicamentos contínuos devem consultar um profissional antes de suplementar.",
};

// ===== Tipos de seção =====
type Section =
  | "home"
  | "training"
  | "nutrition"
  | "recipes"
  | "collagen"
  | "hydration"
  | "avoid";

const sectionsMeta: Record<Exclude<Section, "home">, { title: string; emoji: string }> = {
  training: { title: "Treino para firmeza", emoji: "💪" },
  nutrition: { title: "Alimentação para pele", emoji: "🥗" },
  recipes: { title: "Receitas para apoiar a pele", emoji: "🍓" },
  collagen: { title: "Colágeno e Suplementação", emoji: "💊" },
  hydration: { title: "Hidratação e cuidados", emoji: "💧" },
  avoid: { title: "O que evitar", emoji: "🚫" },
};

// ===== Disclaimer reutilizável =====
const Disclaimer = () => (
  <div className="rounded-xl bg-muted/60 border border-border p-3">
    <p className="text-[11px] text-muted-foreground leading-relaxed">
      Este conteúdo é educativo e não substitui avaliação com dermatologista, nutricionista, médico ou
      educador físico. Em casos de flacidez intensa, pós-bariátrica, dor, assaduras, feridas ou
      desconforto importante, procure um profissional.
    </p>
  </div>
);

// ===== Módulo principal =====
export const SkinModule = () => {
  const { setSubScreen } = useApp();
  const skin = useSkin();
  const [section, setSection] = useState<Section>("home");
  const [openExercise, setOpenExercise] = useState<string | null>(null);
  const [openRecipe, setOpenRecipe] = useState<string | null>(null);

  const close = () => setSubScreen(null);
  const back = () => setSection("home");

  const exerciseDetail = useMemo(
    () => skinExercises.find((e) => e.code === openExercise) || null,
    [openExercise],
  );
  const recipeDetail = useMemo(
    () => skinRecipes.find((r) => r.code === openRecipe) || null,
    [openRecipe],
  );

  // ===== HOME =====
  if (section === "home") {
    return (
      <>
        <SkinLayout title="Pele Flácida" emoji="✨" onClose={close}>
          {/* Hero */}
          <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-bold text-foreground text-base">Pele Flácida</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Treino, alimentação, hidratação e cuidados para apoiar a firmeza da pele.
                </p>
                <p className="text-xs text-foreground mt-2 leading-relaxed">
                  Firmeza visual vem do conjunto: treino de força, proteína suficiente, hidratação,
                  sono, proteção solar e constância.
                </p>
              </div>
            </div>
          </div>

          <Disclaimer />

          {/* Checklist de hoje */}
          <SkinChecklistCard
            items={checklistItems}
            checked={skin.state.checked}
            onToggle={skin.toggleCheck}
          />

          {/* Resumo de hidratação rápida (também na home) */}
          <div className="card-elevated">
            <h3 className="font-heading font-bold text-foreground mb-2 text-sm">
              💧 Hidratação e cuidados em destaque
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {hydrationItems.slice(0, 4).map((h) => (
                <div key={h.title} className="bg-muted rounded-xl p-2.5">
                  <div className="text-lg">{h.icon}</div>
                  <p className="text-[11px] font-bold text-foreground mt-1 leading-tight">{h.title}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setSection("hydration")}
              className="mt-2 text-xs text-primary font-medium flex items-center gap-1"
            >
              Ver tudo sobre hidratação <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Cards de navegação */}
          <div>
            <h3 className="section-title mb-2 px-1">Explore o módulo</h3>
            <div className="space-y-2">
              <NavCard
                icon={<Dumbbell className="w-5 h-5" />}
                title="Treino para firmeza"
                desc="Exercícios em casa com passo a passo e marcação."
                onClick={() => setSection("training")}
              />
              <NavCard
                icon={<Apple className="w-5 h-5" />}
                title="Alimentação para pele"
                desc="Pilares nutricionais e exemplos práticos."
                onClick={() => setSection("nutrition")}
              />
              <NavCard
                icon={<ChefHat className="w-5 h-5" />}
                title="Receitas para apoiar a pele"
                desc="Receitas com imagem, ingredientes e macros."
                onClick={() => setSection("recipes")}
              />
              <NavCard
                icon={<Pill className="w-5 h-5" />}
                title="Colágeno e Suplementação"
                desc="O que ajuda, o que não faz e cuidados."
                onClick={() => setSection("collagen")}
              />
              <NavCard
                icon={<Droplets className="w-5 h-5" />}
                title="Hidratação e cuidados"
                desc="Rotina diária para apoiar a pele."
                onClick={() => setSection("hydration")}
              />
              <NavCard
                icon={<Ban className="w-5 h-5" />}
                title="O que evitar"
                desc="Hábitos que dificultam a firmeza."
                onClick={() => setSection("avoid")}
              />
            </div>
          </div>

          <div className="card-elevated bg-primary/5 border-primary/20 text-center">
            <p className="text-xs text-muted-foreground italic">
              "A pele responde em meses, não em dias. Cuide com constância — o resultado vem." ✨
            </p>
          </div>
        </SkinLayout>

        {recipeDetail && (
          <SkinDetailModal
            kind="recipe"
            recipe={recipeDetail}
            favorite={skin.state.favoriteRecipes.includes(recipeDetail.code)}
            onToggleFavorite={() => skin.toggleFavoriteRecipe(recipeDetail.code)}
            onClose={() => setOpenRecipe(null)}
          />
        )}
      </>
    );
  }

  // ===== Subseções =====
  const meta = sectionsMeta[section];

  return (
    <>
      <SkinLayout title={meta.title} emoji={meta.emoji} onBack={back} onClose={close}>
        <Disclaimer />

        {section === "training" && (
          <>
            <div className="card-highlight">
              <p className="text-sm text-foreground leading-relaxed">
                Treino de força é o que mais ajuda na firmeza visual. Músculo abaixo da pele melhora
                o contorno do corpo. Comece devagar, com constância — 3 a 4 vezes por semana já traz
                resultado em 8 a 12 semanas.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {skinExercises.map((ex) => (
                <SkinExerciseCard
                  key={ex.code}
                  exercise={ex}
                  done={skin.state.exercisesDone.includes(ex.code)}
                  onToggleDone={() => skin.toggleExerciseDone(ex.code)}
                  onOpenDetail={() => setOpenExercise(ex.code)}
                />
              ))}
            </div>
          </>
        )}

        {section === "nutrition" && (
          <>
            <div className="card-highlight">
              <p className="text-sm text-foreground leading-relaxed">
                A pele precisa de proteína, vitamina C, zinco, cobre, gorduras boas e hidratação para
                manter firmeza e elasticidade.
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
                        <span className="text-primary font-medium">Exemplos: </span>
                        {p.examples}
                      </p>
                      {p.caution && (
                        <div className="bg-accent/10 border border-accent/20 rounded-xl p-2 mt-2">
                          <p className="text-[11px] text-foreground">
                            <span className="font-bold text-accent">⚠️ Cuidado: </span>
                            {p.caution}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setSection("recipes")}
              className="w-full card-highlight text-left flex items-center justify-between"
            >
              <span className="text-sm font-bold text-foreground">🍓 Ver receitas que aplicam isso</span>
              <ChevronRight className="w-4 h-4 text-primary" />
            </button>
          </>
        )}

        {section === "recipes" && (
          <>
            <div className="card-highlight">
              <p className="text-sm text-foreground leading-relaxed">
                Receitas para apoiar a pele com nutrientes do dia a dia. Não substituem treino,
                alimentação variada e hidratação — somam ao conjunto.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {skinRecipes.map((r) => (
                <SkinRecipeCard
                  key={r.code}
                  recipe={r}
                  favorite={skin.state.favoriteRecipes.includes(r.code)}
                  onToggleFavorite={() => skin.toggleFavoriteRecipe(r.code)}
                  onOpen={() => setOpenRecipe(r.code)}
                />
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground italic text-center">
              Valores nutricionais aproximados. Podem variar conforme marcas, porções e modo de preparo.
            </p>
          </>
        )}

        {section === "collagen" && (
          <>
            <div className="card-highlight">
              <p className="text-sm text-foreground leading-relaxed">
                <span className="font-bold">{collagenInfo.intro}</span>
                <br />
                <span className="text-muted-foreground">{collagenInfo.detail}</span>
              </p>
            </div>
            <div className="card-elevated">
              <h3 className="font-heading font-bold text-foreground mb-2 text-sm">O que pode ajudar</h3>
              <ul className="space-y-1.5">
                {collagenInfo.helps.map((h) => (
                  <li key={h} className="text-sm text-foreground flex gap-2">
                    <span className="text-primary">→</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-elevated bg-accent/5 border-accent/20">
              <h3 className="font-heading font-bold text-foreground mb-2 text-sm">O que ele NÃO faz</h3>
              <ul className="space-y-1.5">
                {collagenInfo.doesNot.map((d) => (
                  <li key={d} className="text-sm text-foreground flex gap-2">
                    <span className="text-accent">×</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-accent/10 border border-accent/20 rounded-xl p-3">
              <p className="text-xs font-bold text-accent uppercase tracking-wide mb-1">Cuidado</p>
              <p className="text-sm text-foreground leading-relaxed">{collagenInfo.cautions}</p>
            </div>
          </>
        )}

        {section === "hydration" && (
          <>
            <div className="card-highlight">
              <p className="text-sm text-foreground leading-relaxed">
                Pequenos cuidados diários somam muito ao longo do tempo.
              </p>
            </div>
            <div className="space-y-2">
              {hydrationItems.map((h) => (
                <div key={h.title} className="card-elevated flex gap-3">
                  <span className="text-2xl shrink-0">{h.icon}</span>
                  <div>
                    <p className="font-bold text-foreground text-sm">{h.title}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{h.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {section === "avoid" && (
          <>
            <div className="card-highlight">
              <p className="text-sm text-foreground leading-relaxed">
                Estes fatores podem reduzir a elasticidade da pele e dificultar a firmeza, mesmo com
                treino e boa alimentação. Reduzir aos poucos já ajuda.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {avoidItems.map((a) => (
                <div key={a.title} className="card-elevated flex flex-col gap-1">
                  <span className="text-2xl">{a.icon}</span>
                  <p className="font-bold text-foreground text-sm leading-tight">{a.title}</p>
                  <p className="text-[11px] text-muted-foreground leading-snug">{a.desc}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </SkinLayout>

      {exerciseDetail && (
        <SkinDetailModal
          kind="exercise"
          exercise={exerciseDetail}
          done={skin.state.exercisesDone.includes(exerciseDetail.code)}
          onToggleDone={() => skin.toggleExerciseDone(exerciseDetail.code)}
          onClose={() => setOpenExercise(null)}
        />
      )}
      {recipeDetail && (
        <SkinDetailModal
          kind="recipe"
          recipe={recipeDetail}
          favorite={skin.state.favoriteRecipes.includes(recipeDetail.code)}
          onToggleFavorite={() => skin.toggleFavoriteRecipe(recipeDetail.code)}
          onClose={() => setOpenRecipe(null)}
        />
      )}
    </>
  );
};

// ===== Sub-componentes =====
const NavCard = ({
  icon,
  title,
  desc,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="card-elevated w-full text-left flex items-center gap-3 active:scale-[0.99] transition-transform"
  >
    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-bold text-foreground text-sm">{title}</p>
      <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">{desc}</p>
    </div>
    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
  </button>
);
