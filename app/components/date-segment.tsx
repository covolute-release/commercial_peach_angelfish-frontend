import type { ComponentPropsWithoutRef } from "react";
import { useRef } from "react";
import { useDateSegment } from "react-aria";
import type { DateFieldState, DateSegment as Segment } from "react-stately";

import { cn } from "@/lib/utils";

interface DateSegmentProps extends ComponentPropsWithoutRef<"div"> {
  segment: Segment;
  state: DateFieldState;
}

const DateSegment = ({ segment, state }: DateSegmentProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  const isComma = segment.type === "literal" && segment.text === ", ";

  /**
   * We render an empty span with a margin to maintain the correct spacing
   * between date and time segments.
   */
  if (isComma) {
    return <span className="mx-1" />;
  }

  return (
    /**
     * We wrap the segment in a span to prevent the segment from being
     * focused when the user clicks outside of the component.
     *
     * See: https://github.com/adobe/react-spectrum/issues/3164
     */
    <span>
      <div
        ref={ref}
        className={cn(
          "transition-fg outline-none",
          "focus-visible:bg-ui-bg-interactive focus-visible:text-ui-fg-on-color",
          {
            "text-ui-fg-muted uppercase": segment.isPlaceholder,
            "text-ui-fg-muted": !segment.isEditable && !state.value,
          },
        )}
        {...segmentProps}
      >
        {segment.text}
      </div>
    </span>
  );
};

export { DateSegment };
