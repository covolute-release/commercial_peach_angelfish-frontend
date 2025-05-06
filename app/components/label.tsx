import { cva, type VariantProps } from "class-variance-authority";
import * as LabelPrimitive from "@radix-ui/react-label";
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

const labelVariants = cva("font-sans", {
  variants: {
    size: {
      xsmall: "txt-compact-xsmall",
      small: "txt-compact-small",
      base: "txt-compact-medium",
      large: "txt-compact-large",
    },
    weight: {
      regular: "font-normal",
      plus: "font-medium",
    },
  },
  defaultVariants: {
    size: "base",
    weight: "regular",
  },
});

interface LabelProps extends ComponentPropsWithoutRef<"label">, VariantProps<typeof labelVariants> {}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      className,
      /**
       * The label's size.
       */
      size = "base",
      /**
       * The label's font weight.
       */
      weight = "regular",
      ...props
    }: LabelProps,
    ref,
  ) => {
    return <LabelPrimitive.Root ref={ref} className={cn(labelVariants({ size, weight }), className)} {...props} />;
  },
);
Label.displayName = "Label";

export { Label };
