import { ChangeEvent, createContext, forwardRef, useContext, useEffect } from 'react'

const SELECT_GROUP = 'INPUT_GROUP'

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
  onChange?: (newValue: any) => void
}

export const Select = forwardRef(
  ({ className, index, siblings, options, rounded, value, onChange, ...props }: Props, _) => {
    const parent = useContext(SelectGroupContext)

    useEffect(() => {
      const init = async () => {
        const { Select, initTE } = await import('tw-elements')
        initTE({ Select })
      }
      init()
    }, [])

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e.target.value)
    }

    return (
      <div className={`w-full ${className}`}>
        {props.label!! && (
          <label className={`block mb-1 text-sm font-medium text-gray-700 ${rounded ? 'pl-2' : ''}`}>
            {props.label}
          </label>
        )}
        <select data-te-select-init value={value?.value} onChange={handleChange}>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    )
  },
)

const SelectGroupContext = createContext<string | null>(null)
