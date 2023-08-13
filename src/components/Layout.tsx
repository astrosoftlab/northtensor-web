import Footer from "./tailwindui/Footer"
import Header from "./tailwindui/Header"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      {/* You can add more things here  */}
    </>
  )
}
