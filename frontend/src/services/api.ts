import type { WeatherData, ForecastDay } from '../types/weather'

const API_BASE_URL = 'http://localhost:8000'

interface ForecastResponse {
  city: string
  country: string
  forecast: Array<{
    date: string
    min_temperature: number
    max_temperature: number
    avg_temperature: number
    avg_humidity: number
    hourly_forecasts: Array<{
      description: string
      icon: string
    }>
  }>
}

export const fetchCurrentWeather = async (city: string): Promise<WeatherData> => {
  const response = await fetch(`${API_BASE_URL}/weather/current/${encodeURIComponent(city)}`)
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('City not found')
    }
    throw new Error('Failed to fetch weather data')
  }
  
  return response.json()
}

export const fetchWeatherForecast = async (city: string, days: number = 5): Promise<ForecastDay[]> => {
  const response = await fetch(`${API_BASE_URL}/weather/forecast/${encodeURIComponent(city)}?days=${days}`)
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('City not found')
    }
    throw new Error('Failed to fetch forecast data')
  }
  
  const data: ForecastResponse = await response.json()
  
  // Map backend response to frontend ForecastDay type
  return data.forecast.map(day => ({
    date: day.date,
    min_temperature: day.min_temperature,
    max_temperature: day.max_temperature,
    avg_temperature: day.avg_temperature,
    avg_humidity: day.avg_humidity,
    description: day.hourly_forecasts[0]?.description || 'N/A',
    icon: day.hourly_forecasts[0]?.icon || '01d'
  }))
}
