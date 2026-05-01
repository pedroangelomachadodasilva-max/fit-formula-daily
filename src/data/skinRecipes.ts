// Receitas para apoiar a pele com nutrientes do dia a dia.
// Valores nutricionais aproximados.

import imgSmoothieMorango from "@/assets/skin/recipes/smoothie-morango-laranja.jpg";
import imgShotAcerola from "@/assets/skin/recipes/shot-acerola.jpg";
import imgVitaminaCacau from "@/assets/skin/recipes/vitamina-cacau.jpg";
import imgSaladaPele from "@/assets/skin/recipes/salada-pele.jpg";
import imgAguaSaborizada from "@/assets/skin/recipes/agua-saborizada.jpg";
import imgCastanhasFrutas from "@/assets/skin/recipes/castanhas-frutas-vermelhas.jpg";
import imgBowlIogurte from "@/assets/skin/recipes/bowl-iogurte.jpg";
import imgOmelete from "@/assets/skin/recipes/omelete-espinafre.jpg";
import imgFrangoSalada from "@/assets/skin/recipes/frango-salada.jpg";
import imgCremeAbacate from "@/assets/skin/recipes/creme-abacate.jpg";

export interface SkinRecipe {
  code: string;
  name: string;
  image: string;
  category: "Bebida" | "Café da manhã" | "Almoço/Jantar" | "Lanche" | "Sobremesa";
  description: string;
  ingredients: string[];
  preparation: string;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  mainBenefit: string;
  cautions?: string;
  notes?: string;
}

