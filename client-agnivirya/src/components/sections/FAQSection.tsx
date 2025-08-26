import React, { useState } from 'react';
import { 
  ChevronDown, 
  HelpCircle, 
  BookOpen, 
  Target, 
  Zap, 
  Shield, 
  Users,
  MessageCircle,
  FileText,
  Star
} from 'lucide-react';

const FAQSection: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqData = [
    {
      question: "What exactly will I learn from this guide?",
      answer: "You'll master goal setting, productivity techniques, mindset transformation, and leadership skills. The guide covers everything from creating SMART goals to building confidence, managing time effectively, and inspiring others. It's a complete system for personal and professional success.",
      category: "learning"
    },
    {
      question: "How long does it take to see results?",
      answer: "Most people notice immediate improvements in focus and productivity within the first week. For deeper transformations like mindset shifts and leadership development, you'll see significant results within 4-6 weeks of consistent practice.",
      category: "results"
    },
    {
      question: "Is this suitable for beginners?",
      answer: "Absolutely! The guide is designed for all levels, from complete beginners to experienced professionals. We provide step-by-step guidance, making complex concepts accessible and easy to implement in your daily life.",
      category: "general"
    },
    {
      question: "What's included in the program?",
      answer: "You'll receive a comprehensive 200+ page guide, practical exercises, daily action plans, progress tracking tools, and lifetime access to updates. Plus, you get bonus resources for goal achievement and productivity enhancement.",
      category: "program"
    },
    {
      question: "Can I use this alongside my current work/studies?",
      answer: "Yes! The strategies are designed to complement and enhance your existing routine. You can integrate them gradually, starting with just 15-20 minutes per day. The techniques will actually make your current work more effective.",
      category: "integration"
    },
    {
      question: "What if I'm not satisfied with the program?",
      answer: "We offer a 30-day money-back guarantee. If you're not completely satisfied with your results, simply contact us and we'll provide a full refund, no questions asked. Your success is our priority.",
      category: "guarantee"
    },
    {
      question: "How is this different from other self-help books?",
      answer: "Unlike generic advice, our guide provides a proven, systematic approach that combines the best of psychology, productivity science, and real-world success stories. It's not just theory - it's a practical implementation system.",
      category: "difference"
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes! You'll have access to our success community, regular updates, and expert guidance. We're committed to your long-term success and provide support whenever you need it on your journey.",
      category: "support"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Questions', icon: HelpCircle },
    { id: 'learning', label: 'Learning', icon: BookOpen },
    { id: 'results', label: 'Results', icon: Target },
    { id: 'program', label: 'Program', icon: Zap },
    { id: 'support', label: 'Support', icon: Users }
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

  return (
    <section className="faq-section">
      <div className="faq-container">
        {/* FAQ Header */}
        <div className="faq-header">
          <div className="faq-badge">
            <HelpCircle className="icon" />
            <span>Got Questions?</span>
          </div>
          
          <h2 className="faq-title">
            Everything You Need to
            <span className="title-highlight"> Know</span>
          </h2>
          
          <p className="faq-description">
            Get answers to the most common questions about our comprehensive success guide. 
            Everything you need to know before starting your transformation journey.
          </p>
        </div>

        {/* Category Filter */}
        <div className="faq-categories">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
              >
                <IconComponent className="icon" />
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* FAQ Items */}
        <div className="faq-items">
          {filteredFAQs.map((item, index) => (
            <div key={index} className="faq-item">
              <button
                className="faq-question"
                onClick={() => toggleItem(index)}
                aria-expanded={openItems.includes(index)}
              >
                <span>{item.question}</span>
                <ChevronDown 
                  className={`chevron ${openItems.includes(index) ? 'open' : ''}`} 
                />
              </button>
              <div className={`faq-answer ${openItems.includes(index) ? 'open' : ''}`}>
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="support-cta">
          <div className="support-header">
            <h3>Still Have Questions?</h3>
            <p>Our success experts are here to help you on your journey</p>
          </div>
          
          <div className="support-options">
            <div className="support-option">
              <div className="support-icon">
                <MessageCircle className="icon" />
              </div>
              <div className="support-content">
                <h4>Live Chat Support</h4>
                <p>Get instant answers from our experts</p>
              </div>
            </div>
            
            <div className="support-option">
              <div className="support-icon">
                <FileText className="icon" />
              </div>
              <div className="support-content">
                <h4>Detailed Guide</h4>
                <p>Comprehensive program documentation</p>
              </div>
            </div>
            
            <div className="support-option">
              <div className="support-icon">
                <Users className="icon" />
              </div>
              <div className="support-content">
                <h4>Success Community</h4>
                <p>Connect with fellow achievers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="faq-final-cta">
          <div className="cta-content">
            <h3>Ready to Start Your Success Journey?</h3>
            <p>Join thousands who have already transformed their lives</p>
            <button 
              className="cta-button"
              onClick={() => {
                window.history.pushState({}, '', '/payment');
                window.dispatchEvent(new PopStateEvent('popstate'));
              }}
            >
              <Star className="icon" />
              <span>Get Started Now</span>
              <ChevronDown className="icon" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
