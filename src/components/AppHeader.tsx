import { User, Search, Heart } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

export const AppHeader = () => {
  const { setShowSearch, setShowFavorites, setShowProfile, appState } = useApp();
  const name = appState.state.profile.name;

  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-sm border-b border-border/30">
      <div className="flex items-center justify-between px-4 py-3">
        <button onClick={() => setShowProfile(true)} className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="w-5 h-5 text-primary" />
        </button>
        <h1 className="font-heading font-bold text-foreground text-lg">Fórmula Emagrecer</h1>
        <div className="flex gap-2">
          <button onClick={() => setShowSearch(true)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <Search className="w-5 h-5 text-muted-foreground" />
          </button>
          <button onClick={() => setShowFavorites(true)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <Heart className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
};
