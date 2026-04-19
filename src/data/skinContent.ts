// Conteúdo do módulo Pele Flácida — flacidez leve a moderada.
// Tom honesto: ajuda, apoia, melhora gradual. Sem promessas irreais.

export const skinTopics = [
  { id: "what-helps", title: "O que realmente ajuda", emoji: "✨", desc: "Pilares com evidência" },
  { id: "training", title: "Treino para firmeza", emoji: "💪", desc: "Força e contorno" },
  { id: "nutrition", title: "Alimentação para a pele", emoji: "🥗", desc: "Proteína, vit C, zinco" },
  { id: "hydration", title: "Hidratação e cuidados", emoji: "💧", desc: "Rotina diária" },
  { id: "collagen", title: "Colágeno: ajuda, não milagre", emoji: "🥄", desc: "Suporte opcional" },
  { id: "avoid", title: "O que evitar", emoji: "🚫", desc: "Hábitos que pioram" },
  { id: "recipes", title: "Receitas e dicas naturais", emoji: "🍓", desc: "Apoio com imagem" },
] as const;

export type SkinTopicId = typeof skinTopics[number]["id"];

export const whatHelpsItems = [
  {
    icon: "💪",
    title: "Treino de força",
    desc: "Aumenta massa muscular sob a pele, melhora contorno e firmeza visual.",
  },
  {
    icon: "🥚",
    title: "Proteína suficiente",
    desc: "Cerca de 1,2 a 1,6 g por kg de peso. Base para colágeno endógeno.",
  },
  {
    icon: "🍊",
    title: "Vitamina C",
    desc: "Essencial para a síntese de colágeno. Frutas cítricas, kiwi, morango, pimentão.",
  },
  {
    icon: "🦪",
    title: "Zinco e cobre",
    desc: "Cofatores na produção de colágeno e elastina. Castanhas, sementes, carnes.",
  },
  {
    icon: "💧",
    title: "Hidratação",
    desc: "2 a 2,5 L de água por dia mantém a pele com mais turgor e elasticidade.",
  },
  {
    icon: "🧴",
    title: "Hidratante corporal",
    desc: "Usar diariamente após o banho, com pele ainda úmida. Constância importa mais que marca.",
  },
  {
    icon: "☀️",
    title: "Protetor solar",
    desc: "Sol em excesso degrada colágeno e elastina. Use FPS 30+ na pele exposta.",
  },
  {
    icon: "📅",
    title: "Constância",
    desc: "A pele responde em meses, não em dias. Pequenos hábitos diários somam.",
  },
];

export const trainingTips = {
  intro:
    "O treino de força é o que mais ajuda na firmeza visual durante o emagrecimento. Músculo abaixo da pele melhora o contorno do corpo.",
  why: [
    "Aumenta a massa muscular que sustenta a pele",
    "Melhora postura e contorno corporal",
    "Estimula colágeno na própria pele",
    "Ajuda a reter peso perdido sem flacidez extra",
  ],
  focus: [
    { area: "Glúteos e pernas", exs: "Agachamento, afundo, ponte de glúteo, stiff" },
    { area: "Abdômen", exs: "Prancha, dead bug, elevação de pernas" },
    { area: "Braços", exs: "Flexão, rosca direta, tríceps no banco" },
    { area: "Costas", exs: "Remada, puxada, superman" },
  ],
  weekly: [
    "3 a 4 treinos por semana",
    "Foque em séries com carga moderada (8 a 15 repetições)",
    "Descanse 48h entre treinos do mesmo grupo",
    "Mantenha consistência — resultado vem em 8 a 12 semanas",
  ],
};

export const nutritionPillars = [
  {
    icon: "🥚",
    title: "Proteína suficiente",
    desc: "Base para a pele.",
    examples: "Ovos, frango, peixe, carne magra, iogurte natural, queijo cottage, tofu, lentilha, grão-de-bico.",
  },
  {
    icon: "🍊",
    title: "Vitamina C",
    desc: "Sintetiza colágeno.",
    examples: "Laranja, acerola, kiwi, morango, goiaba, mamão, pimentão, brócolis cru.",
  },
  {
    icon: "🦪",
    title: "Zinco",
    desc: "Cofator da elastina.",
    examples: "Carne vermelha magra, sementes de abóbora, grão-de-bico, castanha-de-caju, cacau.",
  },
  {
    icon: "🍫",
    title: "Cobre",
    desc: "Ajuda na elasticidade.",
    examples: "Castanha-do-pará, sementes de girassol, cogumelos, cacau 70%.",
  },
  {
    icon: "🥒",
    title: "Hidratação alimentar",
    desc: "Água que vem da comida.",
    examples: "Pepino, melancia, melão, alface, abobrinha, tomate, laranja.",
  },
];

export const hydrationDaily = [
  { icon: "💧", title: "Beber 2 a 2,5 L de água", desc: "Distribua ao longo do dia, não tudo de uma vez." },
  { icon: "🧴", title: "Hidratante corporal diário", desc: "Aplicar após o banho, com pele ainda úmida." },
  { icon: "☀️", title: "Protetor solar nas áreas expostas", desc: "Mesmo em dias nublados. FPS 30 ou mais." },
  { icon: "🛁", title: "Banhos mornos, não muito quentes", desc: "Água muito quente resseca e fragiliza a pele." },
  { icon: "😴", title: "Dormir 7 a 8 horas", desc: "Sono é quando a pele se regenera." },
];

