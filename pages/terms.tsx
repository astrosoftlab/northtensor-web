import Landing from "@/components/tailwindui/Landing";
import Feature from "@/components/tailwindui/Feature";
import TermsContent from "@/components/tailwindui/TermsContent";


function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TermsContent />
      {}
    </>
  );
}