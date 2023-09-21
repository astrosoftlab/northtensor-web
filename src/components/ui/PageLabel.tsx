import { cn } from '@lib/utils'

interface Props {
  label?: string | JSX.Element
  text?: string | JSX.Element
  transparent?: boolean
}
export const PageLabel = ({ label, text, transparent = false }: Props) => {
  return (
    <div className="flex flex-1 w-full justify-center lg:mb-[24px] mb-[18px]">
      <div
        className={cn(
          'flex justify-center lg:max-w-[480px] w-full lg:rounded-[100px] lg:py-[9px] py-[7px] rounded-[75px] border',
          transparent ? 'border-blur' : 'bg-[rgba(172,60,225,0.25)] border-[rgba(172,60,225,0.25)]'
        )}
      >
        {label && (
          <>
            <div className="font-semibold text-primary">{label}</div>
            &nbsp;•&nbsp;
          </>
        )}
        {text}
      </div>
    </div>
  )
}
