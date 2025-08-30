import React from 'react';
import './MobileHeader.css';

interface MobileHeaderProps {
  onPaymentClick?: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onPaymentClick }) => {

  return (
    <header className="mobile-header">
      <div className="mobile-header-container">
        <div className="mobile-logo">
          <span className="mobile-logo-icon">🌿</span>
          <span className="mobile-logo-text">Agnivirya</span>
        </div>
        
        <div className="mobile-header-actions">
          <button 
            className="mobile-cta-button"
            onClick={onPaymentClick}
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
