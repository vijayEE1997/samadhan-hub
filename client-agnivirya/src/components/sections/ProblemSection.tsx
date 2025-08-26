// @// Icons & Visual Elements
import { AlertTriangle, DollarSign, Clock, XCircle, Zap Heart } from "lucide-react";

interface ProblemSectionProps {
  }

const ProblemSection = ({ onPaymentClick }: ProblemSectionProps) => {
  const problems = [
    {
      icon: DollarSign,
      title: "महंगी दवाइयाँ / Expensive Medicines",
      description: "Modern medicines cost thousands and often don't work",
      color: "from-red-500/20 to-pink-500/20",
      border: "border-red-500/30",
      iconColor: "text-red-400"
    },
    {
      icon: XCircle,
      title: "खोखले वादे / Empty Promises",
      description: "Many products promise results but deliver nothing",
      color: "from-orange-500/20 to-red-500/20",
      border: "border-orange-500/30",
      iconColor: "text-orange-400"
    },
    {
      icon: AlertTriangle,
      title: "हानिकारक साइड इफेक्ट / Harmful Side Effects",
      description: "Chemical medicines cause more problems than they solve",
      color: "from-yellow-500/20 to-orange-500/20",
      border: "border-yellow-500/30",
      iconColor: "text-yellow-400"
    },
    {
      icon: Clock,
      title: "अस्थायी समाधान / Temporary Solutions",
      description: "Quick fixes that don't address the root cause",
      color: "from-blue-500/20 to-cyan-500/20",
      border: "border-blue-500/30",
      iconColor: "text-blue-400"
    }
  ];

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-slate-900 via-purple-900/50 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl animate-float"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent drop-shadow-2xl">
            आधुनिक दवाइयों की समस्याएँ / Problems with Modern Medicine
          </h2>
          
          <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium">
            Why traditional approaches often fail and leave you frustrated
          </p>
          
          {/* Decorative Line */}
          <div className="w-32 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 mx-auto rounded-full mt-8"></div>
        </div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {problems.map((problem, index) => (
            <div
              key={index}
              className={`group p-8 bg-gradient-to-br ${problem.color} rounded-3xl border ${problem.border} backdrop-blur-sm hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20`}
            >
              <div className="flex justify-center mb-6">
                <div className={`p-4 bg-gradient-to-br ${problem.color.replace('/20', '/40')} rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                  <problem.icon className={`w-10 h-10 ${problem.iconColor}`} />
                </div>
              </div>
              <h3 className="text-xl font-black mb-4 text-white text-center">
                {problem.title}
              </h3>
              <p className="text-gray-200 text-center leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        {/* Ancient Scroll Animation */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 rounded-3xl p-12 border-2 border-amber-500/30 shadow-2xl backdrop-blur-sm">
            {/* Corner Decorations */}
            <div className="absolute top-6 left-6 w-6 h-6 bg-amber-400 rounded-full animate-pulse"></div>
            <div className="absolute top-6 right-6 w-6 h-6 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-6 left-6 w-6 h-6 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-6 right-6 w-6 h-6 bg-amber-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>

            {/* Content */}
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-black mb-6 text-amber-300">
                📜 एक प्राचीन तरीका है जो भुला दिया गया है...
              </h3>
              <p className="text-xl text-amber-200 font-medium">
                "There is an ancient way that has been forgotten..."
              </p>
              
              {/* Decorative Line */}
              <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto rounded-full mt-6"></div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full px-8 py-4 border border-red-500/30">
            <Zap className="w-6 h-6 text-red-400 animate-pulse" />
            <span className="text-lg text-red-300 font-semibold">
              Ready to discover the ancient solution?
            </span>
            <Heart className="w-6 h-6 text-red-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
