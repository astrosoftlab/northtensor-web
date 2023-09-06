import React, { useMemo } from 'react'

import { cn } from '@lib/utils'

// Button Style Constants
const COLOR_CONFIG = {
  primary: {
    bgColor: 'bg-primary hover:bg-primary-dark',
    textColor: 'text-white',
  },
  opacity: {
    bgColor: 'bg-[#ffffff20] border border-solid border-[#ffffff25] hover:bg-[#ffffff30]',
    textColor: 'text-white',
  },
  white: {
    bgColor: 'bg-white hover:bg-gray-200',
    textColor: 'text-black',
  },
  green: {
    bgColor: 'bg-green-400',
    textColor: 'text-white',
  },
  blue: {
    bgColor: 'bg-blue-400',
    textColor: 'text-white',
  },
  yellow: {
    bgColor: 'bg-yellow-400',
    textColor: 'text-white',
  },
}
const SIZE_CONFIG = {
  sm: { padding: 'lg:px-[12px] lg:py-[8px] px-[9px] py-[6px]', font: 'lg:text-[9px] text-[6px]' },
  md: { padding: 'lg:px-[24px] lg:py-[12px] px-[18px] py-[9px]', font: 'lg:text-[15px] text-[12px]' },
  lg: { padding: 'lg:px-[25px] lg:py-[17px] px-[18px] py-[12px]', font: 'lg:text-[18px] text-[14px]' },
}

interface StyledProps {
  full?: boolean
  color?: keyof typeof COLOR_CONFIG
  size?: keyof typeof SIZE_CONFIG
  weight?: 'normal' | 'semibold' | 'bold'
}

type NativeButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>

interface ButtonProps extends NativeButtonProps, StyledProps {
  children: React.ReactNode
  className?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, disabled, color = 'primary', size = 'md', weight = 'normal', full = false, ...props },
    ref,
  ) => {
    const { bgColor, textColor } = COLOR_CONFIG[color]
    const { padding, font } = SIZE_CONFIG[size]

    const width = full ? '' : 'sm:w-max'
    const hoverActive = disabled ? '' : ''

    const classNames = useMemo(
      () =>
        cn(
          'w-full relative flex items-center justify-center rounded-md transition duration-300 active:duration-75',
          className,
          width,
          bgColor,
          padding,
          hoverActive,
          textColor,
          font,
          'font-' + weight,
          disabled ? 'opacity-50' : '',
        ),
      [className, width, bgColor, padding, hoverActive, textColor, font, weight, disabled],
    )

    return (
      <button ref={ref} disabled={disabled} className={classNames} {...props}>
        {children}
      </button>
    )
  },
)
