import re


# =====================================
# MULTI-DOMAIN SKILLS
# =====================================

SKILLS = [

    # -------------------------
    # IT / SOFTWARE
    # -------------------------
    "python",
    "java",
    "c",
    "c++",
    "javascript",
    "html",
    "css",
    "react",
    "node.js",
    "fastapi",
    "django",
    "sql",
    "mysql",
    "postgresql",
    "mongodb",
    "aws",
    "docker",
    "kubernetes",
    "git",
    "github",
    "machine learning",
    "deep learning",
    "artificial intelligence",
    "data analysis",
    "pandas",
    "numpy",
    "tensorflow",
    "pytorch",
    "rest api",
    "api development",

    # -------------------------
    # DATA / ANALYTICS
    # -------------------------
    "excel",
    "power bi",
    "tableau",
    "statistics",
    "data visualization",
    "data analytics",
    "business analytics",
    "microsoft excel",

    # -------------------------
    # MARKETING
    # -------------------------
    "digital marketing",
    "seo",
    "sem",
    "content marketing",
    "content writing",
    "social media marketing",
    "social media",
    "google ads",
    "facebook ads",
    "email marketing",
    "market research",
    "brand management",
    "copywriting",

    # -------------------------
    # BUSINESS / MANAGEMENT
    # -------------------------
    "business development",
    "sales",
    "customer relationship management",
    "crm",
    "lead generation",
    "business strategy",
    "project management",
    "team management",
    "leadership",
    "communication",
    "negotiation",
    "problem solving",

    # -------------------------
    # HR
    # -------------------------
    "recruitment",
    "talent acquisition",
    "human resources",
    "employee relations",
    "payroll",
    "performance management",
    "onboarding",
    "hr management",
    "interviewing",

    # -------------------------
    # DESIGN
    # -------------------------
    "ui design",
    "ux design",
    "ui/ux",
    "figma",
    "canva",
    "photoshop",
    "illustrator",
    "graphic design",
    "web design",
    "prototyping",
    "wireframing",

    # -------------------------
    # FINANCE / ACCOUNTING
    # -------------------------
    "accounting",
    "financial analysis",
    "financial management",
    "tally",
    "tally erp",
    "bookkeeping",
    "auditing",
    "taxation",
    "budgeting",
    "forecasting",

    # -------------------------
    # EDUCATION
    # -------------------------
    "teaching",
    "lesson planning",
    "classroom management",
    "curriculum development",
    "training",
    "tutoring",
    "assessment",
    "educational technology",

    # -------------------------
    # HEALTHCARE
    # -------------------------
    "patient care",
    "medical coding",
    "healthcare management",
    "medical terminology",
    "clinical research",
    "healthcare administration",
    "patient management",

    # -------------------------
    # GENERAL PROFESSIONAL
    # -------------------------
    "teamwork",
    "time management",
    "critical thinking",
    "adaptability",
    "creativity",
    "presentation",
    "public speaking",
    "customer service",
    "documentation",
    "research"
]


# =====================================
# DOMAIN DEFINITIONS
# =====================================

DOMAIN_SKILLS = {

    "Software Development": [
        "python",
        "java",
        "c",
        "c++",
        "javascript",
        "html",
        "css",
        "react",
        "node.js",
        "fastapi",
        "django",
        "sql",
        "mysql",
        "postgresql",
        "mongodb",
        "aws",
        "docker",
        "kubernetes",
        "git",
        "github",
        "rest api",
        "api development"
    ],

    "Data & Analytics": [
        "excel",
        "power bi",
        "tableau",
        "statistics",
        "data visualization",
        "data analytics",
        "business analytics",
        "data analysis",
        "pandas",
        "numpy",
        "machine learning"
    ],

    "Marketing": [
        "digital marketing",
        "seo",
        "sem",
        "content marketing",
        "content writing",
        "social media marketing",
        "social media",
        "google ads",
        "facebook ads",
        "email marketing",
        "market research",
        "brand management",
        "copywriting"
    ],

    "Business & Management": [
        "business development",
        "sales",
        "customer relationship management",
        "crm",
        "lead generation",
        "business strategy",
        "project management",
        "team management",
        "leadership",
        "negotiation"
    ],

    "Human Resources": [
        "recruitment",
        "talent acquisition",
        "human resources",
        "employee relations",
        "payroll",
        "performance management",
        "onboarding",
        "hr management",
        "interviewing"
    ],

    "Design": [
        "ui design",
        "ux design",
        "ui/ux",
        "figma",
        "canva",
        "photoshop",
        "illustrator",
        "graphic design",
        "web design",
        "prototyping",
        "wireframing"
    ],

    "Finance & Accounting": [
        "accounting",
        "financial analysis",
        "financial management",
        "tally",
        "tally erp",
        "bookkeeping",
        "auditing",
        "taxation",
        "budgeting",
        "forecasting"
    ],

    "Education": [
        "teaching",
        "lesson planning",
        "classroom management",
        "curriculum development",
        "training",
        "tutoring",
        "assessment",
        "educational technology"
    ],

    "Healthcare": [
        "patient care",
        "medical coding",
        "healthcare management",
        "medical terminology",
        "clinical research",
        "healthcare administration",
        "patient management"
    ]
}


# =====================================
# EXTRACT SKILLS
# =====================================

def extract_skills(text):

    text = text.lower()

    found_skills = []

    for skill in SKILLS:

        pattern = r"(?<!\w)" + re.escape(skill) + r"(?!\w)"

        if re.search(pattern, text):

            found_skills.append(skill)

    return found_skills


# =====================================
# DETECT JOB DOMAIN
# =====================================

def detect_domain(text):

    text = text.lower()

    domain_scores = {}

    for domain, domain_skills in DOMAIN_SKILLS.items():

        score = 0

        for skill in domain_skills:

            pattern = r"(?<!\w)" + re.escape(skill) + r"(?!\w)"

            if re.search(pattern, text):
                score += 1

        domain_scores[domain] = score


    # No recognizable domain
    if max(domain_scores.values()) == 0:
        return "General"


    # Get domain with highest skill count
    detected_domain = max(
        domain_scores,
        key=domain_scores.get
    )

    return detected_domain