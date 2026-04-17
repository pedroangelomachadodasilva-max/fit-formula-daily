import { useState } from "react";
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
import { SearchOverlay, FavoritesOverlay, ProfileOverlay, UpsellsOverlay, CompulsionOverlay } from "@/screens/Overlays";
import { ChatWidget } from "@/components/ChatWidget";
import { LoginScreen } from "@/screens/LoginScreen";

const AppContent = ({ pendingProfile }: { pendingProfile: any }) => {
  const { activeTab, showSearch, showFavorites, showProfile, showChat, setShowChat, subScreen, appState } = useApp();

  // Apply pending profile data once on mount
  useState(() => {
    if (pendingProfile) {
      const updates: any = {};
      if (pendingProfile.name) updates.name = pendingProfile.name;
      if (pendingProfile.age) updates.age = parseInt(pendingProfile.age);
      if (pendingProfile.gender) updates.gender = pendingProfile.gender;
      if (pendingProfile.height) updates.height = parseFloat(pendingProfile.height);
      if (pendingProfile.weight) updates.initialWeight = parseFloat(pendingProfile.weight);
      if (pendingProfile.targetWeight) updates.goal = `Chegar a ${pendingProfile.targetWeight}kg`;
      if (pendingProfile.activityLevel) updates.activityLevel = pendingProfile.activityLevel.toLowerCase();
      if (pendingProfile.objective) updates.goal = pendingProfile.objective;
      if (Object.keys(updates).length > 0) appState.updateProfile(updates);
      if (pendingProfile.calorieGoal) appState.setCalorieGoal(pendingProfile.calorieGoal);
      if (pendingProfile.weight) appState.setWeight(parseFloat(pendingProfile.weight));
    }
  });

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
      {subScreen === "upsells" && <UpsellsOverlay />}
      {subScreen === "compulsion" && <CompulsionOverlay />}

      <ChatWidget isOpen={showChat} onClose={() => setShowChat(false)} />
    </div>
  );
};

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try { return localStorage.getItem("formula-emagrecer-logged") === "true"; } catch { return false; }
  });
  const [pendingProfile, setPendingProfile] = useState<any>(null);

  const handleLogin = (profileData?: any) => {
    if (profileData) setPendingProfile(profileData);
    localStorage.setItem("formula-emagrecer-logged", "true");
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <AppProvider>
      <AppContent pendingProfile={pendingProfile} />
    </AppProvider>
  );
};

export default Index;
