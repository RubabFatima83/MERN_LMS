import React from "react";
import { cn } from "../lib/utils";
import * as ProgressPrimitive from '@radix-ui/react-progress'

const Progress = React.forwardRef(({ className, value, ...props }, ref) => {
  // Choose bar color based on value
  let colorClass = "bg-green-500";
  if (value < 30) colorClass = "bg-red-500";
  else if (value < 70) colorClass = "bg-yellow-500";

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-gray-700",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full transition-all duration-500 ease-in-out",
          colorClass
        )}
        style={{ width: `${value}%` }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.displayName = "Progress";

export { Progress };
