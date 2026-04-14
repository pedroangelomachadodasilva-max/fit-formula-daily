import React, { createContext, useContext, useState, ReactNode } from "react";
import { useAppState } from "@/hooks/useAppState";

type Tab = "home" | "tea" | "camera" | "meals" | "exercises" | "progress";

interface AppContextType {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  showSearch: boolean;
  setShowSearch: (v: boolean) => void;
  showFavorites: boolean;
  setShowFavorites: (v: boolean) => void;
  showProfile: boolean;
  setShowProfile: (v: boolean) => void;
  showMore: boolean;
  setShowMore: (v: boolean) => void;
  showChat: boolean;
  setShowChat: (v: boolean) => void;
  subScreen: string | null;
  setSubScreen: (s: string | null) => void;
  appState: ReturnType<typeof useAppState>;
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be inside AppProvider");
  return ctx;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [showSearch, setShowSearch] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [subScreen, setSubScreen] = useState<string | null>(null);
  const appState = useAppState();

  return (
    <AppContext.Provider value={{
      activeTab, setActiveTab, showSearch, setShowSearch,
      showFavorites, setShowFavorites, showProfile, setShowProfile,
      showMore, setShowMore, showChat, setShowChat,
      subScreen, setSubScreen, appState
    }}>
      {children}
    </AppContext.Provider>
  );
};
