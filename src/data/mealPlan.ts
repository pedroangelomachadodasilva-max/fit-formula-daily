export interface DayPlan {
  day: number;
  breakfast: string;
  lunch: string;
  snack: string;
  dinner: string;
}

export const mealPlanDays: DayPlan[] = [
  { day: 1, breakfast: "1 pote de iogurte sem gordura com 1 colher de sopa de aveia e 1 maçã", lunch: "1 peito de frango grelhado + 1 colher de sopa de arroz integral + salada de alface, cebola e tomate + 1 colher de sopa de linhaça + 1/2 laranja com bagaço", snack: "1 copo de vitamina com 150 ml de bebida de soja ou leite desnatado, com 1/4 de mamão papaya sem açúcar", dinner: "Legumes cozidos (cenoura, vagem e chuchu) com ervas + azeite + 1 filé médio de peixe grelhado + 1/2 pera" },
  { day: 2, breakfast: "Café sem açúcar + 1 bolacha de arroz com 2 fatias médias de ricota + metade de uma banana", lunch: "200 g de tofu grelhado + brócolis e cenoura cozidos com azeite + fatia pequena de melão", snack: "200 ml de suco verde com couve, limão, pepino e água de coco + 2 castanhas do Pará", dinner: "1 prato de sopa de legumes + 6 morangos" },
  { day: 3, breakfast: "Café com leite desnatado + metade de pão francês integral + 1 colher de sopa de queijo cottage", lunch: "1 coxa de frango ensopada com 3 colheres de sopa de quiabo + 1 batata pequena + salada com alface, espinafre e rúcula + 1 tangerina", snack: "1 maçã cozida com canela + 2 nozes", dinner: "Salada com alface, cenoura ralada, pepino, tomate, 2 ovos cozidos e abacaxi em cubos + 5 uvas" },
  { day: 4, breakfast: "Pão francês sem miolo com manteiga, requeijão light ou ovos mexidos + suco natural", lunch: "Salada verde + 5 colheres de sopa de arroz integral + proteína grelhada + brócolis, vagem, cenoura, chuchu ou abobrinha", snack: "3 castanhas-do-pará + 250 ml de água de coco + 250 ml de suco puro de melão", dinner: "2 conchas de canja de galinha com arroz, cenoura e cheiro-verde + 2 pedaços de frango da canja + 4 colheres de sopa de agrião refogado" },
  { day: 5, breakfast: "Smoothie com 1 copo de leite desnatado ou leite de aveia + 1/4 de abacate sem açúcar", lunch: "Peixe cozido com 1 batata pequena e couve, temperados com azeite + pequena fatia de melancia", snack: "Gelatina de morango sem açúcar com 1 copo de iogurte natural desnatado e 1 colher de chá de linhaça", dinner: "1 prato raso de sopa de abóbora temperada com sal, cebola, pimenta, alho e fio de azeite + 1 pêssego" },
  { day: 6, breakfast: "1 pão integral + queijo minas + 1 laranja ou 4 morangos + 1 copo de suco", lunch: "1 bife à parmegiana + feijão preto + 3 colheres de sopa de arroz + salada à vontade", snack: "Punhado de nozes + melancia + kiwi", dinner: "2 fatias de pão integral cobertas com patê de frango light" },
  { day: 7, breakfast: "200 ml de suco de abacaxi ou laranja + 2 ovos mexidos", lunch: "2 colheres de sopa de quinoa com cenoura + 3 colheres de sopa de abobrinha ensopada + 1 bife grelhado sem gordura + 1 maçã", snack: "Vitamina com metade de uma pera e 150 ml de leite de aveia sem açúcar", dinner: "1 prato de canja de galinha com cenoura, chuchu e tomate + 6 morangos" },
  { day: 8, breakfast: "1 copo de vitamina com leite desnatado e 2 frutas da preferência", lunch: "Salpicão com frango, cenoura, milho, ervilha, alho-poró, uva passa, iogurte natural e fio de azeite", snack: "1 lata de atum + 1 ovo cozido; possibilidade de sopa de legumes com carne ou frango e frutas à vontade", dinner: "Sopa de legumes com carne ou frango" },
  { day: 9, breakfast: "120 g de iogurte integral + 1 colher de sopa de sementes de girassol + 1 kiwi", lunch: "Salada com alface, rúcula, espinafre, coentro, 2 colheres de sopa de cottage e 1/2 tomate picado + 1 fatia pequena de melão", snack: "150 ml de bebida de amêndoa + 4 morangos + 1 colher de sopa de farelo de aveia", dinner: "Sopa de ervilha temperada com azeite, alho e cebola + 1 ameixa fresca" },
  { day: 10, breakfast: "1 porção de torrada integral com queijo branco ou chips de batata-doce + 1 xícara de café coado", lunch: "Macarrão de abobrinha", snack: "2 punhados de frutas vermelhas; ou iogurte desnatado com frutas e granola; ou queijo cottage e 1 laranja", dinner: "100 g de carne de porco em cubos ou 90 g de linguiça grelhada + abacaxi, abobrinha e pimenta vermelha + 50 g de arroz integral" },
  { day: 11, breakfast: "Café sem açúcar + 1 bolacha de milho + 1 colher de sopa de guacamole", lunch: "Omelete com 2 ovos, salsinha, cebola e tomate + 3 colheres de sopa de salada de feijão fradinho + 1 jambo", snack: "1 banana picada + 1 colher de sopa de farelo de aveia + pitada de canela", dinner: "Salada com berinjela, grão-de-bico e tomate + 1 posta de peixe ensopado + fatia pequena de melancia" },
  { day: 12, breakfast: "Crepioca com queijo e requeijão light + café sem açúcar", lunch: "3 colheres de sopa de arroz com lentilha + 3 colheres de sopa de quinoa + salada de legumes à vontade", snack: "Batata-doce e ovo; frutas low carb: coco, melancia ou goiaba", dinner: "Panqueca com carne moída + salada de legumes low carb à vontade" },
  { day: 13, breakfast: "1 xícara de chá de cappuccino antifome", lunch: "Salada mista com alface, rabanete, tomate, palmito e pepino + couve-flor cozida no vapor + arroz integral + 1 sobrecoxa assada sem pele", snack: "1 pote de iogurte natural desnatado + 2 colheres de sopa de granola light", dinner: "Salada verde + 1 fatia de pão integral light com pasta de atum" },
  { day: 14, breakfast: "250 ml de suco de fruta light à base de soja + 1 fatia de pão integral light com queijinho fundido e 1 fatia de peito de peru", lunch: "Salada verde com alface, acelga, agrião, rúcula e escarola + vagem cozida + massa integral com molho de tomate + 1 filé grande de peixe grelhado", snack: "200 ml de suco de melancia batido com gengibre", dinner: "Salada mista + 1 prato fundo de sopa de legumes caseira + 1 ovo cozido picado" }
];

