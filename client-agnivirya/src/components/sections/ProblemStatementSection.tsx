import React from 'react';
import {
  Clock,
  Heart,
  DollarSign,
  AlertTriangle,
  Users,
  Shield,
  Leaf,
  Zap,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import './ProblemStatementSection.css';

const ProblemStatementSection: React.FC = () => {
  const { language, t } = useLanguage();
  
  const handleCTAClick = () => {
    window.history.pushState({}, '', '/payment');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };
  
  const statistics = [
    {
      icon: Users,
      percentage: "70-80%",
      description: language === 'en' ? "Indian men face sexual health issues" : "भारतीय पुरुष यौन स्वास्थ्य समस्याओं का सामना करते हैं"
    },
    {
      icon: Clock,
      percentage: "1 in 3",
      description: language === 'en' ? "Young men (18-30) suffer from premature ejaculation" : "युवा पुरुष (18-30) शीघ्रपतन से पीड़ित हैं"
    },
    {
      icon: Heart,
      percentage: "50%",
      description: language === 'en' ? "Men above 40 face erectile dysfunction" : "40 से ऊपर के पुरुष नपुंसकता का सामना करते हैं"
    },
    {
      icon: DollarSign,
      percentage: "₹2000-5000",
      description: language === 'en' ? "Monthly waste on fake products" : "नकली उत्पादों पर मासिक बर्बादी"
    }
  ];

  const comparisonData = [
    {
      title: language === 'en' ? 'Modern Medicine' : 'आधुनिक चिकित्सा',
      icon: AlertTriangle,
      color: 'red',
      points: [
        { text: language === 'en' ? "Expensive medications" : "महंगी दवाएं", icon: DollarSign },
        { text: language === 'en' ? "Side effects" : "दुष्प्रभाव", icon: XCircle },
        { text: language === 'en' ? "Temporary solutions" : "अस्थायी समाधान", icon: Clock },
        { text: language === 'en' ? "Chemical dependency" : "रासायनिक निर्भरता", icon: AlertTriangle }
      ]
    },
    {
      title: language === 'en' ? 'Ayurvedic Approach' : 'आयुर्वेदिक दृष्टिकोण',
      icon: Leaf,
      color: 'green',
      points: [
        { text: language === 'en' ? "Natural & safe" : "प्राकृतिक और सुरक्षित", icon: Leaf },
        { text: language === 'en' ? "No side effects" : "कोई दुष्प्रभाव नहीं", icon: Shield },
        { text: language === 'en' ? "Permanent results" : "स्थायी परिणाम", icon: CheckCircle },
        { text: language === 'en' ? "Holistic healing" : "समग्र उपचार", icon: Zap }
      ]
    }
  ];

  return (
    <section id="problem" className="problem-statement-section">
      <div className="problem-statement-container">
        {/* Compact Header */}
        <div className="section-header">
          <div className="problem-badge">
            <AlertTriangle className="badge-icon" />
            <span>CRITICAL ISSUE</span>
          </div>
          <h2 className="section-title">
            {language === 'en' 
              ? 'Modern Medicine Problems'
              : 'आधुनिक चिकित्सा की समस्याएं'
            }
          </h2>
          <p className="section-subtitle">
            {language === 'en'
              ? 'The harsh reality of chemical-based solutions and their devastating impact on men\'s health'
              : 'रासायनिक आधारित समाधानों की कठोर वास्तविकता और पुरुषों के स्वास्थ्य पर उनका विनाशकारी प्रभाव'
            }
          </p>
        </div>

        {/* Compact Statistics */}
        <div className="statistics-grid">
          {statistics.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="stat-card">
                <div className="stat-icon">
                  <IconComponent className="icon" />
                </div>
                <div className="stat-content">
                  <div className="stat-percentage">{stat.percentage}</div>
                  <div className="stat-description">{stat.description}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compact Comparison */}
        <div className="comparison-section">
          <h3 className="comparison-title">
            {language === 'en' ? 'Why Modern Medicine Fails' : 'आधुनिक चिकित्सा क्यों विफल होती है'}
          </h3>
          <div className="comparison-grid">
            {comparisonData.map((approach, index) => {
              const IconComponent = approach.icon;
              return (
                <div key={index} className={`approach-card ${approach.color}`}>
                  <div className="approach-header">
                    <IconComponent className="approach-icon" />
                    <h4 className="approach-title">{approach.title}</h4>
                  </div>
                  <ul className="approach-points">
                    {approach.points.map((point, idx) => {
                      const PointIcon = point.icon;
                      return (
                        <li key={idx} className="approach-point">
                          <PointIcon className="point-icon" />
                          <span>{point.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* Compact CTA */}
        <div className="problem-cta">
          <div className="cta-content">
            <h3 className="cta-title">
              {language === 'en' ? 'Ready for a Natural Solution?' : 'प्राकृतिक समाधान के लिए तैयार हैं?'}
            </h3>
            <p className="cta-subtext">
              {language === 'en' 
                ? 'Discover the ancient wisdom that modern medicine can\'t provide'
                : 'उस प्राचीन ज्ञान को खोजें जो आधुनिक चिकित्सा प्रदान नहीं कर सकती'
              }
            </p>
            <button className="cta-button" onClick={handleCTAClick}>
              <span>Get My Guide at ₹99</span>
              <Zap className="button-icon" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemStatementSection;
