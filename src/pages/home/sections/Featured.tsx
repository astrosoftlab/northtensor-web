import Link from 'next/link'

import rocketBoost from '@assets/images/rocket-boost.png'
import server from '@assets/images/server.png'
import { BRD } from '@components/ui/BRD'
import { Button } from '@components/ui/Button'

export const FeaturedSection = () => {
  return (
    <section className="relative lg:mb-[120px] mb-[90px]">
      <div className="container">
        <h1 className="lg:mt-0 mt-[40px] font-bold text-center lg:mb-[16px] mb-[12px]">
          Deliver an optimized User <BRD />
          Experience
        </h1>
        <h5 className="text-gray-200 text-center lg:mb-[50px] mb-[36px]">
          Northtensor helps you reach the right person at your dream company.
        </h5>
        <div className="flex flex-col items-center lg:gap-[50px] gap-[36px]">
          <div className="max-w-[960px] w-full rounded-lg p-[1px] bg-[linear-gradient(0deg,rgba(159,111,203,1)0%,rgba(107,56,152,1)50%,rgba(62,29,96,1)100%)]">
            <div className="lg:p-[48px] p-[36px] rounded-[7px] bg-[#060606]">
              <div className="lg:grid lg:grid-cols-12 flex flex-col-reverse lg:gap-[10px] gap-[8px]">
                <div className="flex items-center col-span-5">
                  <div className="flex flex-col lg:gap-[10px] gap-[8px]">
                    <h3 className="font-semibold">AI-Powered Assessment</h3>
                    <div className="lg:text-[15px] text-[14px] text-gray-200">
                      Refer new users to Tensor and get 2%
                      <BRD />
                      of every dollar they spend or earn, up to
                      <BRD />
                      $100k.
                    </div>

                    <Link href="#">
                      <Button size="lg" weight="semibold" color="blur">
                        Send a Referral
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="flex justify-start col-span-7 lg:mb-0 mb-[40px]">
                  <div className="lg:ml-[24px] lg:px-[30px] px-[24px] lg:py-[30px] py-[22px] border border-solid border-[#FFFFFF10] rounded-lg">
                    <img src={server.src} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-[960px] w-full rounded-lg p-[1px] bg-[linear-gradient(0deg,rgba(159,111,203,1)0%,rgba(107,56,152,1)50%,rgba(62,29,96,1)100%)]">
            <div className="lg:p-[48px] p-[36px] rounded-[7px] bg-[#060606]">
              <div className="lg:grid grid-cols-12 lg:gap-[10px] gap-[8px]">
                <div className="flex justify-start col-span-7 lg:mb-0 mb-[40px]">
                  <div className="lg:px-[30px] px-[24px] lg:py-[30px] py-[22px] border border-solid border-[#FFFFFF10] rounded-lg">
                    <img src={server.src} alt="" />
                  </div>
                </div>
                <div className="flex items-center col-span-5">
                  <div className="flex flex-col lg:gap-[10px] gap-[8px]">
                    <h3 className="font-semibold">AI-Powered Assessment</h3>
                    <div className="lg:text-[15px] text-[14px] text-gray-200">
                      Refer new users to Tensor and get 2%
                      <BRD />
                      of every dollar they spend or earn, up to
                      <BRD />
                      $100k.
                    </div>

                    <Link href="#">
                      <Button size="lg" weight="semibold" color="blur">
                        Send a Referral
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-[960px] w-full rounded-lg p-[1px] bg-[linear-gradient(0deg,rgba(159,111,203,1)0%,rgba(107,56,152,1)50%,rgba(62,29,96,1)100%)]">
            <div className="lg:p-[48px] p-[36px] rounded-[7px] bg-[#060606]">
              <div className="lg:grid lg:grid-cols-12 flex flex-col-reverse lg:gap-[10px] gap-[8px]">
                <div className="flex items-center col-span-5">
                  <div className="flex flex-col lg:gap-[10px] gap-[8px]">
                    <h3 className="font-semibold">AI-Powered Assessment</h3>
                    <div className="lg:text-[15px] text-[14px] text-gray-200">
                      Refer new users to Tensor and get 2%
                      <BRD />
                      of every dollar they spend or earn, up to
                      <BRD />
                      $100k.
                    </div>

                    <Link href="#">
                      <Button size="lg" weight="semibold" color="blur">
                        Send a Referral
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="flex justify-start col-span-7 lg:mb-0 mb-[40px]">
                  <div className="lg:ml-[24px] lg:px-[30px] px-[24px] lg:py-[30px] py-[22px] border border-solid border-[#FFFFFF10] rounded-lg">
                    <img src={server.src} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-[960px] w-full rounded-lg p-[1px] bg-[linear-gradient(0deg,rgba(159,111,203,1)0%,rgba(107,56,152,1)50%,rgba(62,29,96,1)100%)]">
            <div className="relative lg:p-[48px] p-[36px] rounded-[7px] bg-[#060606]">
              <div className="lg:grid grid-cols-12 lg:gap-[10px] gap-[8px]">
                <div className="relative z-10 flex items-center col-span-6">
                  <div className="flex flex-col lg:gap-[10px] gap-[8px]">
                    <h3 className="font-semibold">
                      About staking and
                      <BRD />
                      link to staking page
                    </h3>
                    <div className="lg:text-[15px] text-[14px] text-gray-200">
                      Refer new users to Tensor and get 2% of every dollar
                      <BRD />
                      they spend or earn, up to $100k.
                    </div>

                    <Link href="#">
                      <Button size="lg" weight="semibold" color="blur">
                        Send a Referral
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="z-0 flex justify-start col-span-6 lg:h-auto h-[224px]">
                  <img src={rocketBoost.src} alt="" className="absolute bottom-0 right-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
