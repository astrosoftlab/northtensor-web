import { Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import {
  CodeBracketIcon,
  ChartPieIcon,
  CpuChipIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  WalletIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

const navigation = [
  { name: 'Overview', href: '/resources', icon: HomeIcon},
  {
    name: 'Becoming a User',
    icon: UserGroupIcon,
    children: [
      { name: 'Getting Started', href: '/docs/client-intro', },
      { name: 'Purchase Guide', href: '/docs/purchase-tao', current: false },
      { name: 'Staking on North Tensor', href: '/docs/staker-intro' },
    ],
  },
  {
    name: 'Development',
    icon: CodeBracketIcon,
    current: false,
    children: [
      { name: 'Getting Started', href: '/docs/developer-intro' },
      { name: 'Installation Guide', href: '/docs/installing-bittensor' },
    ],
  },
  {
    name: 'Mining',
    icon: CpuChipIcon,
    current: false,
    children: [
      { name: 'Getting Started', href: '/docs/miner-intro' },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SidebarNav() {
  return (
    <div className="flex h-screen grow flex-col gap-y-5 overflow-y-auto border-r border-slate-200 bg-slate-100 px-6">
      <div className="flex h-2 shrink-0 items-center">
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  {!item.children ? (
                    <Link
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-slate-50' : 'hover:bg-slate-50',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-slate-700'
                      )}
                    >
                      <item.icon className="h-6 w-6 shrink-0 text-slate-400" aria-hidden="true" />
                      {item.name}
                    </Link>
                  ) : (
                    <Disclosure as="div" defaultOpen={true}>
                      {({ open }) => (
                        <>
                          <Disclosure.Button
                            className={classNames(
                              item.current ? 'bg-slate-50' : 'hover:bg-slate-50',
                              'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-slate-700'
                            )}
                          >
                            <item.icon className="h-6 w-6 shrink-0 text-slate-400" aria-hidden="true" />
                            {item.name}
                            <ChevronRightIcon
                              className={classNames(
                                open ? 'rotate-90 text-slate-500' : 'text-slate-400',
                                'ml-auto h-5 w-5 shrink-0'
                              )}
                              aria-hidden="true"
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel as="ul" className="mt-1 px-2">
                            {item.children.map((subItem) => (
                              <li key={subItem.name}>
                                {/* 44px */}
                                <Disclosure.Button
                                  as="a"
                                  href={subItem.href}
                                  className={classNames(
                                    subItem.current ? 'bg-slate-50' : 'hover:bg-slate-50',
                                    'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-slate-700'
                                  )}
                                >
                                  {subItem.name}
                                </Disclosure.Button>
                              </li>
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  )}
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  )
}
