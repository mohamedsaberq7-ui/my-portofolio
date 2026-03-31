import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen font-sans text-[#4a4a4a] overflow-x-hidden selection:bg-[#8eb19d] selection:text-white">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
