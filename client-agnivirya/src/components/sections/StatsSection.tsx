import { Users, Award, Clock, TrendingUp, Star, Heart, Shield, Zap } from 'lucide-react';


const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      number: "50,000+",
      label: "Happy Customers",
      description: "Trusted by thousands worldwide"
    },
    {
      icon: Award,
      number: "99.2%",
      label: "Success Rate",
      description: "Proven results guaranteed"
    },
    {
      icon: Clock,
      number: "6-8",
      label: "Weeks to Results",
      description: "Fast, natural transformation"
    },
    {
      icon: Star,
      number: "4.9/5",
      label: "Customer Rating",
      description: "Excellent user experience"
    }
  ];

  const features = [
    {
      icon: Heart,
      title: "100% Natural",
      description: "Pure Ayurvedic ingredients"
    },
    {
      icon: Shield,
      title: "No Side Effects",
      description: "Safe for daily use"
    },
    {
      icon: Zap,
      title: "Instant Access",
      description: "Download immediately"
    },
    {
      icon: TrendingUp,
      title: "Proven Results",
      description: "Scientifically validated"
    }
  ];

  return (
    <section className="stats-section">
      {/* Background Elements */}
      <div className="stats-bg-pattern"></div>
      
      <div className="stats-container">
        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stats-item">
              <div className="stats-icon-container">
                <stat.icon className="stats-icon" />
              </div>
              <div className="stats-number">{stat.number}</div>
              <div className="stats-label">{stat.label}</div>
              <div className="stats-description">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="stats-features">
          <h2 className="stats-features-title">
            Why Choose AgniVirya?
          </h2>
          
          <div className="stats-features-grid">
            {features.map((feature, index) => (
              <div key={index} className="stats-feature-item">
                <div className="stats-feature-icon-container">
                  <feature.icon className="stats-feature-icon" />
                </div>
                <h3 className="stats-feature-title">
                  {feature.title}
                </h3>
                <p className="stats-feature-description">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badge */}
        <div className="stats-trust-badge">
          <div className="stats-trust-container">
            <div className="stats-trust-item">
              <Shield className="stats-trust-icon" />
              <span>SSL Secured</span>
            </div>
            <div className="stats-trust-divider"></div>
            <div className="stats-trust-item">
              <Award className="stats-trust-icon" />
              <span>60-Day Guarantee</span>
            </div>
            <div className="stats-trust-divider"></div>
            <div className="stats-trust-item">
              <Clock className="stats-trust-icon" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
