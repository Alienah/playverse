import type { ComponentProps } from "react";
import clsx from "clsx";

export type TagProps = ComponentProps<"span"> & {
  tone?:
    | "subtle"
    | "active"
    | "success"
    | "warning"
    | "inverse"
    | "highlight"
    | "easy"
    | "medium"
    | "hard";
};

export default function Tag({
  className,
  tone = "subtle",
  ...props
}: TagProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-16 py-4 text-helper",
        {
          "bg-tag-subtle-bg text-tag-subtle-text border-tag-subtle-border":
            tone === "subtle",
          "bg-tag-active-bg text-tag-active-text border-tag-active-border":
            tone === "active",
          "bg-tag-success-bg text-tag-success-text border-tag-success-border":
            tone === "success",
          "bg-tag-warning-bg text-tag-warning-text border-tag-warning-border":
            tone === "warning",
          "bg-tag-inverse-bg text-tag-inverse-text border-tag-inverse-border":
            tone === "inverse",
          "bg-tag-highlight-bg text-tag-highlighttext border-tag-inverse-border":
            tone === "inverse",
          "bg-tag-easy-bg text-tag-easy-text border-tag-easy-border":
            tone === "easy",
          "bg-tag-medium-bg text-tag-medium-text border-tag-medium-border":
            tone === "medium",
          "bg-tag-hard-bg text-tag-hard-text border-tag-hard-border":
            tone === "hard",
        },
        className,
      )}
      {...props}
    />
  );
}
