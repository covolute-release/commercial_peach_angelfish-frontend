import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import type { PropsWithChildren, ComponentPropsWithoutRef, HTMLAttributes } from "react";
import { createContext, useContext, forwardRef } from "react";

import { Button } from "@/components/button";
import { Heading } from "@/components/heading";
import { cn } from "@/lib/utils";

type PromptVariant = "danger" | "confirmation";

const PromptContext = createContext<{ variant: PromptVariant }>({
  variant: "danger",
});

const usePromptContext = () => {
  const context = useContext(PromptContext);
  if (!context) {
    throw new Error("usePromptContext must be used within a PromptProvider");
  }
  return context;
};

type PromptProviderProps = PropsWithChildren<{
  variant: PromptVariant;
}>;

const PromptProvider = ({ variant, children }: PromptProviderProps) => {
  return <PromptContext.Provider value={{ variant }}>{children}</PromptContext.Provider>;
};

const Root = ({
  /**
   * The variant of the prompt.
   */
  variant = "danger",
  ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Root> & {
  variant?: PromptVariant;
}) => {
  return (
    <PromptProvider variant={variant}>
      <AlertDialogPrimitive.Root {...props} />
    </PromptProvider>
  );
};
Root.displayName = "Prompt";

const Trigger = AlertDialogPrimitive.Trigger;
Trigger.displayName = "Prompt.Trigger";

const Portal = (props: AlertDialogPrimitive.AlertDialogPortalProps) => {
  return <AlertDialogPrimitive.AlertDialogPortal {...props} />;
};
Portal.displayName = "Prompt.Portal";

const Overlay = forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Overlay
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
Overlay.displayName = "Prompt.Overlay";

const Title = forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  Omit<React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>, "asChild">
>(({ className, children, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Title ref={ref} className={cn(className)} {...props} asChild>
      <Heading level="h2" className="text-ui-fg-base">
        {children}
      </Heading>
    </AlertDialogPrimitive.Title>
  );
});
Title.displayName = "Prompt.Title";

const Content = forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => {
  return (
    <Portal>
      <Overlay />
      <AlertDialogPrimitive.Content
        ref={ref}
        className={cn(
          "bg-ui-bg-base shadow-elevation-flyout fixed left-[50%] top-[50%] flex w-full max-w-[400px] translate-x-[-50%] translate-y-[-50%] flex-col rounded-lg border focus-visible:outline-none",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] duration-200",
          className,
        )}
        {...props}
      />
    </Portal>
  );
});
Content.displayName = "Prompt.Content";

const Description = forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Description
      ref={ref}
      className={cn("text-ui-fg-subtle txt-compact-medium", className)}
      {...props}
    />
  );
});
Description.displayName = "Prompt.Description";

const Action = forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  Omit<React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>, "asChild">
>(({ className, children, type, ...props }, ref) => {
  const { variant } = usePromptContext();

  return (
    <AlertDialogPrimitive.Action ref={ref} className={className} {...props} asChild>
      <Button size="small" type={type} variant={variant === "danger" ? "danger" : "primary"}>
        {children}
      </Button>
    </AlertDialogPrimitive.Action>
  );
});
Action.displayName = "Prompt.Action";

const Cancel = forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  Omit<React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>, "asChild">
>(({ className, children, ...props }, ref) => {
  return (
    <AlertDialogPrimitive.Cancel ref={ref} className={cn(className)} {...props} asChild>
      <Button size="small" variant="secondary">
        {children}
      </Button>
    </AlertDialogPrimitive.Cancel>
  );
});
Cancel.displayName = "Prompt.Cancel";

const Header = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn("flex flex-col gap-y-1 px-6 pt-6", className)} {...props} />;
};
Header.displayName = "Prompt.Header";

const Footer = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn("flex items-center justify-end gap-x-2 p-6", className)} {...props} />;
};
Footer.displayName = "Prompt.Footer";

const Prompt = Object.assign(Root, {
  Trigger,
  Content,
  Title,
  Description,
  Action,
  Cancel,
  Header,
  Footer,
});

export { Prompt };
