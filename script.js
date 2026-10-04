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

    // Click the upload box again to select/replace the PDF
    const uploadBox = document.querySelector(".upload-box");

    uploadBox.addEventListener("click", function () {
        resumeInput.click();
    });
}