"use client";

import { useMemo, useState, type ComponentProps } from "react";
import clsx from "clsx";
import { ChevronDown, ChevronUp } from "lucide-react";

import Button from "@/components/Button";
import Panel from "@/components/Panel";
import { useGame } from "./GameContext";
import { useChallengeParam } from "./useChallengeParam";
import { getChallengeStatus, getChallengeTitle } from "./challengeUtils";
import { Challenge } from "../types";
import { ChallengeStatusTag } from "./ChallengeStatusTag";

type Props = {
  challenges: Challenge[];
  challengeId: string;
};

export function ChallengeList({ challenges, challengeId }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { listenedIds, revealedIds, resetGameState, isHydrated } = useGame();
  const { setChallengeId } = useChallengeParam(challenges[0]?.id ?? "");

  const orderedChallenges = useMemo(() => {
    const effectiveRevealedIds = isHydrated ? revealedIds : [];

    const activeChallenge = challenges.find(
      (challenge) => challenge.id === challengeId,
    );

    const pendingChallenges = challenges.filter(
      (challenge) =>
        challenge.id !== challengeId &&
        !effectiveRevealedIds.includes(challenge.id),
    );

    const revealedChallenges = challenges.filter(
      (challenge) =>
        challenge.id !== challengeId &&
        effectiveRevealedIds.includes(challenge.id),
    );

    return activeChallenge
      ? [activeChallenge, ...pendingChallenges, ...revealedChallenges]
      : [...pendingChallenges, ...revealedChallenges];
  }, [challenges, challengeId, revealedIds, isHydrated]);

  function handleReset() {
    const firstId = challenges[0]?.id ?? "";
    resetGameState();
    setChallengeId(firstId);
  }

  return (
    <Panel asChild className="lg:sticky lg:top-24">
      <aside>
        <div className="flex items-start justify-between gap-16">
          <div>
            <h2 className="text-heading-03">Pruebas</h2>
            <p className="mt-8 text-body-02 text-text-secondary">
              Selecciona una prueba o continúa con la actual.
            </p>
          </div>

          <Button
            type="button"
            kind="secondary"
            size="sm"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>

        <div className="mt-16">
          <Button
            type="button"
            kind="secondary"
            size="sm"
            aria-expanded={isOpen}
            aria-controls="challenge-list"
            onClick={() => setIsOpen((previous) => !previous)}
            className="w-full justify-between"
          >
            {isOpen ? "Ocultar lista" : "Ver lista de pruebas"}
            {isOpen ? (
              <ChevronUp className="size-16" />
            ) : (
              <ChevronDown className="size-16" />
            )}
          </Button>
        </div>

        <div
          id="challenge-list"
          className={clsx("mt-24", {
            hidden: !isOpen,
            block: isOpen,
          })}
        >
          <ul className="flex flex-col gap-12">
            {orderedChallenges.map((challenge) => {
              const isActive = challenge.id === challengeId;
              const isRevealed =
                isHydrated && revealedIds.includes(challenge.id);
              const isListened = listenedIds.includes(challenge.id);

              return (
                <li key={challenge.id}>
                  <ChallengeListItem
                    label={getChallengeTitle(challenges, challenge.id)}
                    status={getChallengeStatus({
                      isActive,
                      isRevealed,
                      isListened,
                    })}
                    onClick={() => setChallengeId(challenge.id)}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </Panel>
  );
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

        <ChallengeStatusTag status={status} />
      </span>
    </button>
  );
}
