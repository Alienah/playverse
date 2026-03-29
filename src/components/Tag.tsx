import type { ComponentProps } from "react";
import clsx from "clsx";

type TagProps = ComponentProps<"span"> & {
  tone?: "subtle" | "active" | "success" | "warning" | "inverse";
};

export default function Tag({
  className,
  tone = "subtle",
  ...props
}: TagProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-16 py-4 text-helper border",
        {
          // TODO: Change active, use highlight with the inverse and
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
        },
        className,
      )}
      {...props}
    />
  );
}
