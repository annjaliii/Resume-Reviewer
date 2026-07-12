import fitz  # PyMuPDF


def extract_text_from_pdf(file_path):
    document = fitz.open(file_path)
    text = ""

    for page in document:
        text += page.get_text()

    document.close()
    return text


def analyze_resume(text):
    score = 100
    suggestions = []
    missing_skills = []

    keywords = [
        "python",
        "sql",
        "excel",
        "power bi",
        "pandas",
        "numpy",
        "machine learning",
        "react",
        "node.js",
        "git",
    ]

    lower_text = text.lower()

    for keyword in keywords:
        if keyword not in lower_text:
            missing_skills.append(keyword)
            score -= 5

    if len(text) < 500:
        suggestions.append("Resume content is too short.")

    if "projects" not in lower_text:
        suggestions.append("Add a Projects section.")

    if "skills" not in lower_text:
        suggestions.append("Add a Skills section.")

    score = max(score, 0)

    return {
        "ats_score": score,
        "missing_skills": missing_skills,
        "suggestions": suggestions,
    }