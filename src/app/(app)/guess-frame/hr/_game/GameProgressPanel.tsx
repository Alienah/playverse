"use client";

import Panel from "@/components/Panel";
import { Progress } from "@/components/Progress";
import { useGame } from "./GameContext";

type GameProgressProps = {
  totalChallenges: number;
};

export function GameProgressPanel(props: GameProgressProps) {
  const { totalChallenges } = props;
  const { revealedIds, isHydrated } = useGame();
  const completedChallenges = isHydrated ? revealedIds.length : 0;
  const progressValue =
    totalChallenges > 0 ? (completedChallenges / totalChallenges) * 100 : 0;

  return (
    <Panel aria-labelledby="progress-id">
      <div className="flex flex-col gap-12">
        <div className="flex flex-wrap items-center justify-between gap-12">
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
      </div>
    </Panel>
  );
}
