import { X, ArrowLeft } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { teas } from "@/data/teas";
import { lowCarbRecipes } from "@/data/lowCarb";
import { salads } from "@/data/salads";
import { exercises } from "@/data/exercises";
import { compulsionTips } from "@/data/compulsion";
import { useState } from "react";
import { Lock } from "lucide-react";

export const SearchOverlay = () => {
  const { setShowSearch } = useApp();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const filters = ["todos", "chá", "refeições", "low carb", "saladas", "doces", "exercícios", "planejamento", "compulsão alimentar", "upsells"];

  const allItems = [
    ...teas.map(t => ({ id: t.id, name: t.name, type: "chá", emoji: t.image })),
    ...lowCarbRecipes.map(r => ({ id: r.id, name: r.name, type: "low carb", emoji: r.image })),
    ...salads.map(s => ({ id: s.id, name: s.name, type: "saladas", emoji: s.image })),
    ...exercises.map(e => ({ id: e.id, name: e.name, type: "exercícios", emoji: e.image })),
  ];

  const filtered = allItems.filter(i => {
    if (query && !i.name.toLowerCase().includes(query.toLowerCase())) return false;
    if (filter !== "all" && filter !== "todos" && i.type !== filter) return false;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-background animate-slide-up">
      <div className="app-container h-full flex flex-col">
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <button onClick={() => setShowSearch(false)}><ArrowLeft className="w-5 h-5 text-foreground" /></button>
          <input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar..." className="flex-1 bg-transparent outline-none text-foreground" />
        </div>
        <div className="flex gap-2 p-4 overflow-x-auto">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`filter-chip whitespace-nowrap text-xs ${filter === f ? "filter-chip-active" : "filter-chip-inactive"}`}>{f}</button>
          ))}
        </div>
        <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-4">
          {filtered.map(i => (
            <div key={i.id} className="card-elevated flex items-center gap-3">
              <span className="text-2xl">{i.emoji}</span>
              <div><p className="text-sm font-medium text-foreground">{i.name}</p><p className="text-xs text-muted-foreground">{i.type}</p></div>
            </div>
          ))}
          {filtered.length === 0 && <p className="text-center text-muted-foreground text-sm py-8">Nenhum resultado encontrado</p>}
        </div>
      </div>
    </div>
  );
};

