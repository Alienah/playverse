import type { ComponentProps } from "react";
import clsx from "clsx";
import { Slot } from "@radix-ui/react-slot";

type PanelProps = ComponentProps<"section"> & {
  padding?: "none" | "md";
  asChild?: boolean;
};

export default function Panel({
  className,
  padding = "md",
  asChild = false,
  ...props
}: PanelProps) {
  const Comp = asChild ? Slot : "section";
  return (
    <Comp
      className={clsx(
        "rounded-24 border border-border-soft bg-surface shadow-sm",
        {
          "p-24": padding === "md",
        },
        className,
      )}
      {...props}
    />
  );
}
