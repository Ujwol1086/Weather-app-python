import { useState } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import CurrentWeather from './components/CurrentWeather'
import ForecastList from './components/ForecastList'
import type { WeatherData, ForecastDay } from './types/weather'
import { mockCurrentWeather, mockForecast } from './data/mockData'

function App() {
  const [city, setCity] = useState("")
  const [currentWeather] = useState<WeatherData>(mockCurrentWeather)
  const [forecast] = useState<ForecastDay[]>(mockForecast)

  const handleSearch = () => {
    // Backend connection will be added here later
    console.log("Searching for:", city)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center">
      <div className="w-4/5 mx-auto px-4 py-8">
        <Header />
        <SearchBar 
          city={city} 
          onCityChange={setCity} 
          onSearch={handleSearch} 
        />
        <CurrentWeather weather={currentWeather} />
        <ForecastList forecast={forecast} />
      </div>
    </div>
  )
}

export default App
