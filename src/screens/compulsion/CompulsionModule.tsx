import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { CompulsionLayout } from "./CompulsionLayout";
import { ThemeScreen } from "./ThemeScreen";
import { DiaryScreen } from "./DiaryScreen";
import { SOSWizard } from "./SOSWizard";
import { moods, themes } from "@/data/compulsionContent";
import { useCompulsionState } from "@/hooks/useCompulsionState";

type View =
  | { type: "home" }
  | { type: "theme"; id: string }
  | { type: "diary" }
  | { type: "sos" };

export const CompulsionModule = () => {
  const { setSubScreen } = useApp();
  const { state, setMood } = useCompulsionState();
  const [view, setView] = useState<View>({ type: "home" });

  const close = () => setSubScreen(null);
  const back = () => setView({ type: "home" });

  const goTheme = (id: string) => {
    if (id === "diary") setView({ type: "diary" });
    else if (id === "anti-crisis") setView({ type: "sos" });
    else setView({ type: "theme", id });
  };

  if (view.type === "theme") {
    return <ThemeScreen themeId={view.id} onBack={back} onClose={close} onNavigate={goTheme} />;
  }
  if (view.type === "diary") {
    return <DiaryScreen onBack={back} onClose={close} />;
  }
  if (view.type === "sos") {
    return <SOSWizard onBack={back} onClose={close} />;
  }

  return (
    <CompulsionLayout title="Compulsão Alimentar" emoji="🧠" onClose={close}>
      <div className="card-highlight">
        <h3 className="font-heading font-bold text-foreground text-base">Você não está sozinha 💚</h3>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          Aqui você encontra apoio prático para entender impulsos, acolher emoções e escolher
          ações que cuidam de você no momento difícil.
        </p>
      </div>

      <button
        onClick={() => setView({ type: "sos" })}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-accent to-warm-gold text-accent-foreground font-bold shadow-lg active:scale-95 transition-transform"
      >
        🆘 Preciso de ajuda agora
      </button>

      <div className="card-elevated">
        <h3 className="font-heading font-bold text-foreground text-sm">Como você está se sentindo agora?</h3>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {moods.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setMood(m.label);
                goTheme(m.topic);
              }}
              className={`flex flex-col items-center gap-1 py-3 rounded-xl transition-colors ${
                state.lastMood === m.label
                  ? "bg-primary/10 border border-primary/30"
                  : "bg-muted hover:bg-muted/70"
              }`}
            >
              <span className="text-2xl">{m.emoji}</span>
              <span className="text-[10px] font-medium text-foreground text-center leading-tight">
                {m.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {(state.antiCrisisCompleted > 0 || state.breathingCompleted > 0 || state.diary.length > 0) && (
        <div className="grid grid-cols-3 gap-2">
          <div className="card-elevated text-center">
            <p className="text-2xl font-heading font-bold text-primary">{state.antiCrisisCompleted}</p>
            <p className="text-[10px] text-muted-foreground">Crises superadas</p>
          </div>
          <div className="card-elevated text-center">
            <p className="text-2xl font-heading font-bold text-primary">{state.breathingCompleted}</p>
            <p className="text-[10px] text-muted-foreground">Respirações</p>
          </div>
          <div className="card-elevated text-center">
            <p className="text-2xl font-heading font-bold text-primary">{state.diary.length}</p>
            <p className="text-[10px] text-muted-foreground">Registros</p>
          </div>
        </div>
      )}

      <div>
        <h3 className="section-title mb-2 px-1">Explore os temas</h3>
        <div className="grid grid-cols-2 gap-3">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => goTheme(t.id)}
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
          "Cuidar de você é um ato de coragem. Um passo de cada vez." 💚
        </p>
      </div>
    </CompulsionLayout>
  );
};
