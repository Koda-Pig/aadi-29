import { createContext, useContext, ReactNode } from "react";
import { useScrollPosition } from "../hooks/useScrollPosition";

interface ScrollContextType {
  scrollPosition: number;
}

const ScrollContext = createContext<ScrollContextType>({ scrollPosition: 0 });

export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const scrollPosition = useScrollPosition();

  return (
    <ScrollContext.Provider value={{ scrollPosition }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);
