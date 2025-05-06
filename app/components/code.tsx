import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const Code = forwardRef<HTMLElement, React.ComponentPropsWithoutRef<"code">>(({ className, ...props }, ref) => {
  return (
    <code
      ref={ref}
      className={cn(
        "border-ui-tag-neutral-border bg-ui-tag-neutral-bg text-ui-tag-neutral-text txt-compact-small inline-flex rounded-md border px-[6px] font-mono",
        className,
      )}
      {...props}
    />
  );
});

Code.displayName = "Code";

export { Code };
