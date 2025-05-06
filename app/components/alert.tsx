import { cn } from "@/lib/utils";
import {
  CheckCircleSolid,
  ExclamationCircleSolid,
  InformationCircleSolid,
  XCircleSolid,
  XMarkMini,
} from "@medusajs/icons";
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef, useState } from "react";

import { IconButton } from "@/components/icon-button";

interface AlertProps extends ComponentPropsWithoutRef<"div"> {
  variant?: "error" | "success" | "warning" | "info";
  dismissible?: boolean;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      /**
       * The variant of the alert
       */
      variant = "info",
      /**
       * Whether the alert is dismissible
       */
      dismissible = false,
      className,
      children,
      ...props
    }: AlertProps,
    ref,
  ) => {
    const [dismissed, setDismissed] = useState(false);

    const Icon = {
      info: InformationCircleSolid,
      error: XCircleSolid,
      success: CheckCircleSolid,
      warning: ExclamationCircleSolid,
    }[variant];

    const handleDismiss = () => {
      setDismissed(true);
    };

    if (dismissed) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          "bg-ui-bg-subtle text-pretty txt-compact-small grid items-start gap-x-2 rounded-lg border p-3",
          {
            "grid-cols-[20px_1fr]": !dismissible,
            "grid-cols-[20px_1fr_20px]": dismissible,
          },
          className,
        )}
        {...props}
      >
        <Icon
          className={cn({
            "text-ui-tag-red-icon": variant === "error",
            "text-ui-tag-green-icon": variant === "success",
            "text-ui-tag-orange-icon": variant === "warning",
            "text-ui-tag-neutral-icon": variant === "info",
          })}
        />
        <div>{children}</div>
        {dismissible && (
          <IconButton size="2xsmall" variant="transparent" type="button" onClick={handleDismiss}>
            <XMarkMini className="text-ui-fg-muted" />
          </IconButton>
        )}
      </div>
    );
  },
);
