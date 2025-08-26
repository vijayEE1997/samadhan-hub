// @// React Hooks
import { useState } from 'react'

// @// Contexts & Hooks
import { useLanguage } from '@/contexts/LanguageContext'

// @// Constants
import { LANGUAGES } from '@/constants'

// @// Icons
import { Globe } from 'lucide-react'

export default function LanguageToggle() {
  const { currentLanguage, toggleLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const handleLanguageChange = (language: { code: string; name: string; flag: string }) => {
    // This would trigger language change logic
    console.log('Language changed to:', language.name)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border hover:bg-background/90 transition-colors"
        aria-label="Toggle language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">
          {currentLanguage === 'English' ? 'EN' : 'HI'}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50">
          <div className="py-2">
            {LANGUAGES.SUPPORTED.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language)}
                className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-muted/50 transition-colors"
              >
                <span className="text-lg">{language.flag}</span>
                <span className="font-medium">{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
