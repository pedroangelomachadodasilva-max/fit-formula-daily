import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Camera, Upload, ArrowLeft, Check } from "lucide-react";

export const CameraScreen = () => {
  const { appState } = useApp();
  const [step, setStep] = useState<"capture" | "result" | "manual">("capture");
  const [detectedFoods, setDetectedFoods] = useState<string[]>([]);
  const [estimatedCalories, setEstimatedCalories] = useState(0);
  const [selectedMeal, setSelectedMeal] = useState<"breakfast" | "lunch" | "snack" | "dinner">("lunch");
  const [manualCalories, setManualCalories] = useState("");
  const [saved, setSaved] = useState(false);

  const simulateScan = () => {
    const foods = [
      { name: "Arroz integral", cal: 130 },
      { name: "Frango grelhado", cal: 165 },
      { name: "Salada verde", cal: 25 },
      { name: "Feijão", cal: 95 },
    ];
    const selected = foods.slice(0, 2 + Math.floor(Math.random() * 3));
    setDetectedFoods(selected.map(f => f.name));
    setEstimatedCalories(selected.reduce((a, b) => a + b.cal, 0));
    setStep("result");
  };

  const saveToDay = () => {
    appState.addCalories(selectedMeal, estimatedCalories);
    setSaved(true);
    setTimeout(() => { setSaved(false); setStep("capture"); }, 2000);
  };

  const saveManual = () => {
    if (manualCalories) {
      appState.addCalories(selectedMeal, parseInt(manualCalories));
      setSaved(true);
      setManualCalories("");
      setTimeout(() => { setSaved(false); setStep("capture"); }, 2000);
    }
  };

  if (saved) {
    return (
      <div className="screen-content flex flex-col items-center justify-center min-h-[60vh] animate-scale-in">
        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-4">
          <Check className="w-10 h-10 text-primary-foreground" />
        </div>
        <h2 className="text-xl font-heading font-bold text-foreground">Salvo!</h2>
        <p className="text-muted-foreground text-sm mt-2">Calorias adicionadas ao seu dia</p>
      </div>
    );
  }

  if (step === "manual") {
    return (
      <div className="screen-content animate-slide-up">
        <button onClick={() => setStep("capture")} className="flex items-center gap-2 text-primary mb-4">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>
        <h2 className="text-xl font-heading font-bold text-foreground mb-4">✏️ Lançamento Manual</h2>
        <div className="space-y-4">
          <div className="card-elevated">
            <label className="text-sm font-bold text-foreground block mb-2">Calorias</label>
            <input
              type="number"
              value={manualCalories}
              onChange={e => setManualCalories(e.target.value)}
              placeholder="Ex: 350"
              className="w-full px-4 py-3 rounded-xl bg-muted text-foreground border-0 outline-none"
            />
          </div>
          <div className="card-elevated">
            <label className="text-sm font-bold text-foreground block mb-2">Refeição</label>
            <div className="grid grid-cols-2 gap-2">
              {(["breakfast", "lunch", "snack", "dinner"] as const).map(m => (
                <button
                  key={m}
                  onClick={() => setSelectedMeal(m)}
                  className={`py-2 rounded-xl text-sm font-medium ${selectedMeal === m ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  {{ breakfast: "☀️ Café", lunch: "🍽️ Almoço", snack: "🍎 Lanche", dinner: "🌙 Jantar" }[m]}
                </button>
              ))}
            </div>
          </div>
          <button onClick={saveManual} className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-sm">
            Salvar
          </button>
        </div>
      </div>
    );
  }

  if (step === "result") {
    return (
      <div className="screen-content animate-slide-up">
        <button onClick={() => setStep("capture")} className="flex items-center gap-2 text-primary mb-4">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>
        <h2 className="text-xl font-heading font-bold text-foreground mb-4">📊 Resultado do Scanner</h2>

        <div className="card-elevated mb-4 text-center">
          <span className="text-6xl">📸</span>
          <p className="text-sm text-muted-foreground mt-2">Imagem analisada</p>
        </div>

        <div className="card-highlight mb-4">
          <h3 className="font-bold text-foreground mb-2">Alimentos detectados</h3>
          {detectedFoods.map(f => (
            <p key={f} className="text-sm text-foreground">✓ {f}</p>
          ))}
          <div className="mt-3 pt-3 border-t border-primary/20">
            <p className="text-2xl font-bold text-primary">{estimatedCalories} kcal</p>
            <p className="text-xs text-muted-foreground">⚠️ Estimativa aproximada, não valor exato</p>
          </div>
        </div>

        <div className="card-elevated mb-4">
          <label className="text-sm font-bold text-foreground block mb-2">Salvar em qual refeição?</label>
          <div className="grid grid-cols-2 gap-2">
            {(["breakfast", "lunch", "snack", "dinner"] as const).map(m => (
              <button
                key={m}
                onClick={() => setSelectedMeal(m)}
                className={`py-2 rounded-xl text-sm font-medium ${selectedMeal === m ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
              >
                {{ breakfast: "☀️ Café", lunch: "🍽️ Almoço", snack: "🍎 Lanche", dinner: "🌙 Jantar" }[m]}
              </button>
            ))}
          </div>
        </div>

        <button onClick={saveToDay} className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-sm">
          Salvar no meu dia
        </button>
      </div>
    );
  }

  return (
    <div className="screen-content flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Camera className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-xl font-heading font-bold text-foreground">Scanner de Calorias</h2>
        <p className="text-sm text-muted-foreground mt-2">Tire uma foto do prato para estimar as calorias</p>
      </div>

      <div className="w-full space-y-3">
        <button onClick={simulateScan} className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2">
          <Camera className="w-5 h-5" /> Tirar Foto
        </button>
        <button onClick={simulateScan} className="w-full py-4 rounded-2xl bg-muted text-foreground font-bold text-sm flex items-center justify-center gap-2">
          <Upload className="w-5 h-5" /> Escolher da Galeria
        </button>
        <button onClick={() => setStep("manual")} className="w-full py-3 rounded-2xl bg-card border border-border text-foreground font-medium text-sm">
          ✏️ Lançar manualmente
        </button>
      </div>

      <p className="text-xs text-muted-foreground mt-6 text-center">
        📌 Aponte a câmera para a comida ou envie uma imagem para análise
      </p>
    </div>
  );
};
