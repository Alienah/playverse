import Tag, { TagProps } from "@/components/Tag";
import { ChallengeStatus } from "./challengeUtils";

export type StatusTagProps = {
  status: ChallengeStatus;
};

export function ChallengeStatusTag(props: StatusTagProps) {
  const { status } = props;
  const tagInfo = statusToTagInfo(status);

  return <Tag tone={tagInfo.tone}>{tagInfo.label}</Tag>;
}

function statusToTagInfo(status: StatusTagProps["status"]): {
  tone: TagProps["tone"];
  label: "Activa" | "Pendiente" | "Escuchada" | "Resuelta";
} {
  if (status === "active") return { tone: "active", label: "Activa" };
  if (status === "listened") return { tone: "success", label: "Escuchada" };
  if (status === "revealed") return { tone: "success", label: "Resuelta" };
  return { tone: "subtle", label: "Pendiente" };
}
