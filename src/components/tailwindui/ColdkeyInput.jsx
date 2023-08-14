import Modal from "react-modal"

import { useState } from "react"

import { EyeIcon, EyeSlashIcon, PencilSquareIcon } from "@heroicons/react/20/solid"

import ColdkeyModal from "@components/TailwindUI/ColdkeyModal"

export default function Example({ onInputChange, name, coldkey, watched, validated, index, onDelete = () => {} }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleColdkeyUpdate(Name, Coldkey, Watched) {
    onInputChange(index, Name, Coldkey, Watched)
  }

  function handleColdkeyChange(updatedName, updatedColdkey) {
    handleColdkeyUpdate(updatedName, updatedColdkey, watched)
  }

  function handleWatchedChange(getNewValue) {
    const newValue = getNewValue()
    handleColdkeyUpdate(name, coldkey, newValue)
  }

  function formatString(str) {
    const firstFive = str.slice(0, 15)
    const lastFive = str.slice(-5)
    return `${firstFive}...${lastFive}`
  }

  function handleDelete() {
    onDelete(index)
  }

  return (
    <div>
      <div className="px-3 pt-4 pb-3 shadow-sm rounded-xl ring-1 ring-inset ring-slate-300">
        <label htmlFor="name" className="block mb-1 text-xs font-medium text-slate-900">
          {name}
        </label>
        <div className="relative flex items-stretch flex-grow focus-within:z-10">
          <input
            type="text"
            name="coldkey"
            id="coldkey"
            className="block w-full rounded-l-full border-0 py-1.5 pl-2 bg-gray-100 text-slate-900 ring-1 ring-inset ring-slate-400 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
            defaultValue={formatString(coldkey)}
            readOnly
          />
          <button
            type="button"
            className="relative -ml-px inline-flex items-center gap-x-1.5 px-3 py-2 text-sm font-semibold text-slate-900 ring-1 ring-inset ring-slate-400 cursor-default"
            onClick={() => handleWatchedChange(() => !watched)}
          >
            {watched ? (
              <EyeIcon className="-ml-0.5 h-5 w-5 text-slate-400" aria-hidden="true" />
            ) : (
              <EyeSlashIcon className="-ml-0.5 h-5 w-5 text-slate-400" aria-hidden="true" />
            )}
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            type="button"
            className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-full px-3 py-2 text-sm font-semibold text-slate-900 ring-1 ring-inset ring-slate-400 hover:bg-slate-50"
          >
            <PencilSquareIcon className="-ml-0.5 h-5 w-5 text-slate-400" aria-hidden="true" />
          </button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          content: {
            backgroundColor: "rgba(0, 0, 0, 0)",
            border: "rgba(0, 0, 0, 0)",
          },
        }}
      >
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
