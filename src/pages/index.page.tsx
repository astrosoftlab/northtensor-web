import Link from 'next/link'

import { Button } from '@components/ui/Button'

export default function Index() {
  return (
    <main className="">
      <section className="relative" id="home">
        <div className="container">
          <div className="relative ml-auto py-[16px]">
            <div className="mx-auto lg:w-4/5">
              <div className="flex flex-col-reverse justify-between text-center sm:flex-row">
                <div className="flex flex-col items-center w-full gap-8">
                  <div className="flex w-full justify-center border border-solid border-[#ffffff20] rounded-full text-white py-[10px] max-w-[480px]">
                    <span className="font-bold text-primary">NEW</span>&nbsp; • &nbsp;Bittensor-first AI Firm
                  </div>
                  <h1 className="text-5xl font-bold leading-tight text-white md:text-6xl xl:text-7xl">
                    Build Your Project on
                    <br className="only-desktop" />
                    Bittensor
                  </h1>
                  <p className="text-gray-200">
                    Our focus is to create infrastructure required to scale and support basic
                    <br className="only-desktop" />
                    transformer-driven data extraction to Artificial General Intelligence.
                  </p>
                  <div className="flex justify-center gap-y-4 gap-x-6">
                    <Link href="/resources">
                      <Button size="lg" weight="semibold" color="opacity">
                        Get started
                      </Button>
                    </Link>
                    <a href="#">
                      <Button size="lg" color="white" weight="semibold">
                        Learn more
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
