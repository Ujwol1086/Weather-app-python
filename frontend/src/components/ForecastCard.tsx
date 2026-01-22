import type { ForecastDay } from '../types/weather'
import { formatDate, getWeatherIconUrl } from '../utils/weatherUtils'

interface ForecastCardProps {
  forecast: ForecastDay
}

function ForecastCard({ forecast }: ForecastCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-5 hover:bg-white/15 transition-all duration-200">
      <div className="text-center">
        <p className="text-blue-100 font-semibold mb-3">
          {formatDate(forecast.date)}
        </p>
        <img
          src={getWeatherIconUrl(forecast.icon)}
          alt={forecast.description}
          className="w-16 h-16 mx-auto mb-3"
        />
        <p className="text-white text-sm capitalize mb-3">
          {forecast.description}
        </p>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-blue-100 text-sm">High</span>
            <span className="text-white font-bold">
              {Math.round(forecast.max_temperature)}°
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-blue-100 text-sm">Low</span>
            <span className="text-white font-bold">
              {Math.round(forecast.min_temperature)}°
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-white/20">
            <span className="text-blue-100 text-sm">Humidity</span>
            <span className="text-white text-sm">{forecast.avg_humidity}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForecastCard
