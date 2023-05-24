import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import Landing from "@/components/tailwindui/Landing";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Feature from "@/components/tailwindui/Feature"
import LogoCards from "@/components/tailwindui/LogoCards"


function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <div className="min-h-screen bg-slate-100 py-24 sm:py-32 dark:bg-slate-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 dark:text-slate-100">
      <p> Projects Built on Bittensor </p>
      <div className="mx-auto max-w-10xl"><LogoCards /></div>
    </div>
    </div>
    </div>
    </>
  );
}