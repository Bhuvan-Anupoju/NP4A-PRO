import { useLenis } from "./hooks/useLenis";
import Navbar from "./components/Navbar";
import FloatingParticles from "./components/FloatingParticles";
import ScrollProgress from "./components/ScrollProgress";
import HeroSection from "./sections/HeroSection";
import ColorShowcase from "./components/ColorShowcase";
import FeaturesSection from "./sections/FeaturesSection";
import Specs from "./components/Specs";
import MarqueeBanner from "./components/MarqueeBanner";
import PricingSection from "./sections/PricingSection";
import Footer from "./components/Footer";

export default function App() {
  useLenis();

  return (
    <>
      <FloatingParticles count={18} />
      <ScrollProgress />
      <Navbar />

      <main>
        <HeroSection />
        <ColorShowcase />
        <FeaturesSection />
        <Specs />
        <MarqueeBanner />
        <PricingSection />
        <Footer />
      </main>
    </>
  );
}
