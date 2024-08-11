from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import requests
from pytube import YouTube

app = FastAPI()

# CORS configuration to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allow all headers
)

class VideoURL(BaseModel):
    url: str

@app.post("/submit-url")
async def submit_url(video: VideoURL):
    return {"message": f"URL received: {video.url}"}

def download_video(url):
    try:
        yt = YouTube(url)
        stream = yt.streams.get_highest_resolution()
        stream.download("C:\22701A3330")

        return True
    except Exception as e:
        print(f"Error downloading video: {e}")
        return False
