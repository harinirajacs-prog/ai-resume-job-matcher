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