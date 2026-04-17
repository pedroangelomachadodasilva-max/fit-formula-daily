import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { teas, teaGuidelines, teaGeneralContraindications, Tea } from "@/data/teas";
import { Heart, Check, ArrowLeft, AlertTriangle, Info } from "lucide-react";
import { FoodImage } from "@/components/FoodImage";

const TeaDetail = ({ tea, onBack }: { tea: Tea; onBack: () => void }) => {
  const { appState } = useApp();
  const { isFavorite, toggleFavorite, markTeaDrunk, state } = appState;
  const isDrunk = state.dailyLog.teasDrunk.includes(tea.id);

  return (
    <div className="screen-content animate-slide-up">
      <button onClick={onBack} className="flex items-center gap-2 text-primary mb-4">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </button>
      <div className="text-center mb-6">
        <FoodImage src={tea.image} alt={tea.name} size="xl" className="mx-auto" />
        <h2 className="text-xl font-heading font-bold mt-3 text-foreground">{tea.name}</h2>
        <p className="text-sm text-muted-foreground mt-1">{tea.shortDescription}</p>
      </div>
      <div className="space-y-4">
        <div className="card-elevated">
          <h4 className="font-bold text-foreground mb-2">📝 Ingredientes</h4>
          <ul className="space-y-1">
            {tea.ingredients.map((ing, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1">•</span>{ing}
              </li>
            ))}
          </ul>
        </div>
        <div className="card-elevated">
          <h4 className="font-bold text-foreground mb-2">👨‍🍳 Modo de Preparo</h4>
          <p className="text-sm text-muted-foreground">{tea.preparation}</p>
        </div>
        <div className="card-elevated">
          <h4 className="font-bold text-foreground mb-2">📊 Consumo Sugerido</h4>
          <p className="text-sm text-muted-foreground">{tea.suggestedConsumption}</p>
          <p className="text-xs text-muted-foreground mt-1">⏰ Horário: {tea.recommendedTime}</p>
        </div>
        <div className="card-highlight">
          <h4 className="font-bold text-foreground mb-2">✨ Benefícios</h4>
          <div className="flex flex-wrap gap-2">
            {tea.benefits.map((b, i) => (
              <span key={i} className="text-xs bg-card px-2 py-1 rounded-full text-foreground">{b}</span>
            ))}
          </div>
        </div>
        <div className="card-elevated border-destructive/20">
          <h4 className="font-bold text-destructive mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Contraindicações
          </h4>
          <ul className="space-y-1">
            {tea.contraindications.map((c, i) => (
              <li key={i} className="text-sm text-muted-foreground">• {c}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex gap-3 mt-6 sticky bottom-20 bg-background py-3">
        <button
          onClick={() => markTeaDrunk(tea.id)}
          className={`flex-1 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 ${
            isDrunk ? "bg-primary text-primary-foreground" : "bg-primary/20 text-primary"
          }`}
        >
          <Check className="w-4 h-4" />
          {isDrunk
            ? `Tomado ${state.dailyLog.teasDrunk.filter(id => id === tea.id).length}x — tocar para +1`
            : "Marcar como tomado"}
        </button>
        <button
          onClick={() => toggleFavorite(tea.id)}
          className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center"
        >
          <Heart className={`w-5 h-5 ${isFavorite(tea.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
        </button>
      </div>
    </div>
  );
};

export const TeaScreen = () => {
  const [selectedTea, setSelectedTea] = useState<Tea | null>(null);
  const [showGuidelines, setShowGuidelines] = useState(false);
  const { appState } = useApp();
  const { state, markTeaDrunk, isFavorite, toggleFavorite } = appState;

  if (selectedTea) return <TeaDetail tea={selectedTea} onBack={() => setSelectedTea(null)} />;

  return (
    <div className="screen-content space-y-4 animate-fade-in">
      <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-5 text-primary-foreground">
        <h2 className="text-xl font-heading font-bold">🍵 Chás Funcionais</h2>
        <p className="text-sm opacity-90 mt-1">7 chás poderosos para acelerar seu emagrecimento</p>
      </div>

      {(() => {
        const teaOfDay = teas[new Date().getDay() % teas.length];
        const drunkOfDay = state.dailyLog.teasDrunk.filter(id => id === teaOfDay.id).length;
        return (
          <button
            onClick={() => setSelectedTea(teaOfDay)}
            className="card-highlight w-full text-left active:scale-[0.99] transition-transform"
          >
            <p className="text-xs font-medium text-primary uppercase tracking-wider">Chá do dia · toque para ver receita</p>
            <div className="flex items-center justify-between mt-2 gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground truncate">{teaOfDay.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {state.dailyLog.teasDrunk.length} chá(s) tomado(s) hoje
                  {drunkOfDay > 0 && ` · ${drunkOfDay}x deste`}
                </p>
              </div>
              <FoodImage src={teaOfDay.image} alt="Chá do dia" size="md" />
            </div>
            <div className="flex gap-2 mt-3">
              <span
                onClick={(e) => { e.stopPropagation(); markTeaDrunk(teaOfDay.id); }}
                className="flex-1 text-center text-xs font-bold py-2 rounded-xl bg-primary text-primary-foreground cursor-pointer"
              >
                <Check className="w-3 h-3 inline mr-1" />
                Marcar tomado
              </span>
            </div>
          </button>
        );
      })()}

      <button onClick={() => setShowGuidelines(!showGuidelines)} className="card-elevated w-full text-left">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" />
          <span className="font-bold text-foreground text-sm">Orientações e Contraindicações Gerais</span>
        </div>
        {showGuidelines && (
          <div className="mt-3 space-y-3 animate-fade-in">
            <div>
              <p className="text-xs font-bold text-primary mb-1">Orientações</p>
              {teaGuidelines.map((g, i) => (
                <p key={i} className="text-xs text-muted-foreground">• {g}</p>
              ))}
            </div>
            <div>
              <p className="text-xs font-bold text-destructive mb-1">Contraindicações</p>
              {teaGeneralContraindications.map((c, i) => (
                <p key={i} className="text-xs text-muted-foreground">• {c}</p>
              ))}
            </div>
          </div>
        )}
      </button>

      <div>
        <h3 className="section-title mb-3">Os 7 Chás</h3>
        <div className="grid grid-cols-2 gap-3">
          {teas.map(tea => {
            const drunkCount = state.dailyLog.teasDrunk.filter(id => id === tea.id).length;
            const isDrunk = drunkCount > 0;
            return (
              <div key={tea.id} className="card-elevated p-2 flex flex-col">
                <button
                  onClick={() => setSelectedTea(tea)}
                  className="relative w-full aspect-square rounded-xl overflow-hidden bg-muted active:scale-[0.98] transition-transform"
                >
                  <img src={tea.image} alt={tea.name} loading="lazy" className="w-full h-full object-cover" />
                  {isDrunk && (
                    <div className="absolute top-2 right-2 min-w-6 h-6 px-1.5 rounded-full bg-primary flex items-center justify-center shadow-md">
                      <Check className="w-3 h-3 text-primary-foreground" />
                      {drunkCount > 1 && <span className="text-[10px] font-bold text-primary-foreground ml-0.5">{drunkCount}</span>}
                    </div>
                  )}
                </button>
                <div className="px-1 pt-2 pb-1 flex-1 flex flex-col">
                  <h4 className="font-bold text-foreground text-sm leading-tight line-clamp-2">{tea.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{tea.shortDescription}</p>
                  <p className="text-xs text-primary mt-1">⏰ {tea.recommendedTime}</p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
                    <button
                      onClick={() => markTeaDrunk(tea.id)}
                      className="text-xs font-bold text-primary flex items-center gap-1"
                    >
                      <Check className="w-3 h-3" />
                      {isDrunk ? `${drunkCount}x` : "Tomar"}
                    </button>
                    <button onClick={() => toggleFavorite(tea.id)} className="w-7 h-7 rounded-full flex items-center justify-center">
                      <Heart className={`w-4 h-4 ${isFavorite(tea.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
