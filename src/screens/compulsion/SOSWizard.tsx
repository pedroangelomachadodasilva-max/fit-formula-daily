import { useState } from "react";
import { CompulsionLayout } from "./CompulsionLayout";
import { BreathingCircle } from "./BreathingCircle";
import { PauseTimer } from "./PauseTimer";
import { moods } from "@/data/compulsionContent";
import { useCompulsionState } from "@/hooks/useCompulsionState";

interface SOSWizardProps {
  onBack: () => void;
  onClose: () => void;
}

export const SOSWizard = ({ onBack, onClose }: SOSWizardProps) => {
  const [step, setStep] = useState(0);
  const [emotion, setEmotion] = useState("");
  const [intensity, setIntensity] = useState(7);
  const [chosenAction, setChosenAction] = useState("");
  const [afterIntensity, setAfterIntensity] = useState(5);
  const { addDiaryEntry, incrementAntiCrisis } = useCompulsionState();

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => Math.max(0, s - 1));

  const finish = () => {
    addDiaryEntry({
      emotion: emotion || "Vontade forte",
      trigger: "Modo SOS",
      cravingLevel: intensity,
      ate: "no",
      action: chosenAction,
      afterFeeling: `Após o plano: vontade caiu para ${afterIntensity}/10`,
    });
    incrementAntiCrisis();
    onClose();
  };

  const totalSteps = 6;

  return (
    <CompulsionLayout
      title="Plano Anti-Crise"
      emoji="🆘"
      onBack={step === 0 ? onBack : prev}
      onClose={onClose}
    >
      <div className="flex gap-1 mb-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`}
          />
        ))}
      </div>

      {step === 0 && (
        <>
          <div className="card-highlight text-center py-6">
            <p className="text-4xl mb-3">💚</p>
            <h3 className="font-heading font-bold text-foreground text-lg">Você está aqui</h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Esse é um pequeno fluxo guiado para te ajudar agora. Vamos com calma, um passo de cada
              vez. Você consegue.
            </p>
          </div>
          <button
            onClick={next}
            className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-sm shadow-md"
          >
            Começar
          </button>
        </>
      )}

      {step === 1 && (
        <>
          <h3 className="font-heading font-bold text-foreground">1. Respire comigo</h3>
          <p className="text-sm text-muted-foreground">
            Vamos acalmar o corpo primeiro. Faça 5 ciclos de respiração 4-4-6.
          </p>
          <div className="card-elevated">
            <BreathingCircle inhale={4} hold={4} exhale={6} cycles={5} />
          </div>
          <button onClick={next} className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-sm">
            Já respirei, continuar
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h3 className="font-heading font-bold text-foreground">2. O que você sente?</h3>
          <p className="text-sm text-muted-foreground">Escolha a emoção mais próxima.</p>
          <div className="grid grid-cols-3 gap-2">
            {moods.map((m) => (
              <button
                key={m.id}
                onClick={() => setEmotion(m.label)}
                className={`card-elevated text-center py-3 ${
                  emotion === m.label ? "border-primary ring-2 ring-primary/20" : ""
                }`}
              >
                <div className="text-2xl">{m.emoji}</div>
                <p className="text-xs text-foreground mt-1">{m.label}</p>
              </button>
            ))}
          </div>
          <button
            onClick={next}
            disabled={!emotion}
            className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-sm disabled:opacity-50"
          >
            Continuar
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <h3 className="font-heading font-bold text-foreground">3. Qual a intensidade?</h3>
          <p className="text-sm text-muted-foreground">De 0 a 10, o quão forte está a vontade.</p>
          <div className="card-elevated text-center">
            <p className="text-5xl font-heading font-bold text-primary">{intensity}</p>
            <p className="text-xs text-muted-foreground">/10</p>
            <input
              type="range"
              min="0"
              max="10"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full mt-3 accent-primary"
            />
          </div>
          <button onClick={next} className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-sm">
            Continuar
          </button>
        </>
      )}

      {step === 4 && (
        <>
          <h3 className="font-heading font-bold text-foreground">4. Escolha uma ação</h3>
          <p className="text-sm text-muted-foreground">Algo seguro para fazer nos próximos minutos.</p>
          <div className="space-y-2">
            {[
              "Beber um copo de água gelada",
              "Sair para caminhar 5 minutos",
              "Tomar um banho ou lavar o rosto",
              "Ligar / mandar mensagem para alguém",
              "Escrever o que estou sentindo",
              "Alongar pescoço e ombros",
            ].map((a) => (
              <button
                key={a}
                onClick={() => setChosenAction(a)}
                className={`w-full text-left card-elevated text-sm ${
                  chosenAction === a ? "border-primary ring-2 ring-primary/20" : ""
                }`}
              >
                {a}
              </button>
            ))}
          </div>
          <button
            onClick={next}
            disabled={!chosenAction}
            className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-sm disabled:opacity-50"
          >
            Continuar
          </button>
        </>
      )}

      {step === 5 && (
        <>
          <h3 className="font-heading font-bold text-foreground">5. Espere comigo</h3>
          <p className="text-sm text-muted-foreground">
            Faça a ação escolhida e use a pausa. A maioria das vontades emocionais passa em 10–15
            minutos.
          </p>
          <div className="card-elevated bg-primary/5 border-primary/20">
            <p className="text-sm text-foreground">✨ Sua ação: {chosenAction}</p>
          </div>
          <PauseTimer minutes={5} />
          <div className="card-elevated">
            <label className="text-xs text-muted-foreground">
              Como está a vontade agora? <span className="font-bold text-foreground">{afterIntensity}/10</span>
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={afterIntensity}
              onChange={(e) => setAfterIntensity(Number(e.target.value))}
              className="w-full mt-2 accent-primary"
            />
          </div>
          <button onClick={finish} className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-sm shadow-md">
            Salvar e finalizar 💚
          </button>
        </>
      )}
    </CompulsionLayout>
  );
};
