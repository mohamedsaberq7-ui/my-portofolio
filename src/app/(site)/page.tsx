import AboutSection from "@/components/sections/AboutSection";
import CertificateSection from "@/components/sections/CertificateSection";
import ContactSection from "@/components/sections/ContactSection";
import ExprianceSection from "@/components/sections/ExprianceSection";
import HeroScreen from "@/components/sections/HeroSection";

export default async function Home() {
  return (
    <>
      <HeroScreen />
      <AboutSection />
      <ExprianceSection />
      <CertificateSection />
      {/* <ContactSection /> */}
    </>
  );
}
