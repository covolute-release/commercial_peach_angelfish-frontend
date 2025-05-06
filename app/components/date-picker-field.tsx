import { createCalendar } from "@internationalized/date";
import { useRef } from "react";
import { type AriaDatePickerProps, type DateValue, useDateField, useLocale } from "react-aria";
import { useDateFieldState } from "react-stately";

import { DateSegment } from "@/components/date-segment";
import { cva } from "class-variance-authority";

interface DatePickerFieldProps extends AriaDatePickerProps<DateValue> {
  size?: "base" | "small";
}

const datePickerFieldStyles = cva("flex items-center tabular-nums", {
  variants: {
    size: {
      small: "py-1",
      base: "py-1.5",
    },
  },
  defaultVariants: {
    size: "base",
  },
});

const DatePickerField = ({ size = "base", ...props }: DatePickerFieldProps) => {
  const { locale } = useLocale();

  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });

  const ref = useRef<HTMLDivElement>(null);
  const { fieldProps } = useDateField(props, state, ref);

  return (
    <div ref={ref} aria-label="Date input" className={datePickerFieldStyles({ size })} {...fieldProps}>
      {state.segments.map((segment, index) => {
        return <DateSegment key={index} segment={segment} state={state} />;
      })}
    </div>
  );
};

export { DatePickerField };
