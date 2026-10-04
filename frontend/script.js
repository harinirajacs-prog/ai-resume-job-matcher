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

        document.getElementById("matchScore").textContent =
            data.match_percentage + "%";

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