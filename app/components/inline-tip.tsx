import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

interface InlineTipProps extends ComponentPropsWithoutRef<"div"> {
  label: string;
  variant?: "info" | "warning" | "error" | "success";
}

export const InlineTip = forwardRef<HTMLDivElement, InlineTipProps>(
  (
    {
      /**
       * The variant of the tip.
       */
      variant = "info",
      /**
       * The label to display in the tip.
       */
      label,
      className,
      children,
      ...props
    }: InlineTipProps,
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-ui-bg-component txt-small text-ui-fg-subtle grid grid-cols-[4px_1fr] items-start gap-3 rounded-lg border p-3",
          className,
        )}
        {...props}
      >
        <div
          role="presentation"
          className={cn("bg-ui-tag-neutral-icon h-full w-1 rounded-full", {
            "bg-ui-tag-orange-icon": variant === "warning",
            "bg-ui-tag-red-icon": variant === "error",
            "bg-ui-tag-green-icon": variant === "success",
          })}
        />
        <div className="text-pretty">
          <strong className="txt-small-plus text-ui-fg-base">{label}:</strong> {children}
        </div>
      </div>
    );
  },
);

InlineTip.displayName = "InlineTip";
