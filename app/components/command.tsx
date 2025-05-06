import { Copy } from "@/components/copy";
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

const CommandComponent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "bg-ui-contrast-bg-base shadow-elevation-code-block flex items-center rounded-lg px-4 py-1.5",
        "[&>code]:text-ui-contrast-fg-primary [&>code]:code-body [&>code]:mx-2",
        className,
      )}
      {...props}
    />
  );
};
CommandComponent.displayName = "Command";

const CommandCopy = forwardRef<React.ElementRef<typeof Copy>, React.ComponentPropsWithoutRef<typeof Copy>>(
  ({ className, ...props }, ref) => {
    return <Copy {...props} ref={ref} className={cn("!text-ui-contrast-fg-secondary ml-auto", className)} />;
  },
);
CommandCopy.displayName = "Command.Copy";

const Command = Object.assign(CommandComponent, { Copy: CommandCopy });

export { Command };
