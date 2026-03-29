import clsx from "clsx";
import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type CardLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    children: ReactNode;
    className?: string;
    stretched?: boolean;
  };

export default function CardLink({
  children,
  className,
  stretched = false,
  ...props
}: CardLinkProps) {
  return (
    <Link
      {...props}
      className={clsx(
        "pointer-events-auto inline-flex items-center rounded-4 outline-none",
        "transition-[color] duration-150",
        "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        stretched && "after:absolute after:inset-0 after:content-['']",
        className,
      )}
    >
      {children}
    </Link>
  );
}
