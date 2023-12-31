import Link from 'next/link'

import { Button } from '@components/ui/Button'

export default function Example() {
  return (
    <main className="grid min-h-full px-6 py-24 bg-white place-items-center sm:py-32 sm:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-slate-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">Page not found</h1>
        <p className="mt-6 text-base leading-7 text-slate-600">Sorry, we couldn’t find the page you’re looking for.</p>
        <div className="flex items-center justify-center mt-10 gap-x-6">
          <Link href="/">
            <Button>Go back home</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
