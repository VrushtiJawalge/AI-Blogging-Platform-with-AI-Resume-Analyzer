// Toggle between login and signup forms
function showSignup() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "flex";

  document.getElementById("leftTitle").innerText = "HELLO";
  document.getElementById("leftText").innerText = "Create your account and begin using AI-based tools for blog generation, resume creation, and resume analysis.";
}

function showLogin() {
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("loginForm").style.display = "flex";

  document.getElementById("leftTitle").innerText = "WELCOME";
  document.getElementById("leftText").innerText = "AI Blogging & Resume Analyzer Platform. Helping you create content and build careers smarter.";
}
document.getElementById("loginForm").addEventListener("submit", function(e){
  e.preventDefault();
  window.location.href = "dashboard.html";
});
 
// Login form redirect
  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault(); // stop actual form submission
    window.location.href = "home.html";
  });

  // Signup form redirect
  document.getElementById("signupForm").addEventListener("submit", function (e) {
    e.preventDefault(); // stop actual form submission
    window.location.href = "home.html";
  });