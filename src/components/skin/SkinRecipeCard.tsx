import { Heart } from "lucide-react";
import placeholder from "@/assets/skin/general/placeholder-skin.jpg";
import type { SkinRecipe } from "@/data/skinRecipes";

interface Props {
  recipe: SkinRecipe;
  favorite: boolean;
  onToggleFavorite: () => void;
  onOpen: () => void;
}

export const SkinRecipeCard = ({ recipe, favorite, onToggleFavorite, onOpen }: Props) => (
  <div className="card-elevated p-0 overflow-hidden">
    <button onClick={onOpen} className="w-full text-left active:scale-[0.99] transition-transform">
      <div className="relative w-full aspect-[4/3] bg-muted">
        <img
          src={recipe.image}
          alt={recipe.name}
          loading="lazy"
          width={768}
          height={576}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = placeholder;
          }}
        />
        <span className="absolute top-2 left-2 text-[10px] uppercase tracking-wide bg-card/90 text-foreground rounded-full px-2 py-0.5 font-bold">
          {recipe.category}
        </span>
      </div>
      <div className="p-3">
        <p className="font-bold text-foreground text-sm leading-tight">{recipe.name}</p>
        <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">{recipe.description}</p>
        <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground">
          <span>🔥 {recipe.calories} kcal</span>
          <span>P {recipe.protein}g</span>
          <span>C {recipe.carbs}g</span>
          <span>G {recipe.fat}g</span>
        </div>
      </div>
    </button>
    <div className="px-3 pb-3 -mt-1">
      <button
        onClick={onToggleFavorite}
        className={`w-full py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1 ${
          favorite ? "bg-accent/10 text-accent" : "bg-muted text-foreground"
        }`}
      >
        <Heart className={`w-3.5 h-3.5 ${favorite ? "fill-current" : ""}`} />
        {favorite ? "Favorita" : "Favoritar"}
      </button>
    </div>
  </div>
);
