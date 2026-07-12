from fastapi import APIRouter, UploadFile, File
import os
import shutil

from services.resume_service import (
    extract_text_from_pdf,
    analyze_resume,
)

router = APIRouter()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    # Save uploaded PDF
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text
    extracted_text = extract_text_from_pdf(file_path)

    # Analyze resume
    analysis = analyze_resume(extracted_text)

    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "message": "Resume analyzed successfully!",
        "analysis": analysis,
    }