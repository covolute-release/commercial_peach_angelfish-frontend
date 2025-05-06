import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

const Root = (props: ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>) => {
  return <PopoverPrimitive.Root {...props} />;
};
Root.displayName = "Popover";

const Trigger = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>
>((props, ref) => {
  return <PopoverPrimitive.Trigger ref={ref} {...props} />;
});
Trigger.displayName = "Popover.Trigger";

const Anchor = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Anchor>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Anchor>
>((props, ref) => {
  return <PopoverPrimitive.Anchor ref={ref} {...props} />;
});
Anchor.displayName = "Popover.Anchor";

const Close = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Close>
>((props, ref) => {
  return <PopoverPrimitive.Close ref={ref} {...props} />;
});
Close.displayName = "Popover.Close";

interface ContentProps extends ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {}

/**
 * @excludeExternal
 */
const Content = forwardRef<React.ElementRef<typeof PopoverPrimitive.Content>, ContentProps>(
  (
    {
      className,
      /**
       * The distance in pixels from the anchor.
       */
      sideOffset = 8,
      /**
       * The preferred side of the anchor to render against when open.
       * Will be reversed when collisions occur and `avoidCollisions` is enabled.
       */
      side = "bottom",
      /**
       * The preferred alignment against the anchor. May change when collisions occur.
       */
      align = "start",
      collisionPadding,
      ...props
    }: ContentProps,
    ref,
  ) => {
    return (
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          ref={ref}
          sideOffset={sideOffset}
          side={side}
          align={align}
          collisionPadding={collisionPadding}
          className={cn(
            "bg-ui-bg-base text-ui-fg-base shadow-elevation-flyout max-h-[var(--radix-popper-available-height)] min-w-[220px] overflow-hidden rounded-lg p-1",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className,
          )}
          {...props}
        />
      </PopoverPrimitive.Portal>
    );
  },
);
Content.displayName = "Popover.Content";

const Seperator = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("bg-ui-border-base -mx-1 my-1 h-px", className)} {...props} />;
});
Seperator.displayName = "Popover.Seperator";

const Popover = Object.assign(Root, {
  Trigger,
  Anchor,
  Close,
  Content,
  Seperator,
});

export { Popover };
