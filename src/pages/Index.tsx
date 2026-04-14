import { AppProvider, useApp } from "@/contexts/AppContext";
import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { FloatingButtons } from "@/components/FloatingButtons";
import { HomeScreen } from "@/screens/HomeScreen";
import { TeaScreen } from "@/screens/TeaScreen";
import { MealsScreen } from "@/screens/MealsScreen";
import { ExercisesScreen } from "@/screens/ExercisesScreen";
import { CameraScreen } from "@/screens/CameraScreen";
import { ProgressScreen } from "@/screens/ProgressScreen";
import { SearchOverlay, FavoritesOverlay, ProfileOverlay, ChatOverlay, UpsellsOverlay, CompulsionOverlay } from "@/screens/Overlays";

const AppContent = () => {
  const { activeTab, showSearch, showFavorites, showProfile, showChat, subScreen } = useApp();

  const renderScreen = () => {
    switch (activeTab) {
      case "home": return <HomeScreen />;
      case "tea": return <TeaScreen />;
      case "meals": return <MealsScreen />;
      case "exercises": return <ExercisesScreen />;
      case "camera": return <CameraScreen />;
      case "progress": return <ProgressScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <div className="app-container">
      <AppHeader />
      <main className="min-h-screen">
        {renderScreen()}
      </main>
      <FloatingButtons />
      <BottomNav />

      {showSearch && <SearchOverlay />}
      {showFavorites && <FavoritesOverlay />}
      {showProfile && <ProfileOverlay />}
      {showChat && <ChatOverlay />}
      {subScreen === "upsells" && <UpsellsOverlay />}
      {subScreen === "compulsion" && <CompulsionOverlay />}
    </div>
  );
};

const Index = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);

export default Index;
