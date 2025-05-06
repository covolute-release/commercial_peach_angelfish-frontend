import { CheckMini, ChevronRightMini, EllipseMiniSolid } from "@medusajs/icons";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

const Root = DropdownMenuPrimitive.Root;
Root.displayName = "DropdownMenu";

const Trigger = DropdownMenuPrimitive.Trigger;
Trigger.displayName = "DropdownMenu.Trigger";

const Group = DropdownMenuPrimitive.Group;
Group.displayName = "DropdownMenu.Group";

const SubMenu = DropdownMenuPrimitive.Sub;
SubMenu.displayName = "DropdownMenu.SubMenu";

const RadioGroup = DropdownMenuPrimitive.RadioGroup;
RadioGroup.displayName = "DropdownMenu.RadioGroup";

const SubMenuTrigger = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "bg-ui-bg-component text-ui-fg-base txt-compact-small relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 outline-none transition-colors",
      "focus-visible:bg-ui-bg-component-hover focus:bg-ui-bg-component-hover",
      "active:bg-ui-bg-component-hover",
      "data-[disabled]:text-ui-fg-disabled data-[disabled]:pointer-events-none",
      "data-[state=open]:!bg-ui-bg-component-hover",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRightMini className="text-ui-fg-muted ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
));
SubMenuTrigger.displayName = "DropdownMenu.SubMenuTrigger";

const SubMenuContent = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, collisionPadding = 8, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      collisionPadding={collisionPadding}
      className={cn(
        "bg-ui-bg-component text-ui-fg-base shadow-elevation-flyout max-h-[var(--radix-popper-available-height)] min-w-[220px] overflow-hidden rounded-lg p-1",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
SubMenuContent.displayName = "DropdownMenu.SubMenuContent";

const Content = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 8, collisionPadding = 8, align = "center", ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      align={align}
      collisionPadding={collisionPadding}
      className={cn(
        "bg-ui-bg-component text-ui-fg-base shadow-elevation-flyout max-h-[var(--radix-popper-available-height)] min-w-[220px] overflow-hidden rounded-lg p-1",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
Content.displayName = "DropdownMenu.Content";

const Item = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "bg-ui-bg-component text-ui-fg-base txt-compact-small relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 outline-none transition-colors",
      "focus-visible:bg-ui-bg-component-hover focus:bg-ui-bg-component-hover",
      "active:bg-ui-bg-component-hover",
      "data-[disabled]:text-ui-fg-disabled data-[disabled]:pointer-events-none",
      className,
    )}
    {...props}
  />
));
Item.displayName = "DropdownMenu.Item";

const CheckboxItem = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "bg-ui-bg-component text-ui-fg-base txt-compact-small relative flex cursor-pointer select-none items-center rounded-md py-1.5 pl-[31px] pr-2 outline-none transition-colors",
      "focus-visible:bg-ui-bg-component-hover focus:bg-ui-bg-component-hover",
      "active:bg-ui-bg-component-hover",
      "data-[disabled]:text-ui-fg-disabled data-[disabled]:pointer-events-none",
      "data-[state=checked]:txt-compact-small-plus",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex size-[15px] items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <CheckMini />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
CheckboxItem.displayName = "DropdownMenu.CheckboxItem";

const RadioItem = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "bg-ui-bg-component txt-compact-small relative flex cursor-pointer select-none items-center rounded-md py-1.5 pl-[31px] pr-2 outline-none transition-colors",
      "focus-visible:bg-ui-bg-component-hover focus:bg-ui-bg-component-hover",
      "active:bg-ui-bg-component-hover",
      "data-[disabled]:text-ui-fg-disabled data-[disabled]:pointer-events-none",
      "data-[state=checked]:txt-compact-small-plus",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex size-[15px] items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <EllipseMiniSolid className="text-ui-fg-base" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
));
RadioItem.displayName = "DropdownMenu.RadioItem";

const Label = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn("text-ui-fg-subtle txt-compact-xsmall-plus", className)}
    {...props}
  />
));
Label.displayName = "DropdownMenu.Label";

const Separator = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn(
      "bg-ui-border-component border-t-ui-border-menu-top border-b-ui-border-menu-bot -mx-1 my-1 h-0.5 border-b border-t",
      className,
    )}
    {...props}
  />
));
Separator.displayName = "DropdownMenu.Separator";

const Shortcut = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("text-ui-fg-subtle txt-compact-small ml-auto tracking-widest", className)} {...props} />;
};
Shortcut.displayName = "DropdownMenu.Shortcut";

const Hint = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return <span className={cn("text-ui-fg-subtle txt-compact-small ml-auto tracking-widest", className)} {...props} />;
};
Hint.displayName = "DropdownMenu.Hint";

const DropdownMenu = Object.assign(Root, {
  Trigger,
  Group,
  SubMenu,
  SubMenuContent,
  SubMenuTrigger,
  Content,
  Item,
  CheckboxItem,
  RadioGroup,
  RadioItem,
  Label,
  Separator,
  Shortcut,
  Hint,
});

export { DropdownMenu };
