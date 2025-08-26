interface DemoSectionProps {
  onPaymentClick: () => void;
}

const DemoSection = ({ onPaymentClick }: DemoSectionProps) => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            See It in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the power of our full-stack application with live demonstrations
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Interactive Demo
            </h3>
            <p className="text-gray-600 mb-6">
              Explore our application's features including server-side rendering, API integration, 
              and responsive design. See how seamlessly the frontend and backend work together.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                Real-time API responses
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                SSR performance
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-3">✓</span>
                Mobile-responsive design
              </li>
            </ul>
            <button
              onClick={onPaymentClick}
              className="px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 animate-sacred-glow"
              style={{ 
                background: 'var(--gradient-saffron)',
                boxShadow: 'var(--shadow-temple)',
                color: 'white'
              }}
            >
              Try Demo
            </button>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <div className="text-6xl mb-4">🎮</div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Live Demo</h4>
            <p className="text-gray-600 mb-4">Interactive demonstration of all features</p>
            <button
              onClick={onPaymentClick}
              className="px-6 py-3 rounded-lg font-medium transition-all duration-300 animate-sacred-glow"
              style={{ 
                background: 'var(--gradient-temple)',
                boxShadow: 'var(--shadow-sacred)',
                color: 'white'
              }}
            >
              Launch Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
