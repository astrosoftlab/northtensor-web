import * as React from 'react'

import { cn } from '@lib/utils'

const INPUT_GROUP = 'INPUT_GROUP'

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  label?: string
  index?: number
  siblings?: number
  onChange?: (v: string) => void | Promise<void>
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, index, siblings, onChange, ...props }, ref) => {
    const parent = React.useContext(InputGroupContext)

    return (
      <div className={cn(`w-full`, className)}>
        {props.label!! && <label className={`block mb-1 font-medium`}>{props.label}</label>}
        <input
          ref={ref}
          onChange={(e) => (onChange ? onChange(e.target.value) : false)}
          className={cn(
            'block w-full lg:px-[25px] px-[18px] lg:py-[17px] py-[12px] border border-solid border-blur hover:border-blur-light sm:text-sm bg-[#FFFFFF10] rounded-lg'
          )}
          {...props}
        />
      </div>
    )
  }
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
        siblings: React.Children.count(children)
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

type TextareaProps = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> & {
  label?: string
  index?: number
  siblings?: number
  onChange?: (v: string) => void | Promise<void>
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, index, siblings, onChange, ...props }, ref) => {
    const parent = React.useContext(InputGroupContext)

    return (
      <div className={cn(`w-full`, className)}>
        {props.label!! && <label className={`block mb-1 font-medium`}>{props.label}</label>}
        <textarea
          ref={ref}
          onChange={(e) => (onChange ? onChange(e.target.value) : false)}
          className={cn(
            'block w-full lg:px-[25px] px-[18px] lg:py-[17px] py-[12px] border border-solid border-[#FFFFFF20] hover:border-[#FFFFFF40] sm:text-sm bg-[#FFFFFF10] rounded-lg'
          )}
          {...props}
        />
      </div>
    )
  }
)
