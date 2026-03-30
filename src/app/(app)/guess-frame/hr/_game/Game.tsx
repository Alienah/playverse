"use client";

import { useMemo } from "react";
import { getChallengeTitle } from "./challengeUtils";

import { GameProgressPanel } from "./GameProgressPanel";
import { CurrentChallenge } from "./CurrentChallenge";
import { GameProvider } from "./GameContext";
import { useChallengeParam } from "./useChallengeParam";
import { ChallengeList } from "./ChallengeList";
import { Challenge } from "../types";

type GameProps = {
  challenges: Challenge[];
};

export function Game({ challenges }: GameProps) {
  const defaultId = challenges[0]?.id ?? "";

  const { challengeId, setChallengeId } = useChallengeParam(defaultId);

  const currentChallenge = useMemo(() => {
    return challenges.find((c) => c.id === challengeId) ?? challenges[0];
  }, [challengeId, challenges]);

  const currentChallengeIndex = useMemo(
    () => challenges.findIndex((challenge) => challenge.id === challengeId),
    [challengeId, challenges],
  );

  const previousChallenge =
    currentChallengeIndex > 0 ? challenges[currentChallengeIndex - 1] : null;

  const nextChallenge =
    currentChallengeIndex >= 0 && currentChallengeIndex < challenges.length - 1
      ? challenges[currentChallengeIndex + 1]
      : null;

  function handleGoToPreviousChallenge() {
    if (!previousChallenge) return;
    setChallengeId(previousChallenge.id);
  }

  function handleGoToNextChallenge() {
    if (!nextChallenge) return;
    setChallengeId(nextChallenge.id);
  }

  return (
    <GameProvider>
      <GameProgressPanel challenges={challenges} />

      <section
        className="grid gap-24 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start"
        aria-label="Juego"
      >
        <CurrentChallenge
          key={challengeId}
          challenge={currentChallenge}
          title={getChallengeTitle(challenges, challengeId)}
          challengeId={challengeId}
          onGoToPreviousChallenge={handleGoToPreviousChallenge}
          onGoToNextChallenge={handleGoToNextChallenge}
          hasPreviousChallenge={Boolean(previousChallenge)}
          hasNextChallenge={Boolean(nextChallenge)}
        />

        <ChallengeList challenges={challenges} challengeId={challengeId} />
      </section>
    </GameProvider>
  );
}
