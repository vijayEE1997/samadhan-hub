import React, { useState } from 'react';
import {
  ChevronDown,
  HelpCircle,
  BookOpen,
  Target,
  Zap,
  Users,
  MessageCircle,
  FileText,
  Crown,
  Shield,
  ArrowRight,
  Clock
} from 'lucide-react';
import './FAQSection.css';

const FAQSection: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqData = [
    {
      question: "What exactly will I learn from this guide?",
      answer: "You'll master goal setting, productivity techniques, mindset transformation, and leadership skills. The guide covers everything from creating SMART goals to building confidence, managing time effectively, and inspiring others.",
      category: "learning",
      icon: BookOpen,
      highlight: "200+ pages"
    },
    {
      question: "How long does it take to see results?",
      answer: "Most people notice immediate improvements in focus and productivity within the first week. For deeper transformations like mindset shifts and leadership development, you'll see significant results within 4-6 weeks of consistent practice.",
      category: "results",
      icon: Target,
      highlight: "4-6 weeks"
    },
    {
      question: "Is this suitable for beginners?",
      answer: "Absolutely! The guide is designed for all levels, from complete beginners to experienced professionals. We provide step-by-step guidance, making complex concepts accessible and easy to implement in your daily life.",
      category: "general",
      icon: HelpCircle,
      highlight: "All levels"
    },
    {
      question: "What's included in the program?",
      answer: "You'll receive a comprehensive 200+ page guide, practical exercises, daily action plans, progress tracking tools, and lifetime access to updates. Plus, you get bonus resources for goal achievement and productivity enhancement.",
      category: "program",
      icon: Zap,
      highlight: "Complete package"
    },
    {
      question: "Can I use this alongside my current work/studies?",
      answer: "Yes! The strategies are designed to complement and enhance your existing routine. You can integrate them gradually, starting with just 15-20 minutes per day. The techniques will actually make your current work more effective.",
      category: "integration",
      icon: Clock,
      highlight: "15-20 min/day"
    },
    {
      question: "What if I'm not satisfied with the program?",
      answer: "We offer a 30-day money-back guarantee. If you're not completely satisfied with your results, simply contact us and we'll provide a full refund, no questions asked. Your success is our priority.",
      category: "guarantee",
      icon: Shield,
      highlight: "30-day guarantee"
    }
  ];

  const categories = [
    { id: 'all', label: 'All', icon: HelpCircle, count: faqData.length },
    { id: 'learning', label: 'Learning', icon: BookOpen, count: faqData.filter(f => f.category === 'learning').length },
    { id: 'results', label: 'Results', icon: Target, count: faqData.filter(f => f.category === 'results').length },
    { id: 'program', label: 'Program', icon: Zap, count: faqData.filter(f => f.category === 'program').length }
  ];

  const filteredFAQs = activeCategory === 'all'
    ? faqData
    : faqData.filter(item => item.category === activeCategory);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const handleCTAClick = () => {
    window.history.pushState({}, '', '/payment');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container">
        {/* Compact FAQ Header */}
        <div className="faq-header">
          <div className="faq-badge">
            <Crown className="badge-icon" />
            <span className="badge-text">FAQ</span>
          </div>

          <h2 className="faq-title">
            Everything You Need to
            <span className="title-highlight"> Know</span>
          </h2>

          <p className="faq-description">
            Get answers to the most common questions about our comprehensive success guide.
          </p>
        </div>

        {/* Compact Category Filter */}
        <div className="faq-categories">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`category-btn premium ${activeCategory === category.id ? 'active' : ''}`}
              >
                <IconComponent className="category-icon" />
                <span className="category-label">{category.label}</span>
                <span className="category-count">({category.count})</span>
              </button>
            );
          })}
        </div>

        {/* Compact FAQ Items */}
        <div className="faq-items">
          {filteredFAQs.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="faq-item premium">
                <button
                  className="faq-question"
                  onClick={() => toggleItem(index)}
                  aria-expanded={openItems.includes(index)}
                >
                  <div className="question-content">
                    <IconComponent className="question-icon" />
                    <span className="question-text">{item.question}</span>
                  </div>
                  <div className="question-highlight">
                    <span className="highlight-text">{item.highlight}</span>
                  </div>
                  <ChevronDown
                    className={`chevron ${openItems.includes(index) ? 'open' : ''}`}
                  />
                </button>
                <div className={`faq-answer ${openItems.includes(index) ? 'open' : ''}`}>
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compact Support CTA */}
        <div className="support-cta premium">
          <div className="support-content">
            <h3>Still Have Questions?</h3>
            <div className="support-options">
              <div className="support-option">
                <MessageCircle className="icon" />
                <span>Live Chat Support</span>
              </div>
              <div className="support-option">
                <FileText className="icon" />
                <span>Detailed Guide</span>
              </div>
              <div className="support-option">
                <Users className="icon" />
                <span>Success Community</span>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Final CTA */}
        <div className="faq-final-cta premium">
          <h3>Ready to Transform Your Life?</h3>
          <p>Join thousands who have already discovered the power of our comprehensive guide</p>
          <button className="cta-button premium" onClick={handleCTAClick}>
            <span>Get My Guide at ₹99</span>
            <ArrowRight className="icon" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
