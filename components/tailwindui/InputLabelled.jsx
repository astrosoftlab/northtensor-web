import { BarsArrowUpIcon, EyeIcon, EyeSlashIcon, PencilSquareIcon } from '@heroicons/react/20/solid'
import { useState } from 'react';
import ColdkeyModal from '@/components/tailwindui/ColdkeyModal'

function MyComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

   return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Modal Title</h2>
            <p>Modal content goes here.</p>
            <button onClick={() => setIsModalOpen(false)}>Close Modal</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Example({ name, coldkey, watched, validated}) {
  return (
    <div>
      <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-slate-300">
      <label htmlFor="name" className="block text-xs font-medium text-slate-900">
        {name}
      </label>
      <div className="relative flex flex-grow items-stretch focus-within:z-10">
      <input
            type="text"
            name="coldkey"
            id="coldkey"
            className="block w-full rounded-l-md border-0 py-1.5 pl-2 bg-slate-100 text-slate-900 ring-1 ring-inset ring-slate-400 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
            defaultValue={coldkey}
            readOnly
          />
          <button
          type="button"
          className="relative -ml-px inline-flex items-center gap-x-1.5 px-3 py-2 text-sm font-semibold text-slate-900 ring-1 ring-inset ring-slate-400 cursor-default"
        >
          {watched? 
          <EyeIcon className="-ml-0.5 h-5 w-5 text-slate-400" aria-hidden="true" />
          :
          <EyeSlashIcon className="-ml-0.5 h-5 w-5 text-slate-400" aria-hidden="true" />
          }
          
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          type="button"
          className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-slate-900 ring-1 ring-inset ring-slate-400 hover:bg-slate-50"
        >
          <PencilSquareIcon className="-ml-0.5 h-5 w-5 text-slate-400" aria-hidden="true" />
          
        </button>
        </div>
    </div>
  </div>

  )
}
