import Link from "next/link"

export default function Example() {
  return (
    <>
      <footer className="relative flex flex-col items-center gap-16 py-16 overflow-hidden 2xl:py-[55px] md:py-[59px] bg-cyan-900">
        <div className="flex flex-col sm:flex-row justify-between gap-8 relative z-[1] container max-w-2xl text-white">
          <div className="flex items-center gap-1">
            <img src="/images/solo-white.png" alt="" className="w-auto h-6" />
            <span>NorthTensor © 2023</span>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href={"/terms"} className="hover:text-secondary">
              Terms of Use
            </Link>
            <Link href={"/privacy"} className="hover:text-secondary">
              Privacy Policy
            </Link>
            <Link href={"/contact"} className="hover:text-secondary">
              Contact Us
            </Link>
            <div className="flex flex-row gap-4 sm:flex-row">
              <Link
                href="https://discordapp.com/channels/1086368192521318472/1087797623924195408"
                className="flex items-center space-x-3 transition hover:text-secondary"
              >
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5">
                  <path
                    fillRule="evenodd"
                    d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                href="https://twitter.com/NorthTensorAI"
                className="flex items-center space-x-3 transition hover:text-secondary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-5"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center h-full"
        ></div>
        <div
          aria-hidden="true"
          className="absolute inset-0 w-full h-full bg-[#020314] opacity-80"
        />
      </footer>
    </>
  )
}
