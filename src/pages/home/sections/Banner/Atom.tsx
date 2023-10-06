'use client'

import OrbitalShellOutline from '@assets/icons/orbital-shell-outline.svg'
import { cn } from '@lib/utils'

interface AtomProps {
  widths: [string, string, string]
  heights: [string, string, string]
  className: string
  icon: any
}

export const Atom = ({ widths, heights, className, icon }: AtomProps) => {
  return (
    <div className={cn(`absolute`, widths[0], heights[0], className)}>
      <div className="absolute flex items-center justify-center w-full h-full">
        <div
          className={cn('rounded-full', widths[0], heights[0])}
          style={{
            transform: 'rotate(-123.081deg)',
            background:
              'linear-gradient(0deg, rgba(255, 255, 255, 0.12) -0.49%, rgba(128, 128, 128, 0.06) 50%, rgba(0, 0, 0, 0) 100.49%)'
          }}
        >
          <OrbitalShellOutline className={cn('rotate-[130deg]', widths[0], heights[0])} />
        </div>
      </div>
      <div className="absolute flex items-center justify-center w-full h-full">
        <div
          className={cn('rounded-full', widths[1], heights[1])}
          style={{
            transform: 'rotate(-123.081deg)',
            background:
              'linear-gradient(0deg, rgba(255, 255, 255, 0.12) -0.49%, rgba(128, 128, 128, 0.06) 50%, rgba(0, 0, 0, 0) 100.49%)'
          }}
        >
          <OrbitalShellOutline className={cn('rotate-[130deg]', widths[1], heights[1])} />
        </div>
      </div>
      <div className="absolute flex items-center justify-center w-full h-full">
        <div
          className={cn('orbital-atom-gradient-transition relative rounded-full', widths[2], heights[2])}
          style={{
            transform: 'rotate(-123.081deg)'
          }}
        >
          <OrbitalShellOutline className={cn('rotate-[130deg]', widths[2], heights[2])} />
        </div>
      </div>
      <div className="absolute flex items-center justify-center w-full h-full">{icon}</div>
    </div>
  )
}
