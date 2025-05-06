import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef, useId } from "react";

import { Hint } from "@/components/hint";
import { Label } from "@/components/label";
import { cn } from "@/lib/utils";

const Root = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn("grid gap-2", className)} {...props} ref={ref} />;
});
Root.displayName = "RadioGroup";

const Indicator = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Indicator>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Indicator ref={ref} className={cn("flex items-center justify-center", className)} {...props}>
      <div className={cn("bg-ui-bg-base shadow-details-contrast-on-bg-interactive h-1.5 w-1.5 rounded-full")} />
    </RadioGroupPrimitive.Indicator>
  );
});
Indicator.displayName = "RadioGroup.Indicator";

const Item = forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn("group relative flex h-5 w-5 items-center justify-center outline-none", className)}
      {...props}
    >
      <div
        className={cn(
          "shadow-borders-base bg-ui-bg-base transition-fg flex h-[14px] w-[14px] items-center justify-center rounded-full",
          "group-hover:group-enabled:group-data-[state=unchecked]:bg-ui-bg-base-hover",
          "group-data-[state=checked]:bg-ui-bg-interactive group-data-[state=checked]:shadow-borders-interactive-with-shadow",
          "group-focus-visible:!shadow-borders-interactive-with-focus",
          "group-disabled:cursor-not-allowed group-disabled:opacity-50",
        )}
      >
        <Indicator />
      </div>
    </RadioGroupPrimitive.Item>
  );
});
Item.displayName = "RadioGroup.Item";

interface ChoiceBoxProps extends ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label: string;
  description: string;
}

const ChoiceBox = forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Item>, ChoiceBoxProps>(
  ({ className, id, label, description, ...props }, ref) => {
    const generatedId = useId();

    if (!id) {
      id = generatedId;
    }

    const descriptionId = `${id}-description`;

    return (
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
          "shadow-borders-base bg-ui-bg-base focus-visible:shadow-borders-interactive-with-focus transition-fg group flex items-start gap-x-2 rounded-lg p-3 outline-none",
          "hover:enabled:bg-ui-bg-base-hover",
          "data-[state=checked]:shadow-borders-interactive-with-shadow",
          "group-disabled:cursor-not-allowed group-disabled:opacity-50",
          className,
        )}
        {...props}
        id={id}
        aria-describedby={descriptionId}
      >
        <div className="flex h-5 w-5 items-center justify-center">
          <div
            className={cn(
              "shadow-borders-base bg-ui-bg-base group-data-[state=checked]:bg-ui-bg-interactive group-data-[state=checked]:shadow-borders-interactive-with-shadow transition-fg flex h-3.5 w-3.5 items-center justify-center rounded-full",
              "group-hover:group-enabled:group-data-[state=unchecked]:bg-ui-bg-base-hover",
            )}
          >
            <Indicator />
          </div>
        </div>
        <div className="flex flex-col items-start">
          <Label
            htmlFor={id}
            size="small"
            weight="plus"
            className="group-disabled:text-ui-fg-disabled cursor-pointer group-disabled:cursor-not-allowed"
          >
            {label}
          </Label>
          <Hint className="txt-small text-ui-fg-subtle group-disabled:text-ui-fg-disabled text-left" id={descriptionId}>
            {description}
          </Hint>
        </div>
      </RadioGroupPrimitive.Item>
    );
  },
);
ChoiceBox.displayName = "RadioGroup.ChoiceBox";

const RadioGroup = Object.assign(Root, { Item, ChoiceBox });

export { RadioGroup };
