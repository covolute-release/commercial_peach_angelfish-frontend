import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

import { badgeColorVariants } from "@/components/badge";
import { cn } from "@/lib/utils";

const iconBadgeVariants = cva("flex items-center justify-center overflow-hidden rounded-md border", {
  variants: {
    size: {
      base: "h-6 w-6",
      large: "h-7 w-7",
    },
  },
});

interface IconBadgeProps
  extends Omit<ComponentPropsWithoutRef<"span">, "color">,
    VariantProps<typeof badgeColorVariants>,
    VariantProps<typeof iconBadgeVariants> {
  asChild?: boolean;
}

const IconBadge = forwardRef<HTMLSpanElement, IconBadgeProps>(
  (
    {
      children,
      className,
      /**
       * The badge's color.
       */
      color = "grey",
      /**
       * The badge's size.
       */
      size = "base",
      /**
       * Whether to remove the wrapper `span` element and use the
       * passed child element instead.
       */
      asChild = false,
      ...props
    }: IconBadgeProps,
    ref,
  ) => {
    const Component = asChild ? Slot.Root : "span";

    return (
      <Component
        ref={ref}
        className={cn(badgeColorVariants({ color }), iconBadgeVariants({ size }), className)}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
IconBadge.displayName = "IconBadge";

export { IconBadge };
