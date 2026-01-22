export type WeatherData = {
  city: string
  country: string
  temperature: number
  feels_like: number
  humidity: number
  pressure: number
  wind_speed: number
  wind_direction: number
  description: string
  icon: string
  visibility: number
  clouds: number
}

export type ForecastDay = {
  date: string
  min_temperature: number
  max_temperature: number
  avg_temperature: number
  avg_humidity: number
  description: string
  icon: string
}
