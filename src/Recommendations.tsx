import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { genresMap } from './utils/genresMap'
import MovieData from './MovieData'

export default function Recommendations() {
  const location = useLocation()
  const previousResults = location.state?.previousResults || []
  const [showMovies, setShowMovies] = useState(false)

  // Get unique genres from all answer sequences
  const allGenres = previousResults.reduce((acc, result) => {
    const matchingEntry = genresMap.find(
      entry => entry.Answer_Combination === result
    )
    if (matchingEntry) {
      matchingEntry.Top_Genres.forEach(genre => acc.add(genre))
    }
    return acc
  }, new Set<string>())

  const uniqueGenres = Array.from(allGenres)

  // Get top 10 recommended movies
  const getRecommendedMovies = () => {
    // Create a map of movies with their matching score
    const movieScores = MovieData.map(movie => {
      const movieGenres = JSON.parse(movie.genres.replace(/'/g, '"'))
      const score = uniqueGenres.reduce((acc, genre) => 
        movieGenres.includes(genre) ? acc + 1 : acc, 0)
      return { ...movie, score }
    })

    // Sort by score descending, then by rating descending
    return movieScores
      .sort((a, b) => b.score - a.score || parseFloat(b.Rating) - parseFloat(a.Rating))
      .slice(0, 10)
  }

  const recommendedMovies = getRecommendedMovies()

  if (showMovies) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl">
              <h1 className="text-3xl font-bold mb-6">
                <span className="bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
                  Top 10 Movie Recommendations
                </span>
              </h1>

<div className="space-y-6">
  {recommendedMovies.map((movie, index) => (
    <div key={index} className="bg-white/5 p-6 rounded-lg">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            {movie.Title} ({movie.Year})
          </h2>
          <div className="text-pink-400 mb-2">
            Rating: {movie.Rating} | Match Score: {movie.score}
          </div>
          <div className="text-gray-300 mb-4">
            Genres: {JSON.parse(movie.genres.replace(/'/g, '"')).join(', ')}
          </div>
          <div className="text-sm text-gray-400">
            Languages: {JSON.parse(movie.Languages.replace(/'/g, '"')).join(', ')}
          </div>
        </div>
        <a 
          href={movie.Movie_Link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap"
        >
          View on IMDB
        </a>
      </div>
    </div>
  ))}
</div>

              <button
                onClick={() => setShowMovies(false)}
                className="mt-8 w-full bg-purple-500 hover:bg-purple-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 transform hover:scale-105"
              >
                Back to Group Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl">
            <h1 className="text-3xl font-bold mb-6">
              <span className="bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
                Quiz Results & Recommendations
              </span>
            </h1>

            {/* Genre Analysis */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Top Genres Based on Group Preferences:
              </h2>
              <div className="flex flex-wrap gap-2">
                {uniqueGenres.map((genre, index) => (
                  <div key={index} className="bg-pink-500/20 px-4 py-2 rounded-full text-sm">
                    {genre}
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Results */}
            <div className="space-y-6 mb-8">
              {previousResults.map((result, index) => {
                const matchingEntry = genresMap.find(
                  entry => entry.Answer_Combination === result
                )
                const viewerGenres = matchingEntry ? matchingEntry.Top_Genres : []

                return (
                  <div key={index} className="bg-white/5 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">
                      Viewer {index + 1} Results:
                    </h3>
                    <div className="text-gray-300 mb-4">
                      Answer Sequence: {result}
                    </div>
                    <div className="text-sm text-gray-400">
                      Preferred Genres: {viewerGenres.join(', ')}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Deduplicated Superset of Genres */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <h2 className="text-xl font-semibold mb-4">
                Combined Group Preferences:
              </h2>
              <div className="bg-white/5 p-4 rounded-lg">
                <pre className="text-gray-300 whitespace-pre-wrap">
                  {JSON.stringify(uniqueGenres, null, 2)}
                </pre>
              </div>
            </div>

            {/* Show Recommendations Button */}
            <button
              onClick={() => setShowMovies(true)}
              className="mt-8 w-full bg-pink-500 hover:bg-pink-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Show Movie Recommendations
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
