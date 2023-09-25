import tensorGradian from '@assets/images/cropped-tensor-gradian.png'

export const ContactSection = () => {
  return (
    <section>
      <div className="container flex flex-col items-center text-center">
{/*         <h2 className="lg:mt-0 mt-[40px] text-center lg:mb-[16px] mb-[12px] lg:max-w-[767px]">
          Deliver an optimized User Experience
        </h2>
        <div className="flex justify-center">
          <div className="text-body-lg text-gray lg:max-w-[654px] w-full text-center lg:mb-[50px] mb-[36px]">
            Northtensor helps you reach the right person at your dream company.
          </div>
        </div> */}
        {/* <div className="flex flex-col items-center lg:gap-[50px] gap-[36px]">
          <div className="max-w-[960px] w-full rounded-lg p-[1px] bg-[linear-gradient(0deg,rgba(159,111,203,1)0%,rgba(107,56,152,1)50%,rgba(62,29,96,1)100%)]">
            <div className="flex justify-center lg:p-[48px] p-[36px] rounded-[7px] bg-[#060606]">
              <div className="max-w-[556px] w-full">
                <Input label="Name" placeholder="John Doe" className="lg:mb-[25px] mb-[22px]" />
                <Input label="Email*" placeholder="johndoe@example.com" className="lg:mb-[25px] mb-[22px]" />
                <Textarea label="Message*" rows={10} className="lg:mb-[50px] mb-[42px]" />
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
      <div className="h-[350px]" style={{ background: `url(${tensorGradian.src}) no-repeat center bottom` }}></div>
    </section>
  )
}
