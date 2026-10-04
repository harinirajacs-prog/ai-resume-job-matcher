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

        if (!response.ok) {
            throw new Error("Backend request failed");
        }

        const data = await response.json();

        /* =========================
           SHOW RESULT
        ========================= */

        document.getElementById("result").classList.remove("hidden");

        const scoreElement = document.getElementById("matchScore");

        scoreElement.textContent = data.match_percentage + "%";


        /* =========================
           SCORE COLOR
        ========================= */

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


        /* =========================
           RESULT LISTS
        ========================= */

        const matchedList =
            document.getElementById("matchedSkills");

        const missingList =
            document.getElementById("missingSkills");

        const suggestionsList =
            document.getElementById("suggestionsList");


        matchedList.innerHTML = "";
        missingList.innerHTML = "";
        suggestionsList.innerHTML = "";


        /* =========================
           MATCHED SKILLS
        ========================= */

        data.matched_skills.forEach(skill => {

            const li = document.createElement("li");

            li.textContent = skill;

            matchedList.appendChild(li);

        });


        /* =========================
           MISSING SKILLS
        ========================= */

        data.missing_skills.forEach(skill => {

            const li = document.createElement("li");

            li.textContent = skill;

            missingList.appendChild(li);

        });


        /* =========================
           SUGGESTIONS
        ========================= */

        data.suggestions.forEach(suggestion => {

            const li = document.createElement("li");

            li.textContent = suggestion;

            suggestionsList.appendChild(li);

        });


        /* =========================
           SCROLL TO RESULT
        ========================= */

        document.getElementById("result").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

    catch (error) {

        console.error(error);

        alert(
            "Could not connect to the backend. " +
            "Please try again."
        );

    }
}


/* =====================================
   RESUME UPLOAD
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const resumeInput = document.getElementById("resume");

    const uploadBox =
        document.querySelector(".upload-box");

    const uploadIcon =
        uploadBox.querySelector(".upload-icon");

    const uploadTitle =
        uploadBox.querySelector("strong");

    const uploadSubtitle =
        uploadBox.querySelector("span");


    /* =========================
       WHEN PDF IS SELECTED
    ========================= */

    resumeInput.addEventListener("change", function () {

        if (this.files && this.files.length > 0) {

            const file = this.files[0];

            uploadBox.classList.add("file-selected");

            uploadIcon.textContent = "✅";

            uploadTitle.textContent = "Resume uploaded!";

            uploadSubtitle.textContent = file.name;

        }

    });

});


/* =====================================
   UPLOADED RESUME ANIMATION
===================================== */

const uploadStyle = document.createElement("style");

uploadStyle.textContent = `

.upload-box.file-selected {

    border-color: #8b5cf6 !important;

    background: linear-gradient(
        135deg,
        #faf5ff,
        #f0fdf4
    ) !important;

    box-shadow:
        0 0 0 4px rgba(139, 92, 246, 0.08),
        0 12px 30px rgba(124, 58, 237, 0.15);

    animation: uploadSuccess 0.5s ease;

}


.upload-box.file-selected .upload-icon {

    animation: uploadBounce 0.6s ease;

}


.upload-box.file-selected strong {

    color: #7c3aed !important;

}


.upload-box.file-selected span {

    color: #16a34a !important;

    font-weight: 600;

}


@keyframes uploadSuccess {

    0% {
        transform: scale(0.98);
    }

    60% {
        transform: scale(1.02);
    }

    100% {
        transform: scale(1);
    }

}


@keyframes uploadBounce {

    0% {
        transform: scale(0.5);
    }

    60% {
        transform: scale(1.2);
    }

    100% {
        transform: scale(1);
    }

}

`;

document.head.appendChild(uploadStyle);