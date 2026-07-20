from fastapi import APIRouter, UploadFile, File
import os
import shutil

from services.resume_service import (
    extract_text_from_pdf,
    analyze_resume,
)

from services.gemini_service import get_ai_resume_feedback


router = APIRouter()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    # Save uploaded PDF
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Extract text from PDF
    extracted_text = extract_text_from_pdf(file_path)

    # Rule-based ATS analysis
    analysis = analyze_resume(extracted_text)

    # Get personalized AI suggestions from Gemini
    ai_suggestions = get_ai_resume_feedback(extracted_text)

    # Use Gemini suggestions if available
    # Otherwise keep rule-based suggestions as fallback
    if ai_suggestions:
        analysis["suggestions"] = ai_suggestions

    return {
        "filename": file.filename,
        "content_type": file.content_type,
        "message": "Resume analyzed successfully!",
        "analysis": analysis,
    }