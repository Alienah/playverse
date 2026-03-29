"use client";

import clsx from "clsx";
import Button from "@/components/Button";
import Panel from "@/components/Panel";
import Tag from "@/components/Tag";

import { useGame } from "./GameContext";
import { useChallengeParam } from "./useChallengeParam";
import { getChallengeTitle } from "./challengeUtils";
import { Challenge } from "../types";

type Props = {
  challenges: Challenge[];
  challengeId: string;
};

export function ChallengeList({ challenges, challengeId }: Props) {
  const { listenedIds, revealedIds, resetGameState } = useGame();
  const { setChallengeId, resetChallenge } = useChallengeParam(
    challenges[0]?.id ?? "",
  );

  function handleReset() {
    const firstId = challenges[0]?.id ?? "";
    resetGameState();
    resetChallenge(firstId);
  }

  return (
    <Panel asChild className="lg:sticky lg:top-24">
      <aside>
        <div className="flex items-start justify-between gap-16">
          <h2 className="text-heading-03">Pruebas</h2>

          <Button
            type="button"
            kind="secondary"
            size="sm"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>

        <ul className="mt-24 flex flex-col gap-12">
          {challenges.map((challenge) => {
            const isActive = challenge.id === challengeId;
            const isRevealed = revealedIds.includes(challenge.id);
            const isListened = listenedIds.includes(challenge.id);

            return (
              <li key={challenge.id}>
                <button
                  type="button"
                  onClick={() => setChallengeId(challenge.id)}
                  className={clsx(
                    "w-full rounded-16 border bg-background px-16 py-16 text-left transition-[background-color,border-color] duration-150 hover:bg-background-soft/40",
                    {
                      "border-accent": isActive,
                      "border-border-soft": !isActive,
                    },
                  )}
                >
                  <span className="flex items-center justify-between gap-12">
                    <span className="text-compact-01 text-text-primary">
                      {getChallengeTitle(challenges, challenge.id)}
                    </span>

                    {isActive ? (
                      <Tag tone="active">Activa</Tag>
                    ) : isRevealed ? (
                      <Tag tone="success">Resuelta</Tag>
                    ) : isListened ? (
                      <Tag tone="warning">Escuchada</Tag>
                    ) : (
                      <Tag tone="subtle">Pendiente</Tag>
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
    </Panel>
  );
}
