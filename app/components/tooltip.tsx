import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type * as React from "react";

import { cn } from "@/lib/utils";

interface TooltipProps
  extends Omit<TooltipPrimitive.TooltipContentProps, "content" | "onClick">,
    Pick<TooltipPrimitive.TooltipProps, "open" | "defaultOpen" | "onOpenChange" | "delayDuration"> {
  content: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  side?: "bottom" | "left" | "top" | "right";
  maxWidth?: number;
}

const Tooltip = ({
  children,
  content,
  open,
  defaultOpen,
  onOpenChange,
  delayDuration,
  /**
   * The maximum width of the tooltip.
   */
  maxWidth = 220,
  className,
  side,
  sideOffset = 8,
  onClick,
  ...props
}: TooltipProps) => {
  return (
    <TooltipPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      delayDuration={delayDuration}
    >
      <TooltipPrimitive.Trigger onClick={onClick} asChild>
        {children}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          sideOffset={sideOffset}
          align="center"
          className={cn(
            "txt-compact-xsmall text-ui-fg-subtle bg-ui-bg-base shadow-elevation-tooltip rounded-lg px-2.5 py-1",
            "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className,
          )}
          {...props}
          style={{ ...props.style, maxWidth }}
        >
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
};

interface TooltipProviderProps extends TooltipPrimitive.TooltipProviderProps {}

const TooltipProvider = ({
  children,
  delayDuration = 100,
  skipDelayDuration = 300,
  ...props
}: TooltipProviderProps) => {
  return (
    <TooltipPrimitive.TooltipProvider delayDuration={delayDuration} skipDelayDuration={skipDelayDuration} {...props}>
      {children}
    </TooltipPrimitive.TooltipProvider>
  );
};

export { Tooltip, TooltipProvider };
