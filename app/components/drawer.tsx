import { XMark } from "@medusajs/icons";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ComponentPropsWithoutRef, HTMLAttributes } from "react";
import { forwardRef } from "react";

import { IconButton } from "@/components/icon-button";
import { Kbd } from "@/components/kbd";
import { Text } from "@/components/text";
import { cn } from "@/lib/utils";

interface DrawerRootProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Root> {}

const DrawerRoot = (props: DrawerRootProps) => {
  return <DialogPrimitive.Root {...props} />;
};
DrawerRoot.displayName = "Drawer";

interface DrawerTriggerProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger> {}

/**
 * This component is used to create the trigger button that opens the drawer.
 * It accepts props from the [Radix UI Dialog Trigger](https://www.radix-ui.com/primitives/docs/components/dialog#trigger) component.
 */
const DrawerTrigger = forwardRef<React.ElementRef<typeof DialogPrimitive.Trigger>, DrawerTriggerProps>(
  ({ className, ...props }: DrawerTriggerProps, ref) => {
    return <DialogPrimitive.Trigger ref={ref} className={cn(className)} {...props} />;
  },
);
DrawerTrigger.displayName = "Drawer.Trigger";

interface DrawerCloseProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Close> {}

/**
 * This component is used to create the close button for the drawer.
 * It accepts props from the [Radix UI Dialog Close](https://www.radix-ui.com/primitives/docs/components/dialog#close) component.
 */
const DrawerClose = forwardRef<React.ElementRef<typeof DialogPrimitive.Close>, DrawerCloseProps>(
  ({ className, ...props }: DrawerCloseProps, ref) => {
    return <DialogPrimitive.Close ref={ref} className={cn(className)} {...props} />;
  },
);
DrawerClose.displayName = "Drawer.Close";

interface DrawerPortalProps extends DialogPrimitive.DialogPortalProps {}

/**
 * The `Drawer.Content` component uses this component to wrap the drawer content.
 * It accepts props from the [Radix UI Dialog Portal](https://www.radix-ui.com/primitives/docs/components/dialog#portal) component.
 */
const DrawerPortal = (props: DrawerPortalProps) => {
  return <DialogPrimitive.DialogPortal {...props} />;
};
DrawerPortal.displayName = "Drawer.Portal";

interface DrawerOverlayProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> {}

/**
 * This component is used to create the overlay for the drawer.
 * It accepts props from the [Radix UI Dialog Overlay](https://www.radix-ui.com/primitives/docs/components/dialog#overlay) component.
 */
const DrawerOverlay = forwardRef<React.ElementRef<typeof DialogPrimitive.Overlay>, DrawerOverlayProps>(
  ({ className, ...props }: DrawerOverlayProps, ref) => {
    return (
      <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
          "bg-ui-bg-overlay fixed inset-0",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          className,
        )}
        {...props}
      />
    );
  },
);
DrawerOverlay.displayName = "Drawer.Overlay";

interface DrawerContentProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  /**
   * Props for the overlay component.
   * It accepts props from the [Radix UI Dialog Overlay](https://www.radix-ui.com/primitives/docs/components/dialog#overlay) component.
   */
  overlayProps?: ComponentPropsWithoutRef<typeof DrawerOverlay>;
  /**
   * Props for the portal component that wraps the drawer content.
   * It accepts props from the [Radix UI Dialog Portal](https://www.radix-ui.com/primitives/docs/components/dialog#portal) component.
   */
  portalProps?: ComponentPropsWithoutRef<typeof DrawerPortal>;
}

/**
 * This component wraps the content of the drawer.
 * It accepts props from the [Radix UI Dialog Content](https://www.radix-ui.com/primitives/docs/components/dialog#content) component.
 */
const DrawerContent = forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, DrawerContentProps>(
  ({ className, overlayProps, portalProps, ...props }: DrawerContentProps, ref) => {
    return (
      <DrawerPortal {...portalProps}>
        <DrawerOverlay {...overlayProps} />
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            "bg-ui-bg-base shadow-elevation-modal border-ui-border-base fixed inset-y-2 flex w-full flex-1 flex-col rounded-lg border outline-none max-sm:inset-x-2 max-sm:w-[calc(100%-16px)] sm:right-2 sm:max-w-[560px]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-right-1/2 data-[state=open]:slide-in-from-right-1/2 duration-200",
            className,
          )}
          {...props}
        />
      </DrawerPortal>
    );
  },
);
DrawerContent.displayName = "Drawer.Content";

interface DrawerHeaderProps extends ComponentPropsWithoutRef<"div"> {}

const DrawerHeader = forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ children, className, ...props }: DrawerHeaderProps, ref) => {
    return (
      <div
        ref={ref}
        className="border-ui-border-base flex items-start justify-between gap-x-4 border-b px-6 py-4"
        {...props}
      >
        <div className={cn("flex flex-col gap-y-1", className)}>{children}</div>
        <div className="flex items-center gap-x-2">
          <Kbd>esc</Kbd>
          <DialogPrimitive.Close asChild>
            <IconButton size="small" type="button" variant="transparent">
              <XMark />
            </IconButton>
          </DialogPrimitive.Close>
        </div>
      </div>
    );
  },
);
DrawerHeader.displayName = "Drawer.Header";

interface DrawerBodyProps extends ComponentPropsWithoutRef<"div"> {}

const DrawerBody = forwardRef<HTMLDivElement, DrawerBodyProps>(({ className, ...props }: DrawerBodyProps, ref) => {
  return <div ref={ref} className={cn("flex-1 px-6 py-4", className)} {...props} />;
});
DrawerBody.displayName = "Drawer.Body";

interface DrawerFooterProps extends HTMLAttributes<HTMLDivElement> {}

const DrawerFooter = ({ className, ...props }: DrawerFooterProps) => {
  return (
    <div
      className={cn(
        "border-ui-border-base flex items-center justify-end space-x-2 overflow-y-auto border-t px-6 py-4",
        className,
      )}
      {...props}
    />
  );
};
DrawerFooter.displayName = "Drawer.Footer";

/**
 * This component adds an accessible title to the drawer.
 * It accepts props from the [Radix UI Dialog Title](https://www.radix-ui.com/primitives/docs/components/dialog#title) component.
 */
const DrawerTitle = DialogPrimitive.Title;
DrawerTitle.displayName = "Drawer.Title";

interface DrawerDescriptionProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {}

/**
 * This component adds accessible description to the drawer.
 * It accepts props from the [Radix UI Dialog Description](https://www.radix-ui.com/primitives/docs/components/dialog#description) component.
 */
const DrawerDescription = forwardRef<React.ElementRef<typeof DialogPrimitive.Description>, DrawerDescriptionProps>(
  ({ className, children, ...props }: DrawerDescriptionProps, ref) => (
    <DialogPrimitive.Description ref={ref} className={cn(className)} asChild {...props}>
      <Text>{children}</Text>
    </DialogPrimitive.Description>
  ),
);
DrawerDescription.displayName = "Drawer.Description";

const Drawer = Object.assign(DrawerRoot, {
  Body: DrawerBody,
  Close: DrawerClose,
  Content: DrawerContent,
  Description: DrawerDescription,
  Footer: DrawerFooter,
  Header: DrawerHeader,
  Title: DrawerTitle,
  Trigger: DrawerTrigger,
});

export { Drawer };
