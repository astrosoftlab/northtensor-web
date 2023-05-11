import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import Landing from "@/components/tailwindui/Landing";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Feature from "@/components/tailwindui/Feature"
import Contact from "@/components/tailwindui/Contact"


function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <Contact />
      {}
    </>
  );
}