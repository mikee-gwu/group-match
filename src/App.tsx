import { Clapperboard, Clock, Smile, Brain, Users } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Testimonials from './components/Testimonials'

export default function App() {
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()

  const startQuiz = () => {
    navigate('/quiz', { state: { started: true } })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clapperboard className="h-8 w-8 text-pink-400" />
            <span className="text-2xl font-bold">CineMatch AI</span>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Hero Content */}
          <div className="flex-1 space-y-8">
            <h1 className="text-5xl font-bold leading-tight">
              Find Your Perfect<br />
              <span className="bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
                Group Movie
              </span> in Minutes
            </h1>
            
            <p className="text-xl text-gray-200">
              Our AI-powered quiz matches everyone's tastes to suggest 
              movies you'll all love. Quick, fun, and perfectly tailored!
            </p>

            <button 
              onClick={startQuiz}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="bg-pink-500 hover:bg-pink-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <Brain className="w-6 h-6" />
              <span>Start Movie Personality Quiz! →</span>
            </button>

            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-pink-400" />
                <span>30-Second Quiz</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-purple-400" />
                <span>Group Friendly</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex-1 relative">
            <div className="relative group">
              <img 
                src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
                alt="Movie night"
                className="rounded-2xl shadow-2xl transform group-hover:rotate-1 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent rounded-2xl" />
              {/* Testimonials Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <Testimonials />
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-24">
          {[
            { icon: Clock, title: "30-Second Quiz", desc: "Fast and fun personality assessment used by AI to find the perfect movie" },
            { icon: Smile, title: "Group Sync", desc: "Combine everyone's preferences automatically" },
            { icon: Brain, title: "AI Matching", desc: "Smart algorithm finds perfect matches from over 33 thousand movies" },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white/10 p-6 rounded-xl backdrop-blur-lg hover:bg-white/20 transition-all">
              <feature.icon className="w-8 h-8 mb-4 text-pink-400" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
