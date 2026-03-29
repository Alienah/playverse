import type { StaticImageData } from "next/image";
import Image from "next/image";
import type { ComponentProps, ReactNode } from "react";
import CardLink from "./CardLink";
import { cn } from "@/app/utils/cn";

type FeatureCardProps = {
  children: ReactNode;
  className?: string;
  eyebrow?: ReactNode;
  title: string;
  link?: Omit<ComponentProps<typeof CardLink>, "children">;
  ctaLabel?: string;
  image?: {
    alt?: string;
    src: StaticImageData | string;
  };
};

export default function FeatureCard(props: FeatureCardProps) {
  const { children, className, eyebrow, title, link, ctaLabel, image } = props;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-24 border border-border-soft bg-surface shadow-sm",
        "transition-[background-color,border-color,box-shadow] duration-150",
        "hover:bg-background-soft/40 hover:border-text-muted hover:shadow-md",
        "focus-within:bg-background-soft/40 focus-within:border-accent focus-within:shadow-md",
        link?.href && "cursor-pointer",
        className,
      )}
    >
      {image ? (
        <div className="overflow-hidden">
          <Image
            src={image.src}
            alt={image.alt ?? ""}
            className="h-auto w-full object-cover"
          />
        </div>
      ) : null}

      <div className="flex h-full flex-col gap-8 p-24">
        {eyebrow ? (
          <p className="text-compact-02 text-text-muted">{eyebrow}</p>
        ) : null}

        <h2 className="text-heading-03">
          {link?.href ? (
            <CardLink
              {...link}
              stretched
              className={cn(
                "text-text-primary group-hover:text-layer",
                link.className,
              )}
            >
              {title}
            </CardLink>
          ) : (
            title
          )}
        </h2>

        <p className="text-body-02 text-text-secondary">{children}</p>

        {link?.href && ctaLabel ? (
          <p className="mt-auto text-compact-01 text-text-muted transition-[color] duration-150 group-hover:text-text-primary group-focus-within:text-text-primary">
            {ctaLabel}
          </p>
        ) : null}
      </div>
    </article>
  );
}
