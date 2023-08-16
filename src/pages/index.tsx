import Image from "next/image"
import Link from "next/link"

export default function Index() {
  return (
    <main className="">
      <section className="relative" id="home">
        <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 ">
          <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 " />
          <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 " />
        </div>
        <div className="container">
          <div className="relative ml-auto py-44">
            <div className="mx-auto lg:w-4/5">
              <div className="flex flex-col-reverse justify-between sm:flex-row">
                <div className="w-full sm:w-3/5">
                  <h1 className="text-5xl font-bold leading-tight text-gray-900 md:text-6xl xl:text-7xl">
                    Build Your Project
                    <br />
                    on
                    <span className="text-primary "> Bittensor</span>
                  </h1>
                  <p className="mt-8 text-gray-700">
                    We are a Bittensor-first AI Firm aiming to utilize the inevitable union of economic efficiencies
                    provided through cryptocurrency technologies. Our focus is to create infrastructure required to
                    scale and support basic transformer-driven data extraction to Artificial General Intelligence.
                  </p>
                  <div className="flex flex-wrap mt-16 gap-y-4 gap-x-6">
                    <Link
                      href="/resources"
                      className="relative flex items-center justify-center w-full px-6 h-11 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                    >
                      <span className="relative text-base font-semibold text-white">Get started</span>
                    </Link>
                    <a
                      href="#"
                      className="relative flex items-center justify-center w-full px-6 h-11 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                    >
                      <span className="relative text-base font-semibold text-primary">Learn more</span>
                    </a>
                  </div>
                </div>
                <div className="relative flex-1 mb-16 sm:mb-0">
                  <Image src="/images/viking-ship.png" alt="" fill className="object-contain !relative sm:absolute" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}