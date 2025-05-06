import { type VariantProps, cva } from "class-variance-authority";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

const switchVariants = cva(
  "bg-ui-bg-switch-off hover:bg-ui-bg-switch-off-hover data-[state=unchecked]:hover:after:bg-switch-off-hover-gradient before:shadow-details-switch-background focus-visible:shadow-details-switch-background-focus data-[state=checked]:bg-ui-bg-interactive disabled:opacity-50 group relative inline-flex items-center rounded-full outline-none transition-all before:absolute before:inset-0 before:rounded-full before:content-[''] after:absolute after:inset-0 after:rounded-full after:content-[''] disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        small: "h-[16px] w-[28px]",
        base: "h-[18px] w-[32px]",
      },
    },
    defaultVariants: {
      size: "base",
    },
  },
);

const thumbVariants = cva(
  "bg-ui-fg-on-color shadow-details-switch-handle pointer-events-none h-[14px] w-[14px] rounded-full transition-all",
  {
    variants: {
      size: {
        small: "h-[12px] w-[12px] data-[state=checked]:translate-x-3.5 data-[state=unchecked]:translate-x-0.5",
        base: "h-[14px] w-[14px] transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0.5",
      },
    },
    defaultVariants: {
      size: "base",
    },
  },
);

interface SwitchProps
  extends Omit<ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>, "asChild">,
    VariantProps<typeof switchVariants> {}

const Switch = forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(
  (
    {
      className,
      /**
       * The switch's size.
       */
      size = "base",
      ...props
    }: SwitchProps,
    ref,
  ) => (
    <SwitchPrimitive.Root className={cn(switchVariants({ size }), className)} {...props} ref={ref}>
      <SwitchPrimitive.Thumb className={cn(thumbVariants({ size }))} />
    </SwitchPrimitive.Root>
  ),
);
Switch.displayName = "Switch";

export { Switch };
