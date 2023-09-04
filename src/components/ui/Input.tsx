import * as React from 'react'

import { cn } from '@lib/utils'

const INPUT_GROUP = 'INPUT_GROUP'

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  label?: string
  rounded?: boolean
  index?: number
  siblings?: number
  onChange?: (v: string) => void | Promise<void>
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, rounded, index, siblings, onChange, ...props }, ref) => {
    const parent = React.useContext(InputGroupContext)

    return (
      <div className={`w-full ${className}`}>
        {props.label!! && (
          <label htmlFor="email" className={`block mb-1 text-sm font-medium text-gray-700 ${rounded ? 'pl-2' : ''}`}>
            {props.label}
          </label>
        )}
        <input
          ref={ref}
          onChange={(e) => (onChange ? onChange(e.target.value) : false)}
          className={cn(
            'block w-full border-gray-300 shadow-sm hover:border-gray-500 focus:ring-primary focus:border-primary sm:text-sm',
            props.readOnly || props.disabled ? 'bg-gray-100' : '',
            parent === INPUT_GROUP
              ? index === 0
                ? 'rounded-l-full'
                : siblings && index === siblings - 1
                ? 'rounded-r-full border-l-0'
                : 'border-l-0'
              : rounded
              ? 'rounded-full'
              : 'rounded-md',
          )}
          {...props}
        />
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
      return React.cloneElement(child as React.ReactElement<InputProps>, {
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
