export type Difficulty = "easy" | "medium" | "hard";
export type InstructionType = "default" | "first-time" | "second-time";

export type Challenge = {
  id: string;
  audioSrc: string;
  videoSrc: string;
  instruction: InstructionType;
  difficulty: Difficulty;
  points: number;
};
