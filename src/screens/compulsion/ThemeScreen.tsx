import { useState } from "react";
import { Heart, Check } from "lucide-react";
import { CompulsionLayout } from "./CompulsionLayout";
import { BreathingCircle } from "./BreathingCircle";
import { PauseTimer } from "./PauseTimer";
import {
  alternatives,
  emotionalSigns,
  physicalSigns,
  physicalVsEmotionalQuiz,
  triggersList,
} from "@/data/compulsionContent";
import { useCompulsionState } from "@/hooks/useCompulsionState";

interface ThemeScreenProps {
  themeId: string;
  onBack: () => void;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

const ActionToolbar = ({ id }: { id: string }) => {
  const { state, toggleFavorite, toggleHelped } = useCompulsionState();
  const fav = state.favorites.includes(id);
  const helped = state.helpedItems.includes(id);
  return (
    <div className="flex gap-2">
      <button
        onClick={() => toggleHelped(id)}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors ${
          helped ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
        }`}
      >
        <Check className="w-4 h-4" /> {helped ? "Me ajudou" : "Isso me ajudou"}
      </button>
      <button
        onClick={() => toggleFavorite(id)}
        className={`px-4 py-2.5 rounded-xl ${
          fav ? "bg-accent text-accent-foreground" : "bg-muted text-foreground"
        }`}
      >
        <Heart className={`w-4 h-4 ${fav ? "fill-current" : ""}`} />
      </button>
    </div>
  );
};

const PhysicalVsEmotional = () => {
  const [answers, setAnswers] = useState<number[]>([]);
  const score = answers.reduce((a, b) => a + b, 0);
  const done = answers.length === physicalVsEmotionalQuiz.length;
  return (
    <>
      <div className="card-highlight">
        <p className="text-sm text-foreground leading-relaxed">
          Reconhecer o tipo de fome é o primeiro passo para retomar o controle. Compare os sinais
          abaixo e, se quiser, faça o mini teste.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="card-elevated bg-primary/5 border-primary/20">
          <p className="font-bold text-primary text-sm mb-2">🟢 Fome física</p>
          <ul className="space-y-1.5">
            {physicalSigns.map((s) => (
              <li key={s} className="text-xs text-foreground leading-snug">
                • {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="card-elevated bg-accent/5 border-accent/20">
          <p className="font-bold text-accent text-sm mb-2">🟠 Fome emocional</p>
          <ul className="space-y-1.5">
            {emotionalSigns.map((s) => (
              <li key={s} className="text-xs text-foreground leading-snug">
                • {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="card-elevated">
        <h3 className="font-heading font-bold text-foreground mb-3">Mini teste</h3>
        {physicalVsEmotionalQuiz.map((q, i) => (
          <div key={i} className="mb-3">
            <p className="text-sm font-medium text-foreground mb-2">
              {i + 1}. {q.q}
            </p>
            <div className="flex flex-col gap-2">
              {q.options.map((opt, j) => {
                const selected = answers[i] === q.weights[j];
                return (
                  <button
                    key={j}
                    onClick={() => {
                      const next = [...answers];
                      next[i] = q.weights[j];
                      setAnswers(next);
                    }}
                    className={`text-left px-3 py-2 rounded-xl text-sm transition-colors ${
                      selected && answers.length > i
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
        {done && (
          <div className="mt-3 p-3 rounded-xl bg-mint border border-primary/20">
            <p className="font-bold text-foreground text-sm">
              {score >= 3
                ? "🟠 Provavelmente fome emocional"
                : score >= 2
                ? "🟡 Está no meio do caminho"
                : "🟢 Provavelmente fome física"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {score >= 3
                ? "Tente uma pausa, respiração ou atividade alternativa antes de comer."
                : score >= 2
                ? "Espere 15 minutos. Se persistir e quiser qualquer comida, pode ser fome física."
                : "Se realmente está com fome, alimente-se com calma e atenção."}
            </p>
          </div>
        )}
      </div>
      <ActionToolbar id="theme-physical-vs-emotional" />
    </>
  );
};

const Triggers = () => {
  const { state, toggleTrigger } = useCompulsionState();
  return (
    <>
      <div className="card-highlight">
        <p className="text-sm text-foreground leading-relaxed">
          Gatilhos são situações, emoções ou ambientes que disparam a vontade de comer por impulso.
          Marque os seus para começar a perceber padrões.
        </p>
      </div>
      <div className="card-elevated">
        <h3 className="font-heading font-bold text-foreground mb-3">Marque seus gatilhos</h3>
        <div className="flex flex-wrap gap-2">
          {triggersList.map((t) => {
            const sel = state.selectedTriggers.includes(t.id);
            return (
              <button
                key={t.id}
                onClick={() => toggleTrigger(t.id)}
                className={`px-3 py-2 rounded-full text-xs font-medium transition-colors ${
                  sel ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                }`}
              >
                {sel && "✓ "}
                {t.label}
              </button>
            );
          })}
        </div>
        {state.selectedTriggers.length > 0 && (
          <p className="text-xs text-muted-foreground mt-3">
            Você marcou {state.selectedTriggers.length}{" "}
            {state.selectedTriggers.length === 1 ? "gatilho" : "gatilhos"}. Use o Diário Emocional
            para registrar quando eles aparecerem.
          </p>
        )}
      </div>
      <ActionToolbar id="theme-triggers" />
    </>
  );
};

const EmotionScreen = ({
  intro,
  signs,
  practical,
  id,
}: {
  intro: string;
  signs: string[];
  practical: string[];
  id: string;
}) => (
  <>
    <div className="card-highlight">
      <p className="text-sm text-foreground leading-relaxed">{intro}</p>
    </div>
    <div className="card-elevated">
      <h3 className="font-heading font-bold text-foreground mb-2">Sinais comuns</h3>
      <ul className="space-y-1.5">
        {signs.map((s) => (
          <li key={s} className="text-sm text-foreground">
            • {s}
          </li>
        ))}
      </ul>
    </div>
    <div className="card-elevated">
      <h3 className="font-heading font-bold text-foreground mb-2">O que fazer agora</h3>
      <ul className="space-y-2">
        {practical.map((p) => (
          <li key={p} className="text-sm text-foreground flex gap-2">
            <span className="text-primary">→</span>
            {p}
          </li>
        ))}
      </ul>
    </div>
    <ActionToolbar id={id} />
  </>
);

const Pause = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { title: "Respire fundo 3 vezes", desc: "Inspire pelo nariz, expire pela boca devagar." },
    { title: "Beba um copo de água", desc: "Hidratação ajuda a diminuir o impulso imediato." },
    { title: "Espere 5 minutos", desc: "Use o timer abaixo. Se a vontade passar, era emocional." },
    { title: "Se pergunte", desc: "Estou com fome ou estou sentindo alguma emoção?" },
    { title: "Decida com calma", desc: "Se ainda quiser comer, faça com atenção e sem culpa." },
  ];
  return (
    <>
      <div className="card-highlight">
        <p className="text-sm text-foreground leading-relaxed">
          Esse é um pequeno fluxo para usar quando o impulso aparecer. Vá um passo de cada vez.
        </p>
      </div>
      <div className="space-y-3">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`w-full text-left card-elevated transition-all ${
              i === step ? "border-primary ring-2 ring-primary/20" : ""
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="font-bold text-foreground text-sm">{s.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <PauseTimer minutes={5} />
      <ActionToolbar id="theme-pause" />
    </>
  );
};

const Breathing = () => {
  const { incrementBreathing } = useCompulsionState();
  return (
    <>
      <div className="card-highlight">
        <p className="text-sm text-foreground leading-relaxed">
          Respiração 4-4-6 ativa o sistema nervoso parassimpático e reduz a ansiedade em poucos
          minutos. Acompanhe o círculo abaixo.
        </p>
      </div>
      <div className="card-elevated">
        <BreathingCircle inhale={4} hold={4} exhale={6} cycles={5} onComplete={incrementBreathing} />
      </div>
      <ActionToolbar id="theme-breathing" />
    </>
  );
};

const Alternatives = () => {
  const [cat, setCat] = useState<keyof typeof alternatives>("sweet");
  const cats = Object.entries(alternatives) as [keyof typeof alternatives, typeof alternatives.sweet][];
  return (
    <>
      <div className="card-highlight">
        <p className="text-sm text-foreground leading-relaxed">
          Escolha o tipo de vontade que você está sentindo agora. Sugestões leves para satisfazer
          sem exagerar.
        </p>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {cats.map(([key, val]) => (
          <button
            key={key}
            onClick={() => setCat(key)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium ${
              cat === key ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
            }`}
          >
            {val.emoji} {val.title}
          </button>
        ))}
      </div>
      <div className="card-elevated">
        <h3 className="font-heading font-bold text-foreground mb-3">
          {alternatives[cat].emoji} {alternatives[cat].title}
        </h3>
        <ul className="space-y-2">
          {alternatives[cat].items.map((item) => (
            <li key={item} className="text-sm text-foreground flex gap-2">
              <span className="text-primary">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <ActionToolbar id="theme-alternatives" />
    </>
  );
};

const AfterEpisode = () => (
  <>
    <div className="card-highlight">
      <p className="text-sm text-foreground leading-relaxed">
        Um episódio não anula seu progresso. Cada recomeço é parte do caminho. Sem culpa — vamos
        retomar com cuidado.
      </p>
    </div>
    <div className="card-elevated">
      <h3 className="font-heading font-bold text-foreground mb-2">Agora, faça assim</h3>
      <ul className="space-y-2 text-sm text-foreground">
        <li>• Beba um copo de água e respire devagar</li>
        <li>• Não pule a próxima refeição (isso piora o ciclo)</li>
        <li>• Saia para uma caminhada curta, se conseguir</li>
        <li>• Anote o que sentiu antes — sem julgar</li>
        <li>• Volte para sua rotina na próxima refeição</li>
      </ul>
    </div>
    <div className="card-elevated bg-primary/5 border-primary/20">
      <p className="text-sm text-foreground italic">
        "Você não falhou. Você é humana. Cada vez que você escuta o que sente, fica mais forte." 💚
      </p>
    </div>
    <ActionToolbar id="theme-after-episode" />
  </>
);

export const ThemeScreen = ({ themeId, onBack, onClose }: ThemeScreenProps) => {
  const config: Record<string, { title: string; emoji: string; render: () => React.ReactNode }> = {
    "physical-vs-emotional": {
      title: "Fome Física vs Emocional",
      emoji: "🧠",
      render: () => <PhysicalVsEmotional />,
    },
    triggers: { title: "Gatilhos Emocionais", emoji: "🎯", render: () => <Triggers /> },
    anxiety: {
      title: "Ansiedade",
      emoji: "😰",
      render: () => (
        <EmotionScreen
          id="theme-anxiety"
          intro="A ansiedade acelera tudo: pensamento, coração e a vontade de comer. Comer parece dar alívio rápido, mas a sensação volta. Vamos acalmar o corpo primeiro."
          signs={[
            "Coração acelerado, respiração curta",
            "Pensamentos rápidos e em loop",
            "Sensação de urgência",
            "Vontade súbita de algo doce ou crocante",
          ]}
          practical={[
            "Faça respiração 4-4-6 por 2 minutos",
            "Beba água gelada lentamente",
            "Saia para tomar ar por 5 minutos",
            "Escreva o que está sentindo, sem editar",
          ]}
        />
      ),
    },
    stress: {
      title: "Estresse",
      emoji: "😤",
      render: () => (
        <EmotionScreen
          id="theme-stress"
          intro="O estresse acumula no corpo e procura uma válvula. Comer é uma das saídas mais rápidas — e por isso vira hábito. Vamos soltar a pressão de outra forma."
          signs={[
            "Tensão nos ombros e mandíbula",
            "Irritação fácil",
            "Cansaço mental ao final do dia",
            "Vontade de algo intenso (salgado, gorduroso)",
          ]}
          practical={[
            "Alongue pescoço e ombros por 1 minuto",
            "Saia da tela por 5 minutos",
            "Escute uma música que te acalma",
            "Tome um banho ou lave o rosto",
          ]}
        />
      ),
    },
    sadness: {
      title: "Tristeza",
      emoji: "💙",
      render: () => (
        <EmotionScreen
          id="theme-sadness"
          intro="A tristeza pede acolhimento, não comida. Comer pode parecer conforto, mas o sentimento continua. Você merece cuidado de verdade."
          signs={[
            "Peso no peito ou nos olhos",
            "Vontade de se isolar",
            "Buscar comidas de infância ou conforto",
            "Falta de energia",
          ]}
          practical={[
            "Permita-se sentir por alguns minutos",
            "Escreva o que está doendo",
            "Tome um chá quente devagar",
            "Mande mensagem para alguém querido",
          ]}
        />
      ),
    },
    boredom: {
      title: "Tédio",
      emoji: "😑",
      render: () => (
        <EmotionScreen
          id="theme-boredom"
          intro="Comer por tédio é tentar preencher um vazio com sabor. Vamos quebrar o padrão com algo pequeno e diferente."
          signs={[
            "Abrir a geladeira sem fome",
            "Beliscar enquanto rola o feed",
            "Procurar comida só para se distrair",
          ]}
          practical={[
            "Levante e ande pela casa por 2 minutos",
            "Faça uma tarefa de 5 minutos (organizar gaveta, dobrar roupa)",
            "Coloque uma música e dance",
            "Ligue para alguém ou mande áudio",
          ]}
        />
      ),
    },
    loneliness: {
      title: "Solidão",
      emoji: "🤗",
      render: () => (
        <EmotionScreen
          id="theme-loneliness"
          intro="A solidão é um dos sentimentos mais difíceis — e a comida vira companhia. Vamos buscar conforto de outras formas, com gentileza."
          signs={[
            "Sentir um vazio difícil de nomear",
            "Comer sozinha em silêncio, sem fome real",
            "Buscar redes sociais sem prazer",
          ]}
          practical={[
            "Escreva uma mensagem para alguém — qualquer pessoa",
            "Saia em um lugar com gente, mesmo que sozinha",
            "Cuide de você como cuidaria de uma amiga",
            "Faça algo manual: cozinhar, desenhar, escrever",
          ]}
        />
      ),
    },
    pause: { title: "Pausar Antes de Comer", emoji: "⏸️", render: () => <Pause /> },
    breathing: { title: "Respiração Guiada", emoji: "🌬️", render: () => <Breathing /> },
    alternatives: { title: "Alternativas Mais Leves", emoji: "🥗", render: () => <Alternatives /> },
    "after-episode": { title: "Depois de um Episódio", emoji: "💚", render: () => <AfterEpisode /> },
  };

  const cfg = config[themeId];
  if (!cfg) return null;
  return (
    <CompulsionLayout title={cfg.title} emoji={cfg.emoji} onBack={onBack} onClose={onClose}>
      {cfg.render()}
    </CompulsionLayout>
  );
};
