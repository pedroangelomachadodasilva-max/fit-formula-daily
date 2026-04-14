export interface Tea {
  id: string;
  name: string;
  shortDescription: string;
  ingredients: string[];
  preparation: string;
  suggestedConsumption: string;
  benefits: string[];
  contraindications: string[];
  recommendedTime: string;
  image: string;
}

export const teas: Tea[] = [
  {
    id: "lean-fit",
    name: "Chá Lean Fit",
    shortDescription: "Mix poderoso para inibir apetite e auxiliar na perda de peso",
    ingredients: [
      "1 litro de água",
      "1 colher de sopa de garcínia",
      "1 colher de sopa de hibisco",
      "1 colher de sopa de mulungú",
      "1 colher de sopa de passiflora",
      "1 colher de sopa de dente-de-leão",
      "1 colher de sopa de erva-de-são-joão",
      "1 colher de sopa de erva java (substituir por canela em pau se não encontrar)"
    ],
    preparation: "Ferver 1 litro de água. Colocar uma colher de sopa de cada erva. Tampar e desligar o fogo. Coar após 20 minutos.",
    suggestedConsumption: "1 xícara, 5 vezes por dia, durante 30 dias",
    benefits: ["Inibe o apetite", "Auxilia na perda de peso", "Regula colesterol", "Melhora energia", "Fortalece sistema imunológico", "Combate envelhecimento", "Diminui ansiedade", "Antioxidante", "Combate retenção de líquido"],
    contraindications: ["Gestantes", "Lactantes com bebê menor de 8 meses", "Pessoas com remédio controlado", "Pessoas em tratamento de doenças graves", "Hipertensos", "Pessoas com problemas renais", "Pessoas com problemas cardíacos"],
    recommendedTime: "Até 17h",
    image: "🍵"
  },
  {
    id: "diuretico-barriga-lisa",
    name: "Chá Diurético para Barriga Lisa",
    shortDescription: "Diurético potente para reduzir inchaço e auxiliar emagrecimento",
    ingredients: ["1 colher de chá de hibisco em pó", "2 colheres de sopa de folhas de capim-limão", "2 colheres de sopa de erva cavalinha", "1/2 litro de água"],
    preparation: "Colocar as ervas na água. Quando a água alcançar fervura, desligar. Tampar e deixar abafado por cerca de 10 minutos. Coar e beber.",
    suggestedConsumption: "2 a 3 xícaras ao dia",
    benefits: ["Diurético", "Auxilia na perda de peso", "Reduz colesterol e estresse", "Auxilia controle de pressão arterial e glicemia", "Auxilia função intestinal", "Diminui vontade de comer doce", "Fortalece sistema imunológico", "Ajuda a tratar infecções urinárias"],
    contraindications: ["Pessoas com doenças cardíacas", "Pessoas com doenças renais", "Pessoas com pressão baixa", "Mulheres grávidas", "Mulheres que amamentam", "Pessoas em tratamento de câncer"],
    recommendedTime: "Manhã e tarde",
    image: "🌿"
  },
  {
    id: "cha-branco",
    name: "Chá Branco",
    shortDescription: "Anti-inflamatório natural com ação diurética e antioxidante",
    ingredients: ["2 colheres de sopa de chá branco", "1 litro de água"],
    preparation: "Iniciar a fervura da água. Desligar o fogo. Acrescentar as folhas. Abafar e deixar em repouso por cerca de 5 minutos. Coar e servir.",
    suggestedConsumption: "2 a 3 xícaras ao dia",
    benefits: ["Anti-inflamatório", "Melhora humor", "Controla colesterol", "Protege sistema imunológico", "Antioxidante", "Diurético", "Ajuda desinchar", "Auxilia no emagrecimento"],
    contraindications: ["Pessoas com pressão alta", "Úlceras gástricas", "Problemas cardíacos", "Insônia", "Não ingerir após as refeições"],
    recommendedTime: "Entre as refeições",
    image: "🫖"
  },
  {
    id: "casca-abacaxi",
    name: "Chá da Casca de Abacaxi para Secar",
    shortDescription: "Termogênico e diurético para combater inchaço",
    ingredients: ["1,5 litro de água", "Cascas de 1 abacaxi", "5 cravos", "1 pau de canela", "10 folhas de hortelã"],
    preparation: "Ferver todos os ingredientes, menos a hortelã, por 15 minutos. Desligar. Adicionar hortelã. Tampar. Deixar descansar 10 minutos. Coar.",
    suggestedConsumption: "3 a 4 xícaras ao dia",
    benefits: ["Diurético", "Combate inchaço", "Reduz apetite", "Termogênico", "Antioxidante"],
    contraindications: ["Hipertensos", "Gestantes", "Lactantes", "Pessoas com gastrite", "Pessoas com úlcera", "Pessoas com refluxo"],
    recommendedTime: "Até 17h",
    image: "🍍"
  },
  {
    id: "matcha",
    name: "Chá Matcha para Perder Peso",
    shortDescription: "Energético natural com ação termogênica e antioxidante",
    ingredients: ["1 colher de chá de matcha", "100 ml de água", "Canela em pó a gosto", "Pedaços de gengibre a gosto"],
    preparation: "Ferver 75 ml de água com gengibre. Desligar o fogão. Adicionar uma colher de chá de matcha. Retirar os pedaços de gengibre. Servir em uma xícara. Adicionar canela a gosto.",
    suggestedConsumption: "Morno ou em temperatura ambiente, 30 min antes do almoço",
    benefits: ["Auxilia na perda de peso", "Aumenta energia", "Reduz estresse", "Melhora memória", "Antioxidante", "Ajuda a diminuir colesterol"],
    contraindications: ["Pessoas hipertensas", "Pessoas com hipertireoidismo", "Pessoas com insônia (contém cafeína)"],
    recommendedTime: "30 min antes do almoço",
    image: "🍃"
  },
  {
    id: "spirulina",
    name: "Chá de Spirulina Seca Tudo",
    shortDescription: "Desintoxicante que reduz fome e aumenta imunidade",
    ingredients: ["1 colher de chá de spirulina em pó", "1/2 litro de água"],
    preparation: "Ferver a água. Desligar. Adicionar a spirulina. Abafar por 5 minutos. Coar e consumir.",
    suggestedConsumption: "2 a 3 xícaras ao dia",
    benefits: ["Ajuda a reduzir fome", "Desintoxica", "Auxilia na perda de peso", "Reduz inflamações", "Aumenta imunidade"],
    contraindications: ["Fenilcetonúria", "Doenças autoimunes", "Gestantes", "Lactantes"],
    recommendedTime: "Manhã e tarde",
    image: "💚"
  },
  {
    id: "centella",
    name: "Chá de Centella",
    shortDescription: "Anti-inflamatório com ação calmante e estética",
    ingredients: ["2 colheres de sopa de centella asiática", "1 litro de água"],
    preparation: "Ferver a água. Acrescentar a planta. Desligar o fogo. Tampar e deixar descansar de 10 a 15 minutos. Deixar esfriar e beber 2 a 3 vezes por dia.",
    suggestedConsumption: "2 a 3 xícaras por dia",
    benefits: ["Anti-inflamatório", "Ação cicatrizante", "Diminui ansiedade", "Auxilia no emagrecimento", "Benefício estético para a pele"],
    contraindications: ["Mulheres grávidas", "Mulheres amamentando", "Pessoas com problemas no fígado", "Pessoas com problemas nos rins"],
    recommendedTime: "Manhã e tarde",
    image: "🌱"
  }
];

export const teaGuidelines = [
  "Ideal consumir até 17h",
  "Recomendação: cerca de 1 litro por dia, dividindo ao longo do dia",
  "Pode ser consumido quente ou frio",
  "Chá não substitui água",
  "Se houver mal-estar intenso por mais de 3 dias, suspender uso"
];

export const teaGeneralContraindications = [
  "Gestantes",
  "Lactantes com bebê menor de 8 meses",
  "Pessoas com medicação controlada",
  "Pessoas em tratamento de doenças graves",
  "Hipertensos (dependendo do chá)",
  "Pessoas com problemas renais",
  "Pessoas com problemas cardíacos"
];
