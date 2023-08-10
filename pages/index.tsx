import Link from "next/link"

export default function Index() {
  return (
    <div className="mb-40 space-y-40">
      <section className="relative" id="home">
        <div
          aria-hidden="true"
          className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
        >
          <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
          <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
        </div>
        <div className="container">
          <div className="relative pt-48 ml-auto">
            <div className="mx-auto lg:w-4/5">
              <div className="flex flex-col-reverse justify-between sm:flex-row">
                <div>
                  <h1 className="text-5xl font-bold leading-tight text-gray-900 dark:text-white md:text-6xl xl:text-7xl">
                    Build Your Project
                    <br />
                    on
                    <span className="text-primary dark:text-white">
                      {" "}
                      Bittensor
                    </span>
                  </h1>
                  <p className="mt-8 text-gray-700 dark:text-gray-300">
                    We are a Bittensor-first AI Firm aiming to utilize the
                    inevitable union of economic efficiencies provided through
                    cryptocurrency technologies. Our focus is to create
                    infrastructure required to scale and support basic
                    transformer-driven data extraction to Artificial General
                    Intelligence.
                  </p>
                  <div className="flex flex-wrap mt-16 gap-y-4 gap-x-6">
                    <Link
                      href="/resources"
                      className="relative flex items-center justify-center w-full px-6 h-11 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
                    >
                      <span className="relative text-base font-semibold text-white">
                        Get started
                      </span>
                    </Link>
                    <a
                      href="#"
                      className="relative flex items-center justify-center w-full px-6 h-11 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
                    >
                      <span className="relative text-base font-semibold text-primary dark:text-white">
                        Learn more
                      </span>
                    </a>
                  </div>
                </div>
                <div className="mb-16 sm:mb-0">
                  <img src="/images/viking-ship.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