export const allowedFoods = [
  { group: "Vegetais e Legumes", icon: "🥦", items: "Não ricos em amido" },
  { group: "Frutas", icon: "🍎", items: "Variadas e frescas" },
  { group: "Peixes e Mariscos", icon: "🐟", items: "Grelhados ou cozidos" },
  { group: "Proteínas Vegetais", icon: "🫘", items: "Tofu, tempeh" },
  { group: "Grãos Integrais", icon: "🌾", items: "Arroz integral, quinoa" },
  { group: "Leguminosas", icon: "🥜", items: "Feijão, lentilha, grão-de-bico" },
  { group: "Gorduras Saudáveis", icon: "🥑", items: "Azeite, abacate" },
  { group: "Laticínios Adequados", icon: "🧀", items: "Light e desnatados" },
  { group: "Sementes e Oleaginosas", icon: "🌰", items: "Chia, linhaça, castanhas" },
  { group: "Bebidas Não Calóricas", icon: "💧", items: "Água, chás, café sem açúcar" },
  { group: "Ovos, Aves e Carne", icon: "🍗", items: "Magras e grelhadas" },
];

export const avoidFoods = [
  "Ultraprocessados", "Carboidratos refinados", "Açúcar adicionado", "Frituras",
  "Excesso de gorduras saturadas", "Bebidas alcoólicas", "Bebidas açucaradas",
  "Fast-food", "Bolos, biscoitos, sorvetes e lanches muito calóricos"
];
