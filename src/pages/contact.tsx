import Contact from "@components/tailwindui/Contact"

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Contact />
      {}
    </>
  )
}
