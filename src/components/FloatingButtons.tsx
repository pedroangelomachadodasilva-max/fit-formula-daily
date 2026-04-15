import { MessageCircle, MoreHorizontal, X, BookOpen, ShoppingBag, Brain, Heart, Camera, TrendingUp, Coffee, UtensilsCrossed } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

export const FloatingButtons = () => {
  const { showMore, setShowMore, setShowChat, setActiveTab, setShowFavorites, setSubScreen } = useApp();

  const moreItems = [
    { label: "Planejamento", icon: BookOpen, action: () => { setActiveTab("meals"); setSubScreen("planning"); } },
    { label: "Upsells", icon: ShoppingBag, action: () => { setSubScreen("upsells"); } },
    { label: "Compulsão Alimentar", icon: Brain, action: () => { setSubScreen("compulsion"); } },
    { label: "Favoritos", icon: Heart, action: () => setShowFavorites(true) },
    { label: "Scanner", icon: Camera, action: () => setActiveTab("camera") },
    { label: "Progresso", icon: TrendingUp, action: () => setActiveTab("progress") },
    { label: "Chá", icon: Coffee, action: () => setActiveTab("tea") },
    { label: "Refeições", icon: UtensilsCrossed, action: () => setActiveTab("meals") },
  ];

  return (
    <>
      {showMore && (
        <div className="fixed inset-0 bg-foreground/30 z-50" onClick={() => setShowMore(false)}>
          <div className="absolute bottom-28 right-4 max-w-[200px] animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="bg-card rounded-2xl shadow-xl border border-border/50 p-2 space-y-1">
              {moreItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => { item.action(); setShowMore(false); }}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl hover:bg-muted transition-colors text-left"
                >
                  <item.icon className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-24 right-4 z-40 flex flex-col gap-3">
        <button
          onClick={() => setShowMore(!showMore)}
          className="fab bg-accent text-accent-foreground"
        >
          {showMore ? <X className="w-6 h-6" /> : <MoreHorizontal className="w-6 h-6" />}
        </button>
        <button
          onClick={() => setShowChat(true)}
          className="fab bg-primary text-primary-foreground shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      </div>
    </>
  );
};
