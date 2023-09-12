import AiBrain from '@assets/icons/ai-brain.svg'
import Server from '@assets/icons/server.svg'
import Tensor from '@assets/icons/tensor.svg'
import rocketBoost from '@assets/images/rocket-boost.png'
import { BRD } from '@components/ui/BRD'

export const FeaturedSection = () => {
  return (
    <section className="relative lg:mb-[120px] mb-[90px]">
      <div className="container">
        <h1 className="lg:mt-0 mt-[40px] font-bold text-center lg:mb-[16px] mb-[12px]">What is Decentralized AI?</h1>
        <div className="flex justify-center">
          <div className="lg:text-[19px] text-[14px] text-gray-400 text-center lg:mb-[50px] mb-[36px] lg:max-w-[620px] w-full">
            Decentralized AI refers to AI systems that are not controlled by a single entity. This means AI that is
            built, owned, and utilized by the people, instead of an AI that only serves the interests of the elite.
          </div>
        </div>
        <div className="flex flex-col items-center lg:gap-[50px] gap-[36px]">
          <div className="max-w-[960px] w-full rounded-lg p-[1px] bg-[linear-gradient(0deg,rgba(159,111,203,1)0%,rgba(107,56,152,1)50%,rgba(62,29,96,1)100%)]">
            <div className="lg:p-[48px] p-[36px] rounded-[7px] bg-[#060606]">
              <div className="lg:grid lg:grid-cols-12 flex flex-col-reverse lg:gap-[10px] gap-[8px]">
                <div className="flex items-center col-span-5">
                  <div className="flex flex-col lg:gap-[10px] gap-[8px]">
                    <h3 className="font-semibold">
                      Why is <BRD />
                      Decentralized AI <BRD />
                      Important?
                    </h3>
                    <div className="lg:text-[15px] text-[14px] text-gray-200">
                      AI has the potential to be the most powerful technology ever created. We&apos;re at the inflection
                      point of AI, now is the time to ensure that AI is used for the benefit of all.
                    </div>
                  </div>
                </div>
                <div className="flex justify-start col-span-7 lg:mb-0 mb-[40px]">
                  <div className="lg:ml-[24px] lg:px-[30px] px-[24px] lg:py-[30px] py-[22px] border border-solid border-[#FFFFFF10] rounded-lg">
                    <Server width="100%" />
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
                    <Tensor width="100%" />
                  </div>
                </div>
                <div className="flex items-center col-span-5">
                  <div className="flex flex-col lg:gap-[10px] gap-[8px]">
                    <h3 className="font-semibold">Bittensor:</h3>
                    <div className="lg:text-[15px] text-[14px] text-gray-200">
                      Bittensor is the Bitcoin of Decentralized AI. Instead of compute power to run hashing algorithms,
                      Bittensor uses compute power to run AI algorithms. We&apos;re excited to be a part of the
                      Bittensor community and help grow the network. Show your support by buying Bittensor on MEXC.
                      Stake with NorthTensor to get 20% APY.
                    </div>
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
                    <h3 className="font-semibold">Investment</h3>
                    <div className="lg:text-[15px] text-[14px] text-gray-200">
                      We support and invest in Decentralized AI projects.
                    </div>
                  </div>
                </div>
                <div className="flex justify-start col-span-7 lg:mb-0 mb-[40px]">
                  <div className="lg:ml-[24px] lg:px-[30px] px-[24px] lg:py-[30px] py-[22px] border border-solid border-[#FFFFFF10] rounded-lg">
                    <AiBrain width="100%" />
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
                    <h3 className="font-semibold">Development</h3>
                    <div className="lg:text-[15px] text-[14px] text-gray-200">
                      We aim to demonstrate the potential of decentralized AI through innovation and development.Sign-up
                      to our newsletter to stay up to date and get early access to new AI products. We have some new
                      exciting products in the works.
                    </div>
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
