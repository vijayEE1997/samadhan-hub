import { Shield, Clock, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GuaranteeSectionProps {
  onPaymentClick: () => void;
}

const GuaranteeSection = ({ onPaymentClick }: GuaranteeSectionProps) => {
  const guarantees = [
    {
      icon: Shield,
      title: "60-Day Money Back Guarantee",
      description: "If you're not completely satisfied, get a full refund - no questions asked"
    },
    {
      icon: Clock,
      title: "Lifetime Access",
      description: "Download once, use forever. No subscriptions or recurring fees"
    },
    {
      icon: CheckCircle,
      title: "100% Natural",
      description: "All formulations use only natural ingredients found in your kitchen"
    }
  ];

  const benefits = [
    "No side effects or dependencies",
    "Proven by thousands of years of use",
    "Easy to follow step-by-step instructions",
    "Mobile-optimized for on-the-go access",
    "Instant digital download",
    "24/7 customer support"
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 sacred-heading">
            आपकी पूर्ण सुरक्षा / Your Complete Protection
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We're so confident in our ancient wisdom that we offer the strongest guarantee in the wellness industry
          </p>
        </div>

        {/* Guarantees Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {guarantees.map((guarantee, index) => (
            <div 
              key={index}
              className="group p-8 bg-card border border-primary/20 rounded-2xl hover:border-primary/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-glow text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                  <guarantee.icon className="w-12 h-12 text-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                {guarantee.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {guarantee.description}
              </p>
            </div>
          ))}
        </div>

        {/* Risk-Free Trial */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-2xl p-8 mb-16 border-2 border-green-200 dark:border-green-800">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-6 text-green-700 dark:text-green-300">
              🚀 60 दिनों के लिए जोखिम-मुक्त आज़माएँ / Try Risk-Free for 60 Days
            </h3>
            <p className="text-lg text-green-600 dark:text-green-400 mb-6 leading-relaxed">
              We're so confident you'll love the results that we give you a full 60 days to try everything. 
              If you're not completely satisfied, simply email us and get every penny back.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-green-600 dark:text-green-400">
              <span>✅ No Questions Asked</span>
              <span>✅ Full Refund</span>
              <span>✅ Keep the eBook</span>
              <span>✅ No Hassle</span>
            </div>
          </div>
        </div>

        {/* Benefits List */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Benefits */}
          <div>
            <h3 className="text-3xl font-bold mb-6 text-foreground">
              आज आपको क्या मिलेगा / What You Get Today
            </h3>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Value Proposition */}
          <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
            <h4 className="text-2xl font-bold mb-4 text-foreground">
              Incredible Value
            </h4>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Regular Price:</span>
                <span className="text-2xl font-bold text-red-500 line-through">₹2,997</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Today's Price:</span>
                <span className="text-3xl font-bold text-green-600">₹997</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">You Save:</span>
                <span className="text-xl font-bold text-green-600">₹2,000 (67% OFF)</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              ⚠️ This special pricing ends soon. Don't miss out!
            </p>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center p-8 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-2xl border border-primary/20">
          <h3 className="text-3xl font-bold mb-4 sacred-heading">
            Start Your Wellness Journey Today
          </h3>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands who have already discovered the power of ancient wisdom. 
            Your transformation starts now, guaranteed.
          </p>
          <Button 
            variant="sacred" 
            size="xl" 
            className="mb-4"
            onClick={onPaymentClick}
          >
            🔥 Get Started Now - Only ₹997
          </Button>
          <p className="text-sm text-muted-foreground">
            💰 60-Day Money Back Guarantee • ⚡ Instant Download • 📱 Mobile Optimized
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>100% Secure Payment</span>
            <ArrowRight className="w-4 h-4" />
            <span>Instant Access</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
