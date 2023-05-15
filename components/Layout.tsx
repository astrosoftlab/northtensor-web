import Navbar from "./tailwindui/Navbar";
import Footer from "./tailwindui/Footer";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="bg-slate-500 text-white p-4">
      <p className="text-center">
        mnrv.ai has renamed to North Tensor, UID may still show mnrv.ai
      </p>
      </div>
      {children}
      <Footer />
      {/* You can add more things here  */}
    </>
  );
}