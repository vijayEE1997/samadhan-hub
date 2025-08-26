import { Flame, Clock, Shield, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  onPaymentClick: () => void;
}

const CTASection = ({ onPaymentClick }: CTASectionProps) => {
  const urgencyFeatures = [
    {
      icon: Clock,
      text: "Limited Time Offer",
      color: "text-red-500"
    },
    {
      icon: Flame,
      text: "Special Pricing",
      color: "text-orange-500"
    },
    {
      icon: Shield,
      text: "Risk-Free Trial",
      color: "text-green-500"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Main CTA */}
        <div className="text-center p-12 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-3xl border-2 border-primary/20 shadow-glow">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 sacred-heading">
            आपकी कल्याण यात्रा अभी शुरू होती है / Your Wellness Journey Starts Now
          </h2>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Don't wait another day to experience the life-changing power of ancient Ayurvedic wisdom. 
            Your transformation is just one click away.
          </p>

          {/* Urgency Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {urgencyFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-full px-6 py-3 border border-primary/20">
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
                <span className="font-medium text-foreground">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Price Display */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-3xl text-muted-foreground line-through">₹1,999</span>
              <span className="text-6xl font-bold text-primary">₹99</span>
            </div>
            <p className="text-lg text-muted-foreground">
              You Save <span className="font-bold text-green-600">₹1,900 (95% OFF)</span>
            </p>
          </div>

          {/* Main CTA Button */}
          <Button 
            variant="sacred" 
            size="xl" 
            className="mb-6 text-2xl px-12 py-6"
            onClick={onPaymentClick}
          >
            🔥 आज ही शुरू करें - अपना स्वास्थ्य बदलें / Get Started Now - Transform Your Health
            <ArrowRight className="w-6 h-6 ml-2" />
          </Button>

          {/* Guarantee */}
          <p className="text-lg text-muted-foreground mb-4">
            💰 60-Day Money Back Guarantee • No Questions Asked
          </p>
          
          {/* Security */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>100% Secure Payment • SSL Encrypted</span>
          </div>
        </div>

        {/* Urgency Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-2xl p-8 border-2 border-red-200 dark:border-red-800">
            <h3 className="text-3xl font-bold mb-4 text-red-700 dark:text-red-300">
              ⚠️ सीमित समय का ऑफर - मिस न करें! / Limited Time Offer - Don't Miss Out!
            </h3>
            <p className="text-lg text-red-600 dark:text-red-400 mb-6">
              This special pricing is available for a limited time only. 
              Once the offer expires, the price returns to ₹1,999.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">24</div>
                <div className="text-sm text-red-500 dark:text-red-400">Hours Left</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">47</div>
                <div className="text-sm text-red-500 dark:text-red-400">Copies Left</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">₹2,000</div>
                <div className="text-sm text-red-500 dark:text-red-400">You Save</div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Reminder */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4 text-foreground">
            Remember: Your Health is Your Wealth
          </h3>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Every day you wait is another day of suffering. 
            Take action now and start your journey to natural wellness today.
          </p>
          <Button 
            variant="sacred" 
            size="lg" 
            onClick={onPaymentClick}
          >
            🚀 Start My Transformation Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
