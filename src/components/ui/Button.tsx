import React from "react"

import { cn } from "@lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  full?: boolean
  color?: "primary" | "light" | "red"
  size?: "sm" | "md" | "lg" | "xl"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, disabled, color = "primary", size = "md", full = false, ...props }, ref) => {
    const colorConfig = {
      primary: {
        bgColor: "before:bg-primary",
        textColor: "text-white",
      },
      light: {
        bgColor: "before:bg-primary/10",
        textColor: "text-primary",
      },
      red: {
        bgColor: "before:bg-red-400",
        textColor: "text-white",
      },
      green: {
        bgColor: "before:bg-green-400",
        textColor: "text-white",
      },
      blue: {
        bgColor: "before:bg-blue-400",
        textColor: "text-white",
      },
      yellow: {
        bgColor: "before:bg-yellow-400",
        textColor: "text-white",
      },
    }

    const sizeConfig = {
      sm: { padding: "px-3 h-7", font: "text-xs" },
      md: { padding: "px-5 h-9", font: "text-sm" },
      lg: { padding: "px-7 h-11", font: "text-md" },
      xl: { padding: "px-9 h-[52px]", font: "text-lg" },
    }

    const { bgColor, textColor } = colorConfig[color]
    const { padding, font } = sizeConfig[size]

    const width = full ? "" : "sm:w-max"
    const hoverActive = disabled ? "" : "hover:before:scale-105 active:before:scale-95"

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "w-full relative flex items-center justify-center before:absolute before:inset-0 before:rounded-full before:transition before:duration-300 active:duration-75 font-semibold",
          className,
          width,
          bgColor,
          padding,
          hoverActive,
          disabled ? "opacity-50" : "",
        )}
        {...props}
      >
        <span className={cn("relative", textColor, font)}>{children}</span>
      </button>
    )
  },
)
