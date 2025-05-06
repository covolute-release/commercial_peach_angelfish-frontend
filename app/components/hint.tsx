import { ExclamationCircleSolid } from "@medusajs/icons";
import { type VariantProps, cva } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

const hintVariants = cva("txt-small", {
  variants: {
    variant: {
      info: "text-ui-fg-subtle",
      error: "text-ui-fg-error grid grid-cols-[20px_1fr] gap-1 items-start",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

interface HintProps extends VariantProps<typeof hintVariants>, ComponentPropsWithoutRef<"span"> {}

const Hint = forwardRef<HTMLSpanElement, HintProps>(
  (
    {
      className,
      /**
       * The hint's style.
       */
      variant = "info",
      children,
      ...props
    }: HintProps,
    ref,
  ) => {
    return (
      <span ref={ref} className={cn(hintVariants({ variant }), className)} {...props}>
        {variant === "error" && (
          <div className="size-5 flex items-center justify-center">
            <ExclamationCircleSolid />
          </div>
        )}
        {children}
      </span>
    );
  },
);
Hint.displayName = "Hint";

export { Hint };
