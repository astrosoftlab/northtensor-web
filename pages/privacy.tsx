import Landing from "@/components/tailwindui/Landing";
import Feature from "@/components/tailwindui/Feature";
import PrivacyContent from "@/components/tailwindui/PrivacyContent";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PrivacyContent />
      {}
    </>
  );
}