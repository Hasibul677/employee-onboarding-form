import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { cn } from "@/lib/utils" // optional helper to merge class names

const RadioGroup = RadioGroupPrimitive.Root

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      "h-4 w-4 rounded-full border border-gray-300 data-[state=checked]:bg-blue-600",
      className
    )}
    {...props}
  />
))

RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
