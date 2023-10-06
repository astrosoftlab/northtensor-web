import { toast } from 'react-toastify'

import { cn } from '@lib/utils'

interface Props {
  copyText: string
  displayText?: string | null
  className?: string
}

const CopyToClipboardButton = ({ copyText, displayText = null, className }: Props) => {
  return (
    <>
      <button className={cn('text-body text-primary', className)} onClick={() => toast.success('Copied to clipboard')}>
        <div className="flex items-center">
          {displayText !== null ? displayText : copyText}&nbsp;
          {
            <svg
              className="w-[20px] h-[20px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15V5h13" />
            </svg>
          }
        </div>
      </button>
    </>
  )
}

export default CopyToClipboardButton
