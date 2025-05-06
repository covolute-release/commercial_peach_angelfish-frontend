import { cn } from "@/lib/utils";
import type * as React from "react";

interface DividerProps extends Omit<React.ComponentPropsWithoutRef<"div">, "children"> {
  orientation?: "horizontal" | "vertical";
  variant?: "dashed" | "solid";
}

export const Divider = ({ orientation = "horizontal", variant = "solid", className, ...props }: DividerProps) => {
  return (
    <div
      aria-orientation={orientation}
      role="separator"
      className={cn(
        "border-ui-border-base",
        {
          "w-full border-t": orientation === "horizontal" && variant === "solid",
          "h-full border-l": orientation === "vertical" && variant === "solid",
          "bg-transparent": variant === "dashed",
          "h-px w-full bg-[linear-gradient(90deg,var(--border-strong)_1px,transparent_1px)] bg-[length:4px_1px]":
            variant === "dashed" && orientation === "horizontal",
          "h-full w-px bg-[linear-gradient(0deg,var(--border-strong)_1px,transparent_1px)] bg-[length:1px_4px]":
            variant === "dashed" && orientation === "vertical",
        },
        className,
      )}
      {...props}
    />
  );
};
