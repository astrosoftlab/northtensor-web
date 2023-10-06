import { useEffect, useState } from 'react'

import Close from '@assets/icons/close.svg'
import { Button } from '@components/ui/Button'
import { Input } from '@components/ui/Input'

interface Props {
  name: string
  coldkey: string
  newBool?: boolean
  onSave: (newName: string, newColdkey: string) => void
  onClose: () => void
  onDelete?: () => void
}

export default function ColdkeyModal({ name, coldkey, onSave, onClose, newBool = false, onDelete = () => {} }: Props) {
  const [newName, setNewName] = useState(name)
  const [newColdkey, setNewColdkey] = useState(coldkey)
  const [coldkeyIsValid, setColdkeyIsValid] = useState(true)

  useEffect(() => {
    setColdkeyIsValid(/^([1-9]|[A-HJ-NP-Za-km-z]){0,48}$/.test(coldkey) && coldkey.length === 48)
  }, [coldkey])

  function handleNameChange(v: string) {
    setNewName(v)
  }

  function handleColdkeyChange(v: string) {
    setNewColdkey(v)
    setColdkeyIsValid(/^([1-9]|[A-HJ-NP-Za-km-z]){0,48}$/.test(v) && v.length === 48)
  }

  function handleSave() {
    onSave(newName, newColdkey)
    onClose()
  }

  function handleClose() {
    onClose()
  }

  function handleDelete() {
    onDelete()
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[1000] overflow-y-auto bg-black">
      <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="container">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative sm:max-w-[596px] w-full flex-1 shrink-0 md:px-[20px] px-[15px] md:py-[64px] py-[48px] overflow-hidden text-left align-bottom transition-all transform border rounded-lg shadow-xl bg-black-90 border-blur sm:my-8 sm:align-middle">
                <div className="absolute top-0 right-0 md:p-[16px] p-[12px]">
                  <Button color="white" className="sm:px-[12px] px-[9px]" onClick={handleClose}>
                    <Close />
                  </Button>
                </div>

                <div className="mt-3 text-center sm:mt-5">
                  <h4 className="font-medium">{name}</h4>
                  <div className="mt-2">
                    <p className="text-sm text-gray">Edit the name and coldkey below:</p>
                  </div>
                </div>

                <div className="mt-5">
                  <Input label="Name" value={newName} onChange={handleNameChange} />
                </div>

                <div className="mt-5">
                  <Input label="Coldkey" value={newColdkey} onChange={handleColdkeyChange} />
                </div>

                <div className="mt-9 sm:mt-12">
                  <Button full size="lg" onClick={handleSave} disabled={!coldkeyIsValid}>
                    {coldkeyIsValid ? 'Save' : 'Invalid Coldkey'}
                  </Button>
                  {newBool ? null : (
                    <Button full size="lg" color="red" className="md:mt-[16px] mt-[12px]" onClick={handleDelete}>
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>
      </div>
    </div>
  )
}
