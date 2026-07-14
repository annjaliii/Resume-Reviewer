import re

import fitz  # PyMuPDF


# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

MAX_SCORE = 100

# Point values per category (sum to MAX_SCORE)
POINTS_CONTACT = 10
POINTS_LENGTH = 10
POINTS_SKILLS_SECTION = 20
POINTS_EDUCATION = 10
POINTS_EXPERIENCE = 15
POINTS_PROJECTS = 15
POINTS_CERTIFICATIONS = 10
POINTS_KEYWORD_MATCH = 10

# Resume length thresholds (character count)
MIN_LENGTH_FOR_PARTIAL_CREDIT = 300
MIN_LENGTH_FOR_FULL_CREDIT = 800

# Predefined technical skills used for both the "Skills Section" score
# and the standalone "Keyword Matching" score.
TECH_SKILLS = [
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

EDUCATION_KEYWORDS = [
    "education",
    "bachelor",
    "master",
    "bca",
    "mca",
    "be",
    "btech",
    "b.tech",
    "m.tech",
]

EXPERIENCE_KEYWORDS = [
    "experience",
    "internship",
    "work experience",
    "employment",
]

PROJECT_KEYWORDS = [
    "projects",
    "academic project",
    "personal project",
]

CERTIFICATION_KEYWORDS = [
    "certification",
    "certified",
    "aws",
    "google",
    "microsoft",
    "coursera",
    "udemy",
]

EMAIL_REGEX = re.compile(r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}")
PHONE_REGEX = re.compile(r"(\+?\d{1,3}[\s.-]?)?\d{10}")


# ---------------------------------------------------------------------------
# PDF extraction
# ---------------------------------------------------------------------------

def extract_text_from_pdf(file_path):
    document = fitz.open(file_path)
    text = ""

    for page in document:
        text += page.get_text()

    document.close()
    return text


# ---------------------------------------------------------------------------
# Small shared helpers
# ---------------------------------------------------------------------------

def _contains_any(text, keywords):
    """Return True if any keyword appears in the (already lowercased) text."""
    return any(keyword in text for keyword in keywords)


def _find_missing_skills(text, skills):
    """Return the subset of `skills` not present in the (lowercased) text."""
    return [skill for skill in skills if skill not in text]


def _clamp_score(score):
    return max(0, min(MAX_SCORE, round(score)))


def _add_suggestion(suggestions, message):
    """Append a suggestion only if it hasn't already been added."""
    if message not in suggestions:
        suggestions.append(message)


# ---------------------------------------------------------------------------
# Category scorers
# Each scorer returns (points_earned, suggestion_or_None)
# ---------------------------------------------------------------------------

def _score_contact_info(text):
    points = 0
    suggestions = []

    if EMAIL_REGEX.search(text):
        points += POINTS_CONTACT / 2
    else:
        suggestions.append("Add an email address.")

    if PHONE_REGEX.search(text):
        points += POINTS_CONTACT / 2
    else:
        suggestions.append("Add a phone number.")

    return points, suggestions


def _score_length(text):
    length = len(text)

    if length < MIN_LENGTH_FOR_PARTIAL_CREDIT:
        return 0, "Increase resume content."

    if length < MIN_LENGTH_FOR_FULL_CREDIT:
        return POINTS_LENGTH / 2, "Increase resume content."

    return POINTS_LENGTH, None


def _score_skills_section(lower_text, missing_skills):
    points = 0
    suggestions = []

    has_skills_heading = "skills" in lower_text
    if has_skills_heading:
        points += POINTS_SKILLS_SECTION / 2
    else:
        suggestions.append("Add a dedicated Skills section.")

    matched_count = len(TECH_SKILLS) - len(missing_skills)
    match_ratio = matched_count / len(TECH_SKILLS)
    points += (POINTS_SKILLS_SECTION / 2) * match_ratio

    return points, suggestions


def _score_education(lower_text):
    if _contains_any(lower_text, EDUCATION_KEYWORDS):
        return POINTS_EDUCATION, None
    return 0, "Add an Education section."


def _score_experience(lower_text):
    if _contains_any(lower_text, EXPERIENCE_KEYWORDS):
        return POINTS_EXPERIENCE, None
    return 0, "Include internship or work experience."


def _score_projects(lower_text):
    if _contains_any(lower_text, PROJECT_KEYWORDS):
        return POINTS_PROJECTS, None
    return 0, "Add a Projects section."


def _score_certifications(lower_text):
    if _contains_any(lower_text, CERTIFICATION_KEYWORDS):
        return POINTS_CERTIFICATIONS, None
    return 0, "Add relevant certifications."


def _score_keyword_matching(missing_skills):
    matched_count = len(TECH_SKILLS) - len(missing_skills)
    match_ratio = matched_count / len(TECH_SKILLS)
    return POINTS_KEYWORD_MATCH * match_ratio


# ---------------------------------------------------------------------------
# Public entry point
# ---------------------------------------------------------------------------

def analyze_resume(text):
    lower_text = text.lower()
    suggestions = []

    missing_skills = _find_missing_skills(lower_text, TECH_SKILLS)

    total_score = 0

    contact_points, contact_suggestions = _score_contact_info(lower_text)
    total_score += contact_points
    for suggestion in contact_suggestions:
        _add_suggestion(suggestions, suggestion)

    length_points, length_suggestion = _score_length(text)
    total_score += length_points
    if length_suggestion:
        _add_suggestion(suggestions, length_suggestion)

    skills_points, skills_suggestions = _score_skills_section(
        lower_text, missing_skills
    )
    total_score += skills_points
    for suggestion in skills_suggestions:
        _add_suggestion(suggestions, suggestion)

    education_points, education_suggestion = _score_education(lower_text)
    total_score += education_points
    if education_suggestion:
        _add_suggestion(suggestions, education_suggestion)

    experience_points, experience_suggestion = _score_experience(lower_text)
    total_score += experience_points
    if experience_suggestion:
        _add_suggestion(suggestions, experience_suggestion)

    project_points, project_suggestion = _score_projects(lower_text)
    total_score += project_points
    if project_suggestion:
        _add_suggestion(suggestions, project_suggestion)

    certification_points, certification_suggestion = _score_certifications(
        lower_text
    )
    total_score += certification_points
    if certification_suggestion:
        _add_suggestion(suggestions, certification_suggestion)

    total_score += _score_keyword_matching(missing_skills)

    ats_score = _clamp_score(total_score)

    return {
        "ats_score": ats_score,
        "missing_skills": missing_skills,
        "suggestions": suggestions,
    }
