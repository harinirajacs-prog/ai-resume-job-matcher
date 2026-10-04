/* =========================================================
   BACKEND
========================================================= */

const BACKEND_URL =
    "https://ai-resume-job-matcher-dtsa.onrender.com";


/* =========================================================
   RESUME UPLOAD
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const resumeInput =
        document.getElementById("resume");

    const uploadBox =
        document.getElementById("uploadBox");

    if (!resumeInput || !uploadBox) {
        console.error("Resume upload elements not found.");
        return;
    }

    const uploadIcon =
        uploadBox.querySelector(".upload-icon");

    const uploadTitle =
        uploadBox.querySelector("strong");

    const uploadSubtitle =
        uploadBox.querySelector("span");


    /* =====================================================
       PDF SELECTED
    ===================================================== */

    resumeInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) {
            uploadBox.classList.remove("file-selected");

            uploadIcon.textContent = "📄";

            uploadTitle.textContent =
                "Choose your resume";

            uploadSubtitle.textContent =
                "PDF files only";

            return;
        }


        /* ================================================
           CHECK PDF
        ================================================= */

        const isPDF =
            file.type === "application/pdf" ||
            file.name.toLowerCase().endsWith(".pdf");


        if (!isPDF) {

            alert("Please select a PDF file only.");

            this.value = "";

            uploadBox.classList.remove("file-selected");

            uploadIcon.textContent = "📄";

            uploadTitle.textContent =
                "Choose your resume";

            uploadSubtitle.textContent =
                "PDF files only";

            return;
        }


        /* ================================================
           SHOW SELECTED PDF
        ================================================= */

        uploadBox.classList.add("file-selected");

        uploadIcon.textContent = "✅";

        uploadTitle.textContent =
            "Resume uploaded!";

        uploadSubtitle.textContent =
            file.name;


        console.log("PDF selected:", file.name);
        console.log("PDF size:", file.size);
        console.log("PDF type:", file.type);

    });

});


/* =========================================================
   ANALYZE RESUME
========================================================= */

