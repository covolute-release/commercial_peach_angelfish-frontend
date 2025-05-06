import type * as React from "react";
import { Toaster as Primitive } from "sonner";

import { cn } from "@/lib/utils";

interface ToasterProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof Primitive>,
    "richColors" | "closeButton" | "icons" | "theme" | "invert" | "loadingIcon" | "cn" | "toastOptions"
  > {}

const Toaster = ({
  /**
   * The position of the created toasts.
   */
  position = "bottom-right",
  /**
   * The gap between the toast components.
   */
  gap = 12,
  /**
   * The space from the edges of the screen.
   */
  offset = 24,
  /**
   * The time in milliseconds that a toast is shown before it's
   * automatically dismissed.
   *
   * @defaultValue 4000
   */
  duration,
  ...props
}: ToasterProps) => {
  return (
    <Primitive
      position={position}
      gap={gap}
      offset={offset}
      cn={cn}
      toastOptions={{
        duration,
      }}
      {...props}
    />
  );
};

export { Toaster };
