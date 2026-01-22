from fastapi import FastAPI
from dotenv import load_dotenv
import os 

app = FastAPI()

load_dotenv()

WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")


@app.get("/")
def root():
    return {"message": "API is running"}
