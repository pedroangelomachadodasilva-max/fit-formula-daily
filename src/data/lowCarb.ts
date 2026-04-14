export interface Recipe {
  id: string;
  name: string;
  category: "breakfast" | "lunch" | "snack" | "dinner" | "dessert";
  categoryLabel: string;
  ingredients: string[];
  preparation: string;
  time: string;
  servings: string;
  calories?: number;
  carbs?: number;
  protein?: number;
  fat?: number;
  fiber?: number;
  image: string;
}

export const lowCarbRecipes: Recipe[] = [
  {
    id: "lc-1", name: "Omelete de Espinafre e Queijo", category: "breakfast", categoryLabel: "Café da manhã",
    ingredients: ["2 ovos", "1 xícara de folhas de espinafre fresco", "30 g de queijo branco em cubos", "Sal e pimenta a gosto", "Azeite para untar"],
    preparation: "Bater os ovos com garfo e temperar. Adicionar espinafre e queijo. Despejar em frigideira antiaderente untada. Cozinhar em fogo médio até firmar dos dois lados. Servir quente.",
    time: "10 min", servings: "1 porção", image: "🍳"
  },
  {
    id: "lc-2", name: "Iogurte com Chia e Frutas Vermelhas", category: "breakfast", categoryLabel: "Café da manhã",
    ingredients: ["1/2 xícara de iogurte natural sem açúcar", "1 colher de sopa de sementes de chia", "1/2 xícara de morangos frescos", "1/2 xícara de mirtilos frescos", "1 colher de sopa de nozes picadas"],
    preparation: "Misturar iogurte com chia. Lavar e cortar as frutas. Montar em camadas alternadas. Finalizar com nozes. Gelar por 1 hora ou mais.",
    time: "5 min + geladeira", servings: "1 porção", image: "🫐"
  },
  {
    id: "lc-3", name: "Crepioca com Frango e Cottage", category: "breakfast", categoryLabel: "Café da manhã",
    ingredients: ["2 ovos", "2 colheres de sopa de tapioca", "50 g de frango cozido e desfiado", "2 colheres de sopa de queijo cottage", "Sal e temperos a gosto", "Azeite ou óleo de coco"],
    preparation: "Bater ovos, adicionar tapioca, frango, cottage e temperos. Misturar bem. Despejar em frigideira antiaderente untada. Cozinhar até firmar dos dois lados.",
    time: "15 min", servings: "1 porção", calories: 280, carbs: 10, protein: 22, fat: 16, fiber: 1, image: "🥞"
  },
  {
    id: "lc-4", name: "Smoothie Low Carb", category: "breakfast", categoryLabel: "Café da manhã",
    ingredients: ["1 xícara de leite de amêndoas", "1/2 abacate maduro", "1 colher de sopa de manteiga de amêndoas", "1 colher de chá de sementes de chia", "1 colher de chá de cacau em pó", "Adoçante natural opcional", "Gelo a gosto"],
    preparation: "Colocar todos os ingredientes no liquidificador. Bater até obter mistura homogênea e cremosa. Adicionar gelo e servir.",
    time: "5 min", servings: "1 porção", image: "🥤"
  },
  {
    id: "lc-5", name: "Pão Low Carb de Micro-ondas", category: "breakfast", categoryLabel: "Café da manhã",
    ingredients: ["1 ovo", "1 colher de sopa de farinha de amêndoas", "1 colher de sopa de farinha de linhaça", "1/2 colher de chá de fermento em pó", "Pitada de sal", "Manteiga ou azeite para untar"],
    preparation: "Misturar todos os ingredientes. Despejar em tigela pequena untada. Levar ao micro-ondas em potência alta por cerca de 2 minutos. Retirar, desenformar e cortar.",
    time: "5 min", servings: "1 porção", image: "🍞"
  },
  {
    id: "lc-6", name: "Espaguete de Abobrinha com Pesto", category: "lunch", categoryLabel: "Almoço",
    ingredients: ["2 abobrinhas médias", "2 colheres de sopa de pesto", "Tomate cereja", "Queijo parmesão ralado"],
    preparation: "Fazer espirais de abobrinha. Refogar levemente. Misturar com pesto. Finalizar com tomates e parmesão.",
    time: "20 min", servings: "2 porções", image: "🍝"
  },
  {
    id: "lc-7", name: "Lasanha de Berinjela Low Carb", category: "lunch", categoryLabel: "Almoço",
    ingredients: ["2 berinjelas grandes", "300 g de carne moída", "Molho de tomate", "Queijo muçarela", "Temperos a gosto"],
    preparation: "Fatiar berinjelas, grelhar. Montar camadas alternadas com carne, molho e queijo. Assar até gratinar.",
    time: "45 min", servings: "4 porções", image: "🧀"
  },
  {
    id: "lc-8", name: "Salada de Salmão com Pepino e Abacate", category: "lunch", categoryLabel: "Almoço",
    ingredients: ["200 g de salmão grelhado", "1 pepino", "1 abacate", "Limão", "Azeite", "Sal e pimenta"],
    preparation: "Grelhar o salmão. Cortar pepino e abacate. Montar a salada e temperar com limão e azeite.",
    time: "20 min", servings: "1 porção", image: "🐟"
  },
  {
    id: "lc-9", name: "Filé de Salmão ao Limão", category: "lunch", categoryLabel: "Almoço",
    ingredients: ["2 filés de salmão", "2 limões", "Alho", "Azeite", "Ervas frescas"],
    preparation: "Temperar salmão com limão, alho e ervas. Assar em forno pré-aquecido a 200°C por 15 minutos.",
    time: "25 min", servings: "2 porções", image: "🍋"
  },
  {
    id: "lc-10", name: "Frango Assado com Legumes Low Carb", category: "lunch", categoryLabel: "Almoço",
    ingredients: ["500 g de peito de frango", "Abobrinha", "Brócolis", "Pimentão", "Azeite", "Temperos"],
    preparation: "Temperar frango e legumes. Dispor em assadeira. Assar a 200°C por 30 minutos.",
    time: "40 min", servings: "3 porções", image: "🍗"
  },
  {
    id: "lc-11", name: "Wrap de Alface com Frango", category: "snack", categoryLabel: "Lanche",
    ingredients: ["Folhas grandes de alface", "150 g de peito de frango cozido e desfiado", "1/4 de abacate", "Tomate-cereja", "Cream cheese ou maionese caseira", "Sal e pimenta"],
    preparation: "Lavar e secar as folhas. Rechear cada folha com frango, abacate e tomate. Temperar. Adicionar molho. Enrolar como wrap.",
    time: "15 min", servings: "1 porção", image: "🥬"
  },
  {
    id: "lc-12", name: "Chips de Abobrinha", category: "snack", categoryLabel: "Lanche",
    ingredients: ["2 abobrinhas médias", "Azeite de oliva", "Sal e temperos a gosto"],
    preparation: "Pré-aquecer forno a 180°C. Cortar abobrinha em fatias finas. Regar com azeite e temperos. Assar por 15 a 20 minutos até dourar.",
    time: "25 min", servings: "2-3 porções", image: "🥒"
  },
  {
    id: "lc-13", name: "Ovos Recheados com Guacamole", category: "snack", categoryLabel: "Lanche",
    ingredients: ["3 ovos cozidos", "1 abacate maduro", "1 tomate picado", "1/4 de cebola picada", "Suco de limão", "Coentro ou salsa", "Sal e pimenta"],
    preparation: "Cortar ovos ao meio e retirar gemas. Amassar abacate e misturar com tomate, cebola, limão e temperos. Rechear os ovos.",
    time: "20 min", servings: "6 metades", image: "🥚"
  },
  {
    id: "lc-14", name: "Sanduíche de Berinjela com Queijo", category: "snack", categoryLabel: "Lanche",
    ingredients: ["1 berinjela média em fatias grossas", "Azeite", "Sal e pimenta", "100 g de muçarela", "Tomate e rúcula"],
    preparation: "Grelhar berinjela com azeite. Montar sanduíches com queijo, tomate e rúcula. Aquecer até derreter.",
    time: "30 min", servings: "2 sanduíches", image: "🍆"
  },
  {
    id: "lc-15", name: "Bolinhos de Abobrinha", category: "snack", categoryLabel: "Lanche",
    ingredients: ["2 abobrinhas médias raladas", "1/2 cebola picada", "2 ovos", "1/2 xícara de farinha de amêndoas", "1/4 de xícara de queijo parmesão ralado", "1 colher de chá de fermento em pó", "Sal e pimenta"],
    preparation: "Misturar todos os ingredientes. Fazer pequenos bolinhos. Assar a 180°C por 20 minutos até dourar.",
    time: "30 min", servings: "~15 bolinhos", image: "🧆"
  },
  {
    id: "lc-16", name: "Sopa de Abóbora com Frango", category: "dinner", categoryLabel: "Jantar",
    ingredients: ["500 g de abóbora", "200 g de frango desfiado", "Cebola", "Alho", "Azeite", "Sal"],
    preparation: "Cozinhar abóbora. Bater no liquidificador. Adicionar frango desfiado. Temperar e servir.",
    time: "30 min", servings: "3 porções", image: "🎃"
  },
  {
    id: "lc-17", name: "Sopa Cremosa de Couve-Flor", category: "dinner", categoryLabel: "Jantar",
    ingredients: ["1 couve-flor", "Cream cheese", "Caldo de legumes", "Noz-moscada", "Sal e pimenta"],
    preparation: "Cozinhar couve-flor no caldo. Bater até ficar cremosa. Adicionar cream cheese e temperos.",
    time: "25 min", servings: "3 porções", image: "🥣"
  },
  {
    id: "lc-18", name: "Peixe Grelhado com Molho de Abacate", category: "dinner", categoryLabel: "Jantar",
    ingredients: ["2 filés de peixe branco", "1 abacate", "Limão", "Coentro", "Sal e pimenta"],
    preparation: "Grelhar peixe. Preparar molho com abacate amassado, limão e coentro. Servir por cima do peixe.",
    time: "20 min", servings: "2 porções", image: "🐠"
  },
  {
    id: "lc-19", name: "Torta de Frango com Legumes Low Carb", category: "dinner", categoryLabel: "Jantar",
    ingredients: ["300 g de frango desfiado", "Ovos", "Cream cheese", "Legumes variados", "Temperos"],
    preparation: "Misturar recheio. Preparar massa com ovos e cream cheese. Montar e assar a 180°C por 30 min.",
    time: "45 min", servings: "6 porções", image: "🥧"
  },
  {
    id: "lc-20", name: "Carne Assada com Vegetais", category: "dinner", categoryLabel: "Jantar",
    ingredients: ["500 g de carne magra", "Abobrinha", "Pimentão", "Cebola", "Alho", "Azeite", "Ervas"],
    preparation: "Temperar carne. Cortar vegetais. Assar tudo junto a 200°C por 40 minutos.",
    time: "50 min", servings: "4 porções", image: "🥩"
  }
];
