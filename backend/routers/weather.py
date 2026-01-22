from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from services.weather_service import get_weather, get_weather_forecast

router = APIRouter(prefix="/weather", tags=["Weather"])

@router.get("/current/{city}")
def fetch_weather(city: str):
    """
    Get current weather for a city.
    
    Args:
        city: Name of the city
        
    Returns:
        Current weather information
    """
    data = get_weather(city)

    if not data:
        raise HTTPException(status_code=404, detail="City not found or API error")

    return {
        "city": data["name"],
        "country": data.get("sys", {}).get("country", ""),
        "temperature": data["main"]["temp"],
        "feels_like": data["main"]["feels_like"],
        "humidity": data["main"]["humidity"],
        "pressure": data["main"]["pressure"],
        "wind_speed": data.get("wind", {}).get("speed", 0),
        "wind_direction": data.get("wind", {}).get("deg", 0),
        "description": data["weather"][0]["description"],
        "icon": data["weather"][0]["icon"],
        "visibility": data.get("visibility", 0) / 1000,  # Convert to km
        "clouds": data.get("clouds", {}).get("all", 0),
    }

@router.get("/forecast/{city}")
def fetch_weather_forecast(
    city: str,
    days: Optional[int] = Query(default=5, ge=1, le=5, description="Number of days (1-5)")
):
    """
    Get weather forecast for a city.
    
    Args:
        city: Name of the city
        days: Number of days for forecast (1-5, default: 5)
        
    Returns:
        Weather forecast information
    """
    data = get_weather_forecast(city, days)

    if not data:
        raise HTTPException(status_code=404, detail="City not found or API error")

    # Process forecast data to group by day
    forecast_list = []
    daily_forecasts = {}
    
    for item in data.get("list", []):
        date = item["dt_txt"].split(" ")[0]  # Extract date part
        
        if date not in daily_forecasts:
            daily_forecasts[date] = {
                "date": date,
                "forecasts": []
            }
        
        daily_forecasts[date]["forecasts"].append({
            "time": item["dt_txt"].split(" ")[1],  # Extract time part
            "temperature": item["main"]["temp"],
            "feels_like": item["main"]["feels_like"],
            "humidity": item["main"]["humidity"],
            "pressure": item["main"]["pressure"],
            "wind_speed": item.get("wind", {}).get("speed", 0),
            "wind_direction": item.get("wind", {}).get("deg", 0),
            "description": item["weather"][0]["description"],
            "icon": item["weather"][0]["icon"],
            "clouds": item.get("clouds", {}).get("all", 0),
            "precipitation": item.get("rain", {}).get("3h", 0) if "rain" in item else 0,
        })
    
    # Convert to list and calculate daily averages
    for date, day_data in sorted(daily_forecasts.items()):
        forecasts = day_data["forecasts"]
        temps = [f["temperature"] for f in forecasts]
        humidities = [f["humidity"] for f in forecasts]
        
        forecast_list.append({
            "date": date,
            "min_temperature": min(temps),
            "max_temperature": max(temps),
            "avg_temperature": sum(temps) / len(temps),
            "avg_humidity": sum(humidities) / len(humidities),
            "hourly_forecasts": forecasts
        })

    return {
        "city": data["city"]["name"],
        "country": data["city"].get("country", ""),
        "forecast": forecast_list
    }
