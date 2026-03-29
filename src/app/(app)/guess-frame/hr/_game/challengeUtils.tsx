import { Challenge } from "../types";

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
    case "hard":
      return "inverse";
    case "medium":
      return "warning";
    case "easy":
    default:
      return "subtle";
  }
}

export function getChallengeTitle(challenges: Challenge[], currentId: string) {
  if (!currentId) return "";

  return `Prueba ${String(
    challenges.findIndex((challenge) => challenge.id === currentId) + 1,
  ).padStart(2, "0")}`;
}
