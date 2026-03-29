import type { ComponentProps } from "react";
import clsx from "clsx";
import Tag from "@/components/Tag";

type ChallengeListItemProps = ComponentProps<"button"> & {
  label: string;
  status: "active" | "pending" | "completed";
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
        "w-full rounded-16 border bg-background px-16 py-16 text-left transition-[background-color,border-color,box-shadow] duration-150",
        {
          "border-accent hover:bg-background-soft/40": status === "active",

          "border-border-soft hover:bg-background-soft/40":
            status === "pending" || status === "completed",
        },
        className,
      )}
      {...props}
    >
      <span className="flex items-center justify-between gap-12">
        <span className="text-compact-01 text-text-primary">{label}</span>

        {status === "active" && <Tag tone="active">Activa</Tag>}
        {status === "pending" && <Tag tone="subtle">Pendiente</Tag>}
        {status === "completed" && <Tag tone="success">Completada</Tag>}
      </span>
    </button>
  );
}
