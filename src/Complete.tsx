import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Brain, Users, Film, Popcorn, Loader2 } from 'lucide-react'

export default function Complete() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const previousResults = location.state?.previousResults || []

  const handleNextViewer = () => {
    navigate('/quiz', { state: { started: true, previousResults } })
  }

  const handleAnalyzeResults = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      navigate('/recommendations', { state: { previousResults } })
    }, 4000)
  }

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl">
              <div className="flex flex-col items-center space-y-6">
                <Loader2 className="w-12 h-12 text-pink-400 animate-spin" />
                <h2 className="text-2xl font-bold">
                  Analyzing Results...
                </h2>
                <p className="text-gray-300">
                  Our AI is crunching the numbers to find the perfect movie matches for your group!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl">
            <h1 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
                Thank you!
              </span>
            </h1>
            
            <div className="flex flex-col items-center space-y-6">
              <div className="flex items-center justify-center w-24 h-24 bg-pink-500/20 rounded-full">
                <Film className="w-12 h-12 text-pink-400" />
              </div>

              <p className="text-xl text-gray-200">
                You've completed the Movie Personality Quiz!
              </p>

              <div className="w-full max-w-md space-y-4">
                <button
                  onClick={handleNextViewer}
                  className="w-full bg-pink-500 hover:bg-pink-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Users className="w-6 h-6" />
                  <span>Let the next viewer take the quiz</span>
                </button>

                <button
                  onClick={handleAnalyzeResults}
                  className="w-full bg-purple-500 hover:bg-purple-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Popcorn className="w-6 h-6" />
                  <span>Analyze results and get recommendations</span>
                </button>
              </div>

              <div className="mt-8 text-gray-300">
                <p className="text-sm">
                  To find the perfect movie for your group, each viewer should take the quiz.
                </p>
                <p className="text-sm mt-2">
                  Our AI will analyze everyone's preferences to suggest the best match!
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="text-2xl font-bold text-pink-400">
                {previousResults.length}
              </div>
              <div className="text-sm text-gray-300">
                Quizzes Completed
              </div>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">
                33,000+
              </div>
              <div className="text-sm text-gray-300">
                Movies in Database
              </div>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">
                95%
              </div>
              <div className="text-sm text-gray-300">
                Match Accuracy
              </div>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">
                30s
              </div>
              <div className="text-sm text-gray-300">
                Average Quiz Time
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
