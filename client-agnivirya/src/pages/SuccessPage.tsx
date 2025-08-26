// @// React Hooks
import { useState, useEffect } from 'react'

// @// Constants
import { 
  SUCCESS_PAGE, 
  DOWNLOAD_ITEMS, 
  NEXT_STEPS
} from '@/constants'

// @// Icons
import { 
  CheckCircle, 
  Download, 
  ArrowLeft 
} from 'lucide-react'

// @// Types
interface SuccessPageProps {
  onBackToHome: () => void
}

export default function SuccessPage({ onBackToHome }: SuccessPageProps) {
  const [countdown, setCountdown] = useState<number>(SUCCESS_PAGE.COUNTDOWN_DURATION)
  const [showDownload, setShowDownload] = useState(false)

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setShowDownload(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleDownload = (itemName: string) => {
    // Simulate download
    console.log(`Downloading ${itemName}...`)
    // In a real app, this would trigger actual file download
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold sacred-heading text-green-600 mb-4">
            {SUCCESS_PAGE.SUCCESS_TITLE}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {SUCCESS_PAGE.SUCCESS_DESCRIPTION}
          </p>

          {!showDownload && (
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-blue-700 dark:text-blue-300">
                {SUCCESS_PAGE.COUNTDOWN_MESSAGE} <span className="font-bold">{countdown}</span> seconds...
              </p>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-card border border-primary/20 rounded-2xl p-8 shadow-glow mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">{SUCCESS_PAGE.ORDER_SUMMARY_TITLE}</h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            {DOWNLOAD_ITEMS.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  {/* Dynamic icon rendering would go here */}
                  <span className="text-2xl">📄</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {item.format}
                    </span>
                    <span className="text-xs text-muted-foreground">{item.size}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(item.name)}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-card border border-primary/20 rounded-2xl p-8 shadow-glow mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Your Wellness Journey Starts Here</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {NEXT_STEPS.map((step) => (
              <div key={step.step} className="flex items-start space-x-4">
                <div className={`w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center ${step.color}`}>
                  <span className="text-2xl">📋</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Step {step.step}: {step.title}
                  </h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  )
}
