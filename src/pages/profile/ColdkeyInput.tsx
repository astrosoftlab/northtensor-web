import { useEffect, useRef, useState } from 'react'
import Modal from 'react-modal'

import EditIcon from '@assets/icons/edit.svg'
import EyeInvisibleIcon from '@assets/icons/eye-invisible.svg'
import EyeVisibleIcon from '@assets/icons/eye-visible.svg'
import CopyToClipboardButton from '@components/ui/CopyButton'
import { cn } from '@lib/utils'

import ColdkeyModal from './ColdkeyModal'

interface Props {
  name: string
  coldkey: string
  watched: boolean
  validated: boolean
  index: number
  totalLength: number
  onInputChange: (index: number, name: string, coldkey: string, watched: boolean) => void
  onDelete: (index: number) => void
}

export default function ColdkeyInput({
  name,
  coldkey,
  watched,
  validated,
  index,
  totalLength,
  onInputChange,
  onDelete = () => {}
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleColdkeyUpdate(name: string, coldkey: string, watched: boolean) {
    onInputChange(index, name, coldkey, watched)
  }

  function handleColdkeyChange(updatedName: string, updatedColdkey: string) {
    handleColdkeyUpdate(updatedName, updatedColdkey, watched)
  }

  function handleWatchedChange(getNewValue: () => boolean) {
    const newValue = getNewValue()
    handleColdkeyUpdate(name, coldkey, newValue)
  }

  function formatString(str: string) {
    const firstFive = str.slice(0, 5)
    const lastFive = str.slice(-5)
    return `${firstFive}...${lastFive}`
  }

  function handleDelete() {
    onDelete(index)
  }

  useEffect(() => {
    if (inputRef.current) {
      if (!watched) {
        inputRef.current.focus()
      }
    }
  }, [watched])

  return (
    <div id={coldkey} className="flex gap-d-15">
      <div
        className={cn(
          'flex flex-col justify-between gap-d-12 grow md:max-w-none max-w-[280px] truncate md:px-[25px] px-[19px] md:py-[22px] py-[16px] bg-[#FFFFFF10]',
          index > 0 ? 'border-t border-t-[#FFFFFF20]' : '',
          index === 0 ? 'md:rounded-t-lg rounded-t-md' : '',
          index === totalLength - 1 ? 'md:rounded-b-lg rounded-b-md' : ''
        )}
      >
        <div className="text-body-lg truncate lg:max-w-[185px] md:max-w-[256px] shrink-0">{name}</div>
        {/* <div className="text-body-sm">{formatString(coldkey)}</div> */}

        <CopyToClipboardButton className="!text-body-sm" copyText={coldkey} displayText={formatString(coldkey)} />
      </div>
      <div className="flex items-center gap-d-15">
        <button type="button" onClick={() => handleWatchedChange(() => !watched)}>
          {watched ? <EyeVisibleIcon /> : <EyeInvisibleIcon />}
        </button>

        <button onClick={() => setIsModalOpen(true)} type="button">
          <EditIcon />
        </button>
      </div>
      <Modal ariaHideApp={false} isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <ColdkeyModal
          name={name}
          coldkey={coldkey}
          onSave={handleColdkeyChange}
          onClose={() => setIsModalOpen(false)}
          onDelete={handleDelete}
        />
      </Modal>
    </div>
  )
}
