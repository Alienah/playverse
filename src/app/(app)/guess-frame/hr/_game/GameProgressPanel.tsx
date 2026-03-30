"use client";

import Panel from "@/components/Panel";
import { Progress } from "@/components/Progress";
import { useGame } from "./GameContext";
import { getScore, getTotalPossibleScore } from "./challengeUtils";
import { Challenge } from "../types";

type GameProgressPanelProps = {
  challenges: Challenge[];
};

export function GameProgressPanel(props: GameProgressPanelProps) {
  const { challenges } = props;
  const { revealedIds, challengeResults, isHydrated } = useGame();

  const completedChallenges = isHydrated ? revealedIds.length : 0;
  const totalChallenges = challenges.length;
  const progressValue =
    totalChallenges > 0 ? (completedChallenges / totalChallenges) * 100 : 0;

  const currentScore = isHydrated ? getScore(challenges, challengeResults) : 0;
  const totalPossibleScore = getTotalPossibleScore(challenges);

  return (
    <Panel aria-labelledby="progress-id">
      <div className="flex flex-col gap-16">
        <div className="flex flex-wrap items-start justify-between gap-12">
          <div>
            <h2 className="text-heading-03" id="progress-id">
              Progreso
            </h2>

            <p className="mt-8 text-body-02 text-text-secondary">
              Has completado {completedChallenges} de {totalChallenges} pruebas.
            </p>
          </div>

          <p className="text-compact-01 text-text-muted">
            {Math.round(progressValue)}%
          </p>
        </div>

        <Progress value={progressValue} />

        <p className="mt-4 text-body-02 text-text-secondary">
          Puntos:{" "}
          <b>
            {currentScore} de {totalPossibleScore}
          </b>
        </p>
      </div>
    </Panel>
  );
}
