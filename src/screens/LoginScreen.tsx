import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Ruler, Weight, Target, ChevronRight, ChevronLeft, Sparkles, Check, Droplets } from "lucide-react";
import imgObjetivo from "@/assets/onboarding/objetivo.jpg";
import imgAtividade from "@/assets/onboarding/atividade.jpg";
import imgAlimentacao from "@/assets/onboarding/alimentacao.jpg";
import imgHorario from "@/assets/onboarding/horario.jpg";
import imgDificuldade from "@/assets/onboarding/dificuldade.jpg";
import imgEmocional from "@/assets/onboarding/emocional.jpg";
import imgCorpo from "@/assets/onboarding/corpo.jpg";
import imgDesejos from "@/assets/onboarding/desejos.jpg";
import imgMelhorar from "@/assets/onboarding/melhorar.jpg";
import imgDados from "@/assets/onboarding/dados.jpg";

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

const SelectableCard = ({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-3.5 rounded-2xl text-sm font-medium transition-all border-2 ${
      selected
        ? "bg-primary/10 border-primary text-primary shadow-sm"
        : "bg-card border-border text-foreground hover:border-primary/30"
    }`}
  >
    <div className="flex items-center justify-between gap-2">
      <span>{label}</span>
      {selected && <Check className="w-4 h-4 text-primary shrink-0" />}
    </div>
  </button>
);

interface LoginScreenProps {
  onLogin: (profileData?: Partial<OnboardingData> & { calorieGoal?: number }) => void;
}

// Question definitions for the wizard
type QuestionType = "single" | "multi";
interface QuizQuestion {
  key: keyof OnboardingData;
  type: QuestionType;
  title: string;
  subtitle?: string;
  image: string;
  options: string[];
}

const quizQuestions: QuizQuestion[] = [
  { key: "objective", type: "single", title: "Qual é seu objetivo principal?", subtitle: "Vamos personalizar tudo para você", image: imgObjetivo,
    options: ["Emagrecer", "Reduzir medidas", "Criar rotina saudável", "Melhorar alimentação", "Controlar ansiedade alimentar"] },
  { key: "activityLevel", type: "single", title: "Qual seu nível de atividade física?", image: imgAtividade,
    options: ["Sedentária(o)", "Leve", "Moderada(o)", "Ativa(o)", "Muito ativa(o)"] },
  { key: "exerciseFrequency", type: "single", title: "Você pratica exercício hoje?", image: imgAtividade,
    options: ["Não pratico", "1 a 2 vezes por semana", "3 a 4 vezes por semana", "5 ou mais vezes por semana"] },
  { key: "dietOrganization", type: "single", title: "Como é sua rotina alimentar hoje?", image: imgAlimentacao,
    options: ["Muito desorganizada", "Mais ou menos", "Já tento me cuidar", "Bem organizada"] },
  { key: "hardestTime", type: "single", title: "Qual horário você mais sente dificuldade?", image: imgHorario,
    options: ["Manhã", "Tarde", "Noite", "Madrugada", "O dia todo varia"] },
  { key: "difficulties", type: "multi", title: "O que mais representa sua dificuldade hoje?", subtitle: "Pode escolher mais de uma", image: imgDificuldade,
    options: ["Emagreço, mas engordo tudo de novo", "Tenho fome fora do horário", "Como por ansiedade", "Tenho dificuldade em manter rotina", "Não consigo controlar doces", "Sinto muito inchaço", "Me sinto sem energia"] },
  { key: "situations", type: "multi", title: "Qual situação mais te atrapalha?", subtitle: "Pode escolher mais de uma", image: imgEmocional,
    options: ["Falta de tempo", "Ansiedade", "Compulsão", "Cansaço", "Falta de motivação", "Ambiente familiar", "Final de semana"] },
  { key: "bodyFeeling", type: "single", title: "Como você se sente em relação ao seu corpo hoje?", image: imgCorpo,
    options: ["Insatisfeita(o)", "Desmotivada(o)", "Cansada(o) de tentar", "Quero mudar de verdade", "Estou começando a me cuidar"] },
  { key: "cravings", type: "multi", title: "Sente vontade frequente de comer:", subtitle: "Pode escolher mais de uma", image: imgDesejos,
    options: ["Doces", "Massas", "Lanches rápidos", "Beliscar toda hora", "Como mais no emocional"] },
  { key: "firstImprovement", type: "multi", title: "O que você mais quer melhorar primeiro?", subtitle: "Pode escolher mais de uma", image: imgMelhorar,
    options: ["Perder peso", "Reduzir barriga/inchaço", "Comer melhor", "Controlar ansiedade", "Criar constância", "Beber mais água"] },
];

// Steps: 0 = intro, 1 = basic data, 2..(2+quiz) = quiz questions, last = summary
const QUIZ_START = 2;

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

  const totalSteps = QUIZ_START + quizQuestions.length + 1; // intro + data + quiz + summary
  const summaryStep = totalSteps - 1;

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
    const bmr = isFemale
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
    const bmr = isFemale
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
    onLogin({ ...data, calorieGoal });
  };

  // Validation: can advance from current step?
  const canAdvance = (): boolean => {
    if (onboardingStep === 0) return true;
    if (onboardingStep === 1) {
      return !!(data.name && data.age && data.height && data.weight && data.gender);
    }
    if (onboardingStep >= QUIZ_START && onboardingStep < QUIZ_START + quizQuestions.length) {
      const q = quizQuestions[onboardingStep - QUIZ_START];
      const v = data[q.key];
      return q.type === "multi" ? (v as string[]).length > 0 : !!v;
    }
    return true;
  };

  const nextStep = () => {
    if (!canAdvance()) { setError("Selecione uma opção para continuar"); return; }
    setError("");
    if (onboardingStep < summaryStep) setOnboardingStep(s => s + 1);
    else finishOnboarding();
  };
  const prevStep = () => { setError(""); if (onboardingStep > 0) setOnboardingStep(s => s - 1); };

  // ============ LOGIN ============
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

  // ============ SIGNUP ============
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

  // ============ FORGOT PASSWORD ============
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

  // ============ ONBOARDING ============
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
            Responda algumas perguntas rápidas, uma por vez, para que o app monte metas e acompanhamento sob medida para você.
          </p>
          <button onClick={nextStep} className="w-full max-w-xs py-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-sm shadow-md">
            Começar
          </button>
        </div>
      );
    }

    // Step 1: Basic data card
    if (onboardingStep === 1) {
      return (
        <div className="flex-1 overflow-y-auto px-4 py-4 animate-fade-in">
          <div className="card-elevated p-5 space-y-4">
            <div className="flex flex-col items-center text-center space-y-2">
              <img src={imgDados} alt="Dados básicos" className="w-32 h-32 rounded-2xl object-cover" />
              <h2 className="text-lg font-heading font-bold text-foreground">Conta um pouco sobre você</h2>
              <p className="text-xs text-muted-foreground">Esses dados ajudam a calcular suas metas</p>
            </div>
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
                {[
                  { label: "Feminino", val: "feminino" },
                  { label: "Masculino", val: "masculino" },
                  { label: "Não informar", val: "nao-informar" }
                ].map(g => (
                  <SelectableCard key={g.val} label={g.label} selected={data.gender === g.val} onClick={() => setData(d => ({ ...d, gender: g.val }))} />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Quiz steps (one question per card)
    if (onboardingStep >= QUIZ_START && onboardingStep < QUIZ_START + quizQuestions.length) {
      const q = quizQuestions[onboardingStep - QUIZ_START];
      const value = data[q.key];
      const qNumber = onboardingStep - QUIZ_START + 1;
      return (
        <div className="flex-1 overflow-y-auto px-4 py-4 animate-fade-in" key={q.key}>
          <div className="card-elevated p-5 space-y-4">
            <div className="flex flex-col items-center text-center space-y-3">
              <img src={q.image} alt="" className="w-32 h-32 rounded-2xl object-cover shadow-sm" />
              <div className="space-y-1">
                <p className="text-xs font-medium text-primary uppercase tracking-wider">Pergunta {qNumber} de {quizQuestions.length}</p>
                <h2 className="text-lg font-heading font-bold text-foreground leading-tight">{q.title}</h2>
                {q.subtitle && <p className="text-xs text-muted-foreground">{q.subtitle}</p>}
              </div>
            </div>
            <div className="space-y-2 pt-1">
              {q.options.map(o => {
                const selected = q.type === "multi"
                  ? (value as string[]).includes(o)
                  : value === o;
                return (
                  <SelectableCard
                    key={o}
                    label={o}
                    selected={selected}
                    onClick={() => q.type === "multi" ? toggleMulti(q.key, o) : setData(d => ({ ...d, [q.key]: o }))}
                  />
                );
              })}
            </div>
          </div>
        </div>
      );
    }

    // Summary step
    if (onboardingStep === summaryStep) {
      const calGoal = calculateCalories();
      const maint = maintenanceCalories();
      const waterGoal = Math.round((parseFloat(data.weight) || 70) * 35);

      return (
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 animate-fade-in">
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

          <div className="text-center space-y-2 pt-2">
            <h3 className="text-lg font-heading font-bold text-foreground">🎉 Tudo pronto!</h3>
            <p className="text-sm text-muted-foreground">Sua experiência foi personalizada. Vamos começar.</p>
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
            <button onClick={prevStep} className="p-2 -ml-2 active:scale-95 transition-transform">
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <span className="text-xs text-muted-foreground font-medium">Etapa {onboardingStep + 1} de {totalSteps}</span>
            <div className="w-9" />
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
      )}

      {renderOnboardingStep()}

      {error && onboardingStep > 0 && (
        <div className="px-4">
          <p className="text-xs text-red-500 text-center bg-red-50 py-2 rounded-xl">{error}</p>
        </div>
      )}

      {/* Bottom nav */}
      {onboardingStep >= 1 && (
        <div className="p-4 border-t border-border bg-background flex gap-3">
          <button
            onClick={prevStep}
            className="px-5 py-3.5 rounded-2xl bg-muted text-foreground font-bold text-sm flex items-center justify-center gap-1 active:scale-[0.98] transition-transform"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar
          </button>
          <button
            onClick={nextStep}
            disabled={!canAdvance()}
            className={`flex-1 py-3.5 rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all ${
              canAdvance()
                ? "bg-primary text-primary-foreground active:scale-[0.98]"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {onboardingStep === summaryStep ? "Entrar no meu plano" : "Continuar"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
