import { Heart, Shield, Leaf, Zap, Clock, Users } from "lucide-react";

interface BenefitsSectionProps {
  onPaymentClick: () => void;
}

const BenefitsSection = ({ onPaymentClick }: BenefitsSectionProps) => {
  const benefits = [
    {
      icon: Heart,
      title: "Natural Healing",
      description: "Work with your body's natural rhythms, not against them",
      color: "text-red-500"
    },
    {
      icon: Shield,
      title: "No Side Effects",
      description: "Pure natural ingredients that your body recognizes and accepts",
      color: "text-blue-500"
    },
    {
      icon: Leaf,
      title: "Sustainable Health",
      description: "Long-term wellness solutions, not quick fixes",
      color: "text-green-500"
    },
    {
      icon: Zap,
      title: "Fast Results",
      description: "Feel the difference in as little as 2-3 weeks",
      color: "text-yellow-500"
    },
    {
      icon: Clock,
      title: "Time-Tested",
      description: "Formulas that have worked for thousands of years",
      color: "text-purple-500"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join thousands of wellness seekers on the same journey",
      color: "text-pink-500"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 sacred-heading">
            Why Choose Ancient Wisdom?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover the advantages that make traditional Ayurvedic approaches superior to modern alternatives
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group p-6 bg-card border border-primary/20 rounded-xl hover:border-primary/40 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-glow"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors`}>
                  <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {benefit.title}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-card border border-primary/20 rounded-2xl p-8 mb-16">
          <h3 className="text-3xl font-bold text-center mb-8 sacred-heading">
            Ancient vs Modern: The Truth
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Ancient Approach */}
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl border-2 border-green-200 dark:border-green-800">
              <h4 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-4">
                🌿 Ancient Ayurvedic Approach
              </h4>
              <ul className="space-y-3 text-left">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✅</span>
                  <span>Natural ingredients</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✅</span>
                  <span>No side effects</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✅</span>
                  <span>Addresses root cause</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✅</span>
                  <span>Long-term wellness</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✅</span>
                  <span>Affordable & accessible</span>
                </li>
              </ul>
            </div>

            {/* Modern Approach */}
            <div className="text-center p-6 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 rounded-xl border-2 border-red-200 dark:border-red-800">
              <h4 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-4">
                💊 Modern Medical Approach
              </h4>
              <ul className="space-y-3 text-left">
                <li className="flex items-center gap-2">
                  <span className="text-red-600">❌</span>
                  <span>Chemical compounds</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-600">❌</span>
                  <span>Side effects common</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-600">❌</span>
                  <span>Treats symptoms only</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-600">❌</span>
                  <span>Temporary relief</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-600">❌</span>
                  <span>Expensive & complex</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center p-8 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-2xl border border-primary/20">
          <h3 className="text-3xl font-bold mb-4 sacred-heading">
            Ready to Experience the Difference?
          </h3>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands who have already discovered the power of ancient wisdom for modern wellness
          </p>
          <button
            onClick={onPaymentClick}
            className="bg-gradient-to-r from-primary to-accent text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-accent hover:to-primary transition-all duration-300 transform hover:scale-105 shadow-glow"
          >
            🔥 Start Your Wellness Journey Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