export const collagenInfo = {
  title: "Colágeno: ajuda, mas não faz milagre",
  honest:
    "Colágeno em pó ou cápsula pode ajudar modestamente como apoio, mas não substitui treino, alimentação e hidratação. É um suporte opcional — não a solução principal.",
  when: [
    "Faz mais sentido depois dos 30 anos",
    "Pode ser útil em fases de emagrecimento",
    "Funciona quando combinado com vitamina C e proteína na dieta",
  ],
  truth: [
    "Não elimina flacidez existente",
    "Não substitui musculação",
    "Não cria pele nova de forma significativa",
    "O efeito é gradual e modesto",
  ],
  how: "Se decidir tomar, escolha colágeno hidrolisado (peptídeos), 10 g por dia. Sempre acompanhado de vitamina C. Resultados visíveis levam pelo menos 3 meses.",
};

export const avoidList = [
  { icon: "🚬", title: "Cigarro", desc: "Reduz o oxigênio na pele e degrada colágeno e elastina." },
  { icon: "☀️", title: "Sol em excesso sem proteção", desc: "Acelera o envelhecimento e a perda de firmeza." },
  { icon: "🥗", title: "Dieta muito restritiva", desc: "Falta de nutrientes prejudica a regeneração da pele." },
  { icon: "🍗", title: "Pouca proteína", desc: "A pele precisa de aminoácidos para se manter firme." },
  { icon: "😴", title: "Pouco sono", desc: "É no sono que o corpo regenera tecidos e produz colágeno." },
  { icon: "📉", title: "Perda de peso muito rápida", desc: "Quanto mais rápido o emagrecimento, mais difícil para a pele acompanhar." },
  { icon: "🏜️", title: "Desidratação", desc: "Pele desidratada perde elasticidade e parece mais flácida." },
];

export interface NaturalRecipe {
  id: string;
  name: string;
  emoji: string;
  purpose: string;
  ingredients: string[];
  preparation: string;
  use: string;
  frequency: string;
  notes?: string;
  caution?: string;
}

export const naturalRecipes: NaturalRecipe[] = [
  {
    id: "smoothie-vitc",
    name: "Smoothie de morango com laranja",
    emoji: "🍓",
    purpose: "Reforço de vitamina C para apoiar a síntese de colágeno.",
    ingredients: [
      "1 xícara de morangos",
      "Suco de 1 laranja",
      "1/2 xícara de iogurte natural",
      "1 colher de sopa de aveia",
      "Gelo a gosto",
    ],
    preparation: "Bata tudo no liquidificador até ficar homogêneo. Sirva imediatamente para preservar a vitamina C.",
    use: "No café da manhã ou como lanche da tarde.",
    frequency: "3 a 5 vezes por semana.",
    notes: "Combina vitamina C com proteína do iogurte — ótima combinação para a pele.",
  },
  {
    id: "shot-acerola",
    name: "Shot de acerola com gengibre",
    emoji: "🥤",
    purpose: "Dose concentrada de vitamina C natural.",
    ingredients: [
      "10 acerolas frescas ou congeladas",
      "1 cm de gengibre",
      "Água gelada (1/2 copo)",
    ],
    preparation: "Bata todos os ingredientes e coe se preferir. Beba em seguida.",
    use: "Em jejum ou antes do treino.",
    frequency: "Diariamente, se possível.",
    caution: "Quem tem gastrite sensível pode evitar o gengibre em jejum.",
  },
  {
    id: "vitamina-proteica",
    name: "Vitamina proteica de banana e cacau",
    emoji: "🍌",
    purpose: "Combinação de proteína e antioxidantes para apoiar a recuperação muscular e a pele.",
    ingredients: [
      "1 banana congelada",
      "1 colher de sopa de cacau 100%",
      "1 colher de sopa de pasta de amendoim",
      "1 scoop de whey ou 200 ml de leite",
      "Canela a gosto",
    ],
    preparation: "Bata tudo no liquidificador até ficar cremoso.",
    use: "Pós-treino ou lanche da tarde.",
    frequency: "Até 5 vezes por semana.",
    notes: "Cacau é rico em cobre, importante para a elasticidade.",
  },
  {
    id: "salada-pele",
    name: "Salada amiga da pele",
    emoji: "🥗",
    purpose: "Refeição rica em vitamina C, zinco e hidratação.",
    ingredients: [
      "Folhas verdes a gosto",
      "1/2 pimentão amarelo cru",
      "1/2 pepino",
      "1 punhado de sementes de abóbora",
      "1 ovo cozido ou 1 filé de frango grelhado",
      "Azeite, limão e sal",
    ],
    preparation: "Lave e corte os ingredientes. Misture e tempere com azeite, limão e sal.",
    use: "No almoço ou jantar.",
    frequency: "3 a 4 vezes por semana.",
  },
  {
    id: "agua-saborizada",
    name: "Água saborizada de pepino e hortelã",
    emoji: "🥒",
    purpose: "Aumentar a hidratação ao longo do dia de forma gostosa.",
    ingredients: [
      "1 L de água gelada",
      "5 fatias finas de pepino",
      "Folhas de hortelã",
      "Suco de 1/2 limão",
    ],
    preparation: "Misture tudo em uma jarra e deixe na geladeira por pelo menos 30 minutos.",
    use: "Beber ao longo do dia, no lugar de refrigerantes ou sucos açucarados.",
    frequency: "Diariamente.",
  },
  {
    id: "lanche-castanhas",
    name: "Lanche de castanhas e frutas vermelhas",
    emoji: "🌰",
    purpose: "Fonte de zinco, cobre e antioxidantes.",
    ingredients: [
      "1 punhado pequeno de castanha-do-pará e castanha-de-caju (cerca de 30 g)",
      "1/2 xícara de mirtilo, framboesa ou morango",
    ],
    preparation: "Apenas combine em uma tigela.",
    use: "Lanche da tarde.",
    frequency: "3 a 5 vezes por semana.",
    caution: "Castanha-do-pará: limite a 2 unidades por dia (excesso de selênio).",
  },
];
