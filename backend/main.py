from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
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

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(weather.router)

@app.get("/")
def root():
    return {"message": "Weather Forecast API is running"}
