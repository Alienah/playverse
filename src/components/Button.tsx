import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";

import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & {
  kind?: "primary" | "secondary" | "ghost" | "inverse";
  size?: "sm" | "md" | "icon";
  asChild?: boolean;
};

export default function Button({
  className,
  kind = "primary",
  size = "md",
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={clsx(
        "cursor-pointer inline-flex items-center justify-center gap-8 rounded outline-none transition duration-150 disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",

        // 🎯 KIND
        {
          "bg-accent text-text-primary font-semibold hover:brightness-110":
            kind === "primary",
          "border border-border-soft bg-background text-text-primary hover:bg-background-soft/40":
            kind === "secondary",
          "text-text-primary hover:bg-background-soft/40": kind === "ghost",
          "bg-layer text-text-inverse hover:brightness-110": kind === "inverse",
        },

        // 📏 SIZE
        {
          "px-16 py-4 text-body-02": size === "sm",
          "px-24 py-8 text-body-01": size === "md",
          "h-40 w-40": size === "icon",
        },

        className,
      )}
      {...props}
    />
  );
}
