import Navbar from "./tailwindui/Navbar";
import Footer from "./tailwindui/Footer";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      {/* You can add more things here  */}
    </>
  );
}