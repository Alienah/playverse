"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type GameContextValue = {
  listenedIds: string[];
  revealedIds: string[];
  isHydrated: boolean;
  markChallengeAsListened: (id: string, checked: boolean) => void;
  revealChallenge: (id: string) => void;
  resetGameState: () => void;
};

const GameContext = createContext<GameContextValue | null>(null);

const REVEALED_STORAGE_KEY = "playverse:hr:revealed";

export function GameProvider({ children }: { children: ReactNode }) {
  const [listenedIds, setListenedIds] = useState<string[]>([]);
  const [revealedIds, setRevealedIds] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedValue = window.localStorage.getItem(REVEALED_STORAGE_KEY);

      if (storedValue) {
        const parsedValue = JSON.parse(storedValue);

        if (Array.isArray(parsedValue)) {
          setRevealedIds(parsedValue);
        }
      }
    } catch {
      window.localStorage.removeItem(REVEALED_STORAGE_KEY);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    if (revealedIds.length === 0) {
      window.localStorage.removeItem(REVEALED_STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(
      REVEALED_STORAGE_KEY,
      JSON.stringify(revealedIds),
    );
  }, [revealedIds, isHydrated]);

  const markChallengeAsListened = useCallback(
    (id: string, checked: boolean) => {
      setListenedIds((previous) => {
        const exists = previous.includes(id);

        if (checked && !exists) {
          return [...previous, id];
        }

        if (!checked && exists) {
          return previous.filter((item) => item !== id);
        }

        return previous;
      });
    },
    [],
  );

  const revealChallenge = useCallback((id: string) => {
    setRevealedIds((previous) =>
      previous.includes(id) ? previous : [...previous, id],
    );
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
        isHydrated,
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
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("useGame must be used within GameProvider");
  }

  return context;
}
