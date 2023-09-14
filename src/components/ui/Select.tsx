import * as React from 'react'

import { useOnClickOutside } from '@hooks/utils/useClickOutside'
import { cn } from '@lib/utils'

export interface Option {
  label: string
  value: string
}

interface Props {
  className?: string
  label?: string
  placeholder?: string
  value?: Option
  options: Option[]
  onChange?: (newValue: Option) => void | Promise<void>
}

export const Select = React.forwardRef(({ className, options, value, onChange, placeholder, ...props }: Props, _) => {
  const [selectOpen, setSelectOpen] = React.useState(false)
  const selectNode = React.useRef<any>()

  useOnClickOutside(selectNode, () => {
    setSelectOpen(false)
  })

  const handleOptionClick = (option: Option) => {
    if (onChange) {
      onChange(option)
    }
    setSelectOpen(false)
  }

  const currentLabel = value?.label || placeholder || 'Select...'

  return (
    <div className={`relative w-full ${className}`} ref={selectNode}>
      {props.label && <label className={`block lg:mb-[12px] mb-[8px] font-medium`}>{props.label}</label>}
      <div
        onClick={() => setSelectOpen(!selectOpen)}
        className={cn(
          'block w-full lg:px-[25px] px-[18px] lg:py-[17px] py-[12px] border lg:rounded-lg rounded-md border-blur placeholder:text-white',
          selectOpen ? 'border-primary' : 'border-blur hover:border-blur-light'
        )}
      >
        {currentLabel}
      </div>
      {selectOpen && (
        <div className="absolute w-full z-10 bg-gradient-dialog backdrop-blur-md backdrop-opacity-100 flex flex-col gap-[1px] mt-[1px] border sm:text-sm lg:rounded-lg rounded-md overflow-hidden">
          {options.map((option, key) => (
            <div
              key={key}
              className={cn(
                ' lg:px-[25px] px-[18px] lg:py-[17px] py-[12px] hover:bg-primary',
                value?.value === option.value ? 'bg-primary cursor-default' : 'cursor-pointer'
              )}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
})