async function analyzeResume() {

    const resumeInput =
        document.getElementById("resume");

    const jobDescriptionElement =
        document.getElementById("jobDescription");

    const analyzeButton =
        document.getElementById("analyzeButton");


    /* =====================================================
       GET VALUES
    ===================================================== */

    const file =
        resumeInput.files[0];

    const jobDescription =
        jobDescriptionElement.value.trim();


    /* =====================================================
       VALIDATE RESUME
    ===================================================== */

    if (!file) {

        alert(
            "Please upload your resume PDF."
        );

        return;
    }


    /* =====================================================
       VALIDATE PDF
    ===================================================== */

    const isPDF =
        file.type === "application/pdf" ||
        file.name.toLowerCase().endsWith(".pdf");


    if (!isPDF) {

        alert(
            "Please upload a valid PDF file."
        );

        return;
    }


    /* =====================================================
       VALIDATE JOB DESCRIPTION
    ===================================================== */

    if (!jobDescription) {

        alert(
            "Please enter the job description."
        );

        return;
    }


    /* =====================================================
       FORM DATA
    ===================================================== */

    const formData =
        new FormData();

    formData.append(
        "resume",
        file
    );

    formData.append(
        "job_description",
        jobDescription
    );


    /* =====================================================
       BUTTON LOADING
    ===================================================== */

    if (analyzeButton) {

        analyzeButton.disabled = true;

        analyzeButton.textContent =
            "⏳ Analyzing...";
    }


    try {

        console.log(
            "Sending resume:",
            file.name
        );


        /* =================================================
           SEND TO BACKEND
        ================================================= */

        const response =
            await fetch(
                BACKEND_URL + "/analyze",
                {
                    method: "POST",
                    body: formData
                }
            );


        console.log(
            "Backend status:",
            response.status
        );


        /* =================================================
           HANDLE BACKEND ERROR
        ================================================= */

        if (!response.ok) {

            const errorText =
                await response.text();

            console.error(
                "Backend error:",
                errorText
            );

            throw new Error(
                "Backend error " +
                response.status
            );
        }


        /* =================================================
           GET RESULT
        ================================================= */

        const data =
            await response.json();


        console.log(
            "Analysis result:",
            data
        );


        /* =================================================
           SHOW RESULT
        ================================================= */

        const result =
            document.getElementById("result");

        if (result) {

            result.classList.remove(
                "hidden"
            );
        }


        /* =================================================
           JOB DOMAIN
        ================================================= */

        const jobDomainElement =
            document.getElementById("jobDomain");

        if (jobDomainElement) {

            jobDomainElement.textContent =
                data.job_domain || "General";
        }


        /* =================================================
           MATCH SCORE
        ================================================= */

        const scoreElement =
            document.getElementById("matchScore");

        if (scoreElement) {

            scoreElement.textContent =
                data.match_percentage + "%";


            /* =============================================
               SCORE COLOR
            ============================================= */

            if (
                data.match_percentage >= 80
            ) {

                scoreElement.style.borderColor =
                    "#22c55e";

                scoreElement.style.color =
                    "#16a34a";

            } else if (
                data.match_percentage >= 50
            ) {

                scoreElement.style.borderColor =
                    "#f59e0b";

                scoreElement.style.color =
                    "#d97706";

            } else {

                scoreElement.style.borderColor =
                    "#ef4444";

                scoreElement.style.color =
                    "#dc2626";
            }
        }


        /* =================================================
           MATCHED SKILLS
        ================================================= */

        const matchedList =
            document.getElementById(
                "matchedSkills"
            );


        /* =================================================
           MISSING SKILLS
        ================================================= */

        const missingList =
            document.getElementById(
                "missingSkills"
            );


        /* =================================================
           SUGGESTIONS
        ================================================= */

        const suggestionsList =
            document.getElementById(
                "suggestionsList"
            );


        /* =================================================
           CLEAR OLD RESULTS
        ================================================= */

        if (matchedList) {
            matchedList.innerHTML = "";
        }

        if (missingList) {
            missingList.innerHTML = "";
        }

        if (suggestionsList) {
            suggestionsList.innerHTML = "";
        }


        /* =================================================
           DISPLAY MATCHED SKILLS
        ================================================= */

        if (
            matchedList &&
            Array.isArray(data.matched_skills)
        ) {

            data.matched_skills.forEach(
                skill => {

                    const li =
                        document.createElement(
                            "li"
                        );

                    li.textContent =
                        skill;

                    matchedList.appendChild(
                        li
                    );
                }
            );
        }


        /* =================================================
           DISPLAY MISSING SKILLS
        ================================================= */

        if (
            missingList &&
            Array.isArray(data.missing_skills)
        ) {

            data.missing_skills.forEach(
                skill => {

                    const li =
                        document.createElement(
                            "li"
                        );

                    li.textContent =
                        skill;

                    missingList.appendChild(
                        li
                    );
                }
            );
        }


        /* =================================================
           DISPLAY SUGGESTIONS
        ================================================= */

        if (
            suggestionsList &&
            Array.isArray(data.suggestions)
        ) {

            data.suggestions.forEach(
                suggestion => {

                    const li =
                        document.createElement(
                            "li"
                        );

                    li.textContent =
                        suggestion;

                    suggestionsList.appendChild(
                        li
                    );
                }
            );
        }


        /* =================================================
           SCROLL TO RESULT
        ================================================= */

        if (result) {

            result.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }


        /* =================================================
           SUCCESS
        ================================================= */

        console.log(
            "Resume analysis completed successfully."
        );

    }


    /* =====================================================
       ERROR
    ================================================= */

    catch (error) {

        console.error(
            "Analysis error:",
            error
        );

        alert(
            "Could not analyze the resume.\n\n" +
            error.message
        );

    }


    /* =====================================================
       RESET BUTTON
    ================================================= */

    finally {

        if (analyzeButton) {

            analyzeButton.disabled = false;

            analyzeButton.textContent =
                "✨ Analyze Resume";
        }
    }
}


/* =========================================================
   UPLOAD ANIMATION
========================================================= */

const uploadStyle =
    document.createElement("style");

uploadStyle.textContent = `

.upload-box.file-selected {

    border-color: #8b5cf6 !important;

    background:
        linear-gradient(
            135deg,
            #faf5ff,
            #f0fdf4
        ) !important;

    box-shadow:
        0 0 0 4px rgba(139, 92, 246, 0.08),
        0 12px 30px rgba(124, 58, 237, 0.15);

    animation:
        uploadSuccess
        0.5s
        ease;
}


.upload-box.file-selected
.upload-icon {

    animation:
        uploadBounce
        0.6s
        ease;
}


.upload-box.file-selected
strong {

    color: #7c3aed !important;
}


.upload-box.file-selected
span {

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

document.head.appendChild(
    uploadStyle
);