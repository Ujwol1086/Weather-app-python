from fastapi import FastAPI
from dotenv import load_dotenv
import os 
from routers import weather

app = FastAPI(
    title="Weather Forecast API",
    description="API for current weather and weather forecasts",
    version="1.0.0"
)

load_dotenv()

WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")

# Include routers
app.include_router(weather.router)

@app.get("/")
def root():
    return {"message": "Weather Forecast API is running"}
