import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Brain, Sword, User, Puzzle, Smile, Globe, Home, Eye, Zap, Heart, Search, Laugh, Trophy, BookOpen, Key } from 'lucide-react'

const quizQuestions = [
  {
    question_text: "What kind of protagonist do you usually find most engaging?",
    answers: [
      { answer_value: 1, answer_text: "The Bold Hero: Courageous, action-oriented, and ready to face any challenge.", icon: Sword },
      { answer_value: 2, answer_text: "The Relatable Individual: Down-to-earth, with flaws and everyday struggles.", icon: User },
      { answer_value: 3, answer_text: "The Clever Thinker: Intelligent, analytical, and enjoys solving puzzles.", icon: Puzzle },
      { answer_value: 4, answer_text: "The Fun-Loving Character: Lighthearted, humorous, and brings joy to situations.", icon: Smile }
    ]
  },
  {
    question_text: "What setting usually captivates your imagination the most?",
    answers: [
      { answer_value: 1, answer_text: "Epic Worlds: Vast landscapes, historical empires, or fantastical realms.", icon: Globe },
      { answer_value: 2, answer_text: "Real-Life Scenarios: Everyday places, relatable environments, and human interactions.", icon: Home },
      { answer_value: 3, answer_text: "Mysterious Locations: Dark alleys, hidden rooms, or suspenseful environments.", icon: Eye },
      { answer_value: 4, answer_text: "Absurd Situations: Over-the-top scenarios, wacky worlds, and comical settings.", icon: Laugh }
    ]
  },
  {
    question_text: "Which element is most crucial for you to enjoy a movie?",
    answers: [
      { answer_value: 1, answer_text: "Thrilling Action: Fast-paced sequences, intense conflicts, and exciting stunts.", icon: Zap },
      { answer_value: 2, answer_text: "Emotional Depth: Character development, heartfelt moments, and relatable emotions.", icon: Heart },
      { answer_value: 3, answer_text: "Intriguing Plot: Twists, turns, mysteries, and suspense that keep you guessing.", icon: Search },
      { answer_value: 4, answer_text: "Humor and Wit: Clever jokes, funny situations, and lighthearted entertainment.", icon: Laugh }
    ]
  },
  {
    question_text: "What kind of mood do you typically seek when watching a movie?",
    answers: [
      { answer_value: 1, answer_text: "Adrenaline Rush: Excitement, high energy, and a sense of adventure.", icon: Zap },
      { answer_value: 2, answer_text: "Emotional Connection: Empathy, heartwarming moments, and a sense of belonging.", icon: Heart },
      { answer_value: 3, answer_text: "Suspense and Intrigue: Mystery, tension, and a desire to uncover secrets.", icon: Key },
      { answer_value: 4, answer_text: "Laughter and Joy: Lightness, amusement, and a good time.", icon: Smile }
    ]
  },
  {
    question_text: "What theme often resonates with you most strongly in a story?",
    answers: [
      { answer_value: 1, answer_text: "Triumph Over Adversity: Overcoming obstacles, saving the day, and achieving victory.", icon: Trophy },
      { answer_value: 2, answer_text: "Personal Growth: Self-discovery, coming-of-age, and understanding oneself better.", icon: BookOpen },
      { answer_value: 3, answer_text: "Unraveling Secrets: Solving mysteries, uncovering conspiracies, and finding the truth.", icon: Key },
      { answer_value: 4, answer_text: "Embracing the Absurd: Satire, social commentary, and finding humor in the unexpected.", icon: Laugh }
    ]
  }
]

export default function Quiz() {
  const location = useLocation()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [allResults, setAllResults] = useState<string[]>(location.state?.previousResults || [])
  const navigate = useNavigate()

  // If we somehow land here without starting the quiz, redirect to home
  if (!location.state?.started) {
    navigate('/')
    return null
  }

  // Ensure current question exists
  const currentQuestionData = quizQuestions[currentQuestion]
  if (!currentQuestionData) {
    navigate('/')
    return null
  }

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value]
    setAnswers(newAnswers)
    
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Show alert with current results
      const resultString = newAnswers.join('')
      alert(`Current quiz results: ${resultString}\nAll results: ${allResults.join(', ')}`)
      
      // Update all results
      const updatedResults = [...allResults, resultString]
      setAllResults(updatedResults)

      // Navigate to completion screen
      navigate('/complete', { state: { previousResults: updatedResults } })
    }
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-white/20 rounded-full h-2.5">
              <div 
                className="bg-pink-500 h-2.5 rounded-full" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 text-sm text-gray-300">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </div>
          </div>

          {/* Question */}
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-6">
              {currentQuestionData.question_text}
            </h2>
            
            {/* Answers */}
            <div className="space-y-4">
              {currentQuestionData.answers.map((answer, index) => {
                const Icon = answer.icon
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(answer.answer_value)}
                    className="w-full text-left bg-white/5 hover:bg-white/10 p-6 rounded-lg transition-all duration-200 flex items-center gap-6"
                  >
                    <div className="w-8 h-8 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-pink-400" />
                    </div>
                    <span className="text-lg">{answer.answer_text}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Quiz Info */}
          <div className="flex items-center gap-4 text-gray-300">
            <Brain className="w-6 h-6 text-pink-400" />
            <span>Your answers help our AI find the perfect movie match!</span>
          </div>
        </div>
      </div>
    </div>
  )
}
