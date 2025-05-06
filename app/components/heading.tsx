import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const headingVariants = cva("font-sans font-medium", {
  variants: {
    level: {
      h1: "h1-core",
      h2: "h2-core",
      h3: "h3-core",
    },
  },
  defaultVariants: {
    level: "h1",
  },
});

interface HeadingProps extends VariantProps<typeof headingVariants>, React.HTMLAttributes<HTMLHeadingElement> {}

const Heading = ({
  /**
   * The heading level which specifies which heading element is used.
   */
  level = "h1",
  className,
  ...props
}: HeadingProps) => {
  const Component = level || "h1";

  return <Component className={cn(headingVariants({ level }), className)} {...props} />;
};

export { Heading, headingVariants };
