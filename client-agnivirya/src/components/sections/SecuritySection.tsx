interface SecuritySectionProps {
  onPaymentClick: () => void;
}

const SecuritySection = ({ onPaymentClick }: SecuritySectionProps) => {
  const securityFeatures = [
    {
      title: "Helmet Security",
      description: "Advanced HTTP headers protection",
      icon: "🛡️"
    },
    {
      title: "CORS Protection",
      description: "Cross-origin resource sharing security",
      icon: "🔒"
    },
    {
      title: "Rate Limiting",
      description: "DDoS and abuse prevention",
      icon: "⚡"
    },
    {
      title: "Input Validation",
      description: "Sanitized data processing",
      icon: "✅"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="sacred-heading text-4xl mb-4">
            Enterprise-Grade Security
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Built with security best practices to protect your application and users
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-lg transition-all duration-300 hover:scale-105 animate-float" style={{ 
              background: 'var(--gradient-earth)',
              boxShadow: 'var(--shadow-sacred)'
            }}>
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 sacred-heading">
                {feature.title}
              </h3>
              <p className="text-gray-700 mb-4">{feature.description}</p>
              <button
                onClick={onPaymentClick}
                className="font-medium transition-all duration-300 hover:scale-110"
                style={{ color: 'hsl(var(--primary))' }}
              >
                Learn More →
              </button>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <button
            onClick={onPaymentClick}
            className="px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 animate-sacred-glow"
            style={{ 
              background: 'var(--gradient-sacred)',
              boxShadow: 'var(--shadow-temple)',
              color: 'white'
            }}
          >
            Security Overview
          </button>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
