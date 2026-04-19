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
  { id: "work", label: "Trabalho / cobrança", emoji: "💼" },
  { id: "family", label: "Conflito familiar", emoji: "🏠" },
  { id: "alone", label: "Estar sozinha", emoji: "🧍‍♀️" },
  { id: "night", label: "Final do dia / noite", emoji: "🌙" },
  { id: "tv", label: "Comer assistindo TV", emoji: "📺" },
  { id: "tpm", label: "TPM / hormônios", emoji: "🩸" },
  { id: "diet", label: "Restrição alimentar prolongada", emoji: "🥗" },
  { id: "sleep", label: "Pouco sono", emoji: "😴" },
  { id: "social", label: "Eventos sociais", emoji: "🥂" },
  { id: "screen", label: "Excesso de redes sociais", emoji: "📱" },
];

// Perguntas guiadas para a usuária identificar seus gatilhos.
export const triggerIdentifyQuestions = [
  "Em quais momentos a vontade de comer aparece com mais força?",
  "Ela aparece mais quando você está ansiosa, triste ou estressada?",
  "Costuma acontecer quando você está sozinha?",
  "Acontece mais à noite ou no fim do dia?",
  "Acontece enquanto assiste TV ou mexe no celular?",
  "Vem depois de um conflito, cobrança ou frustração?",
  "Acontece em dias que você dormiu mal?",
  "Aparece em TPM ou em oscilações hormonais?",
];

// Dicas práticas por gatilho — exibidas dinamicamente conforme a seleção.
export const triggerTips: Record<string, string[]> = {
  work: [
    "Faça pequenas pausas de 2 minutos antes de descontar na comida",
    "Respire fundo 3 vezes antes de buscar alívio rápido",
    "Identifique se a fome veio junto da tensão",
    "Use uma ação substituta curta: água gelada, alongar, caminhar 2 minutos",
  ],
  family: [
    "Evite buscar conforto automático na comida logo após discussões",
    "Se possível, saia do ambiente por alguns minutos",
    "Escreva ou respire antes de comer por impulso",
    "Acolha a emoção primeiro — depois decida sobre comer",
  ],
  alone: [
    "Perceba se o impulso vem de vazio emocional, não de fome",
    "Escolha uma ação de autocuidado (banho, chá, música)",
    "Mande mensagem para alguém querido",
    "Mude de ambiente: vá para outro cômodo ou saia um pouco",
  ],
  night: [
    "Revise se comeu bem ao longo do dia",
    "Evite chegar à noite muito restrita (isso aumenta a compulsão)",
    "Crie uma rotina noturna mais leve: chá, leitura, banho morno",
    "Diferencie cansaço de fome — muitas vezes é só sono",
  ],
  tv: [
    "Evite comer distraída em frente à tela",
    "Leve consciência para a refeição: sente, olhe, mastigue devagar",
    "Reduza o gatilho visual: feche o pacote, sirva uma porção",
    "Troque o ritual: chá ou água saborizada no lugar do beliscar",
  ],
  tpm: [
    "Acolha a oscilação sem culpa — é fisiológico",
    "Planeje os dias mais sensíveis com refeições estruturadas",
    "Mantenha proteína em todas as refeições para estabilizar",
    "Permita versões mais leves do que você quer (chocolate 70%, fruta congelada)",
  ],
  diet: [
    "Restringir demais aumenta a compulsão depois — equilibre",
    "Evite passar muitas horas sem comer",
    "Reforce regularidade: café, almoço, lanche, jantar",
    "Inclua o que gosta em porção menor, sem proibir",
  ],
  sleep: [
    "Dormir mal aumenta impulsividade e fome de carboidrato",
    "Observe se o impulso piora em dias de cansaço",
    "Cuide da rotina de sono: tela menos, luz baixa, horário regular",
    "Antes de comer, pergunte: estou com fome ou com sono?",
  ],
  social: [
    "Reduza a culpa antecipada — eventos fazem parte da vida",
    "Coma com presença, mastigando devagar",
    "Evite o pensamento 'já estraguei tudo' — não estragou nada",
    "Crie uma estratégia leve antes do evento (lanche pequeno antes)",
  ],
  screen: [
    "Perceba o gatilho de comparação e ansiedade",
    "Faça pausas no uso, principalmente antes das refeições",
    "Afaste o celular ao se sentir tensa",
    "Escolha outra atividade curta: alongamento, água, ar fresco",
  ],
};

// Categoriza gatilhos para gerar mensagem de "padrão percebido".
const triggerCategories: Record<string, "stress" | "loneliness" | "night" | "physical"> = {
  work: "stress",
  family: "stress",
  social: "stress",
  alone: "loneliness",
  screen: "loneliness",
  night: "night",
  tv: "night",
  tpm: "physical",
  sleep: "physical",
  diet: "physical",
};

export function getTriggerPattern(selected: string[]): string | null {
  if (selected.length < 2) return null;
  const counts: Record<string, number> = {};
  selected.forEach((id) => {
    const cat = triggerCategories[id];
    if (cat) counts[cat] = (counts[cat] || 0) + 1;
  });
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  if (!top || top[1] < 2) return null;
  const messages: Record<string, string> = {
    stress: "Seus gatilhos parecem ligados a estresse e sobrecarga emocional. Vale dedicar momentos de pausa ao longo do dia.",
    loneliness: "Seus gatilhos sugerem ligação com vazio emocional e falta de conexão. Buscar contato e autocuidado pode ajudar muito.",
    night: "Você parece ter mais episódios à noite. Cuidar do final do dia (alimentação distribuída, rotina noturna) faz grande diferença.",
    physical: "Seus gatilhos têm forte componente físico (sono, hormônios, restrição). Cuidar da regularidade e do descanso é prioridade.",
  };
  return messages[top[0]];
}

// Próximos passos sugeridos com base nos gatilhos marcados.
export function getNextSteps(selected: string[]): string[] {
  if (selected.length === 0) return [];
  const steps = new Set<string>();
  if (selected.some((s) => ["work", "family", "social"].includes(s))) {
    steps.add("Faça 2 minutos de respiração 4-4-6");
  }
  if (selected.includes("alone") || selected.includes("screen")) {
    steps.add("Mande mensagem para alguém querido agora");
  }
  if (selected.includes("night") || selected.includes("tv")) {
    steps.add("Tome um chá quente e desligue as telas por 10 minutos");
  }
  if (selected.includes("sleep") || selected.includes("diet")) {
    steps.add("Beba um copo de água e estruture sua próxima refeição");
  }
  if (selected.includes("tpm")) {
    steps.add("Permita uma versão mais leve do que está querendo, sem culpa");
  }
  steps.add("Registre o que está sentindo no Diário Emocional");
  return Array.from(steps).slice(0, 4);
}

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
