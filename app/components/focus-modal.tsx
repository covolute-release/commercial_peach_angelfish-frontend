import { XMark } from "@medusajs/icons";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

import { IconButton } from "@/components/icon-button";
import { Kbd } from "@/components/kbd";
import { cn } from "@/lib/utils";

/**
 * @prop defaultOpen - Whether the modal is opened by default.
 * @prop open - Whether the modal is opened.
 * @prop onOpenChange - A function to handle when the modal is opened or closed.
 */
interface FocusModalRootProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Root> {}

const FocusModalRoot = (props: FocusModalRootProps) => {
  return <DialogPrimitive.Root {...props} />;
};
FocusModalRoot.displayName = "FocusModal";

interface FocusModalTriggerProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger> {}

const FocusModalTrigger = forwardRef<React.ElementRef<typeof DialogPrimitive.Trigger>, FocusModalTriggerProps>(
  (props: FocusModalTriggerProps, ref) => {
    return <DialogPrimitive.Trigger ref={ref} {...props} />;
  },
);
FocusModalTrigger.displayName = "FocusModal.Trigger";

const FocusModalClose = DialogPrimitive.Close;
FocusModalClose.displayName = "FocusModal.Close";

interface FocusModalPortalProps extends DialogPrimitive.DialogPortalProps {}

const FocusModalPortal = (props: FocusModalPortalProps) => {
  return <DialogPrimitive.DialogPortal {...props} />;
};
FocusModalPortal.displayName = "FocusModal.Portal";

const FocusModalOverlay = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
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
});
FocusModalOverlay.displayName = "FocusModal.Overlay";

const FocusModalContent = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    overlayProps?: React.ComponentPropsWithoutRef<typeof FocusModalOverlay>;
    portalProps?: React.ComponentPropsWithoutRef<typeof FocusModalPortal>;
  }
>(({ className, overlayProps, portalProps, ...props }, ref) => {
  return (
    <FocusModalPortal {...portalProps}>
      <FocusModalOverlay {...overlayProps} />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "bg-ui-bg-base shadow-elevation-modal fixed inset-2 flex flex-col overflow-hidden rounded-lg border outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-bottom-0 data-[state=closed]:slide-in-from-bottom-2  duration-200",
          className,
        )}
        {...props}
      />
    </FocusModalPortal>
  );
});
FocusModalContent.displayName = "FocusModal.Content";

const FocusModalHeader = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("border-ui-border-base flex items-center justify-between gap-x-4 border-b px-4 py-2", className)}
        {...props}
      >
        <div className="flex items-center gap-x-2">
          <DialogPrimitive.Close asChild>
            <IconButton size="small" type="button" variant="transparent">
              <XMark />
            </IconButton>
          </DialogPrimitive.Close>
          <Kbd>esc</Kbd>
        </div>
        {children}
      </div>
    );
  },
);
FocusModalHeader.displayName = "FocusModal.Header";

const FocusModalFooter = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("border-ui-border-base flex items-center justify-end gap-x-2 border-t p-4", className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
FocusModalFooter.displayName = "FocusModal.Footer";

interface FocusModalTitleProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {}

const FocusModalTitle = forwardRef<HTMLHeadingElement, FocusModalTitleProps>(
  ({ className, ...props }: FocusModalTitleProps, ref) => {
    return <DialogPrimitive.Title ref={ref} {...props} />;
  },
);
FocusModalTitle.displayName = "FocusModal.Title";

const FocusModalDescription = DialogPrimitive.Description;
FocusModalDescription.displayName = "FocusModal.Description";

const FocusModalBody = forwardRef<HTMLDivElement, React.ComponentPropsWithoutRef<"div">>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("flex-1", className)} {...props} />;
  },
);
FocusModalBody.displayName = "FocusModal.Body";

const FocusModal = Object.assign(FocusModalRoot, {
  Trigger: FocusModalTrigger,
  Title: FocusModalTitle,
  Description: FocusModalDescription,
  Content: FocusModalContent,
  Header: FocusModalHeader,
  Body: FocusModalBody,
  Close: FocusModalClose,
  Footer: FocusModalFooter,
});

export { FocusModal };
