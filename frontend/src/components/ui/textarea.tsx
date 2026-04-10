import * as React from "react"

import { cn } from "../../lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-lg shadow-sm border dark:border-0 dark:bg-muted/50 dark:hover:bg-muted/70 px-3 py-2 text-[0.8rem] font-light ring-offset-background placeholder:text-muted-foreground/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-colors focus:ring-2 focus:ring-muted/50 ring-offset-0 dark:focus:hover:ring-muted/70",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
