import { PlusIcon } from "@heroicons/react/20/solid"

export default function Index() {
  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-slate-300" />
      </div>
      <div className="relative flex justify-center">
        <span className="px-2 bg-white text-slate-500">
          <PlusIcon className="w-5 h-5 text-slate-500" aria-hidden="true" />
        </span>
      </div>
    </div>
  )
}
