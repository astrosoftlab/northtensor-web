import * as React from "react"

import { cn } from "@lib/utils"

const INPUT_GROUP = "INPUT_GROUP"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-md border border-slate-300 bg-transparent py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  rounded?: boolean
  index?: number
  siblings?: number
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, rounded, index, siblings, ...props }, ref) => {
    const parent = React.useContext(InputGroupContext)

    return (
      <div ref={ref} className={`w-full ${className}`}>
        {props.label!! && (
          <label htmlFor="email" className={`block text-sm font-medium text-gray-700 ${rounded ? "pl-2" : ""}`}>
            {props.label}
          </label>
        )}
        <div className="mt-1">
          <input
            className={cn(
              "block w-full border-gray-300 shadow-sm hover:border-gray-500 focus:ring-primary focus:border-primary sm:text-sm",
              props.readOnly || props.disabled ? "bg-gray-100" : "",
              parent === INPUT_GROUP
                ? index === 0
                  ? "rounded-l-full"
                  : siblings && index === siblings - 1
                  ? "rounded-r-full border-l-0"
                  : "border-l-0"
                : rounded
                ? "rounded-full"
                : "rounded-md",
            )}
            {...props}
          />
        </div>
      </div>
    )
  },
)

interface InputGroupProps {
  children: React.ReactNode
  rounded?: boolean
}

const InputGroupContext = React.createContext<string | null>(null)

export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(({ children, rounded }, ref) => {
  const childrenComponents = React.Children.map(children, (child: React.ReactNode, index) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement<TextInputProps>, {
        index,
        rounded,
        siblings: React.Children.count(children),
      })
    }
  })

  return (
    <InputGroupContext.Provider value={INPUT_GROUP}>
      <div className="flex" ref={ref}>
        {childrenComponents}
      </div>
    </InputGroupContext.Provider>
  )
})
