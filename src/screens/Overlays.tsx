import { X, ArrowLeft, Pencil, Check, Eye, EyeOff, ChevronRight } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { teas } from "@/data/teas";
import { lowCarbRecipes } from "@/data/lowCarb";
import { salads } from "@/data/salads";
import { exercises } from "@/data/exercises";
import { compulsionTips } from "@/data/compulsion";
import { useState } from "react";
import { Lock } from "lucide-react";
import { FoodImage } from "@/components/FoodImage";

export const SearchOverlay = () => {
  const { setShowSearch } = useApp();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const filters = ["todos", "chá", "refeições", "low carb", "saladas", "doces", "exercícios", "planejamento", "compulsão alimentar", "upsells"];

  const allItems = [
    ...teas.map(t => ({ id: t.id, name: t.name, type: "chá", image: t.image })),
    ...lowCarbRecipes.map(r => ({ id: r.id, name: r.name, type: "low carb", image: r.image })),
    ...salads.map(s => ({ id: s.id, name: s.name, type: "saladas", image: s.image })),
    ...exercises.map(e => ({ id: e.id, name: e.name, type: "exercícios", image: e.image })),
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
              <FoodImage src={i.image} alt={i.name} size="sm" />
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
    ...teas.map(t => ({ id: t.id, name: t.name, section: "Chás", image: t.image })),
    ...lowCarbRecipes.map(r => ({ id: r.id, name: r.name, section: "Receitas", image: r.image })),
    ...salads.map(s => ({ id: s.id, name: s.name, section: "Saladas", image: s.image })),
    ...exercises.map(e => ({ id: e.id, name: e.name, section: "Exercícios", image: e.image })),
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
                    <FoodImage src={i.image} alt={i.name} size="sm" />
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
  const { state, updateProfile } = appState;
  const [editing, setEditing] = useState(false);
  const [showAccess, setShowAccess] = useState(false);
  const [form, setForm] = useState({ ...state.profile });
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState(state.profile.email);

  const saveProfile = () => {
    updateProfile(form);
    setEditing(false);
  };

  if (showAccess) {
    return (
      <div className="fixed inset-0 z-50 bg-background animate-slide-up">
        <div className="app-container h-full flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="font-heading font-bold text-foreground text-lg">🔐 Acesso</h2>
            <button onClick={() => setShowAccess(false)}><X className="w-5 h-5 text-foreground" /></button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            <div className="card-elevated">
              <label className="text-xs text-muted-foreground">E-mail</label>
              <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} className="w-full mt-1 bg-muted rounded-xl px-3 py-2.5 text-foreground text-sm outline-none" />
            </div>
            <div className="card-elevated">
              <label className="text-xs text-muted-foreground">Senha atual</label>
              <div className="flex items-center gap-2 mt-1">
                <input type={showPassword ? "text" : "password"} value="••••••••" readOnly className="flex-1 bg-muted rounded-xl px-3 py-2.5 text-foreground text-sm outline-none" />
                <button onClick={() => setShowPassword(!showPassword)} className="p-2">
                  {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                </button>
              </div>
            </div>
            <div className="card-elevated">
              <label className="text-xs text-muted-foreground">Nova senha</label>
              <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Digite a nova senha" className="w-full mt-1 bg-muted rounded-xl px-3 py-2.5 text-foreground text-sm outline-none" />
            </div>
            <button onClick={() => {
              if (newEmail) updateProfile({ email: newEmail });
              setShowAccess(false);
            }} className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-sm">
              Salvar alterações
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-background animate-slide-up">
      <div className="app-container h-full flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-heading font-bold text-foreground text-lg">👤 Perfil</h2>
          <div className="flex items-center gap-2">
            {!editing && (
              <button onClick={() => { setForm({ ...state.profile }); setEditing(true); }} className="p-2">
                <Pencil className="w-4 h-4 text-primary" />
              </button>
            )}
            <button onClick={() => setShowProfile(false)}><X className="w-5 h-5 text-foreground" /></button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          <div className="text-center py-4">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-3xl">👤</div>
            <h3 className="font-heading font-bold text-foreground text-xl mt-3">{state.profile.name}</h3>
            <p className="text-sm text-muted-foreground">{state.profile.email}</p>
          </div>

          {editing ? (
            <div className="space-y-3">
              {[
                { label: "Nome", key: "name", type: "text" },
                { label: "E-mail", key: "email", type: "email" },
                { label: "Idade", key: "age", type: "number" },
                { label: "Altura (cm)", key: "height", type: "number" },
                { label: "Peso Inicial (kg)", key: "initialWeight", type: "number" },
                { label: "Objetivo", key: "goal", type: "text" },
              ].map(f => (
                <div key={f.key} className="card-elevated">
                  <label className="text-xs text-muted-foreground">{f.label}</label>
                  <input
                    type={f.type}
                    value={(form as any)[f.key]}
                    onChange={e => setForm({ ...form, [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value })}
                    className="w-full mt-1 bg-muted rounded-xl px-3 py-2.5 text-foreground text-sm outline-none"
                  />
                </div>
              ))}
              <div className="card-elevated">
                <label className="text-xs text-muted-foreground">Gênero</label>
                <div className="flex gap-2 mt-1">
                  {["feminino", "masculino"].map(g => (
                    <button key={g} onClick={() => setForm({ ...form, gender: g })} className={`flex-1 py-2 rounded-xl text-sm font-medium ${form.gender === g ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                      {g === "feminino" ? "Feminino" : "Masculino"}
                    </button>
                  ))}
                </div>
              </div>
              <div className="card-elevated">
                <label className="text-xs text-muted-foreground">Nível de atividade</label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {["sedentario", "leve", "moderado", "ativo"].map(a => (
                    <button key={a} onClick={() => setForm({ ...form, activityLevel: a })} className={`py-2 rounded-xl text-xs font-medium capitalize ${form.activityLevel === a ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                      {a}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setEditing(false)} className="flex-1 py-3 rounded-2xl bg-muted text-foreground font-bold text-sm">Cancelar</button>
                <button onClick={saveProfile} className="flex-1 py-3 rounded-2xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" /> Salvar
                </button>
              </div>
            </div>
          ) : (
            <>
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

              <button onClick={() => setShowAccess(true)} className="card-elevated w-full text-left flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg">🔐</span>
                  <div>
                    <p className="font-bold text-foreground text-sm">Acesso</p>
                    <p className="text-xs text-muted-foreground">E-mail e senha</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>

              <div className="card-highlight">
                <p className="text-sm font-bold text-foreground">Assinatura</p>
                <p className="text-xs text-primary mt-1">{state.access.subscriptionActive ? "✅ Ativa" : "❌ Inativa"}</p>
                <p className="text-xs text-muted-foreground">Vencimento: {state.access.subscriptionDueDate}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ChatOverlay removed — replaced by ChatWidget component

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
          <button onClick={() => setSubScreen("compulsion")} className="card-highlight w-full text-left">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🧠</span>
              <div>
                <p className="font-bold text-foreground">Dicas de Compulsão Alimentar</p>
                <p className="text-xs text-primary mt-1">✅ Disponível</p>
              </div>
            </div>
          </button>
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
