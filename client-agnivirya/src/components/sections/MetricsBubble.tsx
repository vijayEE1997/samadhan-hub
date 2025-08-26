import React, { useEffect, useState } from 'react';
import { Users, Star, TrendingUp, Award, Zap, Shield } from 'lucide-react';

const MetricsBubble: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const metrics = [
    { icon: Users, number: "10K+", label: "Customers", color: "var(--primary)" },
    { icon: Star, number: "4.9", label: "Rating", color: "#fbbf24" },
    { icon: TrendingUp, number: "95%", label: "Success Rate", color: "var(--success)" },
    { icon: Award, number: "30", label: "Day Guarantee", color: "var(--accent)" },
    { icon: Zap, number: "200+", label: "Pages", color: "var(--primary)" },
    { icon: Shield, number: "100%", label: "Secure", color: "var(--success)" }
  ];

  useEffect(() => {
    // Show bubbles after page loads
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`metrics-bubble-container ${isVisible ? 'visible' : ''}`}>
      {/* Vertical Metrics Bubbles */}
      {metrics.map((metric, index) => {
        const IconComponent = metric.icon;
        
        return (
          <div
            key={index}
            className="metric-bubble"
            style={{
              animationDelay: `${index * 0.2}s`,
              '--metric-color': metric.color,
              '--bubble-index': index
            } as React.CSSProperties}
          >
            <div className="bubble-icon">
              <IconComponent className="icon" />
            </div>
            <div className="bubble-content">
              <div className="bubble-number">{metric.number}</div>
              <div className="bubble-label">{metric.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricsBubble;
