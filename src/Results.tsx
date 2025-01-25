import { Brain } from 'lucide-react'
import { useLocation } from 'react-router-dom'

export default function Results() {
  const location = useLocation()
  const answers = location.state?.answers || 'No answers recorded'

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl mb-8">
            <h1 className="text-4xl font-bold mb-4">
              Quiz Results
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Here are your quiz selections:
            </p>
            
            {/* Debug Info */}
            <div className="mt-8 p-6 bg-white/5 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Your Selections</h2>
              <div className="flex items-center gap-4">
                <Brain className="w-8 h-8 text-pink-400" />
                <div>
                  <p className="text-lg">Answer sequence:</p>
                  <code className="text-2xl font-mono bg-white/10 px-4 py-2 rounded">
                    {answers}
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Loading Animation */}
          <div className="text-center mt-12">
            <div className="animate-pulse">
              <Brain className="w-16 h-16 mx-auto text-pink-400 mb-4" />
              <p className="text-xl text-gray-300">Analyzing your results...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
