async function analyzeResume() {

    const resumeInput = document.getElementById("resume");
    const jobDescription = document.getElementById("jobDescription").value;

    if (!resumeInput.files.length) {
        alert("Please upload your resume PDF.");
        return;
    }

    if (!jobDescription.trim()) {
        alert("Please enter the job description.");
        return;
    }

    const formData = new FormData();

    formData.append("resume", resumeInput.files[0]);
    formData.append("job_description", jobDescription);

    try {

        const response = await fetch(
            "https://ai-resume-job-matcher-dtsa.onrender.com/analyze",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        document.getElementById("result").classList.remove("hidden");

        const scoreElement = document.getElementById("matchScore");

        scoreElement.textContent = data.match_percentage + "%";

        if (data.match_percentage >= 80) {
            scoreElement.style.borderColor = "#22c55e";
            scoreElement.style.color = "#16a34a";
        } else if (data.match_percentage >= 50) {
            scoreElement.style.borderColor = "#f59e0b";
            scoreElement.style.color = "#d97706";
        } else {
            scoreElement.style.borderColor = "#ef4444";
            scoreElement.style.color = "#dc2626";
        }

        const matchedList = document.getElementById("matchedSkills");
        const missingList = document.getElementById("missingSkills");
        const suggestionsList = document.getElementById("suggestionsList");

        matchedList.innerHTML = "";
        missingList.innerHTML = "";
        suggestionsList.innerHTML = "";

        data.matched_skills.forEach(skill => {
            const li = document.createElement("li");
            li.textContent = skill;
            matchedList.appendChild(li);
        });

        data.missing_skills.forEach(skill => {
            const li = document.createElement("li");
            li.textContent = skill;
            missingList.appendChild(li);
        });

        data.suggestions.forEach(suggestion => {
            const li = document.createElement("li");
            li.textContent = suggestion;
            suggestionsList.appendChild(li);
        });

    } catch (error) {

        console.error(error);

        alert(
            "Could not connect to the backend. " +
            "Make sure FastAPI server is running."
        );
    }
}


/* =====================================
   RESUME UPLOAD UI
===================================== */

const resumeInput = document.getElementById("resume");

if (resumeInput) {

    resumeInput.addEventListener("change", function () {

        const uploadBox = document.querySelector(".upload-box");
        const uploadIcon = uploadBox.querySelector(".upload-icon");
        const title = uploadBox.querySelector("strong");
        const subtitle = uploadBox.querySelector("span");

        if (this.files.length > 0) {

            const file = this.files[0];

            uploadBox.classList.add("file-selected");

            uploadIcon.textContent = "✅";

            title.textContent = "Resume uploaded!";

            subtitle.textContent = file.name;

        } else {

            uploadBox.classList.remove("file-selected");

            uploadIcon.textContent = "📄";

            title.textContent = "Choose your resume";

            subtitle.textContent = "PDF files only";
        }

    });

}