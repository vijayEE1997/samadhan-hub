interface TechnologySectionProps {
  onPaymentClick: () => void;
}

const TechnologySection = ({ onPaymentClick }: TechnologySectionProps) => {
  const technologies = [
    { name: "React 18", logo: "⚛️", description: "Latest React with concurrent features" },
    { name: "TypeScript", logo: "📘", description: "Type-safe JavaScript development" },
    { name: "Vite", logo: "⚡", description: "Fast build tool and dev server" },
    { name: "Express.js", logo: "🚂", description: "Fast, unopinionated web framework" },
    { name: "Tailwind CSS", logo: "🎨", description: "Utility-first CSS framework" },
    { name: "Vercel", logo: "☁️", description: "Serverless deployment platform" }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Built with Modern Tech Stack
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Leveraging cutting-edge technologies for optimal performance and developer experience
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {technologies.map((tech, index) => (
            <div key={index} className="p-6 rounded-lg transition-all duration-300 hover:scale-105 animate-float" style={{ 
              background: 'var(--gradient-earth)',
              boxShadow: 'var(--shadow-sacred)'
            }}>
              <div className="text-4xl mb-4">{tech.logo}</div>
              <h3 className="text-xl font-semibold mb-2 sacred-heading">{tech.name}</h3>
              <p className="text-gray-700 mb-4">{tech.description}</p>
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
              background: 'var(--gradient-temple)',
              boxShadow: 'var(--shadow-sacred)',
              color: 'white'
            }}
          >
            View Tech Stack
          </button>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
