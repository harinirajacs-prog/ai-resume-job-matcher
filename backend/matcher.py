def calculate_match(resume_skills, job_skills):
    resume_skills = set(resume_skills)
    job_skills = set(job_skills)

    if not job_skills:
        return 0, [], []

    matched_skills = resume_skills.intersection(job_skills)
    missing_skills = job_skills - resume_skills

    match_percentage = round(
        (len(matched_skills) / len(job_skills)) * 100
    )

    return match_percentage, list(matched_skills), list(missing_skills)
def generate_suggestions(missing_skills):
    suggestions = []

    suggestion_map = {
        "python": "Improve Python programming and problem-solving skills.",
        "sql": "Practice SQL queries, joins, and database concepts.",
        "git": "Learn Git version control and GitHub workflow.",
        "react": "Learn React components, hooks, and frontend development.",
        "aws": "Learn AWS fundamentals such as EC2, S3, and IAM.",
        "docker": "Learn Docker containers and basic deployment.",
        "fastapi": "Learn FastAPI API development and REST APIs.",
        "machine learning": "Study machine learning fundamentals and practical projects.",
        "deep learning": "Learn neural networks and deep learning fundamentals.",
        "artificial intelligence": "Build practical AI projects to strengthen your AI skills.",
        "data analysis": "Practice data analysis using Python, Pandas, and visualization.",
        "pandas": "Practice data manipulation and analysis using Pandas.",
        "numpy": "Practice numerical computing with NumPy."
    }

    for skill in missing_skills:
        if skill in suggestion_map:
            suggestions.append(suggestion_map[skill])
        else:
            suggestions.append(f"Consider learning {skill}.")

    return suggestions