import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

interface UIStateContextProps {
  scrollToSection: (sectionId: string) => void;
  isChatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  scrollTargetList: Set<string>;
  registerScrollTarget: (id: string) => void;
  unregisterScrollTarget: (id: string) => void;
}

const UIStateContext = createContext<UIStateContextProps | undefined>(
  undefined
);

export const UIStateContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [scrollTargetList, setScrollTargetList] = useState<Set<string>>(
    new Set()
  );

  // - Implement Actions
  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
    }
  }, []);

  const setChatOpen = useCallback((chatOpen: boolean) => {
    setIsChatOpen(chatOpen);
  }, []);

  const registerScrollTarget = useCallback((id: string) => {
    setScrollTargetList((prev) => new Set(prev).add(id));
  }, []);

  const unregisterScrollTarget = useCallback((id: string) => {
    setScrollTargetList((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  }, []);

  const UIStateContextValue: UIStateContextProps = {
    scrollToSection,
    isChatOpen,
    setChatOpen,
    scrollTargetList,
    registerScrollTarget,
    unregisterScrollTarget,
  };

  return (
    <UIStateContext.Provider value={UIStateContextValue}>
      {children}
    </UIStateContext.Provider>
  );
};

export const useUIState = () => {
  const context = useContext(UIStateContext);
  if (context == undefined) {
    throw new Error("useUIState must be used within UIStateContextProvider");
  }
  return context;
};

export const useScrollTargetRegistration = (targetId: string) => {
  const { registerScrollTarget, unregisterScrollTarget } = useUIState();
  useEffect(() => {
    if (targetId) {
      registerScrollTarget(targetId);
      return () => unregisterScrollTarget(targetId);
    }
  }, [targetId, registerScrollTarget, unregisterScrollTarget]);
};
