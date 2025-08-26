import { BookOpen, Download, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EBookShowcaseProps {
  onPaymentClick: () => void;
}

const EBookShowcase = ({ onPaymentClick }: EBookShowcaseProps) => {
  const features = [
    {
      icon: BookOpen,
      title: "10+ Ancient Formulations",
      description: "Time-tested recipes from ancient Ayurvedic texts"
    },
    {
      icon: Download,
      title: "Instant Digital Access",
      description: "Get your copy immediately after payment"
    },
    {
      icon: Clock,
      title: "Lifetime Access",
      description: "Download and use forever, no subscriptions"
    },
    {
      icon: Star,
      title: "5-Star Rated",
      description: "Trusted by thousands of wellness seekers"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 sacred-heading">
            आपकी पूर्ण कल्याण गाइड / Your Complete Wellness Guide
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover the ancient secrets that modern medicine has forgotten
          </p>
        </div>

        {/* eBook Preview */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: eBook Cover */}
          <div className="relative">
            <div className="relative mx-auto max-w-sm">
              {/* eBook Mockup */}
              <div className="relative bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="p-8 text-center">
                  <div className="w-24 h-32 bg-gradient-to-b from-primary to-accent rounded mx-auto mb-4 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    Agnivirya Complete Guide
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    प्राचीन ज्ञान, आधुनिक कल्याण / Ancient Wisdom for Modern Wellness
                  </p>
                  <div className="flex justify-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-4 text-foreground">
                अंदर क्या मिलेगा / What You'll Get Inside
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A comprehensive collection of ancient Ayurvedic formulations, modern adaptations, and step-by-step instructions to transform your health naturally.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-card rounded-lg border border-primary/10 hover:border-primary/20 transition-colors">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Button 
                variant="sacred" 
                size="xl" 
                className="w-full md:w-auto"
                onClick={onPaymentClick}
              >
                🔥 Get Your Copy Now - Only ₹997
              </Button>
              <p className="text-sm text-muted-foreground mt-2 text-center md:text-left">
                ⚡ Instant Download • 📱 Mobile Optimized • 💰 60-Day Money Back Guarantee
              </p>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center p-8 bg-gradient-to-r from-accent/10 via-primary/10 to-secondary/10 rounded-2xl border border-primary/20">
          <h4 className="text-2xl font-bold mb-4 text-foreground">
            Join 10,000+ Wellness Seekers
          </h4>
          <p className="text-muted-foreground mb-4">
            Who have already transformed their health with ancient wisdom
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span>✅ No Side Effects</span>
            <span>✅ Natural Ingredients</span>
            <span>✅ Proven Results</span>
            <span>✅ Expert Guidance</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EBookShowcase;
