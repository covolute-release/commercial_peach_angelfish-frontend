import { CheckCircleSolid, CircleDottedLine, CircleHalfSolid, Plus } from "@medusajs/icons";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef, useMemo } from "react";

import type { ProgressStatus } from "@/types";
import { cn } from "@/lib/utils";
import { IconButton } from "./icon-button";

const Root = (props: ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>) => {
  return <AccordionPrimitive.Root {...props} />;
};
Root.displayName = "ProgressAccordion";

const Item = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn("border-ui-border-base border-b last-of-type:border-b-0", className)}
      {...props}
    />
  );
});
Item.displayName = "ProgressAccordion.Item";

interface HeaderProps extends ComponentPropsWithoutRef<typeof AccordionPrimitive.Header> {
  status?: ProgressStatus;
}

interface StatusIndicatorProps extends ComponentPropsWithoutRef<"span"> {
  status: ProgressStatus;
}

const ProgressIndicator = ({
  /**
   * The current status.
   */
  status,
  ...props
}: StatusIndicatorProps) => {
  const Icon = useMemo(() => {
    switch (status) {
      case "not-started":
        return CircleDottedLine;
      case "in-progress":
        return CircleHalfSolid;
      case "completed":
        return CheckCircleSolid;
      default:
        return CircleDottedLine;
    }
  }, [status]);

  return (
    <span
      className="text-ui-fg-muted group-data-[state=open]:text-ui-fg-interactive flex h-12 w-12 items-center justify-center"
      {...props}
    >
      <Icon />
    </span>
  );
};
ProgressIndicator.displayName = "ProgressAccordion.ProgressIndicator";

const Header = forwardRef<React.ElementRef<typeof AccordionPrimitive.Header>, HeaderProps>(
  (
    {
      className,
      /**
       * The current status.
       */
      status = "not-started",
      children,
      ...props
    }: HeaderProps,
    ref,
  ) => {
    return (
      <AccordionPrimitive.Header
        ref={ref}
        className={cn("h3-core text-ui-fg-base group flex w-full flex-1 items-center gap-4 px-6", className)}
        {...props}
      >
        <ProgressIndicator status={status} />
        {children}
        <AccordionPrimitive.Trigger asChild className="ml-auto">
          <IconButton variant="transparent">
            <Plus className="transform transition-transform group-data-[state=open]:rotate-45" />
          </IconButton>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    );
  },
);
Header.displayName = "ProgressAccordion.Header";

const Content = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, ...props }, ref) => {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        "overflow-hidden",
        "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down pl-[88px] pr-6",
        className,
      )}
      {...props}
    />
  );
});
Content.displayName = "ProgressAccordion.Content";

const ProgressAccordion = Object.assign(Root, {
  Item,
  Header,
  Content,
});

export { ProgressAccordion };
