"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type GameContextValue = {
  listenedIds: string[];
  revealedIds: string[];
  markChallengeAsListened: (id: string, checked: boolean) => void;
  revealChallenge: (id: string) => void;
  resetGameState: () => void;
};

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [listenedIds, setListenedIds] = useState<string[]>([]);
  const [revealedIds, setRevealedIds] = useState<string[]>([]);

  const markChallengeAsListened = useCallback(
    (id: string, checked: boolean) => {
      setListenedIds((prev) => {
        const exists = prev.includes(id);

        if (checked && !exists) return [...prev, id];
        if (!checked && exists) return prev.filter((i) => i !== id);

        return prev;
      });
    },
    [],
  );

  const revealChallenge = useCallback((id: string) => {
    setRevealedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const resetGameState = useCallback(() => {
    setListenedIds([]);
    setRevealedIds([]);
  }, []);

  return (
    <GameContext.Provider
      value={{
        listenedIds,
        revealedIds,
        markChallengeAsListened,
        revealChallenge,
        resetGameState,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
