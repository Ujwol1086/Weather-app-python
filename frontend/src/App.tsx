import { useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import ForecastList from './components/ForecastList'
import type { WeatherData, ForecastDay } from './types/weather'
import { fetchCurrentWeather, fetchWeatherForecast } from './services/api'

function App() {
  const [city, setCity] = useState("")
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastDay[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!city.trim()) {
      setError("Please enter a city name")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchCurrentWeather(city),
        fetchWeatherForecast(city, 5)
      ])
      
      setCurrentWeather(weatherData)
      setForecast(forecastData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching weather data')
      setCurrentWeather(null)
      setForecast([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center">
      <div className="w-4/5 mx-auto px-4 py-8">
        <Header />
        <SearchBar 
          city={city} 
          onCityChange={setCity} 
          onSearch={handleSearch}
          loading={loading}
        />
        
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="text-white mt-4 text-lg">Loading weather data...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/90 backdrop-blur-sm text-white px-6 py-4 rounded-lg mb-6 text-center">
            <p className="font-semibold">{error}</p>
          </div>
        )}

        {!loading && currentWeather && (
          <CurrentWeather weather={currentWeather} />
        )}

        {!loading && forecast.length > 0 && (
          <ForecastList forecast={forecast} />
        )}

        {!loading && !currentWeather && !error && (
          <div className="text-center py-12">
            <p className="text-white text-xl">Enter a city name to get started</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
