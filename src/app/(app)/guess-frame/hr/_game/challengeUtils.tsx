import { Challenge } from "../types";
import { ChallengeResults } from "./GameContext";

export function formatTime(value: number) {
  if (!Number.isFinite(value) || value < 0) return "00:00";

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function getInstructionContent(instruction: Challenge["instruction"]) {
  switch (instruction) {
    case "first-time":
      return (
        <>
          ¿En qué escena aparece <b>por primera vez</b> este fragmento?
        </>
      );
    case "second-time":
      return (
        <>
          ¿En qué escena aparece <b>por segunda vez</b> este fragmento?
        </>
      );
    case "default":
    default:
      return <>¿En qué escena aparece este fragmento?</>;
  }
}

export function getDifficultyTagTone(difficulty: Challenge["difficulty"]) {
  switch (difficulty) {
    case "easy":
      return "easy";
    case "medium":
      return "medium";
    case "hard":
      return "hard";
    default:
      return "subtle";
  }
}

export type ChallengeStatus = "active" | "pending" | "revealed" | "listened";

export function getChallengeStatus(props: {
  isActive?: boolean;
  isRevealed?: boolean;
  isListened?: boolean;
}): ChallengeStatus {
  const { isActive, isRevealed, isListened } = props;
  if (isActive) return "active";
  if (isRevealed) return "revealed";
  if (isListened) return "listened";
  else return "pending";
}

export function getChallengeTitle(challenges: Challenge[], currentId: string) {
  if (!currentId) return "";

  return `Prueba ${String(
    challenges.findIndex((challenge) => challenge.id === currentId) + 1,
  ).padStart(2, "0")}`;
}

export function getScore(
  challenges: Challenge[],
  challengeResults: ChallengeResults,
) {
  let score = 0;

  for (const challenge of challenges) {
    if (
      challengeResults[challenge.id] === "correct" &&
      typeof challenge.points === "number"
    ) {
      score += challenge.points;
    }
  }
  return score;
}

export function getTotalPossibleScore(challenges: Challenge[]) {
  let total = 0;

  for (const challenge of challenges) {
    if (typeof challenge.points === "number") {
      total += challenge.points;
    }
  }

  return total;
}
