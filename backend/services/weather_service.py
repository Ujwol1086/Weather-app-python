import requests
import os
from typing import Optional, Dict, Any

API_KEY = os.getenv("WEATHER_API_KEY")
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast"

def get_weather(city: str) -> Optional[Dict[str, Any]]:
    """
    Get current weather for a city.
    
    Args:
        city: Name of the city
        
    Returns:
        Dictionary containing weather data or None if error
    """
    params = {
        "q": city,
        "appid": API_KEY,
        "units": "metric",
    }

    try:
        response = requests.get(BASE_URL, params=params, timeout=10)
        
        if response.status_code != 200:
            return None

        return response.json()
    except requests.exceptions.RequestException:
        return None

def get_weather_forecast(city: str, days: int = 5) -> Optional[Dict[str, Any]]:
    """
    Get weather forecast for a city.
    
    Args:
        city: Name of the city
        days: Number of days for forecast (default: 5, max: 5 for free tier)
        
    Returns:
        Dictionary containing forecast data or None if error
    """
    # OpenWeatherMap free tier provides 5-day forecast with 3-hour intervals
    # Limit days to 5 for free tier
    days = min(days, 5)
    
    params = {
        "q": city,
        "appid": API_KEY,
        "units": "metric",
        "cnt": days * 8  # 8 forecasts per day (3-hour intervals)
    }

    try:
        response = requests.get(FORECAST_URL, params=params, timeout=10)
        
        if response.status_code != 200:
            return None

        return response.json()
    except requests.exceptions.RequestException:
        return None
