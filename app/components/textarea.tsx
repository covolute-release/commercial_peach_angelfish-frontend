import { forwardRef } from "react";

import { inputBaseStyles } from "@/components/input";
import { cn } from "@/lib/utils";

const Textarea = forwardRef<HTMLTextAreaElement, React.ComponentPropsWithoutRef<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(inputBaseStyles, "txt-small min-h-[60px] w-full px-2 py-1.5", className)}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
