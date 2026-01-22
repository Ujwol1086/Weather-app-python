import type { WeatherData, ForecastDay } from '../types/weather'

export const mockCurrentWeather: WeatherData = {
  city: "London",
  country: "GB",
  temperature: 15,
  feels_like: 14,
  humidity: 65,
  pressure: 1013,
  wind_speed: 3.5,
  wind_direction: 270,
  description: "Partly cloudy",
  icon: "02d",
  visibility: 10,
  clouds: 40
}

export const mockForecast: ForecastDay[] = [
  {
    date: "2024-01-15",
    min_temperature: 12,
    max_temperature: 18,
    avg_temperature: 15,
    avg_humidity: 65,
    description: "Partly cloudy",
    icon: "02d"
  },
  {
    date: "2024-01-16",
    min_temperature: 10,
    max_temperature: 16,
    avg_temperature: 13,
    avg_humidity: 70,
    description: "Light rain",
    icon: "10d"
  },
  {
    date: "2024-01-17",
    min_temperature: 8,
    max_temperature: 14,
    avg_temperature: 11,
    avg_humidity: 75,
    description: "Cloudy",
    icon: "03d"
  },
  {
    date: "2024-01-18",
    min_temperature: 11,
    max_temperature: 17,
    avg_temperature: 14,
    avg_humidity: 68,
    description: "Sunny",
    icon: "01d"
  },
  {
    date: "2024-01-19",
    min_temperature: 13,
    max_temperature: 19,
    avg_temperature: 16,
    avg_humidity: 62,
    description: "Clear sky",
    icon: "01d"
  }
]
