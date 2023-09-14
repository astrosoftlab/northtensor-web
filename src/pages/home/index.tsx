import { BannerSection } from './sections/Banner'
import { ContactSection } from './sections/Contact'
import { FeaturedSection } from './sections/Featured'

export const Home = () => {
  return (
    <main className="">
      <BannerSection />
      <FeaturedSection />
      <ContactSection />
    </main>
  )
}
