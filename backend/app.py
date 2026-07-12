from fastapi import FastAPI
from routes.upload import router as upload_router

app = FastAPI(
    title="AI Resume Reviewer API",
    version="1.0.0"
)

app.include_router(upload_router)


@app.get("/")
def home():
    return {
        "message": "AI Resume Reviewer Backend is Running 🚀"
    }