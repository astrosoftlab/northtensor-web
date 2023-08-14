export default function Example() {
  return (
    <div className="bg-slate-100 py-24 sm:py-32 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-16 divide-y divide-slate-100 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 ">Give us a Ping</h2>
              <p className="mt-4 leading-7 text-slate-600 ">
                Don&apos;t hesitate to reach out if you&apos;re interested in NorthTensor and Bittensor. We&apos;re
                happy to collaborate.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
              <div className="rounded-2xl bg-slate-50 p-10">
                <h3 className="text-base font-semibold leading-7 text-slate-900">Info</h3>
                <dl className="mt-3 space-y-1 text-sm leading-6 text-slate-600">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a className="font-semibold text-[#8BAC42]" href="mailto:contact@northtensor.ai">
                        contact@northtensor.ai
                      </a>
                    </dd>
                  </div>
                  <div className="mt-1">
                    <dt className="sr-only">Detail</dt>
                    <dd>For the general business stuff.</dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-2xl bg-slate-50 p-10">
                <h3 className="text-base font-semibold leading-7 text-slate-900">Marketing</h3>
                <dl className="mt-3 space-y-1 text-sm leading-6 text-slate-600">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a className="font-semibold text-[#8BAC42]" href="mailto:andre@northtensor.ai">
                        andre@northtensor.ai
                      </a>
                    </dd>
                  </div>
                  <div className="mt-1">
                    <dt className="sr-only">Detail</dt>
                    <dd>For the marketing and external promotions.</dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-2xl bg-slate-50 p-10">
                <h3 className="text-base font-semibold leading-7 text-slate-900">Site Suggestions & Requests</h3>
                <dl className="mt-3 space-y-1 text-sm leading-6 text-slate-600">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a className="font-semibold text-[#8BAC42]" href="mailto:site@northtensor.ai">
                        site@northtensor.ai
                      </a>
                    </dd>
                  </div>
                  <div className="mt-1">
                    <dt className="sr-only">Detail</dt>
                    <dd>
                      For the site improvement suggestions, or if you want to show up on our Built on Bittensor page.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
