import { useNavigate } from "react-router-dom";
import HeroSection from "../components/sections/HeroSection";
import FeaturesSection from "../components/sections/FeaturesSection";
import TechnologySection from "../components/sections/TechnologySection";
import BenefitsSection from "../components/sections/BenefitsSection";
import DemoSection from "../components/sections/DemoSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import SecuritySection from "../components/sections/SecuritySection";
import CTASection from "../components/sections/CTASection";
import Footer from "../components/Footer";
import ConfigBadge from "../components/ConfigBadge";
import ModeToggle from "../components/ModeToggle";

const Index = () => {
  const navigate = useNavigate();

  const handlePaymentClick = () => {
    navigate('/payment');
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--gradient-earth)' }}>
      <ModeToggle />
      <ConfigBadge />
      <HeroSection onPaymentClick={handlePaymentClick} />
      <FeaturesSection onPaymentClick={handlePaymentClick} />
      <TechnologySection onPaymentClick={handlePaymentClick} />
      <DemoSection onPaymentClick={handlePaymentClick} />
      <BenefitsSection onPaymentClick={handlePaymentClick} />
      <TestimonialsSection onPaymentClick={handlePaymentClick} />
      <SecuritySection onPaymentClick={handlePaymentClick} />
      <CTASection onPaymentClick={handlePaymentClick} />
      <Footer onPaymentClick={handlePaymentClick} />
    </div>
  );
};

export default Index;
