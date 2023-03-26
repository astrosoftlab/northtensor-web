import Navbar from "./Navbar";
import Footer from "./Footer";
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      {/* You can add more things here  */}
    </>
  );
}