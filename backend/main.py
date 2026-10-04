from fastapi import FastAPI, UploadFile, File, Form
import tempfile
import os

from resume_parser import extract_text_from_pdf
from skill_extractor import extract_skills
from matcher import calculate_match, generate_suggestions

app = FastAPI()


@app.get("/")
def home():
    return {
        "message": "AI Resume & Job Matching System is running!"
    }


@app.post("/analyze")
async def analyze_resume(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    file_content = await resume.read()

    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp:
        temp.write(file_content)
        temp_path = temp.name

    try:
        resume_text = extract_text_from_pdf(temp_path)

        resume_skills = extract_skills(resume_text)
        job_skills = extract_skills(job_description)

        match_percentage, matched_skills, missing_skills = calculate_match(
            resume_skills,
            job_skills
        )
        suggestions = generate_suggestions(missing_skills)
        return {
            "match_percentage": match_percentage,
            "matched_skills": matched_skills,
            "missing_skills": missing_skills,
            "suggestions": suggestions
        }

    finally:
        os.remove(temp_path)