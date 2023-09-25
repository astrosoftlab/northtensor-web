import tensorCoins from '@assets/images/tensor-coins.png'
import wireframeCoin from '@assets/images/wireframe-coin.png'

export const FeaturedSection = () => {
  return (
    <section className="lg:mb-[80px] mb-[60px]">
      <div className="container">
        <h2 className="lg:mt-0 mt-[40px] text-center lg:mb-[16px] mb-[12px]">What is Decentralized AI?</h2>
        <div className="flex justify-center">
          <div className="text-body-lg text-gray text-center lg:mb-[50px] mb-[36px] lg:max-w-[620px] w-full">
            Decentralized AI refers to AI systems that are not controlled by a single entity. This means AI that is
            built, owned, and utilized by the people, instead of an AI that only serves the interests of the elite.
          </div>
        </div>
        <div className="flex flex-col items-center lg:gap-[50px] gap-[36px]">
          <div className="max-w-[960px] w-full rounded-lg p-[1px] bg-[linear-gradient(0deg,rgba(159,111,203,1)0%,rgba(107,56,152,1)50%,rgba(62,29,96,1)100%)]">
            <div className="lg:p-[48px] p-[36px] rounded-[7px] bg-[#060606]">
              <div className="lg:grid lg:grid-cols-2 flex flex-col-reverse lg:gap-[76px] gap-[57px]">
                <div className="flex items-center">
                  <div className="flex flex-col lg:gap-[10px] gap-[8px]">
                    <h3 className="font-semibold">Investment</h3>
                    <div className="lg:text-[15px] text-[14px] text-gray">
                      North Tensor invests in higher potential ground-breaking decentralized AI projects that will lead
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
            <div className="lg:p-[48px] p-[36px] rounded-[7px] bg-[#060606]">
              <div className="lg:grid lg:grid-cols-2 lg:flex-row-reverse flex flex-col-reverse lg:gap-[76px] gap-[57px]">
                <div className="flex items-center">
                  <div className="flex flex-col lg:gap-[10px] gap-[8px]">
                    <h3 className="font-semibold">Development</h3>
                    <div className="lg:text-[15px] text-[14px] text-gray">
                      North Tensor leverages our investments to flywheel return by incubating &amp; developing products
                      that utilize the decentralized solutions we invest in. 
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
