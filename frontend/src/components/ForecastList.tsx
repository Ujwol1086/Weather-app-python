import type { ForecastDay } from '../types/weather'
import ForecastCard from './ForecastCard'

interface ForecastListProps {
  forecast: ForecastDay[]
}

function ForecastList({ forecast }: ForecastListProps) {
  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-white mb-4">5-Day Forecast</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <ForecastCard key={index} forecast={day} />
        ))}
      </div>
    </div>
  )
}

export default ForecastList
