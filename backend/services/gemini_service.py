import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=API_KEY)


def get_ai_resume_feedback(resume_text):
    prompt = f"""
You are an expert resume reviewer and ATS specialist.

Analyze the following resume and provide 3 to 5 short,
specific, actionable suggestions to improve it.

Focus on:
- Professional summary
- Skills
- Projects
- Work experience
- Measurable achievements
- ATS-friendly keywords
- Resume clarity

Do not calculate an ATS score.
Do not return markdown.
Return each suggestion on a separate line.

Resume:

{resume_text}
"""

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )

        suggestions = [
            line.strip().lstrip("-•1234567890. ")
            for line in response.text.splitlines()
            if line.strip()
        ]

        return suggestions[:5]

    except Exception as error:
        print(f"Gemini API error: {error}")
        return []