import * as React from 'react'

import SelectDown from '@assets/icons/select-down.svg'
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
    <div className={`relative w-full select-none ${className}`} ref={selectNode}>
      {props.label && <label className={`block text-body sm:mb-[5px] mb-[4px] font-bold`}>{props.label}</label>}
      <div
        onClick={() => setSelectOpen(!selectOpen)}
        className={cn(
          'flex justify-between items-center w-full sm:px-[25px] px-[18px] sm:py-[17px] py-[12px] border sm:rounded-lg rounded-md border-blur placeholder:text-white cursor-default',
          selectOpen ? 'border-primary' : 'border-blur hover:border-blur-light'
        )}
      >
        {currentLabel}
        <SelectDown />
      </div>
      {selectOpen && (
        <div className="absolute w-full z-10 bg-gradient-dialog bg-black border-white-20 flex flex-col gap-[1px] mt-[1px] border sm:text-sm sm:rounded-lg rounded-md overflow-hidden">
          {options.map((option, key) => (
            <div
              key={key}
              className={cn(
                ' sm:px-[25px] px-[18px] sm:py-[17px] py-[12px] hover:bg-primary',
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
