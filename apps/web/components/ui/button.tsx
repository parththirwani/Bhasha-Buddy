import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-white text-black border-slate-200 border-2 border-b-4 active:border-b-2 hover:bg-slate-100 text-slate-500",
        primary:"bg-purple-400 text-primary-foreground hover:bg-purple-400/90 border-purple-500 border-b-4 active:border-b-0",
        primaryOutline:"bg-white text-purple-500 hover:bg-slate-100 border-purple-200 border-2",

        secondary:"bg-indigo-400 text-primary-foreground hover:bg-indigo-400/90 border-indigo-500 border-b-4 active:border-b-0",
        secondaryOutline:"bg-white text-indigo-500 hover:bg-slate-100 border-indigo-200 border-2 ",

        danger:"bg-rose-400 text-primary-foreground hover:bg-rose-400/90 border-rose-500 border-b-4 active:border-b-0",
        dangerOutline:"bg-white text-rose-500 hover:bg-slate-100 border-rose-200 border-2 ",

        sidebar:"bg-transparent text-slate-500 border-2 border-transparent hover:bg-indigo-100 transition-none",
        sidebarOutline:"bg-indigo-500/15 text-sky-500 border-sky-300 vorder-2 hover:bg-indigo-500/20 transition-none"
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9  px-3",
        lg: "h-12  px-8",
        icon: "h-10 w-10",
        rounded:"rounded-full"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
