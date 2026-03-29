"use client";

import clsx from "clsx";
import Button from "@/components/Button";
import Panel from "@/components/Panel";
import Tag from "@/components/Tag";

import { useGame } from "./GameContext";
import { useChallengeParam } from "./useChallengeParam";
import { getChallengeTitle } from "./challengeUtils";
import { Challenge } from "../types";
import type { ComponentProps } from "react";

type Props = {
  challenges: Challenge[];
  challengeId: string;
};

export function ChallengeList({ challenges, challengeId }: Props) {
  const { listenedIds, revealedIds, resetGameState } = useGame();
  const { setChallengeId } = useChallengeParam(challenges[0]?.id ?? "");

  function handleReset() {
    const firstId = challenges[0]?.id ?? "";
    resetGameState();
    setChallengeId(firstId);
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
                <ChallengeListItem
                  label={getChallengeTitle(challenges, challenge.id)}
                  status={getStatus({ isActive, isRevealed, isListened })}
                  onClick={() => setChallengeId(challenge.id)}
                />
              </li>
            );
          })}
        </ul>
      </aside>
    </Panel>
  );

  function getStatus(props: {
    isActive: boolean;
    isRevealed: boolean;
    isListened: boolean;
  }) {
    const { isActive, isRevealed, isListened } = props;

    if (isActive) return "active";
    if (isRevealed) return "revealed";
    if (isListened) return "listened";
    else return "pending";
  }
}

type ChallengeListItemProps = ComponentProps<"button"> & {
  label: string;
  status: "active" | "pending" | "revealed" | "listened";
};

export default function ChallengeListItem({
  className,
  label,
  status,
  ...props
}: ChallengeListItemProps) {
  return (
    <button
      type="button"
      className={clsx(
        "cursor-pointer w-full rounded-16 border bg-background px-16 py-16 text-left transition-[background-color,border-color,box-shadow] duration-150",
        {
          "border-accent hover:bg-background-soft/40": status === "active",

          "border-border-soft hover:bg-background-soft/40": status !== "active",
        },
        className,
      )}
      {...props}
    >
      <span className="flex items-center justify-between gap-12">
        <span className="text-compact-01 text-text-primary">{label}</span>

        {status === "active" ? (
          <Tag tone="inverse">Activa</Tag>
        ) : status === "revealed" ? (
          <Tag tone="success">Resuelta</Tag>
        ) : status === "listened" ? (
          <Tag tone="active">Escuchada</Tag>
        ) : (
          <Tag tone="subtle">Pendiente</Tag>
        )}
      </span>
    </button>
  );
}
