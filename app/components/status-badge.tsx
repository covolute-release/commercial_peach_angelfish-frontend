import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";

const statusBadgeVariants = cva(
  "flex items-center justify-center w-5 h-[18px] [&_div]:w-2 [&_div]:h-2 [&_div]:rounded-sm",
  {
    variants: {
      color: {
        green: "[&_div]:bg-ui-tag-green-icon",
        red: "[&_div]:bg-ui-tag-red-icon",
        orange: "[&_div]:bg-ui-tag-orange-icon",
        blue: "[&_div]:bg-ui-tag-blue-icon",
        purple: "[&_div]:bg-ui-tag-purple-icon",
        grey: "[&_div]:bg-ui-tag-neutral-icon",
      },
    },
    defaultVariants: {
      color: "grey",
    },
  },
);

interface StatusBadgeProps
  extends Omit<ComponentPropsWithoutRef<"span">, "color">,
    VariantProps<typeof statusBadgeVariants> {}

const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  (
    {
      children,
      className,
      /**
       * The status's color.
       */
      color = "grey",
      ...props
    }: StatusBadgeProps,
    ref,
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          "txt-compact-xsmall-plus bg-ui-bg-subtle text-ui-fg-subtle border-ui-border-base box-border flex w-fit select-none items-center overflow-hidden rounded-md border pl-0 pr-1 leading-none",
          className,
        )}
        {...props}
      >
        <div role="presentation" className={statusBadgeVariants({ color })}>
          <div />
        </div>
        {children}
      </span>
    );
  },
);
StatusBadge.displayName = "StatusBadge";

export { StatusBadge };
