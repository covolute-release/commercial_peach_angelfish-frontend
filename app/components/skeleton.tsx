import type * as React from "react";

import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("bg-ui-bg-component animate-pulse rounded-md", className)} {...props} />;
}

export { Skeleton };
