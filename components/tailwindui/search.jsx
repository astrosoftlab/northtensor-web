export default function Search() {
  return (
    <div>
      <label htmlFor="search" className="block text-sm font-medium leading-6 text-slate-900">
        Quick search
      </label>
      <div className="relative mt-2 flex items-center">
        <input
          type="text"
          name="search"
          id="search"
          className="block w-full rounded-md border-0 py-1.5 pr-14 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded border border-slate-200 px-1 font-sans text-xs text-slate-400">
            ⌘K
          </kbd>
        </div>
      </div>
    </div>
  )
}