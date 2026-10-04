from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import tempfile
import os

from resume_parser import extract_text_from_pdf
from skill_extractor import extract_skills, detect_domain
from matcher import calculate_match, generate_suggestions


app = FastAPI()


# =====================================
# CORS
# =====================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =====================================
# HOME
# =====================================

@app.get("/")
def home():

    return {
        "message": "AI Resume & Job Matching System is running!"
    }


# =====================================
# RESUME ANALYSIS
# =====================================

@app.post("/analyze")
async def analyze_resume(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):

    # ---------------------------------
    # Read uploaded resume
    # ---------------------------------

    file_content = await resume.read()


    # ---------------------------------
    # Create temporary PDF
    # ---------------------------------

    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".pdf"
    ) as temp:

        temp.write(file_content)

        temp_path = temp.name


    try:

        # ---------------------------------
        # Extract resume text
        # ---------------------------------

        resume_text = extract_text_from_pdf(temp_path)


        # ---------------------------------
        # Extract skills
        # ---------------------------------

        resume_skills = extract_skills(resume_text)

        job_skills = extract_skills(job_description)


        # ---------------------------------
        # Detect job domain
        # ---------------------------------

        job_domain = detect_domain(job_description)


        # ---------------------------------
        # Calculate match
        # ---------------------------------

        (
            match_percentage,
            matched_skills,
            missing_skills
        ) = calculate_match(
            resume_skills,
            job_skills
        )


        # ---------------------------------
        # Generate suggestions
        # ---------------------------------

        suggestions = generate_suggestions(
            missing_skills
        )


        # ---------------------------------
        # Return result
        # ---------------------------------

        return {

            "match_percentage": match_percentage,

            "job_domain": job_domain,

            "matched_skills": matched_skills,

            "missing_skills": missing_skills,

            "suggestions": suggestions

        }


    finally:

        # ---------------------------------
        # Delete temporary PDF
        # ---------------------------------

        os.remove(temp_path)