export const skinRecipes: SkinRecipe[] = [
  {
    code: "skin_rec_smoothie_morango",
    name: "Smoothie de Morango com Laranja",
    image: imgSmoothieMorango,
    category: "Bebida",
    description: "Combinação de vitamina C com proteína do iogurte para apoiar a pele.",
    ingredients: [
      "1 xícara de morangos",
      "Suco de 1 laranja",
      "1/2 xícara de iogurte natural",
      "1 colher de sopa de aveia",
      "Gelo a gosto",
    ],
    preparation: "Bata tudo no liquidificador até ficar homogêneo. Sirva em seguida para preservar a vitamina C.",
    calories: 220,
    carbs: 38,
    protein: 8,
    fat: 3,
    mainBenefit: "Vitamina C + proteína para apoiar a síntese de colágeno.",
    notes: "Use no café da manhã ou lanche da tarde, 3 a 5 vezes por semana.",
  },
  {
    code: "skin_rec_shot_acerola",
    name: "Shot de Acerola com Gengibre",
    image: imgShotAcerola,
    category: "Bebida",
    description: "Dose concentrada de vitamina C natural.",
    ingredients: [
      "10 acerolas frescas ou congeladas",
      "1 cm de gengibre",
      "1/2 copo de água gelada",
    ],
    preparation: "Bata todos os ingredientes e coe se preferir. Beba imediatamente.",
    calories: 35,
    carbs: 8,
    protein: 1,
    fat: 0,
    mainBenefit: "Alta concentração de vitamina C, importante para o colágeno.",
    cautions: "Quem tem gastrite sensível pode evitar o gengibre em jejum.",
  },
  {
    code: "skin_rec_vitamina_cacau",
    name: "Vitamina Proteica de Banana com Cacau",
    image: imgVitaminaCacau,
    category: "Bebida",
    description: "Proteína e antioxidantes para apoiar recuperação muscular e pele.",
    ingredients: [
      "1 banana congelada",
      "1 colher de sopa de cacau 100%",
      "1 colher de sopa de pasta de amendoim",
      "1 scoop de whey ou 200 ml de leite",
      "Canela a gosto",
    ],
    preparation: "Bata tudo no liquidificador até ficar cremoso.",
    calories: 320,
    carbs: 32,
    protein: 22,
    fat: 12,
    mainBenefit: "Proteína + cobre do cacau, importante para a elasticidade da pele.",
    notes: "Excelente como pós-treino.",
  },
  {
    code: "skin_rec_salada_pele",
    name: "Salada Amiga da Pele",
    image: imgSaladaPele,
    category: "Almoço/Jantar",
    description: "Refeição rica em vitamina C, zinco e hidratação.",
    ingredients: [
      "Folhas verdes a gosto",
      "1/2 pimentão amarelo cru",
      "1/2 pepino",
      "1 punhado de sementes de abóbora",
      "1 ovo cozido ou 1 filé de frango grelhado",
      "Azeite, limão e sal a gosto",
    ],
    preparation: "Lave e corte os ingredientes. Misture e tempere com azeite, limão e sal.",
    calories: 320,
    carbs: 18,
    protein: 22,
    fat: 18,
    mainBenefit: "Vitamina C, zinco e proteína em uma só refeição.",
  },
  {
    code: "skin_rec_agua_saborizada",
    name: "Água Saborizada com Limão, Pepino e Hortelã",
    image: imgAguaSaborizada,
    category: "Bebida",
    description: "Forma gostosa de aumentar a hidratação ao longo do dia.",
    ingredients: [
      "1 L de água gelada",
      "5 fatias finas de pepino",
      "Folhas de hortelã",
      "Suco de 1/2 limão",
    ],
    preparation: "Misture tudo em uma jarra e deixe na geladeira por pelo menos 30 minutos.",
    calories: 10,
    carbs: 2,
    protein: 0,
    fat: 0,
    mainBenefit: "Hidratação extra de forma agradável.",
    notes: "Substitua refrigerantes e sucos açucarados.",
  },
  {
    code: "skin_rec_castanhas_frutas",
    name: "Lanche de Castanhas com Frutas Vermelhas",
    image: imgCastanhasFrutas,
    category: "Lanche",
    description: "Fonte de zinco, cobre e antioxidantes.",
    ingredients: [
      "1 punhado pequeno de castanhas variadas (cerca de 30 g)",
      "1/2 xícara de mirtilo, framboesa ou morango",
    ],
    preparation: "Apenas combine em uma tigela e sirva.",
    calories: 220,
    carbs: 15,
    protein: 6,
    fat: 16,
    mainBenefit: "Zinco, cobre e antioxidantes em um lanche prático.",
    cautions: "Castanha-do-pará: limite a 2 unidades por dia (excesso de selênio).",
  },
  {
    code: "skin_rec_bowl_iogurte",
    name: "Bowl de Iogurte com Chia e Frutas Vermelhas",
    image: imgBowlIogurte,
    category: "Café da manhã",
    description: "Café da manhã rico em proteína, ômega-3 vegetal e antioxidantes.",
    ingredients: [
      "1 pote de iogurte natural sem açúcar",
      "1 colher de sopa de chia",
      "1/2 xícara de frutas vermelhas (morango, mirtilo, framboesa)",
      "1 colher de chá de mel (opcional)",
    ],
    preparation: "Coloque o iogurte em uma tigela. Adicione a chia e as frutas por cima.",
    calories: 240,
    carbs: 22,
    protein: 14,
    fat: 9,
    mainBenefit: "Proteína para a pele e antioxidantes das frutas vermelhas.",
  },
  {
    code: "skin_rec_omelete",
    name: "Omelete com Espinafre e Tomate",
    image: imgOmelete,
    category: "Café da manhã",
    description: "Proteína de qualidade, ferro e licopeno para apoiar a pele.",
    ingredients: [
      "2 ovos",
      "1 punhado de espinafre fresco",
      "1/2 tomate em cubos",
      "Sal, pimenta e ervas a gosto",
      "1 colher de chá de azeite",
    ],
    preparation: "Bata os ovos com sal e pimenta. Refogue o espinafre e o tomate. Despeje os ovos e cozinhe até firmar.",
    calories: 230,
    carbs: 5,
    protein: 16,
    fat: 16,
    mainBenefit: "Proteína completa e antioxidantes para a pele.",
  },
  {
    code: "skin_rec_frango_salada",
    name: "Frango Grelhado com Salada Colorida",
    image: imgFrangoSalada,
    category: "Almoço/Jantar",
    description: "Refeição completa: proteína, vitamina C, zinco e fibras.",
    ingredients: [
      "150 g de filé de frango",
      "Folhas verdes",
      "Tomate, cenoura ralada e pepino",
      "1/4 de pimentão amarelo",
      "Azeite, limão e sal",
    ],
    preparation: "Tempere e grelhe o frango. Monte a salada e tempere com azeite e limão. Sirva o frango ao lado.",
    calories: 380,
    carbs: 20,
    protein: 38,
    fat: 16,
    mainBenefit: "Combinação completa para apoiar a firmeza da pele.",
  },
  {
    code: "skin_rec_creme_abacate",
    name: "Creme de Abacate com Cacau",
    image: imgCremeAbacate,
    category: "Sobremesa",
    description: "Sobremesa saudável com gorduras boas e antioxidantes.",
    ingredients: [
      "1/2 abacate maduro",
      "1 colher de sopa de cacau 100%",
      "1 colher de chá de mel ou adoçante",
      "Cacau nibs para finalizar",
    ],
    preparation: "Amasse o abacate e misture com o cacau e o adoçante até ficar cremoso. Finalize com cacau nibs.",
    calories: 240,
    carbs: 18,
    protein: 4,
    fat: 18,
    mainBenefit: "Gorduras boas + cobre para a elasticidade da pele.",
    notes: "Porção controlada — cerca de meio abacate por vez.",
  },
];
