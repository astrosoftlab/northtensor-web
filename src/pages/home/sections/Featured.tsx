import tensorCoins from '@assets/images/tensor-coins.png'
import wireframeCoin from '@assets/images/wireframe-coin.png'

export const FeaturedSection = () => {
  return (
    <section className="sm:mb-[80px] mb-[60px]">
      <div className="container">
        <h2 className="break-normal sm:mt-0 mt-[40px] text-center sm:mb-[16px] mb-[12px]">What is Decentralized AI?</h2>
        <div className="flex justify-center">
          <div className="break-normal text-body-lg text-gray text-center sm:mb-[50px] mb-[36px] sm:max-w-[620px] w-full">
            Decentralized AI refers to AI systems that are not controlled by a single entity. This means AI that is
            built, owned, and utilized by the people, instead of an AI that only serves the interests of the elite.
          </div>
        </div>
        <div className="flex flex-col items-center sm:gap-[50px] gap-[36px]">
          <div className="max-w-[960px] w-full rounded-lg p-[1px] bg-[linear-gradient(0deg,rgba(159,111,203,1)0%,rgba(107,56,152,1)50%,rgba(62,29,96,1)100%)]">
            <div className="sm:p-[48px] p-[36px] rounded-[7px] bg-[#060606]">
              <div className="sm:grid sm:grid-cols-2 flex flex-col-reverse sm:gap-[76px] gap-[57px]">
                <div className="flex items-center">
                  <div className="flex flex-col sm:gap-[10px] gap-[8px]">
                    <h3 className="font-semibold">Investment</h3>
                    <div className="break-normal sm:text-[15px] text-[14px] text-gray">
                      NorthTensor invests in higher potential ground-breaking Decentralized AI projects that will lead
                      the next generation of disruption & innovation.
                    </div>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="border border-solid border-[#FFFFFF10] rounded-lg">
                    <img src={tensorCoins.src} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-[960px] w-full rounded-lg p-[1px] bg-[linear-gradient(0deg,rgba(159,111,203,1)0%,rgba(107,56,152,1)50%,rgba(62,29,96,1)100%)]">
            <div className="sm:p-[48px] p-[36px] rounded-[7px] bg-[#060606]">
              <div className="sm:grid sm:grid-cols-2 sm:flex-row-reverse flex flex-col-reverse sm:gap-[76px] gap-[57px]">
                <div className="flex items-center">
                  <div className="flex flex-col sm:gap-[10px] gap-[8px]">
                    <h3 className="font-semibold">Development</h3>
                    <div className="break-normal sm:text-[15px] text-[14px] text-gray">
                      NorthTensor leverages our investments to flywheel return by incubating &amp; developing products
                      that utilize the Decentralized AI solutions we invest in.
                    </div>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="border border-solid border-[#FFFFFF10] rounded-lg">
                    <img src={wireframeCoin.src} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
