import { useState } from "react";
import { Trash2 } from "lucide-react";
import { CompulsionLayout } from "./CompulsionLayout";
import { moods } from "@/data/compulsionContent";
import { useCompulsionState } from "@/hooks/useCompulsionState";

interface DiaryScreenProps {
  onBack: () => void;
  onClose: () => void;
}

export const DiaryScreen = ({ onBack, onClose }: DiaryScreenProps) => {
  const { state, addDiaryEntry, removeDiaryEntry } = useCompulsionState();
  const [open, setOpen] = useState(false);
  const [emotion, setEmotion] = useState("");
  const [trigger, setTrigger] = useState("");
  const [cravingLevel, setCravingLevel] = useState(5);
  const [ate, setAte] = useState<"yes" | "no" | "partial">("no");
  const [action, setAction] = useState("");
  const [afterFeeling, setAfterFeeling] = useState("");

  const reset = () => {
    setEmotion("");
    setTrigger("");
    setCravingLevel(5);
    setAte("no");
    setAction("");
    setAfterFeeling("");
    setOpen(false);
  };

  const save = () => {
    if (!emotion) return;
    addDiaryEntry({ emotion, trigger, cravingLevel, ate, action, afterFeeling });
    reset();
  };

  return (
    <CompulsionLayout title="Diário Emocional" emoji="📔" onBack={onBack} onClose={onClose}>
      {!open ? (
        <>
          <button
            onClick={() => setOpen(true)}
            className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-sm shadow-md"
          >
            + Novo registro
          </button>
          {state.diary.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm py-8">
              Nenhum registro ainda. Use o diário para entender seus padrões emocionais.
            </p>
          ) : (
            state.diary.map((d) => (
              <div key={d.id} className="card-elevated">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-foreground text-sm">{d.emotion}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(d.date).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <button onClick={() => removeDiaryEntry(d.id)} className="p-1.5 text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {d.trigger && <p className="text-xs text-foreground mt-2">🎯 {d.trigger}</p>}
                <p className="text-xs text-foreground mt-1">⚡ Vontade nível {d.cravingLevel}/10</p>
                <p className="text-xs text-foreground mt-1">
                  🍽️ {d.ate === "yes" ? "Comi" : d.ate === "partial" ? "Comi um pouco" : "Não comi"}
                </p>
                {d.action && <p className="text-xs text-foreground mt-1">✅ {d.action}</p>}
                {d.afterFeeling && <p className="text-xs text-muted-foreground mt-1 italic">"{d.afterFeeling}"</p>}
              </div>
            ))
          )}
        </>
      ) : (
        <>
          <div className="card-elevated">
            <label className="text-xs text-muted-foreground">Como você se sentia?</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {moods.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setEmotion(m.label)}
                  className={`px-3 py-2 rounded-full text-xs font-medium ${
                    emotion === m.label
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {m.emoji} {m.label}
                </button>
              ))}
            </div>
          </div>
          <div className="card-elevated">
            <label className="text-xs text-muted-foreground">Qual foi o gatilho? (opcional)</label>
            <input
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
              placeholder="Ex: discussão no trabalho"
              className="w-full mt-1 bg-muted rounded-xl px-3 py-2.5 text-foreground text-sm outline-none"
            />
          </div>
          <div className="card-elevated">
            <label className="text-xs text-muted-foreground">
              Intensidade da vontade: <span className="font-bold text-foreground">{cravingLevel}/10</span>
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={cravingLevel}
              onChange={(e) => setCravingLevel(Number(e.target.value))}
              className="w-full mt-2 accent-primary"
            />
          </div>
          <div className="card-elevated">
            <label className="text-xs text-muted-foreground">Você comeu?</label>
            <div className="flex gap-2 mt-2">
              {(["no", "partial", "yes"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setAte(v)}
                  className={`flex-1 py-2 rounded-xl text-xs font-medium ${
                    ate === v ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  {v === "no" ? "Não" : v === "partial" ? "Um pouco" : "Sim"}
                </button>
              ))}
            </div>
          </div>
          <div className="card-elevated">
            <label className="text-xs text-muted-foreground">O que você fez? (opcional)</label>
            <input
              value={action}
              onChange={(e) => setAction(e.target.value)}
              placeholder="Ex: respirei, sai para caminhar"
              className="w-full mt-1 bg-muted rounded-xl px-3 py-2.5 text-foreground text-sm outline-none"
            />
          </div>
          <div className="card-elevated">
            <label className="text-xs text-muted-foreground">Como ficou depois? (opcional)</label>
            <textarea
              value={afterFeeling}
              onChange={(e) => setAfterFeeling(e.target.value)}
              placeholder="Como se sente agora?"
              className="w-full mt-1 bg-muted rounded-xl px-3 py-2.5 text-foreground text-sm outline-none resize-none"
              rows={3}
            />
          </div>
          <div className="flex gap-2">
            <button onClick={reset} className="flex-1 py-3 rounded-2xl bg-muted text-foreground font-bold text-sm">
              Cancelar
            </button>
            <button
              onClick={save}
              disabled={!emotion}
              className="flex-1 py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-sm disabled:opacity-50"
            >
              Salvar
            </button>
          </div>
        </>
      )}
    </CompulsionLayout>
  );
};
