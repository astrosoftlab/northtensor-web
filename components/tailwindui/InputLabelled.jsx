import { BarsArrowUpIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid'

export default function Example({ name, coldkey, watched, validated}) {
  return (
    <div>
      <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
      <label htmlFor="name" className="block text-xs font-medium text-gray-900">
        {name}
      </label>
      <div className="relative flex flex-grow items-stretch focus-within:z-10">
      <input
            type="text"
            name="coldkey"
            id="coldkey"
            className="block w-full rounded-l-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue={coldkey}
          />
          <button
          type="button"
          className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          {watched? 
          <EyeIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
          :
          <EyeSlashIcon className="-ml-0.5 h-5 w-5 text-gray-400" aria-hidden="true" />
          }
          
        </button>
        </div>
    </div>
  </div>

  )
}
