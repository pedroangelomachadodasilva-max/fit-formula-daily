import { Recipe } from "./lowCarb";
import imgDetoxPepino from "@/assets/salads/detox-pepino-abacate.jpg";
import imgDetoxQuinoa from "@/assets/salads/detox-quinoa-cenoura.jpg";
import imgDetoxEspinafre from "@/assets/salads/detox-espinafre-manga.jpg";
import imgGraoBico from "@/assets/salads/grao-de-bico-tomate.jpg";
import imgFrangoAbacaxi from "@/assets/salads/frango-abacaxi.jpg";
import imgQuinoaAbacate from "@/assets/salads/quinoa-abacate-manga.jpg";
import imgLentilha from "@/assets/salads/lentilha-abacate.jpg";
import imgAtum from "@/assets/salads/atum-feijao-preto.jpg";
import imgFrangoAbacateManga from "@/assets/salads/frango-abacate-manga.jpg";
import imgQuinoaCenoura from "@/assets/salads/quinoa-cenoura-amendoas.jpg";

export type SaladCategory = "detox" | "light" | "protein" | "complete";

export interface Salad extends Recipe {
  saladCategory: SaladCategory;
  saladCategoryLabel: string;
  isMainMeal: boolean;
}

export const salads: Salad[] = [
  { id: "s-1", name: "Salada Detox de Pepino e Abacate", category: "lunch", categoryLabel: "Almoço", saladCategory: "detox", saladCategoryLabel: "Detox", isMainMeal: false, ingredients: ["1 pepino", "1 abacate", "Limão", "Hortelã", "Azeite", "Sal"], preparation: "Cortar pepino e abacate em cubos. Temperar com limão, hortelã e azeite.", time: "10 min", servings: "1 porção", image: imgDetoxPepino },
  { id: "s-2", name: "Salada Detox de Quinoa e Cenoura", category: "lunch", categoryLabel: "Almoço", saladCategory: "detox", saladCategoryLabel: "Detox", isMainMeal: false, ingredients: ["1/2 xícara de quinoa cozida", "1 cenoura ralada", "Salsinha", "Limão", "Azeite"], preparation: "Cozinhar quinoa. Misturar com cenoura e temperos.", time: "20 min", servings: "2 porções", image: imgDetoxQuinoa },
  { id: "s-3", name: "Salada Detox de Espinafre e Manga", category: "lunch", categoryLabel: "Almoço", saladCategory: "detox", saladCategoryLabel: "Detox", isMainMeal: false, ingredients: ["2 xícaras de espinafre", "1 manga", "Nozes", "Vinagrete de limão"], preparation: "Montar base de espinafre. Adicionar manga em cubos e nozes. Regar com vinagrete.", time: "10 min", servings: "1 porção", image: imgDetoxEspinafre },
  { id: "s-4", name: "Salada de Grão-de-Bico e Tomate", category: "lunch", categoryLabel: "Almoço", saladCategory: "complete", saladCategoryLabel: "Refeição completa", isMainMeal: true, ingredients: ["1 xícara de grão-de-bico cozido", "2 tomates", "Cebola roxa", "Salsinha", "Azeite", "Limão"], preparation: "Misturar grão-de-bico com tomate e cebola em cubos. Temperar com azeite e limão.", time: "15 min", servings: "2 porções", image: imgGraoBico },
  { id: "s-5", name: "Salada de Frango com Abacaxi", category: "lunch", categoryLabel: "Almoço", saladCategory: "complete", saladCategoryLabel: "Refeição completa", isMainMeal: true, ingredients: ["200 g de frango grelhado desfiado", "2 fatias de abacaxi", "Alface", "Tomate cereja", "Molho de iogurte"], preparation: "Montar base de alface. Adicionar frango, abacaxi e tomates. Finalizar com molho.", time: "20 min", servings: "1 porção", image: imgFrangoAbacaxi },
  { id: "s-6", name: "Salada de Quinoa com Abacate e Manga", category: "lunch", categoryLabel: "Almoço", saladCategory: "protein", saladCategoryLabel: "Com proteína", isMainMeal: false, ingredients: ["1/2 xícara de quinoa", "1/2 abacate", "1/2 manga", "Rúcula", "Limão"], preparation: "Cozinhar quinoa. Montar com rúcula, abacate e manga. Temperar.", time: "25 min", servings: "2 porções", image: imgQuinoaAbacate },
  { id: "s-7", name: "Salada de Lentilha com Abacate", category: "lunch", categoryLabel: "Almoço", saladCategory: "complete", saladCategoryLabel: "Refeição completa", isMainMeal: true, ingredients: ["1 xícara de lentilha cozida", "1 abacate", "Tomate", "Cebola", "Coentro", "Limão"], preparation: "Misturar lentilha com abacate em cubos, tomate e cebola. Temperar.", time: "15 min", servings: "2 porções", image: imgLentilha },
  { id: "s-8", name: "Salada de Atum com Feijão-Preto", category: "lunch", categoryLabel: "Almoço", saladCategory: "complete", saladCategoryLabel: "Refeição completa", isMainMeal: true, ingredients: ["1 lata de atum", "1 xícara de feijão preto", "Milho", "Pimentão", "Cebola", "Limão"], preparation: "Escorrer atum e feijão. Misturar com milho, pimentão e cebola. Temperar com limão.", time: "10 min", servings: "2 porções", image: imgAtum },
  { id: "s-9", name: "Salada de Frango com Abacate e Manga", category: "lunch", categoryLabel: "Almoço", saladCategory: "protein", saladCategoryLabel: "Com proteína", isMainMeal: false, ingredients: ["200 g de frango grelhado", "1/2 abacate", "1/2 manga", "Alface", "Nozes"], preparation: "Montar base de alface. Adicionar frango, abacate e manga. Finalizar com nozes.", time: "20 min", servings: "1 porção", image: imgFrangoAbacateManga },
  { id: "s-10", name: "Salada de Quinoa com Cenoura e Amêndoas", category: "lunch", categoryLabel: "Almoço", saladCategory: "complete", saladCategoryLabel: "Refeição completa", isMainMeal: true, ingredients: ["1/2 xícara de quinoa", "1 cenoura ralada", "Amêndoas laminadas", "Rúcula", "Azeite"], preparation: "Cozinhar quinoa. Misturar com cenoura, rúcula e amêndoas. Temperar com azeite.", time: "25 min", servings: "2 porções", image: imgQuinoaCenoura },
];
