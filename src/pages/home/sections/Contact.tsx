import TensorIcon from '@assets/icons/northtensor-gray.svg'

export const ContactSection = () => {
  return (
    <section>
      <div className="container flex flex-col items-center text-center">
        {/*         <h2 className="sm:mt-0 mt-[40px] text-center sm:mb-[16px] mb-[12px] sm:max-w-[767px]">
          Deliver an optimized User Experience
        </h2>
        <div className="flex justify-center">
          <div className="text-body-lg text-gray sm:max-w-[654px] w-full text-center sm:mb-[50px] mb-[36px]">
            Northtensor helps you reach the right person at your dream company.
          </div>
        </div> */}
        {/* <div className="flex flex-col items-center sm:gap-[50px] gap-[36px]">
          <div className="max-w-[960px] w-full rounded-lg p-[1px] bg-[linear-gradient(0deg,rgba(159,111,203,1)0%,rgba(107,56,152,1)50%,rgba(62,29,96,1)100%)]">
            <div className="flex justify-center sm:p-[48px] p-[36px] rounded-[7px] bg-[#060606]">
              <div className="max-w-[556px] w-full">
                <Input label="Name" placeholder="John Doe" className="sm:mb-[25px] mb-[22px]" />
                <Input label="Email*" placeholder="johndoe@example.com" className="sm:mb-[25px] mb-[22px]" />
                <Textarea label="Message*" rows={10} className="sm:mb-[50px] mb-[42px]" />
                <Link href="#">
                  <Button size="lg" weight="semibold" color="blur" full>
                    Send Message
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div className="relative flex justify-center overflow-hidden md:h-[400px] h-[140px]">
        <div className="orbital-bg-gradient-transition relative md:w-[1200px] md:h-[1200px] w-[375px] h-[375px]" />
        <div className="absolute w-full h-full md:top-[160px] top-[50px]">
          <div className="absolute-center orbital-nucleus-gradient-transition flex justify-center items-center md:w-[240px] md:h-[240px] w-[120px] h-[120px] md:-ml-[120px] md:-mt-[120px] -ml-[60px] -mt-[60px] rounded-full">
            <TensorIcon className="lg:w-[180px] w-[70px] lg:h-[180px] h-[70px]" />
          </div>
        </div>
      </div>
    </section>
  )
}
