import React from 'react';
import {
  Leaf,
  Clock,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Heart,
  Shield,
  Crown,
  BookOpen,
  Target,
  BookMarked
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import './RecipePreviewSection.css';

const RecipePreviewSection: React.FC = () => {
  const { language, t } = useLanguage();
  
  // Navigation handler for payment page
  const handleCTAClick = () => {
    window.history.pushState({}, '', '/payment');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };
  
  const recipes = [
    {
      id: 1,
      hindiName: "अश्वगंधा रसायन",
      englishName: "Ashwagandha Rasayana",
      forCondition: [
        { icon: Zap, text: language === 'en' ? "Stamina" : "सहनशक्ति" },
        { icon: Heart, text: language === 'en' ? "Stress Relief" : "तनाव मुक्ति" },
        { icon: Shield, text: language === 'en' ? "Vitality" : "जीवन शक्ति" }
      ],
      results: "3-4 weeks",
      cost: "~₹50/month",
      benefits: [
        language === 'en' ? "Improves stamina" : "सहनशक्ति बढ़ाता है",
        language === 'en' ? "Reduces stress" : "तनाव कम करता है",
        language === 'en' ? "Enhances nerve strength" : "तंत्रिका शक्ति बढ़ाता है"
      ],
      image: "ashwagandha",
      premium: true,
      rating: 4.9,
      users: "50K+"
    },
    {
      id: 2,
      hindiName: "शिलाजीत एनर्जी टॉनिक",
      englishName: "Shilajit Energy Tonic",
      forCondition: [
        { icon: Zap, text: language === 'en' ? "Energy" : "ऊर्जा" },
        { icon: Heart, text: language === 'en' ? "Vitality" : "जीवन शक्ति" },
        { icon: Shield, text: language === 'en' ? "Strength" : "शक्ति" }
      ],
      results: "3-4 weeks",
      cost: "~₹60/month",
      benefits: [
        language === 'en' ? "Boosts energy" : "ऊर्जा बढ़ाता है",
        language === 'en' ? "Improves vitality" : "जीवन शक्ति बढ़ाता है",
        language === 'en' ? "Enhances performance" : "प्रदर्शन बढ़ाता है"
      ],
      image: "shilajit",
      premium: true,
      rating: 4.8,
      users: "45K+"
    },
    {
      id: 3,
      hindiName: "गोक्षुरा वाइटैलिटी चाय",
      englishName: "Gokshura Vitality Tea",
      forCondition: [
        { icon: Heart, text: language === 'en' ? "Erection" : "स्तंभन" },
        { icon: Shield, text: language === 'en' ? "Urinary Health" : "मूत्र स्वास्थ्य" },
        { icon: Zap, text: language === 'en' ? "Stamina" : "सहनशक्ति" }
      ],
      results: "4 weeks",
      cost: "~₹40/month",
      benefits: [
        language === 'en' ? "Strengthens erection" : "स्तंभन शक्ति बढ़ाता है",
        language === 'en' ? "Improves urinary health" : "मूत्र स्वास्थ्य बढ़ाता है",
        language === 'en' ? "Boosts stamina" : "सहनशक्ति बढ़ाता है"
      ],
      image: "gokshura",
      premium: true,
      rating: 4.7,
      users: "42K+"
    }
  ];

  const marketComparison = [
    {
      solution: language === 'en' ? "Chemical Pills" : "रासायनिक गोलियां",
      cost: "₹2000-5000/month",
      duration: language === 'en' ? "Temporary" : "अस्थायी",
      sideEffects: language === 'en' ? "Yes, Liver/Heart damage" : "हाँ, लीवर/दिल को नुकसान",
      results: language === 'en' ? "Dependency" : "निर्भरता",
      icon: Shield,
      color: "var(--saffron)"
    },
    {
      solution: language === 'en' ? "Fake Ayurvedic Capsules" : "नकली आयुर्वेदिक कैप्सूल",
      cost: "₹500-1000/month",
      duration: language === 'en' ? "Limited" : "सीमित",
      sideEffects: language === 'en' ? "Adulterated" : "मिलावटी",
      results: language === 'en' ? "Inconsistent" : "असंगत",
      icon: Leaf,
      color: "var(--deep-green)"
    },
    {
      solution: language === 'en' ? "AgniVirya Guide" : "अग्निवीर्य गाइड",
      cost: "₹99 one-time",
      duration: language === 'en' ? "Lifetime" : "आजीवन",
      sideEffects: language === 'en' ? "None, 100% Natural" : "कोई नहीं, 100% प्राकृतिक",
      results: language === 'en' ? "Permanent Results" : "स्थायी परिणाम",
      icon: Crown,
      color: "var(--saffron)"
    }
  ];

  const whyChooseAgniVirya = [
    {
      icon: Crown,
      title: language === 'en' ? "Premium Quality" : "प्रीमियम गुणवत्ता",
      description: language === 'en' ? "Authentic recipes from ancient texts" : "प्राचीन ग्रंथों से प्रामाणिक व्यंजन"
    },
    {
      icon: Target,
      title: language === 'en' ? "Proven Results" : "सिद्ध परिणाम",
      description: language === 'en' ? "Thousands of success stories" : "हजारों सफलता की कहानियां"
    },
    {
      icon: Shield,
      title: language === 'en' ? "100% Safe" : "100% सुरक्षित",
      description: language === 'en' ? "No side effects, natural ingredients" : "कोई दुष्प्रभाव नहीं, प्राकृतिक तत्व"
    },
    {
      icon: Clock,
      title: language === 'en' ? "Lifetime Access" : "आजीवन पहुंच",
      description: language === 'en' ? "One payment, unlimited access" : "एक बार भुगतान, असीमित पहुंच"
    }
  ];

  return (
    <section id="recipes" className="recipe-preview-section">
      <div className="recipe-preview-container">
        {/* Premium Section Header */}
        <div className="section-header">
          <div className="premium-badge">
            <BookOpen className="badge-icon" />
            <span className="badge-text">
              {language === 'en' ? 'PREMIUM RECIPES' : 'प्रीमियम व्यंजन'}
            </span>
          </div>
          <h2 className="section-title">
            {language === 'en' 
              ? 'Your Complete Wellness Guide'
              : 'आपकी पूरी कल्याण गाइड'
            }
          </h2>
          <p className="section-subtitle">
            {language === 'en'
              ? 'Discover ancient Ayurvedic recipes that have been transforming lives for centuries'
              : 'प्राचीन आयुर्वेदिक व्यंजनों को खोजें जो सदियों से जीवन बदल रहे हैं'
            }
          </p>
        </div>

        {/* Premium Recipe Cards */}
        <div className="recipes-grid">
          {recipes.map((recipe, index) => {
            return (
              <div key={recipe.id} className="recipe-card premium">
                <div className="recipe-header">
                  <div className="recipe-badge">
                    <Crown className="badge-icon" />
                    <span>PREMIUM</span>
                  </div>
                  <div className="recipe-rating">
                    <Star className="star-icon" />
                    <span className="rating-text">{recipe.rating}</span>
                    <span className="users-text">({recipe.users})</span>
                  </div>
                </div>
                
                <div className="recipe-content">
                  <h3 className="recipe-title">
                    <span className="hindi-name">{recipe.hindiName}</span>
                    <span className="english-name">{recipe.englishName}</span>
                  </h3>
                  
                  <div className="recipe-conditions">
                    <h4 className="conditions-title">
                      {language === 'en' ? 'For:' : 'के लिए:'}
                    </h4>
                    <div className="conditions-list">
                      {recipe.forCondition.map((condition, idx) => {
                        const ConditionIcon = condition.icon;
                        return (
                          <div key={idx} className="condition-item">
                            <ConditionIcon className="condition-icon" />
                            <span>{condition.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="recipe-details">
                    <div className="detail-item">
                      <Clock className="detail-icon" />
                      <div className="detail-content">
                        <span className="detail-label">
                          {language === 'en' ? 'Results in:' : 'परिणाम:'}
                        </span>
                        <span className="detail-value">{recipe.results}</span>
                      </div>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">
                          {language === 'en' ? 'Cost:' : 'लागत:'}
                        </span>
                        <span className="detail-value">{recipe.cost}</span>
                      </div>
                  </div>
                  
                  <div className="recipe-benefits">
                    <h4 className="benefits-title">
                      {language === 'en' ? 'Key Benefits:' : 'मुख्य लाभ:'}
                    </h4>
                    <ul className="benefits-list">
                      {recipe.benefits.map((benefit, idx) => (
                        <li key={idx} className="benefit-item">
                          <CheckCircle className="benefit-icon" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Market Comparison */}
        <div className="comparison-section premium">
          <h3 className="comparison-title">
            {language === 'en' ? 'Why Choose AgniVirya Over Market Solutions?' : 'बाजार के समाधानों पर अग्निवीर्य को क्यों चुनें?'}
          </h3>
          <div className="comparison-table">
            <div className="table-header">
              <div className="header-cell">
                {language === 'en' ? 'Solution' : 'समाधान'}
              </div>
              <div className="header-cell">
                {language === 'en' ? 'Cost' : 'लागत'}
              </div>
              <div className="header-cell">
                {language === 'en' ? 'Duration' : 'अवधि'}
              </div>
              <div className="header-cell">
                {language === 'en' ? 'Side Effects' : 'दुष्प्रभाव'}
              </div>
              <div className="header-cell">
                {language === 'en' ? 'Results' : 'परिणाम'}
              </div>
            </div>
            {marketComparison.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className={`table-row ${index === 2 ? 'highlighted' : ''}`}>
                  <div className="table-cell">
                    <div className="solution-info">
                      <IconComponent className="solution-icon" style={{ color: item.color }} />
                      <span className="solution-name">{item.solution}</span>
                    </div>
                  </div>
                  <div className="table-cell">
                    <span className="cost-value">{item.cost}</span>
                  </div>
                  <div className="table-cell">
                    <span className="duration-value">{item.duration}</span>
                  </div>
                  <div className="table-cell">
                    <span className="side-effects-value">{item.sideEffects}</span>
                  </div>
                  <div className="table-cell">
                    <span className="results-value">{item.results}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why Choose AgniVirya Section */}
        <div className="why-choose-section">
          <h3 className="why-choose-title">
            {language === 'en' ? 'What Makes AgniVirya Special?' : 'अग्निवीर्य को विशेष क्या बनाता है?'}
          </h3>
          <div className="features-grid">
            {whyChooseAgniVirya.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="feature-card premium">
                  <div className="feature-icon">
                    <IconComponent className="icon" />
                  </div>
                  <h4 className="feature-title">{feature.title}</h4>
                  <p className="feature-description">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Premium Call-to-Action */}
        <div className="recipe-cta premium">
          <div className="cta-content">
            <div className="cta-header">
              <h3 className="cta-title">
                {language === 'en' ? 'Ready to Experience Science-Backed Results?' : 'विज्ञान-समर्थित परिणामों का अनुभव करने के लिए तैयार हैं?'}
              </h3>
              <p className="cta-subtext">
                {language === 'en' 
                  ? 'Get your complete wellness guide with 200+ premium recipes for just ₹99'
                  : 'सिर्फ ₹99 में 200+ प्रीमियम व्यंजनों के साथ अपनी पूरी कल्याण गाइड प्राप्त करें'
                }
              </p>
            </div>
            
            <div className="cta-features">
              <div className="cta-feature">
                <CheckCircle className="feature-check" />
                <span>{language === 'en' ? '200+ Premium Recipes' : '200+ प्रीमियम व्यंजन'}</span>
              </div>
              <div className="cta-feature">
                <CheckCircle className="feature-check" />
                <span>{language === 'en' ? 'Instant Access' : 'तत्काल पहुंच'}</span>
              </div>
              <div className="cta-feature">
                <CheckCircle className="feature-check" />
                <span>{language === 'en' ? 'Lifetime Updates' : 'आजीवन अपडेट'}</span>
              </div>
            </div>
            
            <button className="cta-button premium" onClick={handleCTAClick}>
              <span className="button-text">
                {language === 'en' ? 'Get My Guide at ₹99' : '₹99 में मेरी गाइड प्राप्त करें'}
              </span>
              <ArrowRight className="button-arrow" />
            </button>
            
            <p className="cta-note">
              {language === 'en' 
                ? 'Join 50,000+ people who have transformed their lives with AgniVirya'
                : '50,000+ लोगों में शामिल हों जिन्होंने अग्निवीर्य के साथ अपना जीवन बदल लिया है'
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecipePreviewSection;
