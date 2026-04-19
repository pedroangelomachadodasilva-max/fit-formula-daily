// Conteúdo estruturado para o módulo de Compulsão Alimentar.
// Mantém todo o texto fora dos componentes para facilitar manutenção.

export const moods = [
  { id: "anxiety", label: "Ansiedade", emoji: "😰", topic: "anxiety" },
  { id: "stress", label: "Estresse", emoji: "😤", topic: "stress" },
  { id: "sadness", label: "Tristeza", emoji: "😢", topic: "sadness" },
  { id: "boredom", label: "Tédio", emoji: "😑", topic: "boredom" },
  { id: "loneliness", label: "Solidão", emoji: "🥺", topic: "loneliness" },
  { id: "sweet", label: "Vontade de doce", emoji: "🍫", topic: "alternatives" },
  { id: "sudden", label: "Fome repentina", emoji: "⚡", topic: "physical-vs-emotional" },
  { id: "impulse", label: "Impulso de comer", emoji: "🍽️", topic: "pause" },
  { id: "out-of-control", label: "Perda de controle", emoji: "🌪️", topic: "after-episode" },
] as const;

export const triggersList = [
  { id: "work", label: "Trabalho / cobrança" },
  { id: "family", label: "Conflito familiar" },
  { id: "alone", label: "Estar sozinha" },
  { id: "night", label: "Final do dia / noite" },
  { id: "tv", label: "Comer assistindo TV" },
  { id: "tpm", label: "TPM / hormônios" },
  { id: "diet", label: "Restrição alimentar prolongada" },
  { id: "sleep", label: "Pouco sono" },
  { id: "social", label: "Eventos sociais" },
  { id: "screen", label: "Excesso de redes sociais" },
];

export const physicalSigns = [
  "Aparece aos poucos, gradualmente",
  "Sentida no estômago (vazio, ronco)",
  "Aceita qualquer alimento",
  "Pode esperar 20-30 minutos",
  "Para naturalmente quando sacia",
  "Não vem com culpa depois",
];

export const emotionalSigns = [
  "Surge de repente, urgente",
  "Sentida na cabeça ou no peito",
  "Quer um alimento específico",
  "Não pode esperar",
  "Continua mesmo após estar cheia",
  "Vem acompanhada de culpa",
];

export const physicalVsEmotionalQuiz = [
  {
    q: "A vontade apareceu como?",
    options: ["De repente, em segundos", "Foi crescendo aos poucos"],
    weights: [1, 0],
  },
  {
    q: "Você aceitaria qualquer comida agora?",
    options: ["Não, quero algo específico", "Sim, qualquer coisa serve"],
    weights: [1, 0],
  },
  {
    q: "Onde você sente essa vontade?",
    options: ["Na cabeça / no peito / na emoção", "No estômago, fisicamente"],
    weights: [1, 0],
  },
  {
    q: "Você comeu há quanto tempo?",
    options: ["Menos de 2 horas", "Mais de 3 horas"],
    weights: [1, 0],
  },
];

export const alternatives = {
  sweet: {
    title: "Vontade de doce",
    emoji: "🍫",
    items: [
      "Banana congelada batida com cacau",
      "Tâmaras com pasta de amendoim",
      "Iogurte natural com mel e canela",
      "Chocolate 70% (1-2 quadradinhos)",
      "Maçã assada com canela",
    ],
  },
  crunchy: {
    title: "Vontade de crocante",
    emoji: "🥨",
    items: [
      "Castanhas e nozes (1 punhado)",
      "Cenoura ou pepino em palitos",
      "Pipoca caseira sem manteiga",
      "Chips de abobrinha ou batata-doce assados",
      "Grão-de-bico crocante temperado",
    ],
  },
  cold: {
    title: "Vontade de gelado",
    emoji: "🍦",
    items: [
      "Iogurte congelado com frutas",
      "Picolé caseiro de fruta natural",
      "Smoothie gelado de frutas vermelhas",
      "Água gelada com hortelã e limão",
      "Melancia ou abacaxi gelado",
    ],
  },
  chew: {
    title: "Vontade de mastigar",
    emoji: "🦷",
    items: [
      "Goma de mascar sem açúcar",
      "Cenoura crua em palitos",
      "Maçã com casca",
      "Pepino com sal e limão",
      "Aipo com pasta de amendoim",
    ],
  },
  endless: {
    title: "Vontade de não parar de comer",
    emoji: "🍽️",
    items: [
      "Sopa quente de legumes (sacia bastante)",
      "Salada grande com proteína",
      "Mingau de aveia com frutas",
      "Chá quente (camomila, erva-doce)",
      "Pausa de 10 minutos antes de comer mais",
    ],
  },
} as const;

export const themes = [
  { id: "physical-vs-emotional", title: "Fome Física vs Emocional", emoji: "🧠", color: "primary", desc: "Aprenda a diferenciar" },
  { id: "triggers", title: "Gatilhos Emocionais", emoji: "🎯", color: "accent", desc: "Identifique seus padrões" },
  { id: "anxiety", title: "Ansiedade", emoji: "😰", color: "primary", desc: "Acalmar antes de comer" },
  { id: "stress", title: "Estresse", emoji: "😤", color: "accent", desc: "Soltar a pressão" },
  { id: "sadness", title: "Tristeza", emoji: "💙", color: "primary", desc: "Acolher sem comida" },
  { id: "boredom", title: "Tédio", emoji: "😑", color: "accent", desc: "Quebrar a monotonia" },
  { id: "loneliness", title: "Solidão", emoji: "🤗", color: "primary", desc: "Conectar e cuidar" },
  { id: "pause", title: "Pausar Antes de Comer", emoji: "⏸️", color: "accent", desc: "Fluxo guiado" },
  { id: "breathing", title: "Respiração Guiada", emoji: "🌬️", color: "primary", desc: "Acalmar o corpo" },
  { id: "alternatives", title: "Alternativas Mais Leves", emoji: "🥗", color: "accent", desc: "Por tipo de vontade" },
  { id: "diary", title: "Diário Emocional", emoji: "📔", color: "primary", desc: "Registre o que sentiu" },
  { id: "anti-crisis", title: "Plano Anti-Crise", emoji: "🆘", color: "accent", desc: "Passo a passo" },
  { id: "after-episode", title: "Depois de um Episódio", emoji: "💚", color: "primary", desc: "Sem culpa, retomar" },
] as const;

export type ThemeId = typeof themes[number]["id"];
