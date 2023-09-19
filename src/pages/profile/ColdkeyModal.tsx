import { useEffect, useState } from 'react'

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
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-20"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform border rounded-lg shadow-xl border-blur backdrop-blur sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-8">
          <div>
            {newBool ? null : (
              <div className="flex justify-end">
                <Button color="blur" onClick={handleDelete}>
                  DELETE
                </Button>
              </div>
            )}

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
              <Button className="mb-4" full onClick={handleSave} disabled={!coldkeyIsValid}>
                {coldkeyIsValid ? 'Save' : 'Invalid Coldkey'}
              </Button>

              <Button full color="blur" onClick={handleClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}