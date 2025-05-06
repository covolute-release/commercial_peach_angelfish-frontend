import { useRef } from "react";
import { type AriaTimeFieldProps, type TimeValue, useLocale, useTimeField } from "react-aria";
import { useTimeFieldState } from "react-stately";

import { DateSegment } from "@/components/date-segment";
import { cn } from "@/lib/utils";

const TimeInput = (props: AriaTimeFieldProps<TimeValue>) => {
  const ref = useRef<HTMLDivElement>(null);

  const { locale } = useLocale();
  const state = useTimeFieldState({
    ...props,
    locale,
  });
  const { fieldProps } = useTimeField(props, state, ref);

  return (
    <div
      ref={ref}
      {...fieldProps}
      aria-label="Time input"
      className={cn("bg-ui-bg-field shadow-borders-base txt-compact-small flex items-center rounded-md px-2 py-1", {
        "": props.isDisabled,
      })}
    >
      {state.segments.map((segment, index) => {
        return <DateSegment key={index} segment={segment} state={state} />;
      })}
    </div>
  );
};

export { TimeInput };
