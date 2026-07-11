
from fastapi import FastAPI

app = FastAPI(
    title="AI Resume Reviewer API",
    version="1.0.0"
)


@app.get("/")
def home():
    return {
        "message": "AI Resume Reviewer Backend is Running 🚀"
    }