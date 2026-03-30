"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type ChallengeResult = "correct" | "incorrect";
export type ChallengeResults = Record<string, ChallengeResult>;

type PersistedGameState = {
  revealedIds: string[];
  challengeResults: ChallengeResults;
};

type GameContextValue = {
  listenedIds: string[];
  revealedIds: string[];
  isHydrated: boolean;
  challengeResults: ChallengeResults;
  markChallengeAsListened: (id: string, checked: boolean) => void;
  revealChallenge: (id: string) => void;
  resetGameState: () => void;
  setChallengeResult: (challengeId: string, result: ChallengeResult) => void;
};

const GameContext = createContext<GameContextValue | null>(null);

const STORAGE_KEY = "playverse:hr:game-state";

const INITIAL_PERSISTED_STATE: PersistedGameState = {
  revealedIds: [],
  challengeResults: {},
};

export function GameProvider({ children }: { children: ReactNode }) {
  const [listenedIds, setListenedIds] = useState<string[]>([]);
  const [revealedIds, setRevealedIds] = useState<string[]>([]);
  const [challengeResults, setChallengeResults] = useState<ChallengeResults>(
    {},
  );
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const storedValue = window.localStorage.getItem(STORAGE_KEY);

      if (!storedValue) {
        setIsHydrated(true);
        return;
      }

      const parsedValue = JSON.parse(storedValue);

      const persistedState: PersistedGameState = {
        revealedIds: Array.isArray(parsedValue?.revealedIds)
          ? parsedValue.revealedIds
          : INITIAL_PERSISTED_STATE.revealedIds,

        challengeResults:
          parsedValue?.challengeResults &&
          typeof parsedValue.challengeResults === "object" &&
          !Array.isArray(parsedValue.challengeResults)
            ? parsedValue.challengeResults
            : INITIAL_PERSISTED_STATE.challengeResults,
      };

      setRevealedIds(persistedState.revealedIds);
      setChallengeResults(persistedState.challengeResults);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const persistedState: PersistedGameState = {
      revealedIds,
      challengeResults,
    };

    const isEmpty =
      persistedState.revealedIds.length === 0 &&
      Object.keys(persistedState.challengeResults).length === 0;

    if (isEmpty) {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persistedState));
  }, [revealedIds, challengeResults, isHydrated]);

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
    setChallengeResults({});
  }, []);

  const setChallengeResult = useCallback(
    (challengeId: string, result: ChallengeResult) => {
      setChallengeResults((previous) => ({
        ...previous,
        [challengeId]: result,
      }));
    },
    [],
  );

  return (
    <GameContext.Provider
      value={{
        listenedIds,
        revealedIds,
        isHydrated,
        challengeResults,
        markChallengeAsListened,
        setChallengeResult,
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
