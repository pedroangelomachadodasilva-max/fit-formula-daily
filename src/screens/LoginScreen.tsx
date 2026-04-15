import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Ruler, Weight, Target, ChevronRight, ChevronLeft, Sparkles, Check, Droplets } from "lucide-react";

interface OnboardingData {
  name: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  targetWeight: string;
  objective: string;
  activityLevel: string;
  exerciseFrequency: string;
  dietOrganization: string;
  hardestTime: string;
  difficulties: string[];
  situations: string[];
  bodyFeeling: string;
  cravings: string[];
  firstImprovement: string[];
}

const defaultOnboarding: OnboardingData = {
  name: "", age: "", gender: "", height: "", weight: "", targetWeight: "",
  objective: "", activityLevel: "", exerciseFrequency: "", dietOrganization: "",
  hardestTime: "", difficulties: [], situations: [], bodyFeeling: "", cravings: [], firstImprovement: []
};

const SelectableCard = ({ label, selected, onClick, multi }: { label: string; selected: boolean; onClick: () => void; multi?: boolean }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-medium transition-all border-2 ${
      selected
        ? "bg-primary/10 border-primary text-primary"
        : "bg-card border-border text-foreground hover:border-primary/30"
    }`}
  >
    <div className="flex items-center justify-between">
      <span>{label}</span>
      {selected && <Check className="w-4 h-4 text-primary" />}
    </div>
  </button>
);

interface LoginScreenProps {
  onLogin: (profileData?: Partial<OnboardingData> & { calorieGoal?: number }) => void;
}

export const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const [view, setView] = useState<"login" | "signup" | "onboarding" | "forgot">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPass, setSignupPass] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(defaultOnboarding);
  const [error, setError] = useState("");

  const totalSteps = 5;

  const toggleMulti = (field: keyof OnboardingData, value: string) => {
    setData(d => {
      const arr = d[field] as string[];
      return { ...d, [field]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] };
    });
  };

  const calculateCalories = () => {
    const w = parseFloat(data.weight) || 70;
    const h = parseFloat(data.height) || 165;
    const a = parseInt(data.age) || 30;
    const isFemale = data.gender !== "masculino";
    let bmr = isFemale
      ? 447.593 + 9.247 * w + 3.098 * h - 4.330 * a
      : 88.362 + 13.397 * w + 4.799 * h - 5.677 * a;
    const multipliers: Record<string, number> = {
      "Sedentária(o)": 1.2, "Leve": 1.375, "Moderada(o)": 1.55, "Ativa(o)": 1.725, "Muito ativa(o)": 1.9
    };
    const tdee = bmr * (multipliers[data.activityLevel] || 1.55);
    return Math.max(1200, Math.round(tdee - 500));
  };

  const maintenanceCalories = () => {
    const w = parseFloat(data.weight) || 70;
    const h = parseFloat(data.height) || 165;
    const a = parseInt(data.age) || 30;
    const isFemale = data.gender !== "masculino";
    let bmr = isFemale
      ? 447.593 + 9.247 * w + 3.098 * h - 4.330 * a
      : 88.362 + 13.397 * w + 4.799 * h - 5.677 * a;
    const multipliers: Record<string, number> = {
      "Sedentária(o)": 1.2, "Leve": 1.375, "Moderada(o)": 1.55, "Ativa(o)": 1.725, "Muito ativa(o)": 1.9
    };
    return Math.round(bmr * (multipliers[data.activityLevel] || 1.55));
  };

  const handleLogin = () => {
    if (!email || !password) { setError("Preencha todos os campos"); return; }
    setError("");
    const isFirstAccess = !localStorage.getItem("formula-emagrecer-onboarded");
    if (isFirstAccess) {
      setView("onboarding");
      setOnboardingStep(0);
    } else {
      onLogin();
    }
  };

  const handleSignup = () => {
    if (!signupName || !signupEmail || !signupPass) { setError("Preencha todos os campos"); return; }
    if (signupPass !== signupConfirm) { setError("As senhas não coincidem"); return; }
    setError("");
    setData(d => ({ ...d, name: signupName }));
    setView("onboarding");
    setOnboardingStep(0);
  };

  const finishOnboarding = () => {
    const calorieGoal = calculateCalories();
    localStorage.setItem("formula-emagrecer-onboarded", "true");
    localStorage.setItem("formula-emagrecer-onboarding", JSON.stringify(data));
    onLogin({
      ...data,
      calorieGoal
    });
  };

  const nextStep = () => {
    if (onboardingStep < totalSteps - 1) setOnboardingStep(s => s + 1);
    else finishOnboarding();
  };
  const prevStep = () => { if (onboardingStep > 0) setOnboardingStep(s => s - 1); };

  // LOGIN VIEW
  if (view === "login") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6 animate-fade-in">
          <div className="text-center space-y-3">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-dark mx-auto flex items-center justify-center shadow-lg">
              <Sparkles className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-foreground">Fórmula Emagrecer</h1>
            <p className="text-sm text-muted-foreground">Sua jornada de emagrecimento começa aqui. Constância transforma.</p>
          </div>

          <div className="card-elevated space-y-4 p-6">
            {error && <p className="text-xs text-red-500 text-center bg-red-50 py-2 rounded-xl">{error}</p>}
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">E-mail</label>
              <div className="flex items-center gap-2 bg-muted rounded-2xl px-4">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" className="flex-1 bg-transparent py-3 text-sm text-foreground outline-none" />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Senha</label>
              <div className="flex items-center gap-2 bg-muted rounded-2xl px-4">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="flex-1 bg-transparent py-3 text-sm text-foreground outline-none" />
                <button onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                </button>
              </div>
            </div>
            <button onClick={handleLogin} className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm shadow-md hover:shadow-lg transition-shadow">
              Entrar
            </button>
            <button onClick={() => { setError(""); setView("signup"); }} className="w-full py-3 rounded-2xl bg-muted text-foreground font-medium text-sm">
              Cadastrar
            </button>
          </div>

          <div className="flex justify-between px-2">
            <button onClick={() => { setError(""); setView("onboarding"); setOnboardingStep(0); }} className="text-xs text-primary font-medium">
              Primeiro acesso? Clique aqui
            </button>
            <button onClick={() => { setError(""); setView("forgot"); }} className="text-xs text-muted-foreground">
              Esqueci minha senha
            </button>
          </div>
        </div>
      </div>
    );
  }

  // SIGNUP VIEW
  if (view === "signup") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6 animate-fade-in">
          <div className="text-center">
            <h1 className="text-2xl font-heading font-bold text-foreground">Criar Conta</h1>
            <p className="text-sm text-muted-foreground mt-1">Comece sua transformação hoje</p>
          </div>
          <div className="card-elevated space-y-4 p-6">
            {error && <p className="text-xs text-red-500 text-center bg-red-50 py-2 rounded-xl">{error}</p>}
            {[
              { icon: User, label: "Nome completo", value: signupName, set: setSignupName, type: "text", placeholder: "Seu nome" },
              { icon: Mail, label: "E-mail", value: signupEmail, set: setSignupEmail, type: "email", placeholder: "seu@email.com" },
            ].map(f => (
              <div key={f.label}>
                <label className="text-xs text-muted-foreground mb-1 block">{f.label}</label>
                <div className="flex items-center gap-2 bg-muted rounded-2xl px-4">
                  <f.icon className="w-4 h-4 text-muted-foreground" />
                  <input type={f.type} value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder} className="flex-1 bg-transparent py-3 text-sm text-foreground outline-none" />
                </div>
              </div>
            ))}
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Senha</label>
              <div className="flex items-center gap-2 bg-muted rounded-2xl px-4">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <input type="password" value={signupPass} onChange={e => setSignupPass(e.target.value)} placeholder="••••••••" className="flex-1 bg-transparent py-3 text-sm text-foreground outline-none" />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Confirmar senha</label>
              <div className="flex items-center gap-2 bg-muted rounded-2xl px-4">
                <Lock className="w-4 h-4 text-muted-foreground" />
                <input type="password" value={signupConfirm} onChange={e => setSignupConfirm(e.target.value)} placeholder="••••••••" className="flex-1 bg-transparent py-3 text-sm text-foreground outline-none" />
              </div>
            </div>
            <button onClick={handleSignup} className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm">
              Criar conta
            </button>
            <button onClick={() => { setError(""); setView("login"); }} className="w-full py-3 rounded-2xl bg-muted text-foreground font-medium text-sm">
              Voltar para login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // FORGOT PASSWORD
  if (view === "forgot") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6 animate-fade-in">
          <div className="text-center">
            <h1 className="text-2xl font-heading font-bold text-foreground">Esqueci minha senha</h1>
            <p className="text-sm text-muted-foreground mt-1">Digite seu e-mail para recuperar</p>
          </div>
          <div className="card-elevated space-y-4 p-6">
            <div className="flex items-center gap-2 bg-muted rounded-2xl px-4">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <input type="email" placeholder="seu@email.com" className="flex-1 bg-transparent py-3 text-sm text-foreground outline-none" />
            </div>
            <button className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm">
              Enviar link de recuperação
            </button>
            <button onClick={() => setView("login")} className="w-full py-3 rounded-2xl bg-muted text-foreground font-medium text-sm">
              Voltar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ONBOARDING
  const progressPct = ((onboardingStep + 1) / totalSteps) * 100;

  const renderOnboardingStep = () => {
    // Step 0: Intro
    if (onboardingStep === 0) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6 space-y-6 animate-fade-in">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-xl">
            <Sparkles className="w-12 h-12 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-foreground">Vamos personalizar sua jornada</h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            Responda algumas perguntas para que o app monte metas e acompanhamento de forma mais inteligente para você.
          </p>
          <button onClick={nextStep} className="w-full max-w-xs py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm shadow-md">
            Começar
          </button>
        </div>
      );
    }

    // Step 1: Basic data
    if (onboardingStep === 1) {
      return (
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 animate-fade-in">
          <h2 className="text-xl font-heading font-bold text-foreground">Dados Básicos</h2>
          <p className="text-sm text-muted-foreground">Precisamos conhecer você melhor</p>
          {[
            { label: "Nome completo", value: data.name, key: "name", type: "text", placeholder: "Seu nome", icon: User },
            { label: "Idade", value: data.age, key: "age", type: "number", placeholder: "Ex: 32", icon: User },
            { label: "Altura (cm)", value: data.height, key: "height", type: "number", placeholder: "Ex: 165", icon: Ruler },
            { label: "Peso atual (kg)", value: data.weight, key: "weight", type: "number", placeholder: "Ex: 75", icon: Weight },
            { label: "Peso desejado (kg)", value: data.targetWeight, key: "targetWeight", type: "number", placeholder: "Ex: 65", icon: Target },
          ].map(f => (
            <div key={f.key}>
              <label className="text-xs text-muted-foreground mb-1 block">{f.label}</label>
              <div className="flex items-center gap-2 bg-muted rounded-2xl px-4">
                <f.icon className="w-4 h-4 text-muted-foreground" />
                <input
                  type={f.type} value={f.value}
                  onChange={e => setData(d => ({ ...d, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  className="flex-1 bg-transparent py-3 text-sm text-foreground outline-none"
                />
              </div>
            </div>
          ))}
          <div>
            <label className="text-xs text-muted-foreground mb-2 block">Gênero</label>
            <div className="grid grid-cols-3 gap-2">
              {["Feminino", "Masculino", "Prefiro não informar"].map(g => (
                <SelectableCard key={g} label={g} selected={data.gender === g.toLowerCase()} onClick={() => setData(d => ({ ...d, gender: g.toLowerCase() }))} />
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Step 2: Objective & routine
    if (onboardingStep === 2) {
      return (
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5 animate-fade-in">
          <h2 className="text-xl font-heading font-bold text-foreground">Objetivo e Rotina</h2>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Qual é seu objetivo principal?</p>
            {["Emagrecer", "Reduzir medidas", "Criar rotina saudável", "Melhorar alimentação", "Controlar ansiedade alimentar"].map(o => (
              <SelectableCard key={o} label={o} selected={data.objective === o} onClick={() => setData(d => ({ ...d, objective: o }))} />
            ))}
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Nível de atividade física?</p>
            {["Sedentária(o)", "Leve", "Moderada(o)", "Ativa(o)", "Muito ativa(o)"].map(o => (
              <SelectableCard key={o} label={o} selected={data.activityLevel === o} onClick={() => setData(d => ({ ...d, activityLevel: o }))} />
            ))}
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Pratica exercício hoje?</p>
            {["Não pratico", "1 a 2 vezes por semana", "3 a 4 vezes por semana", "5 ou mais vezes por semana"].map(o => (
              <SelectableCard key={o} label={o} selected={data.exerciseFrequency === o} onClick={() => setData(d => ({ ...d, exerciseFrequency: o }))} />
            ))}
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Como é sua rotina alimentar hoje?</p>
            {["Muito desorganizada", "Mais ou menos", "Já tento me cuidar", "Bem organizada"].map(o => (
              <SelectableCard key={o} label={o} selected={data.dietOrganization === o} onClick={() => setData(d => ({ ...d, dietOrganization: o }))} />
            ))}
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Horário de maior dificuldade?</p>
            {["Manhã", "Tarde", "Noite", "Madrugada", "O dia todo varia"].map(o => (
              <SelectableCard key={o} label={o} selected={data.hardestTime === o} onClick={() => setData(d => ({ ...d, hardestTime: o }))} />
            ))}
          </div>
        </div>
      );
    }

    // Step 3: Pains & difficulties
    if (onboardingStep === 3) {
      return (
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5 animate-fade-in">
          <h2 className="text-xl font-heading font-bold text-foreground">Suas Dificuldades</h2>
          <p className="text-sm text-muted-foreground">Queremos entender o que você sente. Tudo bem, estamos juntos nisso. 💚</p>

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">O que mais representa sua dificuldade?</p>
            {["Emagreço, mas engordo tudo de novo", "Tenho fome fora do horário", "Como por ansiedade", "Tenho dificuldade em manter rotina", "Não consigo controlar doces", "Sinto muito inchaço", "Me sinto sem energia"].map(o => (
              <SelectableCard key={o} label={o} selected={data.difficulties.includes(o)} onClick={() => toggleMulti("difficulties", o)} multi />
            ))}
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Qual situação mais te atrapalha?</p>
            {["Falta de tempo", "Ansiedade", "Compulsão", "Cansaço", "Falta de motivação", "Ambiente familiar", "Final de semana"].map(o => (
              <SelectableCard key={o} label={o} selected={data.situations.includes(o)} onClick={() => toggleMulti("situations", o)} multi />
            ))}
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Como se sente em relação ao seu corpo?</p>
            {["Insatisfeita(o)", "Desmotivada(o)", "Cansada(o) de tentar", "Quero mudar de verdade", "Estou começando a me cuidar"].map(o => (
              <SelectableCard key={o} label={o} selected={data.bodyFeeling === o} onClick={() => setData(d => ({ ...d, bodyFeeling: o }))} />
            ))}
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Sente vontade frequente de comer:</p>
            {["Doces", "Massas", "Lanches rápidos", "Beliscar toda hora", "Como mais no emocional"].map(o => (
              <SelectableCard key={o} label={o} selected={data.cravings.includes(o)} onClick={() => toggleMulti("cravings", o)} multi />
            ))}
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">O que quer melhorar primeiro?</p>
            {["Perder peso", "Reduzir barriga/inchaço", "Comer melhor", "Controlar ansiedade", "Criar constância", "Beber mais água"].map(o => (
              <SelectableCard key={o} label={o} selected={data.firstImprovement.includes(o)} onClick={() => toggleMulti("firstImprovement", o)} multi />
            ))}
          </div>
        </div>
      );
    }

    // Step 4: Summary + calorie calculation + conclusion
    if (onboardingStep === 4) {
      const calGoal = calculateCalories();
      const maint = maintenanceCalories();
      const waterGoal = Math.round((parseFloat(data.weight) || 70) * 35);

      return (
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5 animate-fade-in">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-heading font-bold text-foreground">Seu Plano Personalizado</h2>
            <p className="text-sm text-muted-foreground">Preparamos tudo com base nas suas respostas</p>
          </div>

          <div className="card-elevated space-y-2">
            <h3 className="font-bold text-foreground text-sm">📋 Resumo</h3>
            {[
              { label: "Nome", value: data.name || "—" },
              { label: "Objetivo", value: data.objective || "—" },
              { label: "Atividade", value: data.activityLevel || "—" },
              { label: "Peso atual", value: data.weight ? `${data.weight} kg` : "—" },
              { label: "Peso desejado", value: data.targetWeight ? `${data.targetWeight} kg` : "—" },
            ].map(r => (
              <div key={r.label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{r.label}</span>
                <span className="font-medium text-foreground">{r.value}</span>
              </div>
            ))}
            {data.difficulties.length > 0 && (
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground mb-1">Dificuldades detectadas</p>
                <div className="flex flex-wrap gap-1">
                  {data.difficulties.map(d => (
                    <span key={d} className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">{d}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="card-highlight text-center space-y-3">
            <h3 className="font-bold text-foreground">🔥 Suas Calorias</h3>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Calorias de manutenção</p>
              <p className="text-2xl font-bold text-foreground">{maint} kcal</p>
            </div>
            <div className="border-t border-border pt-3 space-y-1">
              <p className="text-sm text-primary font-medium">Meta sugerida para emagrecimento</p>
              <p className="text-3xl font-bold text-primary">{calGoal} kcal/dia</p>
            </div>
            <p className="text-xs text-muted-foreground">Essa meta é estimada e pode ser ajustada com sua evolução.</p>
          </div>

          <div className="card-elevated flex items-center gap-3">
            <Droplets className="w-5 h-5 text-blue-500" />
            <div>
              <p className="font-bold text-foreground text-sm">Meta de água sugerida</p>
              <p className="text-sm text-muted-foreground">{waterGoal} ml por dia</p>
            </div>
          </div>

          <div className="card-elevated">
            <h3 className="font-bold text-foreground text-sm mb-2">🎯 Foco inicial sugerido</h3>
            <div className="space-y-1">
              {["Constância diária", "Controle da ansiedade alimentar", "Organização alimentar", "Redução de excessos"].map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-3 h-3 text-primary" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center space-y-3 pt-4">
            <h3 className="text-lg font-heading font-bold text-foreground">🎉 Tudo pronto!</h3>
            <p className="text-sm text-muted-foreground">Sua experiência foi personalizada. O app já preparou seu plano inicial.</p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex flex-col">
      {/* Progress bar */}
      {onboardingStep > 0 && (
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center justify-between mb-2">
            <button onClick={prevStep} className="p-2 -ml-2">
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <span className="text-xs text-muted-foreground">Etapa {onboardingStep} de {totalSteps - 1}</span>
            <div className="w-9" />
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
      )}

      {renderOnboardingStep()}

      {/* Bottom nav for onboarding steps 1-4 */}
      {onboardingStep >= 1 && (
        <div className="p-4 border-t border-border">
          <button onClick={nextStep} className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm shadow-md flex items-center justify-center gap-2">
            {onboardingStep === totalSteps - 1 ? "Entrar no meu plano" : "Continuar"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
