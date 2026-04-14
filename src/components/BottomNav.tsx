import { Home, Coffee, Camera, UtensilsCrossed, Dumbbell, TrendingUp } from "lucide-react";
import { useApp } from "@/contexts/AppContext";

const tabs = [
  { id: "home" as const, icon: Home },
  { id: "tea" as const, icon: Coffee },
  { id: "camera" as const, icon: Camera },
  { id: "meals" as const, icon: UtensilsCrossed },
  { id: "exercises" as const, icon: Dumbbell },
  { id: "progress" as const, icon: TrendingUp },
];

export const BottomNav = () => {
  const { activeTab, setActiveTab, setSubScreen } = useApp();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card border-t border-border/50 z-50 safe-area-bottom">
      <div className="flex items-end justify-around px-2 pb-2 pt-1">
        {tabs.map((tab) => {
          const isCamera = tab.id === "camera";
          const isActive = activeTab === tab.id;

          if (isCamera) {
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSubScreen(null); }}
                className="camera-button"
              >
                <Camera className="w-7 h-7 text-primary-foreground" />
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSubScreen(null); }}
              className={`bottom-nav-item ${isActive ? "text-primary" : "text-muted-foreground"}`}
            >
              <tab.icon className="w-6 h-6" />
              <div className={`w-1 h-1 rounded-full mt-1 ${isActive ? "bg-primary" : "bg-transparent"}`} />
            </button>
          );
        })}
      </div>
    </nav>
  );
};
