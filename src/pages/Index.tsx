import { useState, useEffect } from "react";
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

const AppContent = () => {
  const { activeTab, showSearch, showFavorites, showProfile, showChat, setShowChat, subScreen, appState } = useApp();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try { return localStorage.getItem("formula-emagrecer-logged") === "true"; } catch { return false; }
  });

  const handleLogin = (profileData?: any) => {
    if (profileData) {
      const updates: any = {};
      if (profileData.name) updates.name = profileData.name;
      if (profileData.age) updates.age = parseInt(profileData.age);
      if (profileData.gender) updates.gender = profileData.gender;
      if (profileData.height) updates.height = parseFloat(profileData.height);
      if (profileData.weight) updates.initialWeight = parseFloat(profileData.weight);
      if (profileData.targetWeight) updates.goal = `Chegar a ${profileData.targetWeight}kg`;
      if (profileData.activityLevel) updates.activityLevel = profileData.activityLevel.toLowerCase();
      if (profileData.objective) updates.goal = profileData.objective;
      if (Object.keys(updates).length > 0) appState.updateProfile(updates);
      if (profileData.calorieGoal) appState.setCalorieGoal(profileData.calorieGoal);
      if (profileData.weight) appState.setWeight(parseFloat(profileData.weight));
    }
    localStorage.setItem("formula-emagrecer-logged", "true");
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

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

const Index = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);

export default Index;
