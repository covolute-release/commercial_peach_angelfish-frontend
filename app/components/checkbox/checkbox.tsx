import { CheckMini, MinusMini } from "@medusajs/icons";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";
import type { CheckboxCheckedState } from "./types";

const Checkbox = forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    checked?: CheckboxCheckedState | undefined;
  }
>(({ className, checked, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      {...props}
      ref={ref}
      checked={checked}
      className={cn("group inline-flex h-5 w-5 items-center justify-center outline-none ", className)}
    >
      <div
        className={cn(
          "text-ui-fg-on-inverted bg-ui-bg-base shadow-borders-base [&_path]:shadow-details-contrast-on-bg-interactive transition-fg h-[15px] w-[15px] rounded-[3px]",
          "group-disabled:cursor-not-allowed group-disabled:opacity-50",
          "group-focus-visible:!shadow-borders-interactive-with-focus",
          "group-hover:group-enabled:group-data-[state=unchecked]:bg-ui-bg-base-hover",
          "group-data-[state=checked]:bg-ui-bg-interactive group-data-[state=checked]:shadow-borders-interactive-with-shadow",
          "group-data-[state=indeterminate]:bg-ui-bg-interactive group-data-[state=indeterminate]:shadow-borders-interactive-with-shadow",
        )}
      >
        <CheckboxPrimitive.Indicator>
          {checked === "indeterminate" ? <MinusMini /> : <CheckMini />}
        </CheckboxPrimitive.Indicator>
      </div>
    </CheckboxPrimitive.Root>
  );
});
Checkbox.displayName = "Checkbox";

export { Checkbox };
