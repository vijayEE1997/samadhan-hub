// @// Contexts & Hooks
import { useLanguage } from "@/contexts/LanguageContext";

// @// Icons & Visual Elements
import { ShoppingCart, Home, TrendingUp } from "lucide-react";

// @// UI Components
import { Button } from "@/components/ui/button";

interface SolutionSectionProps {
  onPaymentClick: () => void;
}

const SolutionSection = ({ onPaymentClick }: SolutionSectionProps) => {
  const steps = [
    {
      icon: ShoppingCart,
      step: "Step 1",
      title: "आसानी से खरीदें / Buy Easily",
      description: "Get instant access to ancient Ayurvedic wisdom through our secure platform",
      color: "text-primary"
    },
    {
      icon: Home,
      step: "Step 2", 
      title: "घर पर तैयार करें / Prepare at Home",
      description: "Follow simple recipes using natural ingredients found in your kitchen",
      color: "text-accent"
    },
    {
      icon: TrendingUp,
      step: "Step 3",
      title: "असर महसूस करें / Feel Results",
      description: "Experience natural transformation within 6-8 weeks", 
      color: "text-secondary"
    }
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 sacred-heading">
            प्राचीन समाधान / The Ancient Solution
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Rediscover the wisdom that has been passed down for thousands of years
          </p>
        </div>
        
        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center group">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-3/4 w-full h-0.5 bg-gradient-to-r from-primary/30 to-accent/30 z-0"></div>
              )}
              
              {/* Step Content */}
              <div className="relative z-10">
                {/* Icon Circle */}
                <div className="flex justify-center mb-6">
                  <div className={`p-6 bg-card border-2 border-primary/20 rounded-full group-hover:border-primary/40 transition-all duration-300 group-hover:scale-110 shadow-temple group-hover:shadow-glow`}>
                    <step.icon className={`w-12 h-12 ${step.color}`} />
                  </div>
                </div>
                
                {/* Step Number */}
                <span className="inline-block bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  {step.step}
                </span>
                
                {/* Step Title */}
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  {step.title}
                </h3>
                
                {/* Step Description */}
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Results Promise */}
        <div className="bg-gradient-to-r from-accent/10 via-primary/10 to-secondary/10 rounded-2xl p-8 text-center border border-primary/20">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-4 sacred-heading">
              6-8 हफ्तों में अंतर महसूस करें / Feel the Difference in 6-8 Weeks
            </h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Our ancient formulations work with your body's natural rhythms to restore health and vitality
            </p>
            <Button variant="sacred" size="lg" onClick={onPaymentClick}>
              अपनी यात्रा शुरू करें / Start Your Journey
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
