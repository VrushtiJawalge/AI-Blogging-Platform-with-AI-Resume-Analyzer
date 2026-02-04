// 1. FILE UPLOAD HANDLER
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  document.getElementById("fileNameDisplay").innerText =
    `Selected: ${file.name}`;

  const reader = new FileReader();
  reader.onload = function (e) {
    const text = e.target.result;
    // Note: For real PDF/DOCX, a backend or specific library is usually needed.
    // This reads TXT files directly and acts as a placeholder for file logic.
    document.getElementById("resumeText").value = text;
  };

  if (file.type === "text/plain") {
    reader.readAsText(file);
  } else {
    // Simulated extraction for binary files in this demo
    document.getElementById("resumeText").value =
      "[Extracted Content from " +
      file.name +
      "]\nSenior Project Manager with 10 years experience in Agile and Scrum. Expert in Python and SQL.";
  }
}

// 2. ANALYSIS ENGINE
function runAnalysis() {
  const resume = document.getElementById("resumeText").value.toLowerCase();
  const job = document.getElementById("jobText").value.toLowerCase();

  if (!resume || !job) {
    alert("Please provide both a resume and a job description.");
    return;
  }

  // Skill Dictionary
  const techSkills = [
    "python",
    "javascript",
    "react",
    "sql",
    "aws",
    "docker",
    "scrum",
    "agile",
    "project management",
    "leadership",
    "analytics",
    "tableau",
    "excel",
    "kubernetes",
  ];

  let missing = [];
  let score = 0;
  let jobKeywordsFound = 0;

  techSkills.forEach((skill) => {
    if (job.includes(skill)) {
      jobKeywordsFound++;
      if (resume.includes(skill)) {
        score++;
      } else {
        missing.push(skill);
      }
    }
  });

  // Calculate Score
  const finalScore =
    jobKeywordsFound > 0 ? Math.round((score / jobKeywordsFound) * 100) : 45;

  // UI Updates
  document.getElementById("results").style.display = "block";
  document.getElementById("scoreVal").innerText = finalScore + "%";

  if (finalScore > 70) {
    document.getElementById("statusHeader").innerText = "Excellent Match!";
    document.getElementById("statusSub").innerText =
      "Your profile is a top contender for this position.";
  } else {
    document.getElementById("statusHeader").innerText = "Low Match Detected";
    document.getElementById("statusSub").innerText =
      "Consider adding the missing keywords below to pass ATS filters.";
  }

  // Keywords
  document.getElementById("missingKeywords").innerHTML =
    missing.length > 0
      ? missing.map((m) => `<span class="pill">${m}</span>`).join("")
      : "<p style='color:var(--success)'>No major technical skills missing!</p>";

  // Recommendations
  const recs = [
    `Incorporate "${missing[0] || "industry tools"}" into your work history.`,
    "Ensure your contact details match the location of the job.",
    "Use bullet points starting with action verbs (e.g., 'Directed', 'Developed').",
  ];
  document.getElementById("recoList").innerHTML = recs
    .map((r) => `<div class="reco">${r}</div>`)
    .join("");

  document.getElementById("results").scrollIntoView({ behavior: "smooth" });
}
