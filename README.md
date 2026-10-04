# 🤖 AI Resume & Job Matching System

An AI-powered web application that analyzes a candidate's resume against a job description and provides a **resume-job match score, matched skills, missing skills, and personalized improvement suggestions**.

## 🚀 Features

* 📄 Upload resume in PDF format
* 📝 Paste a job description
* 🔍 Extract skills from resumes and job descriptions
* 📊 Calculate resume-job compatibility score
* ✅ Display matched skills
* ❌ Identify missing skills
* 💡 Generate skill improvement suggestions
* 🌐 Interactive web-based interface
* ⚡ FastAPI backend for resume analysis

## 🛠️ Tech Stack

### Backend

* Python
* FastAPI
* PyMuPDF
* REST API

### Frontend

* HTML
* CSS
* JavaScript

### Development Tools

* Git
* GitHub
* VS Code

## 🔄 How It Works

```text
Resume PDF
    ↓
PDF Text Extraction
    ↓
Skill Extraction
    ↓
Job Description Analysis
    ↓
Skill Matching
    ↓
Match Score + Missing Skills
    ↓
Improvement Suggestions
```

## 📁 Project Structure

```text
AI-Resume-Job-Matcher/
│
├── backend/
│   ├── main.py
│   ├── resume_parser.py
│   ├── skill_extractor.py
│   ├── matcher.py
│   └── venv/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── data/
├── tests/
├── requirements.txt
├── .gitignore
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/harinirajacs-prog/ai-resume-job-matcher.git
cd ai-resume-job-matcher
```

### 2. Create a virtual environment

```bash
python -m venv venv
```

### 3. Activate the virtual environment

**Windows:**

```bash
venv\Scripts\activate
```

### 4. Install dependencies

```bash
pip install -r requirements.txt
```

### 5. Start the FastAPI server

```bash
cd backend
uvicorn main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

### 6. Open the frontend

Open `frontend/index.html` using VS Code Live Server or a local web server.

## 📊 Example Output

### 🏠 Application Interface

![AI Resume & Job Matcher Homepage](frontend/homepage.png)

### 📈 Resume Analysis Result

![Resume Analysis Result](frontend/analysis-result.png)

The application analyzes the uploaded resume against the provided job description and displays the match score, matched skills, missing skills, and personalized improvement suggestions.


## 🎯 Project Objective

The goal of this project is to demonstrate how **resume parsing, skill extraction, text processing, and backend API development** can be combined to create a practical job-search tool.

## 🔮 Future Improvements

* 🤖 Advanced NLP-based skill extraction
* 🧠 Semantic similarity using embeddings
* 📑 Resume section analysis
* 🎯 Job-role recommendations
* 📈 Skill-gap learning roadmap
* 🔐 User authentication
* ☁️ Cloud deployment
* 📱 Improved mobile responsiveness

## 👩‍💻 Developer

**Harini Raja**

Computer Science / MCA Student
Interested in Software Development, AI, and Full-Stack Development.

---

⭐ If you find this project useful, consider giving it a star!
