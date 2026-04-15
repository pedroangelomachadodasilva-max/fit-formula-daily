import imgOvernightOats from "@/assets/marmitas/overnight-oats.jpg";
import imgMuffins from "@/assets/marmitas/muffins-omelete.jpg";
import imgSmoothieVerde from "@/assets/marmitas/smoothie-verde.jpg";
import imgQuinoaLegumes from "@/assets/marmitas/quinoa-legumes.jpg";
import imgWrapFrango from "@/assets/marmitas/wrap-frango.jpg";
import imgBowlLegumes from "@/assets/marmitas/bowl-legumes.jpg";
import imgSalmaoVegetais from "@/assets/marmitas/salmao-vegetais.jpg";
import imgStirfryTofu from "@/assets/marmitas/stirfry-tofu.jpg";
import imgFrangoCurry from "@/assets/marmitas/frango-curry.jpg";

import imgIogurteFrutas from "@/assets/desserts/iogurte-frutas.jpg";
import imgGelatinaDiet from "@/assets/desserts/gelatina-diet.jpg";
import imgCompotaFrutas from "@/assets/desserts/compota-frutas.jpg";
import imgCookiesAveia from "@/assets/desserts/cookies-aveia.jpg";
import imgPicolesFrutas from "@/assets/desserts/picoles-frutas.jpg";
import imgMousseChocolate from "@/assets/desserts/mousse-chocolate.jpg";
import imgPudimChia from "@/assets/desserts/pudim-chia.jpg";
import imgBarrinhasFrutas from "@/assets/desserts/barrinhas-frutas.jpg";
import imgBarraGranola from "@/assets/desserts/barra-granola.jpg";

export const marmitaRecipes = {
  breakfast: [
    { id: "mf-b1", name: "Overnight Oats de Frutas Vermelhas", ingredients: ["1/2 xícara de aveia", "150 ml de leite", "Frutas vermelhas", "1 colher de chia", "Mel a gosto"], preparation: "Misturar aveia, leite e chia. Gelar por 8h. Adicionar frutas e mel.", image: imgOvernightOats, calories: 280 },
    { id: "mf-b2", name: "Muffins de Omelete", ingredients: ["4 ovos", "Espinafre", "Tomate", "Queijo", "Sal e pimenta"], preparation: "Bater ovos. Adicionar legumes e queijo. Distribuir em forminhas de muffin. Assar a 180°C por 20 min.", image: imgMuffins, calories: 180 },
    { id: "mf-b3", name: "Smoothie Verde", ingredients: ["1 banana", "1 xícara de espinafre", "200 ml de leite de amêndoas", "1 colher de pasta de amendoim"], preparation: "Bater tudo no liquidificador até ficar homogêneo.", image: imgSmoothieVerde, calories: 220 },
  ],
  lunch: [
    { id: "mf-l1", name: "Salada de Quinoa com Legumes Assados", ingredients: ["1/2 xícara de quinoa", "Abobrinha", "Pimentão", "Berinjela", "Azeite", "Temperos"], preparation: "Cozinhar quinoa. Assar legumes com azeite e temperos a 200°C por 25 min. Misturar.", image: imgQuinoaLegumes, calories: 350 },
    { id: "mf-l2", name: "Wrap de Frango com Guacamole", ingredients: ["Tortilha integral", "200 g de frango", "1 abacate", "Tomate", "Limão"], preparation: "Preparar guacamole. Grelhar frango. Montar wrap com todos ingredientes.", image: imgWrapFrango, calories: 420 },
    { id: "mf-l3", name: "Bowl de Legumes Grelhados e Arroz Integral", ingredients: ["1 xícara de arroz integral", "Legumes variados", "Azeite", "Molho tahine"], preparation: "Cozinhar arroz. Grelhar legumes. Montar bowl e regar com molho.", image: imgBowlLegumes, calories: 380 },
  ],
  dinner: [
    { id: "mf-d1", name: "Salmão Assado com Vegetais", ingredients: ["2 filés de salmão", "Brócolis", "Cenoura", "Limão", "Azeite"], preparation: "Temperar salmão. Dispor em assadeira com vegetais. Assar a 200°C por 20 min.", image: imgSalmaoVegetais, calories: 450 },
    { id: "mf-d2", name: "Stir-fry de Tofu e Legumes", ingredients: ["200 g de tofu firme", "Brócolis", "Cenoura", "Molho shoyu", "Gengibre"], preparation: "Cortar tofu em cubos e dourar. Saltear legumes. Misturar com molho.", image: imgStirfryTofu, calories: 290 },
    { id: "mf-d3", name: "Frango ao Curry com Coco", ingredients: ["300 g de frango em cubos", "200 ml de leite de coco", "Curry em pó", "Cebola", "Tomate"], preparation: "Refogar cebola e frango. Adicionar curry, tomate e leite de coco. Cozinhar 20 min.", image: imgFrangoCurry, calories: 410 },
  ]
};

export const marmitaTips = [
  { title: "Defina metas realistas", icon: "🎯" },
  { title: "Considere calorias diárias e nível de atividade", icon: "📊" },
  { title: "Priorize proteínas magras, carboidratos complexos e gorduras saudáveis", icon: "🥩" },
  { title: "Inclua água e vegetais", icon: "💧" },
  { title: "Planeje cardápio semanal", icon: "📋" },
  { title: "Faça compras com lista", icon: "🛒" },
  { title: "Faça pré-corte e pré-cozimento", icon: "🔪" },
  { title: "Congele porções individuais", icon: "❄️" },
  { title: "Use potes herméticos", icon: "📦" },
  { title: "Etiquetar com data e nome", icon: "🏷️" },
  { title: "Refrigere rapidamente", icon: "🧊" },
  { title: "Não deixar fora da geladeira por mais de 2 horas", icon: "⏰" },
  { title: "Descongele com segurança", icon: "✅" }
];

export const desserts = [
  { id: "ds-1", name: "Iogurte Natural com Frutas", calories: 120, image: imgIogurteFrutas, locked: false },
  { id: "ds-2", name: "Gelatina Diet", calories: 30, image: imgGelatinaDiet, locked: false },
  { id: "ds-3", name: "Compota de Frutas", calories: 90, image: imgCompotaFrutas, locked: true },
  { id: "ds-4", name: "Cookies de Aveia e Banana", calories: 85, image: imgCookiesAveia, locked: true },
  { id: "ds-5", name: "Picolés de Frutas", calories: 60, image: imgPicolesFrutas, locked: true },
  { id: "ds-6", name: "Mousse de Chocolate Light", calories: 110, image: imgMousseChocolate, locked: true },
  { id: "ds-7", name: "Pudim de Chia", calories: 95, image: imgPudimChia, locked: true },
  { id: "ds-8", name: "Barrinhas de Frutas Secas", calories: 130, image: imgBarrinhasFrutas, locked: true },
  { id: "ds-9", name: "Barra de Cereal ou Granola", calories: 140, image: imgBarraGranola, locked: true },
];
