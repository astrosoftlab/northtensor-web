import ReactSelect, { ActionMeta, SingleValue } from "react-select"

import * as React from "react"

import { cn } from "@lib/utils"

const SELECT_GROUP = "INPUT_GROUP"

interface Option {
  label: string
  value: string
}

interface Props {
  className?: string
  label?: string
  rounded?: boolean
  index?: number
  siblings?: number
  value?: Option
  readOnly?: boolean
  disabled?: boolean
  options: Option[]
  onChange?: (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) => void
}

export const Select = React.forwardRef(
  ({ className, index, siblings, options, rounded, value, onChange, ...props }: Props, _) => {
    const parent = React.useContext(SelectGroupContext)

    return (
      <div className={`w-full ${className}`}>
        {props.label!! && (
          <label htmlFor="email" className={`block mb-1 text-sm font-medium text-gray-700 ${rounded ? "pl-2" : ""}`}>
            {props.label}
          </label>
        )}
        <ReactSelect
          value={value}
          options={options}
          className="react-select"
          classNames={{
            control: (state) =>
              cn(
                "block w-full !border-gray-300 !shadow-sm hover:!border-gray-500 !text-xs sm:!text-sm",
                state.isFocused
                  ? "!ring-primary !border-primary hover:!border-primary !shadow-[0_0_0_1px_rgba(147,51,234)]"
                  : "",
                props.readOnly || props.disabled ? "bg-gray-100" : "",
                parent === SELECT_GROUP
                  ? index === 0
                    ? "!rounded-l-full"
                    : siblings && index === siblings - 1
                    ? "!rounded-r-full !border-l-0"
                    : "!border-l-0"
                  : rounded
                  ? "!rounded-full"
                  : "!rounded-md",
              ),
            option: (state) =>
              cn(
                "!bg-white !text-xs sm:!text-sm hover:!bg-light",
                state.isSelected ? "!bg-primary hover:!bg-primary" : "",
              ),
          }}
          onChange={onChange}
        />
      </div>
    )
  },
)

const SelectGroupContext = React.createContext<string | null>(null)
