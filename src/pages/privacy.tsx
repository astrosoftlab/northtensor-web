import PrivacyContent from "@components/tailwindui/PrivacyContent"

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ")
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PrivacyContent />
      {}
    </>
  )
}
