import { forwardRef, useRef, useImperativeHandle } from "react";
import { type AriaButtonProps, useButton } from "react-aria";

import { IconButton } from "@/components/icon-button";

interface CalendarButtonProps extends AriaButtonProps<"button"> {}

const CalendarButton = forwardRef<HTMLButtonElement, CalendarButtonProps>(({ children, ...props }, ref) => {
  const innerRef = useRef<HTMLButtonElement>(null);
  useImperativeHandle(ref, () => innerRef.current as HTMLButtonElement);

  const { buttonProps } = useButton(props, innerRef);

  return (
    <IconButton size="small" variant="transparent" className="rounded-[4px]" {...buttonProps}>
      {children}
    </IconButton>
  );
});
CalendarButton.displayName = "CalendarButton";

export { CalendarButton };
