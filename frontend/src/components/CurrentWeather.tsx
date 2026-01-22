import type { WeatherData } from '../types/weather'
import { getWeatherIconUrl, getWindDirection } from '../utils/weatherUtils'
import WeatherDetail from './WeatherDetail'

interface CurrentWeatherProps {
  weather: WeatherData
}

function CurrentWeather({ weather }: CurrentWeatherProps) {
  return (
    <div className="w-full mb-8">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          {/* Main Weather Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {weather.city}
              </h2>
              <span className="text-xl text-blue-100">{weather.country}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
              <img
                src={getWeatherIconUrl(weather.icon)}
                alt={weather.description}
                className="w-20 h-20"
              />
              <div>
                <div className="text-6xl md:text-7xl font-bold text-white">
                  {Math.round(weather.temperature)}°
                </div>
                <p className="text-blue-100 text-lg capitalize">
                  {weather.description}
                </p>
              </div>
            </div>
            <p className="text-blue-100">
              Feels like {Math.round(weather.feels_like)}°
            </p>
          </div>

          {/* Weather Details */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full md:w-auto">
            <WeatherDetail label="Humidity" value={weather.humidity} unit="%" />
            <WeatherDetail
              label="Wind"
              value={`${weather.wind_speed} m/s ${getWindDirection(weather.wind_direction)}`}
            />
            <WeatherDetail label="Pressure" value={weather.pressure} unit=" hPa" />
            <WeatherDetail label="Visibility" value={weather.visibility} unit=" km" />
            <WeatherDetail label="Clouds" value={weather.clouds} unit="%" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather
