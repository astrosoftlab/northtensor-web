import Image from "next/image"
import Link from "next/link"

const statuses = {
  Paid: "text-green-700 bg-green-50 ring-green-600/20",
  Withdraw: "text-slate-600 bg-slate-50 ring-slate-500/10",
  Overdue: "text-red-700 bg-red-50 ring-red-600/10",
}
const projects = [
  {
    id: 1,
    name: "NorthTensor",
    imageUrl: "/images/ntLOGO.svg",
    detail: {
      team: "NorthTensor",
      task: "NLP: Text Generation",
      summary: "Sample project placeholder to store new projects running on bittensor",
    },
  },
]

export default function Example() {
  return (
    <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8 ">
      {projects.map((project) => (
        <li key={project.id} className="overflow-hidden border rounded-xl border-slate-200">
          <div className="flex items-center p-6 border-b gap-x-4 border-slate-900/5 bg-slate-50">
            <Image
              src={project.imageUrl}
              width="150"
              height="150"
              alt={project.name}
              className="flex-none object-cover w-12 h-12 bg-white rounded-lg ring-1 ring-slate-900/10"
            />
            <div className="text-sm font-medium leading-6 text-slate-900">{project.name}</div>
          </div>
          <dl className="px-6 py-4 -my-3 text-sm leading-6 divide-y divide-slate-100">
            <div className="flex justify-between py-3 gap-x-4">
              <dt className="text-slate-500 ">Summary</dt>
              <dd className="text-slate-700 ">
                <p>{project.detail.summary}</p>
              </dd>
            </div>
            <div className="flex justify-between py-3 gap-x-4">
              <dt className="text-slate-500 ">Team</dt>
              <dd className="text-slate-700 ">
                <p>{project.detail.team}</p>
              </dd>
            </div>
            <div className="flex justify-between py-3 gap-x-4">
              <dt className="text-slate-500 ">Toolset</dt>
              <dd className="text-slate-700 ">
                <p>{project.detail.task}</p>
              </dd>
            </div>
          </dl>
        </li>
      ))}
      <Link
        type="button"
        href="/contact"
        className="relative block w-full p-12 text-center border-2 border-dashed rounded-lg border-slate-300 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
      >
        <span className="block mt-2 text-sm font-semibold text-slate-900 ">Your Project Here!</span>
      </Link>
    </ul>
  )
}