export const FavoritesOverlay = () => {
  const { setShowFavorites, appState } = useApp();
  const { state } = appState;
  const allItems = [
    ...teas.map(t => ({ id: t.id, name: t.name, section: "Chás", emoji: t.image })),
    ...lowCarbRecipes.map(r => ({ id: r.id, name: r.name, section: "Receitas", emoji: r.image })),
    ...salads.map(s => ({ id: s.id, name: s.name, section: "Saladas", emoji: s.image })),
    ...exercises.map(e => ({ id: e.id, name: e.name, section: "Exercícios", emoji: e.image })),
  ];
  const favItems = allItems.filter(i => state.favorites.includes(i.id));
  const sections = [...new Set(favItems.map(i => i.section))];

  return (
    <div className="fixed inset-0 z-50 bg-background animate-slide-up">
      <div className="app-container h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-heading font-bold text-foreground text-lg">❤️ Favoritos</h2>
          <button onClick={() => setShowFavorites(false)}><X className="w-5 h-5 text-foreground" /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {sections.length === 0 && <p className="text-center text-muted-foreground text-sm py-8">Nenhum favorito ainda</p>}
          {sections.map(s => (
            <div key={s}>
              <h3 className="section-title mb-2">{s}</h3>
              <div className="space-y-2">
                {favItems.filter(i => i.section === s).map(i => (
                  <div key={i.id} className="card-elevated flex items-center gap-3">
                    <span className="text-2xl">{i.emoji}</span>
                    <span className="text-sm font-medium text-foreground">{i.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ProfileOverlay = () => {
  const { setShowProfile, appState } = useApp();
  const { state } = appState;
  return (
    <div className="fixed inset-0 z-50 bg-background animate-slide-up">
      <div className="app-container h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-heading font-bold text-foreground text-lg">👤 Perfil</h2>
          <button onClick={() => setShowProfile(false)}><X className="w-5 h-5 text-foreground" /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          <div className="text-center py-4">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-3xl">👤</div>
            <h3 className="font-heading font-bold text-foreground text-xl mt-3">{state.profile.name}</h3>
            <p className="text-sm text-muted-foreground">{state.profile.email}</p>
          </div>
          {[
            { label: "Idade", value: `${state.profile.age} anos` },
            { label: "Gênero", value: state.profile.gender },
            { label: "Altura", value: `${state.profile.height} cm` },
            { label: "Peso Inicial", value: `${state.profile.initialWeight} kg` },
            { label: "Objetivo", value: state.profile.goal },
            { label: "Atividade", value: state.profile.activityLevel },
          ].map(f => (
            <div key={f.label} className="card-elevated flex justify-between">
              <span className="text-sm text-muted-foreground">{f.label}</span>
              <span className="text-sm font-medium text-foreground">{f.value}</span>
            </div>
          ))}
          <div className="card-highlight">
            <p className="text-sm font-bold text-foreground">Assinatura</p>
            <p className="text-xs text-primary mt-1">{state.access.subscriptionActive ? "✅ Ativa" : "❌ Inativa"}</p>
            <p className="text-xs text-muted-foreground">Vencimento: {state.access.subscriptionDueDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ChatOverlay = () => {
  const { setShowChat } = useApp();
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Olá! 😊 Sou sua assistente do Fórmula Emagrecer. Posso ajudar com dúvidas sobre chás, refeições, exercícios, compulsão alimentar e muito mais. Como posso te ajudar?" }
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages(m => [...m, { role: "user", content: input }]);
    const q = input.toLowerCase();
    setInput("");
    setTimeout(() => {
      let reply = "Entendi! Posso te ajudar com mais detalhes sobre isso. Que tal verificar as receitas ou o planejamento do app? 💚";
      if (q.includes("chá")) reply = "Temos 7 chás incríveis! O ideal é consumir até 17h, cerca de 1 litro por dia. Veja na aba Chá! 🍵";
      if (q.includes("ansiedade") || q.includes("compulsão")) reply = "Respire fundo 🌬️ Inspire por 4s, segure 4s, expire por 6s. Pergunte-se: é fome real ou emocional? Beba água e espere 15 min antes de ceder. Você consegue! 💚";
      if (q.includes("exercício")) reply = "Temos exercícios para todos os níveis! Comece devagar e aumente gradualmente. Não esqueça do alongamento! 💪";
      setMessages(m => [...m, { role: "assistant", content: reply }]);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background animate-slide-up">
      <div className="app-container h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-heading font-bold text-foreground text-lg">🤖 Chat IA</h2>
          <button onClick={() => setShowChat(false)}><X className="w-5 h-5 text-foreground" /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${m.role === "user" ? "bg-primary text-primary-foreground rounded-br-md" : "bg-muted text-foreground rounded-bl-md"}`}>
                {m.content}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-border flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Digite sua mensagem..." className="flex-1 px-4 py-3 rounded-2xl bg-muted text-foreground outline-none text-sm" />
          <button onClick={send} className="px-4 py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-sm">Enviar</button>
        </div>
      </div>
    </div>
  );
};

export const UpsellsOverlay = () => {
  const { setSubScreen, appState } = useApp();
  const { state } = appState;
  return (
    <div className="fixed inset-0 z-50 bg-background animate-slide-up">
      <div className="app-container h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-heading font-bold text-foreground text-lg">🎁 Upsells</h2>
          <button onClick={() => setSubScreen(null)}><X className="w-5 h-5 text-foreground" /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {/* Compulsion - always available */}
          <button onClick={() => setSubScreen("compulsion")} className="card-highlight w-full text-left">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🧠</span>
              <div>
                <p className="font-bold text-foreground">Dicas de Compulsão Alimentar</p>
                <p className="text-xs text-primary mt-1">✅ Disponível</p>
              </div>
            </div>
          </button>
          {/* Doces */}
          <div className={`card-elevated ${!state.access.doces ? "opacity-60" : ""}`}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">🍰</span>
              <div className="flex-1">
                <p className="font-bold text-foreground">Doces Fitness</p>
                <p className="text-xs text-muted-foreground mt-1">{state.access.doces ? "✅ Liberado" : "🔒 Bloqueado"}</p>
              </div>
              {!state.access.doces && <Lock className="w-5 h-5 text-muted-foreground" />}
            </div>
          </div>
          {/* Pele */}
          <div className={`card-elevated ${!state.access.peleFlacida ? "opacity-60" : ""}`}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">✨</span>
              <div className="flex-1">
                <p className="font-bold text-foreground">Pele Flácida</p>
                <p className="text-xs text-muted-foreground mt-1">{state.access.peleFlacida ? "✅ Liberado" : "🔒 Bloqueado"}</p>
              </div>
              {!state.access.peleFlacida && <Lock className="w-5 h-5 text-muted-foreground" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CompulsionOverlay = () => {
  const { setSubScreen } = useApp();
  return (
    <div className="fixed inset-0 z-50 bg-background animate-slide-up">
      <div className="app-container h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-heading font-bold text-foreground text-lg">🧠 Compulsão Alimentar</h2>
          <button onClick={() => setSubScreen(null)}><X className="w-5 h-5 text-foreground" /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {compulsionTips.map(tip => (
            <div key={tip.id} className="card-elevated">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{tip.icon}</span>
                <h3 className="font-bold text-foreground text-sm">{tip.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{tip.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
