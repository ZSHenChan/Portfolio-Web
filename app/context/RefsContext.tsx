import React, { createContext, useContext, useRef } from "react";

interface RefsContextType {
  sectionRefs: React.MutableRefObject<
    Record<string, HTMLDivElement | HTMLElement | null>
  >;
  registerRef: (key: string, element: HTMLDivElement | null) => void;
  scrollToSection: (section: string) => void;
}

const RefsContext = createContext<RefsContextType | null>(null);

export const RefsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const registerRef = (key: string, element: HTMLDivElement | null) => {
    sectionRefs.current[key] = element;
  };

  const scrollToSection = (section: string) => {
    const targetRef = sectionRefs.current[section];
    if (targetRef) {
      targetRef.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <RefsContext.Provider value={{ sectionRefs, scrollToSection, registerRef }}>
      {children}
    </RefsContext.Provider>
  );
};

export const useRefs = () => {
  const context = useContext(RefsContext);
  if (!context) {
    throw new Error("useRefs must be used within a RefsProvider");
  }
  return context;
};
