import { cn } from "@/lib/utils";
import { forwardRef, useRef, useImperativeHandle } from "react";
import { type AriaButtonProps, useButton } from "react-aria";

interface CalendarButtonProps extends AriaButtonProps<"button"> {
  size?: "base" | "small";
}

const DatePickerButton = forwardRef<HTMLButtonElement, CalendarButtonProps>(
  ({ children, size = "base", ...props }, ref) => {
    const innerRef = useRef<HTMLButtonElement>(null);
    useImperativeHandle(ref, () => innerRef.current as HTMLButtonElement);

    const { buttonProps } = useButton(props, innerRef);

    return (
      <button
        type="button"
        className={cn(
          "text-ui-fg-muted transition-fg flex items-center justify-center border-r outline-none",
          "disabled:text-ui-fg-disabled",
          "hover:bg-ui-button-transparent-hover",
          "focus-visible:bg-ui-bg-interactive focus-visible:text-ui-fg-on-color",
          {
            "size-7": size === "small",
            "size-8": size === "base",
          },
        )}
        aria-label="Open calendar"
        {...buttonProps}
      >
        {children}
      </button>
    );
  },
);
DatePickerButton.displayName = "DatePickerButton";

export { DatePickerButton };
