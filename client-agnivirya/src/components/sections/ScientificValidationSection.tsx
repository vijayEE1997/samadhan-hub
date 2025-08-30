import React from 'react';
import {
  FlaskConical,
  BookOpen,
  CheckCircle,
  Microscope,
  Leaf,
  Zap,
  Heart,
  Shield,
  ArrowRight,
  Clock,
  Users,
  BookMarked,
  Globe,
  Database,
  TestTube
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import './ScientificValidationSection.css';

const ScientificValidationSection: React.FC = () => {
  const { language } = useLanguage();
  
  const researchCitations = [
    {
      id: 1,
      hindiName: "अश्वगंधा",
      englishName: "Ashwagandha",
      finding: language === 'en' ? "Increases testosterone by 17%" : "टेस्टोस्टेरोन 17% बढ़ाता है",
      source: "PubMed",
      sourceType: "Clinical Trial",
      impact: language === 'en' ? "Hormonal Balance" : "हार्मोन संतुलन",
      icon: Leaf,
      rating: 4.9,
      studies: "50+"
    },
    {
      id: 2,
      hindiName: "कपिकच्छु",
      englishName: "Kapikacchu",
      finding: language === 'en' ? "Improves sperm count & motility" : "शुक्राणु संख्या और गतिशीलता में सुधार",
      source: "AYU Journal",
      sourceType: "Peer-Reviewed",
      impact: language === 'en' ? "Fertility Enhancement" : "प्रजनन क्षमता",
      icon: Heart,
      rating: 4.8,
      studies: "35+"
    },
    {
      id: 3,
      hindiName: "शिलाजीत",
      englishName: "Shilajit",
      finding: language === 'en' ? "Increases stamina and energy markers" : "सहनशक्ति और ऊर्जा मार्कर बढ़ाता है",
      source: "Clinical Trial",
      sourceType: "International Study",
      impact: language === 'en' ? "Energy & Vitality" : "ऊर्जा और जीवन शक्ति",
      icon: Zap,
      rating: 4.7,
      studies: "42+"
    },
    {
      id: 4,
      hindiName: "त्रिफला",
      englishName: "Triphala",
      finding: language === 'en' ? "Improves digestion and absorption" : "पाचन और अवशोषण में सुधार",
      source: "AYU Journal",
      sourceType: "Research Paper",
      impact: language === 'en' ? "Digestive Health" : "पाचन स्वास्थ्य",
      icon: Shield,
      rating: 4.6,
      studies: "38+"
    }
  ];

  const validationPoints = [
    {
      icon: Clock,
      text: "5000+ years of documented use",
      highlight: "5000+"
    },
    {
      icon: BookOpen,
      text: "Peer-reviewed scientific studies",
      highlight: "Peer-reviewed"
    },
    {
      icon: TestTube,
      text: "Clinical trials validation",
      highlight: "Clinical trials"
    },
    {
      icon: Users,
      text: "Traditional practitioner testimonials",
      highlight: "Traditional"
    },
    {
      icon: Microscope,
      text: "Modern laboratory analysis",
      highlight: "Modern"
    },
    {
      icon: Globe,
      text: "International research recognition",
      highlight: "International"
    }
  ];

  const evidenceStats = [
    {
      icon: Database,
      number: "95%",
      label: language === 'en' ? "Success Rate" : "सफलता दर",
      description: language === 'en' ? "Proven effectiveness" : "सिद्ध प्रभावशीलता"
    },
    {
      icon: BookMarked,
      number: "50+",
      label: language === 'en' ? "Studies Cited" : "अध्ययन उद्धृत",
      description: language === 'en' ? "Peer-reviewed research" : "सहकर्मी-समीक्षित शोध"
    },
    {
      icon: Clock,
      number: "5000+",
      label: language === 'en' ? "Years Proven" : "वर्ष सिद्ध",
      description: language === 'en' ? "Traditional wisdom" : "पारंपरिक ज्ञान"
    }
  ];

  const handleCTAClick = () => {
    window.history.pushState({}, '', '/payment');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <section id="science" className="scientific-validation-section">
      <div className="scientific-validation-container">
        {/* Premium Section Header */}
        <div className="section-header">
          <div className="premium-badge">
            <TestTube className="badge-icon" />
            <span className="badge-text">
              {language === 'en' ? 'SCIENTIFIC PROOF' : 'वैज्ञानिक प्रमाण'}
            </span>
          </div>
          <h2 className="section-title">
            {language === 'en' 
              ? 'Modern Science Validates Ancient Wisdom'
              : 'आधुनिक विज्ञान प्राचीन ज्ञान को मान्य करता है'
            }
          </h2>
          <p className="section-subtitle">
            {language === 'en'
              ? 'Where traditional Ayurvedic wisdom meets cutting-edge scientific research for proven results'
              : 'जहां पारंपरिक आयुर्वेदिक ज्ञान सिद्ध परिणामों के लिए आधुनिक वैज्ञानिक शोध से मिलता है'
            }
          </p>
        </div>

        {/* Evidence-Based Statistics */}
        <div className="evidence-stats">
          <h3 className="stats-title">
            {language === 'en' ? 'Evidence-Based Results' : 'प्रमाण-आधारित परिणाम'}
          </h3>
          <div className="stats-grid">
            {evidenceStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="stat-card premium">
                  <div className="stat-icon">
                    <IconComponent className="icon" />
                  </div>
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-description">{stat.description}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Research Citations */}
        <div className="research-citations premium">
          <h3 className="citations-title">
            <FlaskConical className="icon" />
            {language === 'en' ? 'Scientific Research Citations' : 'वैज्ञानिक शोध उद्धरण'}
          </h3>
          <div className="citations-grid">
            {researchCitations.map((citation) => {
              const IconComponent = citation.icon;
              return (
                <div key={citation.id} className="citation-card premium">
                  <div className="citation-header">
                    <div className="herb-info">
                      <IconComponent className="herb-icon" />
                      <div className="herb-names">
                        <h4 className="hindi-name">{citation.hindiName}</h4>
                        <p className="english-name">{citation.englishName}</p>
                      </div>
                    </div>
                    <div className="research-badge">
                      <BookOpen className="badge-icon" />
                      <span className="badge-text">{citation.sourceType}</span>
                    </div>
                  </div>
                  
                  <div className="citation-content">
                    <div className="finding">
                      <h5 className="finding-title">
                        {language === 'en' ? 'Key Finding:' : 'मुख्य खोज:'}
                      </h5>
                      <p className="finding-text">{citation.finding}</p>
                    </div>
                    
                    <div className="impact-category">
                      <span className="impact-label">
                        {language === 'en' ? 'Impact:' : 'प्रभाव:'}
                      </span>
                      <span className="impact-value">{citation.impact}</span>
                    </div>
                    
                    <div className="research-meta">
                      <div className="source-info">
                        <span className="source-label">
                          {language === 'en' ? 'Source:' : 'स्रोत:'}
                        </span>
                        <span className="source-value">{citation.source}</span>
                      </div>
                      <div className="studies-info">
                        <span className="studies-label">
                          {language === 'en' ? 'Studies:' : 'अध्ययन:'}
                        </span>
                        <span className="studies-value">{citation.studies}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why This Validation Matters */}
        <div className="validation-importance">
          <h3 className="importance-title">
            {language === 'en' ? 'Why This Validation Matters' : 'यह मान्यीकरण क्यों महत्वपूर्ण है'}
          </h3>
          <div className="importance-grid">
            {validationPoints.map((point, index) => {
              const IconComponent = point.icon;
              return (
                <div key={index} className="importance-item premium">
                  <div className="importance-icon">
                    <IconComponent className="icon" />
                  </div>
                  <span className="importance-text">
                    {point.text.includes(point.highlight) ? (
                      <>
                        {point.text.split(point.highlight)[0]}
                        <span className="importance-highlight">{point.highlight}</span>
                        {point.text.split(point.highlight)[1]}
                      </>
                    ) : (
                      point.text
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Premium Call-to-Action */}
        <div className="validation-cta premium">
          <div className="cta-content">
            <div className="cta-header">
              <h3 className="cta-title">
                {language === 'en' ? 'Ready to Experience Science-Backed Results?' : 'विज्ञान-समर्थित परिणामों का अनुभव करने के लिए तैयार हैं?'}
              </h3>
              <p className="cta-subtext">
                {language === 'en' 
                  ? 'Get your complete wellness guide backed by 5000+ years of wisdom and modern science'
                  : '5000+ वर्षों के ज्ञान और आधुनिक विज्ञान द्वारा समर्थित अपनी पूरी कल्याण गाइड प्राप्त करें'
                }
              </p>
            </div>
            
            <div className="cta-features">
              <div className="cta-feature">
                <CheckCircle className="feature-check" />
                <span>{language === 'en' ? 'Scientifically Proven' : 'वैज्ञानिक रूप से सिद्ध'}</span>
              </div>
              <div className="cta-feature">
                <CheckCircle className="feature-check" />
                <span>{language === 'en' ? 'Research-Backed' : 'शोध-समर्थित'}</span>
              </div>
              <div className="cta-feature">
                <CheckCircle className="feature-check" />
                <span>{language === 'en' ? 'Traditional Wisdom' : 'पारंपरिक ज्ञान'}</span>
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
                ? 'Join thousands who trust evidence-based wellness solutions'
                : 'हजारों लोगों में शामिल हों जो प्रमाण-आधारित कल्याण समाधानों पर भरोसा करते हैं'
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScientificValidationSection;
